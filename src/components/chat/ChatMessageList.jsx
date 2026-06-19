import React from "react";
import { FlatList } from "react-native";

import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages, currentUserId }) => {
	return (
		<FlatList
			data={messages}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<ChatMessage
					message={item}
					isMyMessage={item.userId === currentUserId}
				/>
			)}
		/>
	);
};

export default ChatMessageList;
