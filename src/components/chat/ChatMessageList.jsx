import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages, currentUserId }) => {
	const flatListRef = useRef(null);

	if (!messages.length) {
		return (
			<View style={styles.emptyContainer}>
				<View style={styles.emptyIconWrap}>
					<MaterialCommunityIcons
						name="chat-processing-outline"
						size={40}
						color="#8DD69A"
					/>
				</View>

				<Text style={styles.emptyTitle}>Henüz mesaj yok</Text>

				<Text style={styles.emptyText}>
					Bu kampın sohbetine ilk mesajı gönder ve diğer
					katılımcılarla iletişime geç.
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			ref={flatListRef}
			data={messages}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.listContent}
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

const styles = StyleSheet.create({
	listContent: {
		paddingBottom: 12,
	},

	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 30,
	},

	emptyIconWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#132617",
		borderWidth: 1,
		borderColor: "#203A25",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	emptyTitle: {
		fontSize: 20,
		fontWeight: "800",
		marginBottom: 8,
		color: "#F4F7EF",
	},

	emptyText: {
		textAlign: "center",
		color: "#91A091",
		lineHeight: 22,
		fontSize: 14,
	},
});
