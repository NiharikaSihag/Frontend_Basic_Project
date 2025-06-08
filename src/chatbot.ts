export function handleChatBotToggle(): void {
  const chatbotButton = document.getElementById('chatbotButton') as HTMLButtonElement | null;
  const closeChatbot = document.getElementById('closeChatbot') as HTMLButtonElement | null;
  const chatbotWindow = document.getElementById('chatbotWindow') as HTMLDivElement | null;
  const chatInput = document.getElementById("chatInput") as HTMLInputElement | null;

  if (!chatbotButton || !closeChatbot || !chatbotWindow || !chatInput) {
      console.error("Chatbot elements not found.");
      return;
  }

  chatbotButton.addEventListener('click', () => {
      chatbotWindow.classList.remove('hidden');
      chatbotWindow.classList.remove('fade-out');
      chatbotWindow.classList.add('fade-in');
      chatInput.focus();
      appendMessage("BOXCARS", "Hey! How can I assist you today?");
  });

  closeChatbot.addEventListener('click', () => {
      chatbotWindow.classList.remove('fade-in');
      chatbotWindow.classList.add('fade-out');
      chatbotWindow.addEventListener('animationend', function (event: AnimationEvent) {
          if (event.animationName === 'fadeOut') {
              chatbotWindow.classList.add('hidden');
              chatbotWindow.classList.remove('fade-out');
          }
      });
  });
}

const chatbox = document.getElementById("chatbox") as HTMLDivElement | null;
const chatInput = document.getElementById("chatInput") as HTMLInputElement | null;
const sendMessageButton = document.getElementById("sendMessage") as HTMLButtonElement | null;

if (!chatbox || !chatInput || !sendMessageButton) {
  console.error("Chatbox, chatInput, or sendMessageButton elements not found.");
}

const API_KEY = "";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

async function sendMessage(): Promise<void> {
  const userMessage = chatInput?.value.trim();
  if (!userMessage) return;
  appendMessage("You", userMessage);
  chatInput!.value = "";
  try {
      const requestBody = {
          system_instruction: {
              parts: [{
                  text: `You are **BOXCARS**, an expert car assistant.  Use ONLY the following data to answer the user's question.  If the question is not related to cars , respond with: "I can only provide car-related information."  Do not mention the data source.   
                  `
              }]
          },
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
          generationConfig: {
              maxOutputTokens: 80,
              temperature: 0.6
          }
      };
      const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log(data);
      let botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I can only provide car-related information.";

      botReply = botReply.replace(/<[^>]*>|[\*_~#`\-|]+/g, "");
      botReply = botReply.trim();
      appendMessage("BOXCARS", botReply);

  } catch (error) {
      appendMessage("BOXCARS", "Error connecting to network source. Please try again later.");
      console.error("Error:", error);
  }
}

function appendMessage(sender: string, message: string): void {
  const messageElement = document.createElement("div");
  messageElement.classList.add('mb-2', 'p-2', 'rounded');
  messageElement.style.maxWidth = 'calc(100% - 20px)';
  messageElement.classList.add("p-2", "rounded-lg", "mb-2", sender === "You" ? "bg-blue-200" : "bg-gray-200", "text-gray-800", "fade-in");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox?.appendChild(messageElement);
  chatbox!.scrollTop = chatbox!.scrollHeight;
}

sendMessageButton?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keypress", (event: KeyboardEvent) => {
  if (event.key === "Enter") sendMessage();
});

const style = document.createElement("style");
style.innerHTML = `
  .fade-in { animation: fadeIn 0.5s ease-in-out; }
  .fade-out { animation: fadeOut 0.5s ease-in-out; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
`;
document.head.appendChild(style);
