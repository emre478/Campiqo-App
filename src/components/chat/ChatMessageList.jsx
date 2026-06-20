import React, { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages, currentUserId }) => {
	const flatListRef = useRef(null);
	if (!messages.length) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyIcon}>🏕</Text>

				<Text style={styles.emptyTitle}>Henüz mesaj yok</Text>

				<Text style={styles.emptyText}>
					Bu kampın sohbetine ilk mesajı gönder.
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
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 30,
	},

	emptyIcon: {
		fontSize: 52,
		marginBottom: 16,
	},

	emptyTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 8,
		color: "#222",
	},

	emptyText: {
		textAlign: "center",
		color: "#777",
		lineHeight: 22,
	},
});
