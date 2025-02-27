document.addEventListener("DOMContentLoaded", () => {
    const groqApiKey = "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"; // Replace with your actual API key
    const groq = new Groq({ apiKey: groqApiKey });

    async function getGroqChatCompletion(userMessage) {
        try {
            return await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: userMessage,
                    },
                ],
                model: "llama-3.3-70b-versatile",
            });
        } catch (error) {
            console.error("Error getting chat completion:", error);
            throw error;
        }
    }

    async function handleButtonClick() {
        try {
            const userMessageElement = document.getElementById('myText');
            const userMessage = userMessageElement?.value;
            if (!userMessage) {
                throw new Error("User message is empty");
            }

            const demoElement = document.getElementById('demo');
            if (!demoElement) {
                throw new Error("Demo element not found");
            }

            const chatCompletion = await getGroqChatCompletion(userMessage);
            const completionContent = chatCompletion.choices[0]?.message?.content || "";
            demoElement.textContent = completionContent;
        } catch (error) {
            console.error("Error handling button click:", error);
            document.getElementById('demo').textContent = `Error: ${error.message}`;
        }
    }

    // Add an event listener to the button
    const button = document.getElementById('myButton');
    button.addEventListener('click', handleButtonClick);
});