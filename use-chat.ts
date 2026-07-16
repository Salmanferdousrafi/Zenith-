"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface UseChatOptions {
  sessionId: string;
  agentId?: string;
  knowledgeBaseId?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentName?: string;
  sources?: Array<{ documentName: string; score: number }>;
}

export function useChat({ sessionId, agentId, knowledgeBaseId }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient();

  // Fetch existing messages
  const { isLoading: isLoadingHistory } = useQuery({
    queryKey: ["chat", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/chat?sessionId=${sessionId}`);
      if (!res.ok) throw new Error("Failed to load chat history");
      const data = await res.json();
      if (data.data?.messages) {
        setMessages(
          data.data.messages.map((m: any) => ({
            id: m.id,
            role: m.role.toLowerCase(),
            content: m.content,
          }))
        );
      }
      return data;
    },
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          sessionId,
          agentId,
          knowledgeBaseId,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", sessionId] });
    },
  });

  const sendMessage = useCallback(
    async (content: string) => {
      // Optimistically add user message
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const result = await sendMessageMutation.mutateAsync(content);

        // Add assistant response
        const assistantMessage: Message = {
          id: `temp-${Date.now() + 1}`,
          role: "assistant",
          content: result.data?.message || "",
          agentName: result.data?.agent,
          sources: result.data?.sources,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        // Remove optimistic message on error
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        throw error;
      }
    },
    [sendMessageMutation, sessionId, agentId, knowledgeBaseId]
  );

  return {
    messages,
    isLoading: sendMessageMutation.isPending || isLoadingHistory,
    sendMessage,
    error: sendMessageMutation.error?.message,
  };
}
