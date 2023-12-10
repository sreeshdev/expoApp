

import { Image } from "expo-image";
import React from "react";
import {
  Sheet,
} from "tamagui";
import PushNotification from "./PushNotification";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsHome from "./SettingsHome";

const Stack = createStackNavigator();
const Settings = ({ open, setOpen }) => {
  const headerBackImage = () => (
    <Image
      style={{
        marginLeft: 10,
        width: 26,
        height: 26,
      }}
      contentFit="contain"
      source={require("../../../../assets/chevronBgLeft.svg")}
    />
  );
  const headerCloseImage = () => {
    <Image
      style={{
        marginLeft: 10,
        width: 13,
        height: 23,
      }}
      contentFit="contain"
      source={require("../../../../assets/close.svg")}
    />;
  };
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      //   modal={modal}
      open={open}
      onOpenChange={setOpen}
      snapPoints={[98, 90]}
      snapPointsMode={"percent"}
      dismissOnOverlayPress={false}
      dismissOnSnapToBottom={true}
      //   position={position}
      //   onPositionChange={setPosition}
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      {/* <Sheet.Handle /> */}
      <Sheet.Frame backgroundColor="#e8fffa">
        <Stack.Navigator
          screenOptions={{
            // headerMode: "screen",
            headerStyle: {
              backgroundColor: "#e8fffa",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "700",
              letterSpacing: 1,
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            },
            headerStatusBarHeight: 0,
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerBackImage,
            headerMode: "screen",
          }}
          initialRouteName="SettingsHome"
          detachInactiveScreens
        >
          <Stack.Screen
            name="SettingsHome"
            options={{
              title: "Settings",
            }}
            component={SettingsHome}
          />
          <Stack.Screen name="PushNotification" component={PushNotification} />
        </Stack.Navigator>
      </Sheet.Frame>
    </Sheet>
  );
};

export default Settings;
