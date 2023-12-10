import {
  Adapt,
  Avatar,
  Button,
  Label,
  ListItem,
  Popover,
  Separator,
  Sheet,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { connect } from "react-redux";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import ContentLoader from "react-native-easy-content-loader";
import { Image } from "expo-image";
import moment from "moment";
import {
  BellOff,
  ChevronDown,
  MoreHorizontal,
} from "@tamagui/lucide-icons";
import EmptyState from "components/EmptyState/EmptyState";
import usePrevious from "utils/usePrevious";
import Toaster from "components/Toaster";
import { useNotificationNavigation } from "utils/useNotificationNavigation";
const NotificationScreen = (props) => {
  const {
    getNotification,
    notifications,
    studentDetails,
    isContentLoading,
    updateNotificationSettings,
    updateNotification,
    reqStatus,
    getNotificationSettings,
    notificationSetting,
    changeState,
  } = props;
  const { navigateToScreen } = useNotificationNavigation();
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [notificationSettings, setNotificationSettings] = useState({
    open: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const prevReqStatus = usePrevious(reqStatus);
  useEffect(() => {
    getNotificationSettings();
    changeState({ stateName: "notificationCount", stateValue: null });
  }, []);
  useEffect(() => {
    if (page <= notifications?.metadata?.totalPages)
      getNotification({
        individuals: studentDetails?.id,
        page,
        actionTypes: types,
      });
  }, [page]);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.UPDATE_NOTIFICATION_SETTINGS_SUCCESS:
        setNotificationSettings({ open: false });
        Toaster(
          "Notification Turned off Successfully. You can change it in settings anytime",
          "SUCCESS"
        );
        getNotification({
          individuals: studentDetails?.id,
          page,
          actionTypes: types,
        });
        break;
      case ActionTypes.GET_NOTIFICATION_SUCCESS:
        setSeenToNotifications();
        setRefreshing(false);
        break;
      case ActionTypes.UPDATE_NOTIFICATION_SUCCESS:
    }
  }, [reqStatus]);

  const setSeenToNotifications = () => {
    let firstTenNotifications = notifications?.content
      .slice(0, 10)
      .filter(({ userNotificationStatus }) => userNotificationStatus === null)
      .map(({ id }) => id);
    if (firstTenNotifications.length)
      updateNotification({
        notificationIds: firstTenNotifications,
        status: "SEEN",
        requestFrom: "parentApp",
        individualIds: [studentDetails?.id],
      });
  };

  const handleTypeFilter = (filterValue) => {
    setFilterOpen(false);
    setTypes(filterValue);
    if (page !== 1) {
      setPage(1);
    } else {
      getNotification({
        individuals: studentDetails?.id,
        page,
        actionTypes: filterValue,
      });
    }
  };
  const getNotificationIcon = (type) => {
    switch (type) {
      case "STUDENT_DAILY_BEGINNING_SUMMARY":
        return require(`../../../assets/schoolOpen.svg`);

      case "STUDENT_ABSENT":
        return require(`../../../assets/absent.svg`);

      case "STUDENT_ABSENT_PER_SCHEDULE":
        return require(`../../../assets/absent.svg`);

      case "STUDENT_DAILY_CLOSING_SUMMARY":
        return require(`../../../assets/schoolClose.svg`);

      case "STUDENT_CIRCULAR":
        return require(`../../../assets/circular-alt.svg`);

      case "STUDENT_EVENT":
        return require(`../../../assets/EVENT.svg`);

      case "STUDENT_TASK":
        return require(`../../../assets/TASK.svg`);

      case "STUDENT_ASK_US":
        return require(`../../../assets/ask.svg`);

      default:
        return require(`../../../assets/EVENT.svg`);
    }
  };
  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      {/* <View style={styles.paddedHead}>
        <Input
          size={"$4"}
          borderRadius={50}
          onChangeText={setSearch}
          value={search}
          placeholder="Search Notification"
        />
      </View> */}
      <XStack width={"100%"} justifyContent="flex-end" alignItems="center">
        <Popover
          size="$5"
          allowFlip
          placement="bottom"
          open={filterOpen}
          onOpenChange={(value) => setFilterOpen(value)}
        >
          <Popover.Trigger asChild>
            <Button chromeless width="30%" size="$2" iconAfter={ChevronDown}>
              Filter By Type
            </Button>
          </Popover.Trigger>
          <Adapt when="sm" platform="touch">
            <Popover.Sheet modal dismissOnSnapToBottom>
              <Popover.Sheet.Frame padding="$4" backgroundColor="#e8fffa">
                <Adapt.Contents />
              </Popover.Sheet.Frame>
              <Popover.Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Popover.Sheet>
          </Adapt>

          <Popover.Content
            borderWidth={1}
            borderColor="$borderColor"
            enterStyle={{ y: -10, opacity: 0 }}
            exitStyle={{ y: -10, opacity: 0 }}
            elevate={Platform.OS === "ios"}
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            size={"$2"}
          >
            <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

            <YStack space={2} height={100}>
              <ListItem
                hoverTheme
                pressTheme
                onPress={() => handleTypeFilter("")}
              >
                All
              </ListItem>
              {notificationSetting?.types.map(
                ({ displayName, actionTypes }) => (
                  <>
                    <Label>{displayName}</Label>
                    {actionTypes?.map(({ displayName, name }) => (
                      <ListItem
                        hoverTheme
                        pressTheme
                        onPress={() => handleTypeFilter(name)}
                        backgroundColor={name === types ? "#007e70" : "#fcfcfc"}
                        color={name === types ? "#fcfcfc" : "#000"}
                      >
                        {displayName}
                      </ListItem>
                    ))}
                  </>
                )
              )}
            </YStack>
          </Popover.Content>
        </Popover>
      </XStack>
      {notifications?.content?.length ? (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={notifications?.content}
          keyboardShouldPersistTaps={"handled"}
          onEndReachedThreshold={0.3}
          scrollEnabled={true}
          maxToRenderPerBatch={10}
          onEndReached={() => {
            setPage((prev) => prev + 1);
          }}
          keyExtractor={({ id }) => id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                if (page !== 1) {
                  setPage(1);
                } else {
                  getNotification({
                    individuals: studentDetails?.id,
                    page: 1,
                    actionTypes: types,
                  });
                }
              }}
            />
          }
          renderItem={({ item }) => {
            const {
              message,
              subject,
              actionType,
              startTime,
              id,
              userNotificationStatus,
              actionTypeDisplayName,
              metaData,
            } = item;
            return (
              <YStack key={id}>
                <ContentLoader
                  titleStyles={{ marginTop: 10, marginBottom: 20 }}
                  avatar
                  aSize={64}
                  active
                  title={true}
                  pRows={2}
                  pWidth={"100%"}
                  loading={page === 1 && isContentLoading}
                  containerStyles={{ paddingBottom: 5, paddingTop: 5 }}
                >
                  <ListItem
                    hoverTheme
                    pressTheme
                    title={subject || " "}
                    // iconAfter={MoreHorizontal}
                    scaleIcon={1}
                    backgroundColor={
                      userNotificationStatus === "READ" ? "#ffffff" : "#e3fff8"
                    }
                    icon={
                      <YStack alignItems="center" gap={5}>
                        <Avatar circular size="$6" backgroundColor={"#007e70"}>
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                            }}
                            contentFit="contain"
                            source={getNotificationIcon(actionType)}
                          />
                        </Avatar>
                        <Text width={60} numberOfLines={1}>
                          {actionTypeDisplayName}
                        </Text>
                      </YStack>
                    }
                    onPress={() => {
                      updateNotification({
                        notificationIds: [id],
                        status: "READ",
                        requestFrom: "parentMobile",
                        individualIds: [studentDetails?.id],
                      });
                      navigateToScreen(actionType, metaData);
                    }}
                  >
                    <XStack alignItems="center">
                      <YStack gap={5} width={"90%"}>
                        <Text numberOfLines={3} flex={1}>
                          {message}
                        </Text>

                        {moment(startTime) ? (
                          <Text fontSize={12} color={"grey"}>
                            {moment(startTime).fromNow()}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </YStack>
                      <Button
                        iconAfter={MoreHorizontal}
                        size="$3"
                        chromeless
                        onPress={() =>
                          setNotificationSettings({ open: true, data: item })
                        }
                      ></Button>
                    </XStack>
                  </ListItem>
                </ContentLoader>
                <Separator />
              </YStack>
            );
          }}
        />
      ) : (
        <EmptyState />
      )}
      <Sheet
        forceRemoveScrollEnabled={notificationSettings?.open}
        //   modal={modal}
        open={notificationSettings?.open}
        onOpenChange={() => setNotificationSettings({ open: false })}
        snapPoints={[20, 60]}
        snapPointsMode={"percent"}
        dismissOnOverlayPress={true}
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
        <Sheet.Handle backgroundColor="#e8fffa" />
        <Sheet.Frame padding={5} backgroundColor="#e8fffa" height={"100%"}>
          <YGroup
            alignSelf="center"
            size="$5"
            separator={<Separator />}
            backgroundColor="#e8fffa"
            height={"100%"}
          >
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                icon={BellOff}
                title="Turn off this notification type"
                // iconAfter={ChevronRight}
                onPress={() => {
                  const { type, actionType } = notificationSettings.data;
                  updateNotificationSettings({
                    type,
                    actionType,
                    deliveryMethod: "NONE",
                  });
                }}
              />
            </YGroup.Item>
          </YGroup>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    notifications: AppBaseReducer?.notifications,
    reqStatus: AppBaseReducer?.reqStatus,
    isContentLoading: AppBaseReducer.isContentLoading,
    notificationSetting: AppBaseReducer?.notificationSettings,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
