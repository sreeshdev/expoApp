import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import Attendance from "../StudentDetail/Attendance";
import Score from "../StudentDetail/Score";
import TodaysTimetable from "./TodaysTimetable";
import { Image } from "expo-image";
import { Avatar, Button, H5, XStack } from "tamagui";
import { registerForPushNotificationsAsync } from "../../../../PushNotifications";
import * as Notifications from "expo-notifications";
import usePrevious from "utils/usePrevious";
import RecentEvents from "./RecentEvents";
import moment from "moment";
import Toaster from "components/Toaster";
import { FlatList } from "react-native-gesture-handler";

const HomeScreen = (props) => {
  const {
    accessToken,
    whoAmI,
    reqStatus,
    parentDetails,
    studentDetails,
    attendanceStats,
    examStats,
    currentStudent,
    studentList,
    sectionTimeTable,
    isContentLoading,
    organizations,
    setNotificationToken,
    notificationTokenSent,
    events,
    serviceError,
    changeState,
    homePageScoreView,
    homePageAttendanceView,
  } = props;
  const isFocused = useIsFocused();
  const [quickNavigatorCardExpand, setQuickNavigatorCardExpand] =
    useState(false);
  const [height] = useState(new Animated.Value(0.01));
  const [opacity] = useState(new Animated.Value(0.01));
  const [orgLogo, setOrgLogo] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const prevReqStatus = usePrevious(reqStatus);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [[overallScoreView, direction], setOverallScoreView] = useState([
    "STATS",
    0,
  ]);
  const [[reportView, reportDirection], setReportView] = useState(["STATS", 0]);
  const [
    [overallAttendanceView, attendanceDirection],
    setOverallAttendanceView,
  ] = useState(["STATS", 0]);

  useEffect(() => {
    if (lastNotificationResponse) {
      Alert.alert("APP_LISTENER", JSON.stringify(lastNotificationResponse), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        Alert.alert("NOTIFICATION", JSON.stringify(notification), [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        changeState({ stateName: "notificationCount", stateValue: 1 });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        Alert.alert("LISTENER", JSON.stringify(response), [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        changeState({ stateName: "notificationCount", stateValue: null });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.WHO_AM_I_SUCCESS: {
        if (!parentDetails.preferences) {
          props.navigation.navigate("StudentSelector");
        } else {
          getStudentDetails();
        }
        if (!notificationTokenSent) {
          getNotificationToken();
        }
        break;
      }
      default:
        if (serviceError && serviceError?.response?.status !== 401) {
          Toaster(serviceError, "SYSTEM_ERROR");
        }
        break;
      // case ActionTypes.GET_TOKEN_SUCCESS: {
      //   whoAmI();
      //   break;
      // }
    }
  }, [reqStatus]);

  const getNotificationToken = async () => {
    await registerForPushNotificationsAsync(setNotificationToken);
  };

  const getStudentDetails = () => {
    if (studentList?.length) {
      const selectedStudent = studentList.find(
        ({ id }) => id === currentStudent
      );
      const { id: studentId, instituteId } = selectedStudent || {};
      const { schoolYearId } =
        selectedStudent?.schoolYearDetails?.schoolYearHistories.find(
          ({ current }) => current
        );
      const orgDetail = organizations.find(
        ({ id }) => id === selectedStudent.organizationId
      );
      setOrgLogo(orgDetail?.logoAssetDetails?.accessUrl);
      props.getStudentDetails(selectedStudent);
      props.getSectionTimetable({
        sectionId: selectedStudent?.currentSectionId,
        studentIndividualId: studentId,
      });
      props.getStudentAttendanceStats({
        studentIds: studentId,
        instituteId,
        schoolYearId,
      });
      props.getStudentExamStats({
        studentIds: studentId,
        schoolYearId: schoolYearId,
      });
      props.getAllEvents({
        student_individual_ids: studentId,
        institute_id: instituteId,
        expired: false,
        start: moment().startOf("D").unix(),
        end: moment().add(2, "D").endOf("D").unix(),
      });
    }
  };

  useEffect(() => {
    Animated.timing(height, {
      toValue: !quickNavigatorCardExpand ? 0.01 : 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [quickNavigatorCardExpand]);
  const maxHeight = height.interpolate({
    inputRange: [0.01, 1],
    outputRange: [145, 250], // <-- value that larger than your content's height
  });
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={["#22B693", "transparent"]}
        style={styles.background}
      />
      <XStack
        paddingTop={10}
        paddingBottom={10}
        paddingHorizontal={17}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: 700 }}>
          Welcome {studentDetails?.firstName}'s Parent!
        </Text>
        <Avatar circular size="$2" backgroundColor={"#ffffff"}>
          {orgLogo ? (
            <Image
              style={{ width: 28, height: 28 }}
              contentFit="contain"
              source={orgLogo}
            />
          ) : (
            <H5 color={"#22B693"}>I</H5>
          )}
        </Avatar>
      </XStack>
      <FlatList
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        data={[1]}
        style={{
          height: "100%",
          flex: 1,
          paddingBottom: 17,
          paddingRight: 17,
          paddingLeft: 17,
          marginBottom: 10,
        }}
        renderItem={() => (
          <>
            <Animated.View
              style={{
                ...styles.Card,
                height: maxHeight,
                opacity: opacity,
                marginTop: 0,
                marginBottom: 0,
                justifyContent: "space-between",
              }}
            >
              <View style={{ height: 100 }}>
                <View style={styles.cardRow}>
                  <View style={styles.CardTitle}>
                    <Image
                      style={{ width: 28, height: 28 }}
                      contentFit="contain"
                      source={require("../../../assets/activityIcon.svg")}
                    />

                    <Text style={styles.CardHead}>Academic Activities</Text>
                  </View>
                </View>
                <View style={styles.quickButtons}>
                  <Pressable
                    onPress={() => props.navigation.navigate("TimeTable")}
                  >
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/dashboardCalendar.svg")}
                      />
                      <Text style={styles.quickButtonText}>Time Table</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => props.navigation.navigate("ApplyLeave")}
                  >
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/DashboardLeave.svg")}
                      />
                      <Text style={styles.quickButtonText}>Apply Leave</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate("StudentDetail", {
                        mode: "ATTENDANCE",
                      })
                    }
                  >
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/DashboardAttendance.svg")}
                      />

                      <Text style={styles.quickButtonText}>Attendance</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => props.navigation.navigate("Events")}
                  >
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/DashboardEvents.svg")}
                      />
                      <Text style={styles.quickButtonText}>Events</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              {quickNavigatorCardExpand && (
                <View style={{ height: 80 }}>
                  <View style={styles.quickButtons}>
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/DashboardFees.svg")}
                      />
                      <Text style={styles.quickButtonText}>Fees</Text>
                    </View>
                    <Pressable
                      onPress={() => props.navigation.navigate("AskUs")}
                    >
                      <View style={styles.eachQuickButton}>
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                          }}
                          contentFit="contain"
                          source={require("../../../assets/DashboardAskUs.svg")}
                        />
                        <Text style={styles.quickButtonText}>Ask Us</Text>
                      </View>
                    </Pressable>
                    <View style={styles.eachQuickButton}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/DashboardGallery.svg")}
                      />
                      <Text style={styles.quickButtonText}>Gallery</Text>
                    </View>
                  </View>
                </View>
              )}
              <Button
                chromeless
                // width="10%"
                size="$2"
                icon={
                  <Image
                    style={{
                      width: 14,
                      height: 9,
                    }}
                    contentFit="contain"
                    source={
                      quickNavigatorCardExpand
                        ? require(`../../../assets/chevron-up.svg`)
                        : require(`../../../assets/chevronDown.svg`)
                    }
                  />
                }
                onPress={() => setQuickNavigatorCardExpand((prev) => !prev)}
              />
            </Animated.View>
            <TodaysTimetable
              data={sectionTimeTable}
              isLoading={isContentLoading}
            />
            {!!events?.length && (
              <RecentEvents
                data={events}
                isLoading={isContentLoading}
                navigation={props.navigation}
              />
            )}
            <Score
              data={examStats}
              studentData={studentDetails}
              showAll={false}
              changeState={() =>
                changeState({
                  stateName: "homePageScoreView",
                  stateValue: homePageScoreView === "STATS" ? "CHART" : "STATS",
                })
              }
              overallScoreView={homePageScoreView}
              direction={direction}
              reportView={reportView}
              reportDirection={reportDirection}
              setReportView={setReportView}
            />
            <View style={{ marginBottom: 30 }}>
              <Attendance
                data={attendanceStats}
                studentData={studentDetails}
                showAll={false}
                overallAttendanceView={homePageAttendanceView}
                changeState={() =>
                  changeState({
                    stateName: "homePageAttendanceView",
                    stateValue:
                      homePageAttendanceView === "STATS" ? "CHART" : "STATS",
                  })
                }
              />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    reqStatus: state.AppBaseReducer.reqStatus,
    isContentLoading: state.AppBaseReducer.isContentLoading,
    parentDetails: state.AppBaseReducer?.parentDetails,
    currentStudent:
      state.AppBaseReducer?.parentDetails?.preferences
        ?.currentSelectedIndividualId,
    studentList: state.AppBaseReducer?.studentList,
    studentDetails: state.AppBaseReducer?.studentDetails,
    attendanceStats: state.AppBaseReducer?.attendanceStats,
    examStats: state.AppBaseReducer?.examStats,
    sectionTimeTable: state.AppBaseReducer?.sectionTimeTable,
    organizations: state.AppBaseReducer?.organizations,
    notificationTokenSent: state.AppBaseReducer?.notificationTokenSent,
    events: state.AppBaseReducer?.events?.content,
    serviceError: state.AppBaseReducer?.serviceError,
    homePageScoreView: state.AppBaseReducer?.homePageScoreView,
    homePageAttendanceView: state.AppBaseReducer?.homePageAttendanceView,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
