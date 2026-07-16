/**
 * Agent Type Definitions
 * Core interfaces for the multi-agent architecture.
 */

export interface AgentConfig {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  systemPrompt: string;
  model: string;
  temperature: number;
  maxTokens: number;
  tools?: AgentTool[];
  keywords?: string[];
  color: string;
  avatar?: string;
  isActive?: boolean;
  isPublic?: boolean;
}

export type AgentCategory = 
  | "CODE" 
  | "RESEARCH" 
  | "CREATIVE" 
  | "ANALYSIS" 
  | "GENERAL" 
  | "MULTI_DOMAIN";

export interface AgentTool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
}

export interface AgentMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp: number;
  agentId?: string;
  agentName?: string;
  toolCalls?: AgentToolCall[];
}

export interface AgentToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface AgentResult {
  agentId: string;
  agentName: string;
  content: string;
  toolCalls?: AgentToolCall[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  latency?: number;
  isSynthesized?: boolean;
  sources?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  status: "ACTIVE" | "ARCHIVED" | "DELETED";
  agentId?: string;
  agentName?: string;
  agentColor?: string;
  messages: AgentMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StreamingMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming: boolean;
  agentName?: string;
  sources?: DocumentSource[];
}
