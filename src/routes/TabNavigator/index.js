import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationScreen from "modules/views/NotificationScreen";
import React from "react";
import { HomeStack, MoreStack } from "routes/StackNavigator";
import { Image } from "expo-image";
import HomeWork from "modules/views/HomeWork";
import { connect } from "react-redux";
const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const { notificationCount } = props;
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: "#008666",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 10 },
        headerStatusBarHeight: 0,
        tabBarStyle: { paddingBottom: 5, paddingTop: 10, height: 60 },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 27.5, height: 27.5 }}
              source={require("../../assets/home.svg")}
              alt="home"
              contentFit="contain"
            />
          ),
        }}
        component={HomeStack}
      />
      <Tab.Screen
        name="HomeWork"
        options={{
          tabBarLabel: "HomeWork",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#22b693",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 27.5, height: 27.5 }}
              source={require("../../assets/homeWork.svg")}
              alt="HomeWork"
              contentFit="contain"
            />
          ),
        }}
        component={HomeWork}
      />

      <Tab.Screen
        name="Notifications"
        options={{
          tabBarLabel: "Notifications",
          headerStyle: {
            backgroundColor: "#22b693",
          },
          tabBarBadge: notificationCount ? true : null,
          tabBarBadgeStyle: {
            maxHeight: 7,
            maxWidth: 5,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 27.5, height: 27.5 }}
              source={require("../../assets/notification.svg")}
              alt="Notifications"
              contentFit="contain"
            />
          ),
        }}
        component={NotificationScreen}
      />
      <Tab.Screen
        name="MoreStack"
        options={{
          tabBarLabel: "More",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={{ width: 27.5, height: 27.5 }}
              source={require("../../assets/more.svg")}
              alt="More"
              contentFit="contain"
            />
          ),
          unmountOnBlur: true,
        }}
        component={MoreStack}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    notificationCount: AppBaseReducer.notificationCount,
  };
};

export default connect(mapStateToProps)(TabNavigator);
