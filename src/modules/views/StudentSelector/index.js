import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { connect } from "react-redux";
import { Image } from "expo-image";
import Toaster from "components/Toaster";

const StudentSelector = (props) => {
  const {
    parentDetails,
    studentList = [],
    reqStatus,
    setStudentPreference,
    organizations,
  } = props;
  const [selectedStudent, setSelectedStudent] = useState(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (parentDetails.preferences) {
      setSelectedStudent(
        parentDetails.preferences?.currentSelectedIndividualId
      );
    } else if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, [parentDetails]);
  useEffect(() => {
    if (selectedStudent) {
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        setStudentPreference({
          parentIndividualId: parentDetails.id,
          childrenIndividualId: selectedStudent,
        });

        getStudentAllDetails(selectedStudent);
      }
    }
  }, [selectedStudent]);
  useEffect(() => {
    switch (reqStatus) {
      case ActionTypes.SET_STUDENT_PREFERENCE_SUCCESS: {
        Toaster("Preference Changed Successfully", "SUCCESS");
        props.navigation.navigate("HomeStack");
        break;
      }
    }
  }, [reqStatus]);
  const getStudentAllDetails = (currentStudent) => {
    if (studentList?.length) {
      const selectedStudent = studentList.find(
        ({ id }) => id === currentStudent
      );
      const { id: studentId, instituteId } = selectedStudent || {};
      const { schoolYearId } =
        selectedStudent?.schoolYearDetails?.schoolYearHistories.find(
          ({ current }) => current
        );

      props.getStudentDetails(selectedStudent);
      props.getSectionTimetable({
        sectionId: selectedStudent?.currentSectionId,
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
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={{ fontSize: 23, fontWeight: "bold", color: "#2a7b63" }}>
          Select a student
        </Text>
        <ScrollView
          alwaysBounceVertical={false}
          style={{
            height: "80%",
            flex: 1,
            width: "100%",
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          {studentList?.map((val, idx) => (
            <View key={idx} style={styles.studentCard}>
              <View
                style={{
                  width: "30%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{ height: 80, width: 75 }}
                  contentFit="contain"
                  source={
                    val.dpThumbnailUrl
                      ? { uri: val.dpThumbnailUrl }
                      : require("../../../assets/profile.svg")
                  }
                  alt={"IMAGE"}
                />
                <Switch
                  trackColor={{ false: "#767577", true: "#2a7b63" }}
                  thumbColor={
                    selectedStudent === val.id ? "#31b796" : "#f4f3f4"
                  }
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setSelectedStudent(val.id)}
                  value={selectedStudent === val.id}
                />
              </View>
              <View style={{ width: "70%" }}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Name</Text>
                  <Text style={styles.tableValue}>{val?.fullName}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Class</Text>
                  <Text style={styles.tableValue}>
                    Grade {val?.currentGradeName} - Section{" "}
                    {val?.currentGradeName}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Reg No</Text>
                  <Text style={styles.tableValue}>{val?.registerNumber}</Text>
                </View>
                {/* <View style={styles.tableRow}>
                  <Text style={styles.tableTitle}>Year</Text>
                  <Text style={styles.tableValue}>(2021-2022)</Text>
                </View> */}
              </View>
            </View>
          ))}
        </ScrollView>
        {/* <Pressable
          pressRetentionOffset={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          }}
          onPress={() => {
            props.navigation.popToTop();
            props.navigation.navigate("HomeStack");
          }}
          style={{ ...styles.button, marginLeft: 10 }}
        >
          <LinearGradient
            colors={["#02664F", "#005441"]}
            start={{ y: 1.0, x: 0.0 }}
            end={{ y: 0.0, x: 1.0 }}
            style={{ ...styles.button, marginLeft: 10 }}
          >
            <Text style={styles.buttonText}> Go To Dashboard </Text>
          </LinearGradient>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    reqStatus: state.AppBaseReducer.reqStatus,
    parentDetails: state.AppBaseReducer?.parentDetails,
    studentList: state.AppBaseReducer?.studentList,
    organizations: state.AppBaseReducer?.organizations,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSelector);
