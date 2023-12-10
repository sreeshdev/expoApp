import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { connect } from "react-redux";
import Attendance from "./Attendance";
import Score from "./Score";
import { styles } from "./styles";
import * as Actions from "modules/actions";
import { Image } from "expo-image";
import { Button, XStack } from "tamagui";
import { LayoutGrid, PieChart as PieChartIcon } from "@tamagui/lucide-icons";

const StudentDetail = (props) => {
  const {
    studentDetails,
    attendanceStats,
    examStats,
    currentStudent,
    studentList,
    getStudentIndividualAttendance,
    individualAttendance,
    sectionTimeTable,
    attendanceStatusTypes,
    route,
    studentPageCardView,
    changeStudentPageCardView,
    changeState,
    studentPageViewMode,
    studentPageEvaluationMode,
    studentAttendanceDateMode,
  } = props;

  const [[overallScoreView, direction], setOverallScoreView] = useState([
    "STATS",
    0,
  ]);
  const [[reportView, reportDirection], setReportView] = useState(["STATS", 0]);
  useEffect(() => {
    const selectedStudent = studentList.find(({ id }) => id === currentStudent);
    const { id: studentId, instituteId } = selectedStudent || {};
    const { schoolYearId } =
      selectedStudent?.schoolYearDetails?.schoolYearHistories.find(
        ({ current }) => current
      );
    props.getStudentDetails(selectedStudent);
    props.getStudentAttendanceStats({
      studentIds: studentId,
      instituteId,
      schoolYearId,
    });
    props.getStudentExamStats({
      studentIds: studentId,
      schoolYearId: schoolYearId,
    });

    props.getAttendanceStatus({ instituteId, schoolYearId });
  }, [currentStudent]);
  useEffect(() => {
    if (route.params?.mode) {
      changeState({
        stateName: "studentPageViewMode",
        stateValue: route.params?.mode,
      });
    }
  }, [route.params?.mode]);
  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#22b693", "#03a07a"]}
        style={styles.mainContainer}
      >
        <ScrollView vertical={true}>
          <View style={styles.container}>
            <View style={styles.DetailContainer}>
              <View style={{ width: "30%" }}>
                <Image
                  style={{ height: 80, width: 75 }}
                  contentFit="contain"
                  source={
                    studentDetails?.dpUrl
                      ? studentDetails.dpUrl
                      : require("../../../assets/profile.svg")
                  }
                  alt={"ProfilePic"}
                />
              </View>
              <View style={{ width: "70%" }}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Name</Text>
                  <Text style={styles.tableValue}>
                    {studentDetails?.fullName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Class</Text>
                  <Text style={styles.tableValue}>
                    Grade {studentDetails?.currentGradeName} - Section{" "}
                    {studentDetails?.currentSectionName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Reg No</Text>
                  <Text style={styles.tableValue}>
                    {studentDetails?.registerNumber}
                  </Text>
                </View>
                {/* <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Exam</Text>
                  <Text style={styles.tableValue}>TERM - II (2021-2022)</Text>
                </View> */}
              </View>
            </View>
            <XStack justifyContent="space-between" alignItems="center">
              <View style={styles.SelectorBar}>
                <Text style={{ ...styles.WhiteText, marginRight: 10 }}>
                  Score
                </Text>
                <Switch
                  trackColor={{ false: "#fff", true: "#fff" }}
                  thumbColor={
                    studentPageViewMode === "SCORE" ? "#003428" : "#003428"
                  }
                  ios_backgroundColor="#fff"
                  onValueChange={() =>
                    changeState({
                      stateName: "studentPageViewMode",
                      stateValue:
                        studentPageViewMode === "SCORE"
                          ? "ATTENDANCE"
                          : "SCORE",
                    })
                  }
                  value={studentPageViewMode === "ATTENDANCE"}
                />
                <Text style={{ ...styles.WhiteText, marginLeft: 10 }}>
                  Attendance
                </Text>
              </View>

              <XStack marginLeft={5} marginTop={10}>
                <Button
                  size="$3"
                  chromeless
                  onPress={() => {
                    changeStudentPageCardView(
                      studentPageCardView === "STATS" ? "CHART" : "STATS"
                    );
                  }}
                >
                  {studentPageCardView === "CHART" ? (
                    <LayoutGrid color="#fff" />
                  ) : (
                    <PieChartIcon color="#fff" />
                  )}
                </Button>
              </XStack>
            </XStack>
            {studentPageViewMode === "SCORE" ? (
              <Score
                data={examStats}
                studentData={studentDetails}
                setOverallScoreView={setOverallScoreView}
                overallScoreView={studentPageCardView}
                direction={direction}
                reportView={studentPageCardView}
                setReportView={setReportView}
                changeState={changeState}
                studentPageEvaluationMode={studentPageEvaluationMode}
              />
            ) : (
              <Attendance
                data={attendanceStats}
                studentData={studentDetails}
                getAttendance={getStudentIndividualAttendance}
                dailyAttendanceData={individualAttendance}
                sectionTimeTable={sectionTimeTable}
                attendanceStatusTypes={attendanceStatusTypes}
                overallAttendanceView={studentPageCardView}
                studentAttendanceDateMode={studentAttendanceDateMode}
                attendanceReportView={studentPageCardView}
                changeState={changeState}
                // setAttendanceReportView={setAttendanceReportView}
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    studentDetails: state.AppBaseReducer?.studentDetails,
    attendanceStats: state.AppBaseReducer?.attendanceStats,
    examStats: state.AppBaseReducer?.examStats,
    currentStudent:
      state.AppBaseReducer?.parentDetails?.preferences
        ?.currentSelectedIndividualId,
    studentList: state.AppBaseReducer?.studentList,
    individualAttendance: state.AppBaseReducer?.individualAttendance,
    sectionTimeTable: state.AppBaseReducer?.sectionTimeTable,
    attendanceStatusTypes: state.AppBaseReducer?.attendanceStatusDetails?.types,
    studentPageCardView: state.AppBaseReducer?.studentPageCardView,
    studentPageViewMode: state.AppBaseReducer?.studentPageViewMode,
    studentPageEvaluationMode: state.AppBaseReducer?.studentPageEvaluationMode,
    studentAttendanceDateMode: state.AppBaseReducer?.studentAttendanceDateMode,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
