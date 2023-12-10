import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ListItem,
  Separator,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import * as Actions from "modules/actions";
import { connect } from "react-redux";
import { AppState, Linking, ScrollView, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../../../../../PushNotifications";

const PushNotification = (props) => {
  const {
    notificationTokenSent,
    setNotificationToken,
    getNotificationSettings,
    updateNotificationSettings,
    notificationSettings,
  } = props;
  const [systemNotificationStatus, setSystemNotificationStatus] =
    useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [notificationTypes, setNotificationTypes] = useState([]);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    setNotificationTypes(notificationSettings?.types);
  }, [notificationSettings]);
  useEffect(() => {
    if (appStateVisible === "active") checkSystemNotificationSettings();
  }, [appStateVisible]);
  const checkSystemNotificationSettings = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      setSystemNotificationStatus(false);
      setNotificationToken({
        permission: "DENY",
        status: false,
      });
    } else {
      setSystemNotificationStatus(true);
      getNotificationSettings();
      if (!notificationTokenSent) {
        await registerForPushNotificationsAsync(setNotificationToken);
      }
    }
  };
  const onChangeSettings = (payload) => {
    updateNotificationSettings(payload);
  };
  const onChangeLocalSettings = (value, parentIndex, childIndex) => {
    let changeData = [...notificationTypes];
    changeData[parentIndex].actionTypes[childIndex].selectedDeliveryMethod =
      value;
    setNotificationTypes(changeData);
  };
  return systemNotificationStatus ? (
    <YStack gap={5} backgroundColor="#e8fffa" height={"100%"}>
      <Separator marginBottom={15} />
      <ScrollView vertical={true}>
        <YStack gap={10}>
          {notificationTypes?.map(
            ({ id, displayName, actionTypes, name: type }, parentIndex) => (
              <>
                <Text
                  fontWeight={600}
                  fontSize={18}
                  marginBottom={5}
                  marginLeft={5}
                >
                  {displayName}
                </Text>
                <YStack paddingHorizontal={10} key={id}>
                  <YGroup
                    alignSelf="center"
                    bordered
                    size="$5"
                    separator={<Separator />}
                  >
                    {actionTypes?.map(
                      (
                        {
                          id,
                          displayName,
                          selectedDeliveryMethod,
                          name: actionType,
                        },
                        index
                      ) => (
                        <YGroup.Item>
                          <ListItem hoverTheme pressTheme>
                            <XStack
                              width={"100%"}
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text>{displayName}</Text>
                              <Switch
                                id={displayName + id}
                                thumbColor={
                                  selectedDeliveryMethod ===
                                  "MOBILE_PUSH_NOTIFICATION"
                                    ? "#003428"
                                    : "#003428"
                                }
                                trackColor={{
                                  false: "#a1a6a5",
                                  true: "#31947d",
                                }}
                                ios_backgroundColor="#fff"
                                onValueChange={(value) => {
                                  onChangeSettings({
                                    type,
                                    actionType,
                                    deliveryMethod: value
                                      ? "MOBILE_PUSH_NOTIFICATION"
                                      : "NONE",
                                  });
                                  onChangeLocalSettings(
                                    value ? "MOBILE_PUSH_NOTIFICATION" : "NONE",
                                    parentIndex,
                                    index
                                  );
                                }}
                                value={
                                  selectedDeliveryMethod ===
                                  "MOBILE_PUSH_NOTIFICATION"
                                }
                              />
                            </XStack>
                          </ListItem>
                        </YGroup.Item>
                      )
                    )}
                  </YGroup>
                </YStack>
              </>
            )
          )}
        </YStack>
      </ScrollView>
    </YStack>
  ) : (
    <YStack
      gap={5}
      backgroundColor="#e8fffa"
      height={"100%"}
      alignItems="center"
      justifyContent="center"
    >
      <Text>Turn on Notification Settings</Text>
      <Button
        backgroundColor={"#22b693"}
        color={"#fcfcfc"}
        size={"$5"}
        onPress={() => Linking.openURL("app-settings:notifications")}
      >
        Go to Settings
      </Button>
    </YStack>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    reqStatus: AppBaseReducer?.reqStatus,
    notificationSettings: AppBaseReducer?.notificationSettings,
    notificationTokenSent: AppBaseReducer?.notificationTokenSent,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushNotification);
