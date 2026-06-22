import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CampsScreen from "../screens/camps/list/CampsScreen";
import CreateCampScreen from "../screens/create/CreateCampScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#FFFFFF",
				tabBarInactiveTintColor: "#91A091",
				tabBarStyle: {
					backgroundColor: "#132617",
					borderTopWidth: 1,
					borderTopColor: "#203A25",
					height: 64,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontSize: 11,
					fontWeight: "700",
				},
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
				name="Favoriler"
				component={FavoritesScreen}
				options={{
					title: "Favoriler",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="heart-outline"
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
