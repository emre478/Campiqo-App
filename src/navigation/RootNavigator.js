import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CampDetailScreen from "../screens/camps/detail/CampDetailScreen";
import MyCreatedCampsScreen from "../screens/profile/MyCreatedCampsScreen";
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
			</Stack.Navigator>
		</NavigationContainer>
	);
}
