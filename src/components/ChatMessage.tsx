import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-gold flex items-center justify-center shadow-gold">
          <Bot className="w-4 h-4 text-navy-dark" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-soft",
          isUser
            ? "bg-chat-user text-chat-user-foreground rounded-br-md"
            : "bg-chat-assistant text-chat-assistant-foreground rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-chat-assistant-foreground prose-strong:text-foreground prose-li:text-chat-assistant-foreground">
            <ReactMarkdown>{content}</ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 ml-1 bg-accent animate-pulse-soft rounded-sm" />
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
