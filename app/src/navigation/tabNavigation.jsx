import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import CreateR from "../../../assets/Icons/createRutine.png";
import Home from "../../../assets/Icons/home.png";
import User from "../../../assets/Icons/profile.png";
import CreateRutine from "../layouts/createRutine";
import HomeScreen from "../layouts/home";
import Profile from "../layouts/profile";


export default function TabNavigation() {

    const Tab = createBottomTabNavigator();

    return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#111" },
          tabBarActiveTintColor: "yellow",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source={Home} 
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#FFD700" : "#888", 
                }}  
              />
            )
          }}
        />

        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source={User} 
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#FFD700" : "#888", 
                }}             
              />
            )
          }}
        />
        <Tab.Screen 
          name="Crear rutina" 
          component={CreateRutine} 
          options={{
            tabBarIcon: ({focused}) => (
              <Image 
                source={CreateR} 
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#FFD700" : "#888", 
                }}        
              />
            )
          }}
        />
      </Tab.Navigator>
    );

}