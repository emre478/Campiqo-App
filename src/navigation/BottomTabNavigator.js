import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import CampsScreen from "../screens/camps/CampsScreen";
import CreateCampScreen from "../screens/create/CreateCampScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#2E7D32",
				tabBarInactiveTintColor: "gray",
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Ana Sayfa",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="home"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Camps"
				component={CampsScreen}
				options={{
					title: "Kamplar",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="tent"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Create"
				component={CreateCampScreen}
				options={{
					title: "Oluştur",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="plus-circle"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					title: "Bildirimler",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="bell"
							color={color}
							size={size}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: "Profil",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="account"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}