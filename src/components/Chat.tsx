import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";
import { ChatMessage } from "../types/index.ts";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<
    "NGO" | "Government" | "Emergency Response"
  >("NGO");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date(),
      organizationType: selectedOrg,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: `${selectedOrg} Representative`,
        content: `Thank you for reaching out. We are processing your request for ${selectedOrg} assistance.`,
        timestamp: new Date(),
        organizationType: selectedOrg,
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg h-[600px] flex flex-col border dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Emergency Communication
          </h2>
        </div>
        <select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value as any)}
          className="border dark:border-gray-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-black text-gray-900 dark:text-gray-100"
        >
          <option value="NGO">NGO</option>
          <option value="Government">Government</option>
          <option value="Emergency Response">Emergency Response</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === "You" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "You"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-black text-gray-800 dark:text-gray-100"
              }`}
            >
              <p className="text-sm font-semibold">{message.sender}</p>
              <p className="mt-1">{message.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-black">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700 transition-colors flex items-center"
          >
            <Send className="h-5 w-5 mr-2" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
