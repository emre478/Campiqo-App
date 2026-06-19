import React, { useRef } from "react";
import { FlatList } from "react-native";

import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages, currentUserId }) => {
	const flatListRef = useRef(null);
	return (
		<FlatList
			ref={flatListRef}
			data={messages}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			onContentSizeChange={() =>
				flatListRef.current?.scrollToEnd({
					animated: true,
				})
			}
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
