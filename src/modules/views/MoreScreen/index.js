import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { styles } from "./styles";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { persistor } from "store";
import { Button } from "tamagui";
import Settings from "./Settings";

const MoreScreen = (props) => {
  const { reqStatus, studentDetails } = props;
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    switch (reqStatus) {
      case ActionTypes.LOGOUT_SUCCESS: {
        if (!props.isLoggedIn) {
          props.navigation.navigate("LoginScreen");
          persistor.pause();
          persistor.flush().then(() => {
            return persistor.purge();
          });
        }
        break;
      }
    }
  }, [reqStatus]);
  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#22b693", "#03a07a"]}
        style={styles.mainContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Hey, {studentDetails?.firstName}'s Parent!
          </Text>
          <Button
            size="$2"
            chromeless
            themeInverse
            padding={0}
            onPress={() => setSettingsOpen(true)}
          >
            <Image
              style={{ width: 33, height: 33 }}
              contentFit="contain"
              source={require("../../../assets/settings-white.svg")}
            />
          </Button>
        </View>
        <ScrollView vertical={true}>
          <View style={styles.gridContainer}>
            <Pressable
              onPress={() => props.navigation.navigate("StudentDetail")}
            >
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Student</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/student.svg")}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Staffs")}>
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Staff</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/staff.svg")}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => props.navigation.navigate("StudentSelector")}
            >
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Student Selector</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/attendanceMore.svg")}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("exams")}>
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Exam</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/exam.svg")}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("AskUs")}>
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Ask Us</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/attendanceMore.svg")}
                  />
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate("Events")}>
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Events</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/DashboardEvents.svg")}
                  />
                </View>
              </View>
            </Pressable>
            {/* <Pressable onPress={() => props.logout()}>
              <View style={[styles.eachItem, styles.eachItemShadow]}>
                <Text style={styles.itemHead}>Logout</Text>
                <View style={styles.iconContainer}>
                  <Image
                    style={{ width: 33, height: 33 }}
                    contentFit="contain"
                    source={require("../../../assets/logout.svg")}
                  />
                </View>
              </View>
            </Pressable> */}
          </View>
        </ScrollView>
      </LinearGradient>
      <View style={styles.footer}>
        <Pressable onPress={() => props.navigation.navigate("TimeTable")}>
          <View style={styles.footerItem}>
            <Text style={styles.footText}>Time Table</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate("ApplyLeave")}>
          <View style={styles.footerItem}>
            <Text style={styles.footText}>Apply Leave</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate("ContactUs")}>
          <View style={styles.footerItem}>
            <Text style={styles.footText}>Contact Us</Text>
          </View>
        </Pressable>
      </View>
      <Settings open={settingsOpen} setOpen={setSettingsOpen} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.AppBaseReducer.isLoggedIn,
    reqStatus: state.AppBaseReducer.reqStatus,
    studentDetails: state.AppBaseReducer?.studentDetails,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreScreen);
