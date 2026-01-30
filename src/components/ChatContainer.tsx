import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { RotateCcw, FileText, Sparkles, ArrowLeft, Download, Building2, Server, Rocket, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { downloadResumeAsPdf, looksLikeCompleteResume } from "@/lib/pdfResume";
import { toast } from "sonner";
import type { ResumeCategory } from "@/hooks/useChat";

const SUBSCRIPTION_KEY = "resumeai_has_subscription";

const CATEGORIES: { id: ResumeCategory; label: string; description: string; icon: typeof Building2 }[] = [
  { id: "product_mnc", label: "Product-based MNC", description: "Google, Microsoft, Amazon, Meta — impact & scale focused", icon: Building2 },
  { id: "service_it", label: "Service-based IT", description: "TCS, Infosys, Accenture — projects & technologies", icon: Server },
  { id: "startup", label: "Startup / Growth-stage", description: "Early-stage companies — ownership & versatility", icon: Rocket },
  { id: "overseas_ats", label: "Overseas / ATS-heavy", description: "US, UK, EU applications — keyword & ATS optimized", icon: Globe },
];

export function ChatContainer() {
  const navigate = useNavigate();
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ResumeCategory | null>(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const { messages, isLoading, sendMessage, initializeChat, resetChat, isInitialized } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasSubscription = () => localStorage.getItem(SUBSCRIPTION_KEY) === "true";

  useEffect(() => {
    if (!hasSubscription()) {
      navigate("/pricing?from=ai-chat", { replace: true });
      return;
    }
    setSubscriptionChecked(true);
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const lastMessage = messages[messages.length - 1];
  const isStreaming = isLoading && lastMessage?.role === "assistant";
  const showTyping = isLoading && lastMessage?.role !== "assistant";

  const hasCompleteResume = looksLikeCompleteResume(messages);
  const canShowGeneratePdf = hasCompleteResume && !isLoading && !pdfGenerated;
  const canShowDownloadPdf = pdfGenerated && !isLoading;

  const handleGeneratePdf = () => {
    try {
      downloadResumeAsPdf(messages);
      setPdfGenerated(true);
      toast.success("PDF generated. You can download it below.");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleDownloadResume = () => {
    try {
      downloadResumeAsPdf(messages);
      toast.success("Resume downloaded as PDF");
    } catch (err) {
      console.error("PDF download failed:", err);
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  const handleStartWithCategory = (category: ResumeCategory) => {
    setSelectedCategory(category);
    initializeChat(category);
  };

  if (!subscriptionChecked) {
    return null;
  }

  const showCategoryPicker = !isInitialized && messages.length === 0 && !isLoading;

  if (showCategoryPicker) {
    return (
      <div className="flex flex-col h-full">
        <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="mr-1">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
              <FileText className="w-5 h-5 text-navy-dark" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">Resume Consultant</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-powered resume builder
              </p>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Choose your resume type
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Questions and resume format will be tailored to your chosen category.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleStartWithCategory(cat.id)}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/10 hover:border-accent/50 text-left transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center shadow-gold flex-shrink-0">
                      <Icon className="w-5 h-5 text-navy-dark" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cat.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="mr-1">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
              <FileText className="w-5 h-5 text-navy-dark" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">
                Resume Consultant
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {selectedCategory
                  ? CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? "AI-powered resume builder"
                  : "AI-powered resume builder"}
              </p>
            </div>
          </div>
          
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory(null);
                setPdfGenerated(false);
                resetChat();
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Start Over
            </Button>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center shadow-gold mx-auto mb-4">
                <FileText className="w-8 h-8 text-navy-dark" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                Building your resume…
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Asking the first question…
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          ))}

          {showTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-border bg-card/80 backdrop-blur-sm px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {canShowGeneratePdf && (
            <div className="flex justify-center">
              <Button
                onClick={handleGeneratePdf}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold gap-2 shadow-md"
              >
                <FileText className="w-4 h-4" />
                Generate PDF
              </Button>
            </div>
          )}
          {canShowDownloadPdf && (
            <div className="flex justify-center">
              <Button
                onClick={handleDownloadResume}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                Download your resume (PDF)
              </Button>
            </div>
          )}
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            AI may produce inaccurate information. Always review your resume before submitting.
          </p>
        </div>
      </div>
    </div>
  );
}
