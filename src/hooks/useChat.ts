import { useState, useCallback } from "react";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

export type ResumeCategory = "product_mnc" | "service_it" | "startup" | "overseas_ats";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resume-chat`;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [category, setCategory] = useState<ResumeCategory | null>(null);

  const initializeChat = useCallback(async (selectedCategory: ResumeCategory) => {
    if (isInitialized || isLoading) return;

    setCategory(selectedCategory);
    setIsLoading(true);
    setIsInitialized(true);

    let assistantSoFar = "";

    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [],
        category: selectedCategory,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setIsLoading(false);
      toast.error("Failed to connect. Please refresh and try again.");
    }
  }, [isInitialized, isLoading]);

  const sendMessage = useCallback(async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        category: category ?? undefined,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsLoading(false);
      toast.error("Failed to send message. Please try again.");
    }
  }, [messages, category]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setIsInitialized(false);
    setCategory(null);
  }, []);

  return { messages, isLoading, sendMessage, initializeChat, resetChat, isInitialized, category };
}

async function streamChat({
  messages,
  category,
  onDelta,
  onDone,
}: {
  messages: Message[];
  category?: ResumeCategory;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, category }),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    if (resp.status === 429) {
      throw new Error(errorData.error || "Rate limit exceeded. Please wait a moment.");
    }
    if (resp.status === 402) {
      throw new Error(errorData.error || "Usage limit reached.");
    }
    throw new Error(errorData.error || "Failed to connect to AI service");
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}
