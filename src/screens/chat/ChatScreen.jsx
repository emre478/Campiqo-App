import React from "react";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";

import { useSelector } from "react-redux";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatInput from "../../components/chat/ChatInput";
import ChatMessageList from "../../components/chat/ChatMessageList";
import { useChat } from "../../hooks/useChat";

const ChatScreen = ({ route, navigation }) => {
	const { campId, campTitle, participantCount, maxParticipantCount } =
		route.params;

	const currentUserId = useSelector((state) => state.auth.user?.id);

	const { messages, message, setMessage, loading, handleSendMessage } =
		useChat(campId);

	return (
		<SafeAreaView style={styles.container}>
			<ChatHeader
				navigation={navigation}
				campTitle={campTitle}
				participantCount={participantCount}
				maxParticipantCount={maxParticipantCount}
			/>

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 4 : 0}
			>
				<View style={styles.content}>
					{loading && messages.length === 0 ? (
						<View style={styles.loadingWrap}>
							<ActivityIndicator size="large" color="#8DD69A" />
						</View>
					) : (
						<ChatMessageList
							messages={messages}
							currentUserId={currentUserId}
						/>
					)}
				</View>

				<ChatInput
					message={message}
					onChangeText={setMessage}
					onSend={handleSendMessage}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#07130B",
	},

	flex: {
		flex: 1,
	},

	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 12,
	},

	loadingWrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
