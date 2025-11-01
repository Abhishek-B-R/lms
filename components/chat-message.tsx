/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { MessageCircle, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import type { ReactNode } from "react"

interface ChatMessageProps {
  message: {
    content: string
    sender: "user" | "assistant"
    timestamp: Date
  }
}

const MarkdownComponents = {
  h1: ({ children }: { children: ReactNode }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
  h2: ({ children }: { children: ReactNode }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
  h3: ({ children }: { children: ReactNode }) => <h3 className="text-sm font-bold mt-1 mb-1">{children}</h3>,
  p: ({ children }: { children: ReactNode }) => <p className="mb-2">{children}</p>,
  ul: ({ children }: { children: ReactNode }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => <li className="ml-2">{children}</li>,
  code: ({ children, inline }: { children: ReactNode; inline?: boolean }) =>
    inline ? (
      <code className="bg-black/20 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
    ) : (
      <code className="bg-black/20 px-2 py-1 rounded block text-xs font-mono my-1 overflow-x-auto">{children}</code>
    ),
  pre: ({ children }: { children: ReactNode }) => <pre className="overflow-x-auto">{children}</pre>,
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-primary/50 pl-3 my-2 italic opacity-80">{children}</blockquote>
  ),
  a: ({ children, href }: { children: ReactNode; href?: string }) => (
    <a href={href} className="text-primary underline hover:opacity-80" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }: { children: ReactNode }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }: { children: ReactNode }) => <em className="italic">{children}</em>,
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-primary" />
        </div>
      )}

      <div className={`max-w-xs md:max-w-md ${isUser ? "order-2" : "order-1"}`}>
        <div
          className={`rounded-lg px-4 py-2 text-sm ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown components={MarkdownComponents as any}>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        <p className={`text-xs mt-1 ${isUser ? "text-right" : "text-left"} text-muted-foreground`}>
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center order-1">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  )
}
