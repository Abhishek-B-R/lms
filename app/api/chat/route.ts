import { GoogleGenerativeAI } from "@google/generative-ai"

const LMS_SYSTEM_PROMPT = `You are an intelligent assistant for a Learning Management System (LMS). Your role is to provide accurate, helpful information about the LMS platform.

IMPORTANT: You are monitoring an LMS with the following features:
- Teachers can create and manage courses with metadata (title, description, price, category)
- Courses are organized into sequential chapters
- Video content is processed via Mux
- Students can browse, purchase courses via Stripe checkout, and watch content
- Progress tracking through chapters
- Downloadable course attachments
- Resume functionality for courses
- User authentication via Clerk
- Course analytics for teachers

RULES:
1. Only provide information relevant to the LMS platform
2. If a question is NOT about the LMS, politely redirect the user
3. Provide clear, concise answers
4. If you don't have specific information, acknowledge it and suggest what might be helpful
5. Be professional and helpful
6. Do not provide false or speculative information about the system

When answering:
- Be specific about features and workflows
- Reference both teacher and student capabilities when relevant
- Provide actionable guidance
- Keep responses concise and focused`

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Gemini API key is not configured" }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessage(`${LMS_SYSTEM_PROMPT}\n\nUser question: ${message}`)
    const response = await result.response
    const text = response.text()

    return Response.json({ response: text })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Gemini API Error:", error)
    return Response.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
