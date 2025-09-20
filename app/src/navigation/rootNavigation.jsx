import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import RoutineExersice from "../componets/Routine/exercise";
import Routine from "../componets/Routine/routine";
import Exercise from "../layouts/excersice";
import Login from "../welcome/login";
import Register from "../welcome/register";
import SplashScreen from "./splashScreen";
import TabNavigation from "./tabNavigation";



const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { auth, loading } = useContext(AuthContext);
    if (loading) {
        return <SplashScreen/>; 
      }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth ? (
          
          <>
            <Stack.Screen name="Main" component={TabNavigation} />
            <Stack.Screen name="Exercise" component={Exercise} />
            <Stack.Screen name="Routine" component={Routine} />
            <Stack.Screen name="RoutineExersice" component={RoutineExersice} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    );

}