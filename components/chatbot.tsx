"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"
import ChatMessage from "./chat-message"
import { generateAIResponse } from "@/lib/gemini"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your LMS Assistant. I can help you with questions about courses, chapters, student management, and more. What can I help you with?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateAIResponse(input)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I encountered an error processing your request. Please make sure your Gemini API key is configured correctly.",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg shadow-xl flex flex-col h-[700px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/10">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">LMS Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card/50 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about the LMS..."
                className="flex-1 bg-input border border-input rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              This AI monitors your LMS. Ask questions about courses, chapters, and student management.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
