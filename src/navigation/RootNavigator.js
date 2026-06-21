import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CampDetailScreen from "../screens/camps/detail/CampDetailScreen";
import CampJoinRequestsScreen from "../screens/camps/request/CampJoinRequestsScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import NotificationsScreen from "../screens/notifications/NotificationsScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import MyCreatedCampsScreen from "../screens/profile/MyCreatedCampsScreen";
import MyJoinedCampsScreen from "../screens/profile/MyJoinedCampsScreen";
import UserCreatedCampsScreen from "../screens/profile/UserCreatedCampsScreen";
import UserJoinedCampsScreen from "../screens/profile/UserJoinedCampsScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Register"
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Main"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="CampDetail"
					component={CampDetailScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="MyCreatedCamps"
					component={MyCreatedCampsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="MyJoinedCamps"
					component={MyJoinedCampsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="EditProfile"
					component={EditProfileScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="CampJoinRequests"
					component={CampJoinRequestsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Notifications"
					component={NotificationsScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Chat"
					component={ChatScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="UserProfile"
					component={UserProfileScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="UserCreatedCamps"
					component={UserCreatedCampsScreen}
				/>

				<Stack.Screen
					name="UserJoinedCamps"
					component={UserJoinedCampsScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
