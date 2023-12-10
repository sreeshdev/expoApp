import { useFonts } from "expo-font";
import { H1, Paragraph, Spacer, TamaguiProvider, Theme, YStack } from "tamagui";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Alert, Platform, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { registerForPushNotificationsAsync } from "./PushNotifications";
import * as Notifications from "expo-notifications";
import { RootSiblingParent } from "react-native-root-siblings";
import { store, persistor } from "./src/store";
import config from "./tamagui.config";
import Routes from "./src/routes";
import { useEffect, useRef, useState } from "react";

export default function App(props) {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),

    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  return loaded ? (
    <TamaguiProvider config={config}>
      <Theme name={"light"}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={{ flex: 1 }}>
              <NavigationContainer>
                <StatusBar
                  barStyle={
                    Platform.OS === "ios" ? "dark-content" : "light-content"
                  }
                  backgroundColor={"#08D59D"}
                />
                <RootSiblingParent>
                  {/* <Text> {expoPushToken}</Text> */}
                  <Routes />
                </RootSiblingParent>
              </NavigationContainer>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </Theme>
    </TamaguiProvider>
  ) : null;
}
