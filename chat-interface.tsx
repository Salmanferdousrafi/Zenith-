"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatInterfaceProps {
  sessionId: string;
  agentId?: string;
  agentName?: string;
  agentColor?: string;
  knowledgeBaseId?: string;
}

export function ChatInterface({
  sessionId,
  agentId,
  agentName = "Zenith",
  agentColor = "#6C5DD3",
  knowledgeBaseId,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, error } = useChat({
    sessionId,
    agentId,
    knowledgeBaseId,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-full bg-cosmic-black">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${agentColor}20` }}
        >
          <Sparkles className="w-5 h-5" style={{ color: agentColor }} />
        </div>
        <div>
          <h2 className="font-display font-semibold text-cosmic-starlight">
            {agentName}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/40">Online</span>
          </div>
        </div>
        {knowledgeBaseId && (
          <Badge variant="cosmic" className="ml-auto">
            RAG Enabled
          </Badge>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-cosmic-purple" />
            </div>
            <div>
              <h3 className="font-display text-lg text-cosmic-starlight">
                Start a conversation
              </h3>
              <p className="text-sm text-white/40 mt-1">
                Ask anything. The AI will adapt to your needs.
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || index}
            message={message}
            agentColor={agentColor}
            agentName={agentName}
          />
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8" style={{ backgroundColor: `${agentColor}20` }}>
              <AvatarFallback style={{ color: agentColor }}>
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1.5 py-3 px-4 rounded-2xl bg-white/5">
              <div className="w-2 h-2 rounded-full bg-cosmic-purple typing-dot" />
              <div className="w-2 h-2 rounded-full bg-cosmic-purple typing-dot" />
              <div className="w-2 h-2 rounded-full bg-cosmic-purple typing-dot" />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border-white/10 text-cosmic-starlight placeholder:text-white/30"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            variant="glow"
            disabled={isLoading || !input.trim()}
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message,
  agentColor,
  agentName,
}: {
  message: any;
  agentColor: string;
  agentName: string;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={cn("w-8 h-8 shrink-0", isUser && "bg-cosmic-cyan/20")}
        style={!isUser ? { backgroundColor: `${agentColor}20` } : {}}
      >
        <AvatarFallback
          style={{ color: isUser ? "#00F5FF" : agentColor }}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-cosmic-purple/20 text-cosmic-starlight"
            : "bg-white/5 text-cosmic-starlight"
        )}
      >
        {!isUser && (
          <span className="text-xs font-medium mb-1 block" style={{ color: agentColor }}>
            {agentName}
          </span>
        )}

        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/
$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-cosmic-void px-1.5 py-0.5 rounded text-cosmic-cyan text-sm" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/40 mb-2">Sources:</p>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source: any, i: number) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {source.documentName}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
