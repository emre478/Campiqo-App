import { useEffect, useState } from "react";
import { getChatMessages, sendMessage } from "../services/chatService";

import { ChatMessage } from "../types/ChatMessage";

export const useChat = (campId: string) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	const [loading, setLoading] = useState(false);

	const [message, setMessage] = useState("");

	useEffect(() => {
		loadMessages();
	}, []);

	const loadMessages = async () => {
		try {
			setLoading(true);

			const response = await getChatMessages(campId);

			setMessages(response.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleSendMessage = async () => {
		if (!message.trim()) return;

		try {
			await sendMessage(campId, message);

			setMessage("");

			await loadMessages();
		} catch (error) {
			console.log(error);
		}
	};

	return {
		messages,
		message,
		setMessage,
		loading,
		handleSendMessage,
		loadMessages,
	};
};
