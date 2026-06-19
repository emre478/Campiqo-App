import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

import ChatMessageList from "../../components/chat/ChatMessageList";

import ChatInput from "../../components/chat/ChatInput";

import ChatHeader from "../../components/chat/ChatHeader";
import { useChat } from "../../hooks/useChat";

const ChatScreen = ({ route }) => {
	const { campId, campTitle } = route.params;

	const currentUserId = useSelector((state) => state.auth.user?.id);

	const { messages, message, setMessage, handleSendMessage } = useChat(campId);

	return (
		<SafeAreaView style={styles.container}>
			<ChatHeader campTitle={campTitle} />
			<View style={styles.content}>
				<ChatMessageList
					messages={messages}
					currentUserId={currentUserId}
				/>
			</View>

			<ChatInput
				message={message}
				onChangeText={setMessage}
				onSend={handleSendMessage}
			/>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	content: {
		flex: 1,
		padding: 16,
	},
});
