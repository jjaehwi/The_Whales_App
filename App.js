// In App.js in a new project

import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SimulationSetupScreen from './src/screens/SimulationSetupScreen';
import ControllerScreen from './src/screens/ControllerScreen';
import SimulationMainScreen from './src/screens/SimulationMainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
// import SplashScreen from "./src/screens/SplashScreen";
// import DrawerNavigationRoutes from "./src/screens/DrawerNavigationRoutes";

const Stack = createNativeStackNavigator();

// function Auth() {
//   return (
//     <Stack.Navigator initialRouteName="LoginScreen">
//       <Stack.Screen
//         name="LoginScreen"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="RegisterScreen"
//         component={RegisterScreen}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />

        {/* <Stack.Navigator initialRouteName="SplashScreen"> */}
        {/* SplashScreen which will come once for 5 Seconds */}
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        /> */}
        {/* Auth Navigator: Include Login and Signup */}
        {/* {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
  /> */}

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: '모드 선택'}}
        />
        <Stack.Screen
          name="SimSetup"
          component={SimulationSetupScreen}
          options={{title: '시뮬레이션 설정'}}
        />
        <Stack.Screen
          name="Controller"
          component={ControllerScreen}
          options={{title: '컨트롤러 메인화면'}}
        />
        <Stack.Screen
          name="SimMain"
          component={SimulationMainScreen}
          options={{title: '시뮬레이션 메인'}}
        />
        {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
