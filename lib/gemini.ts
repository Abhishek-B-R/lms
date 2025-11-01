export async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })

    if (!response.ok) {
      throw new Error("Failed to get AI response")
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calling chat API:", error)
    throw error
  }
}
