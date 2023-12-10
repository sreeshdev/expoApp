import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

import { DatePicker } from "react-native-woodpicker";
import moment from "moment";
import { connect } from "react-redux";
import { Image } from "expo-image";
import EmptyState from "components/EmptyState/EmptyState";

const TimeTable = (props) => {
  const { studentDetails, sectionTimeTable, institutesList } = props;
  const [date, setDate] = useState(new Date());
  const [timeTableData, setTimeTableData] = useState([
    { day: "SUNDAY", schedules: [] },
    { day: "MONDAY", schedules: [] },
    { day: "TUESDAY", schedules: [] },
    { day: "WEDNESDAY", schedules: [] },
    { day: "THURSDAY", schedules: [] },
    { day: "FRIDAY", schedules: [] },
    { day: "SATURDAY", schedules: [] },
  ]);
  const TODAY = moment().format("dddd");
  useEffect(() => {
    if (sectionTimeTable?.schedules?.length) {
      let schedulesList = timeTableData.reduce((prev, curr) => {
        let currDaySchedules = sectionTimeTable?.schedules.filter(
          ({ day }) => day === curr.day
        );
        return [...prev, { ...curr, schedules: currDaySchedules }];
      }, []);
      setTimeTableData(
        schedulesList.filter(({ schedules }) => schedules.length !== 0)
      );
    }
  }, [sectionTimeTable]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const handleDateChange = (event) => {
    console.log(event);
    setDate(event);
  };
  const todaysSchedule = timeTableData.find(
    ({ day }) => day === moment(date).format("dddd")?.toUpperCase()
  )?.schedules;
  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#22b693", "#03a07a"]}
        style={styles.mainContainer}
      >
        <View style={styles.container}>
          <View style={styles.dailyTimetable}>
            <View style={styles.headerLeft}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    width: 25,
                    height: 27,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/calender_black.svg")}
                />
                <Text style={styles.headerTitle}>
                  {moment().startOf("D").isSame(moment(date).startOf("D"))
                    ? "Today"
                    : moment(date).format("DD MMM, YYYY")}
                </Text>
              </View>
              {/* <Pressable onPress={showDatepicker}> */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", marginRight: 10 }}>Date</Text>
                <DatePicker
                  value={date}
                  onDateChange={handleDateChange}
                  doneButtonLabel={"Done"}
                  neutralButtonLabel={"Cancel"}
                  isNullable={false}
                  iosDisplay="spinner"
                  iosMode="date"
                  androidMode="calendar"
                  androidDisplay="calendar"
                  InputComponent={({ togglePicker, textInputStyle }) => (
                    <Pressable onPress={() => togglePicker()}>
                      <Image
                        style={{
                          width: 15,
                          height: 18,
                        }}
                        contentFit="contain"
                        source={require("../../../assets/dateSelectorIcon.svg")}
                      />
                    </Pressable>
                  )}
                  textColor="#000"
                />
              </View>
              {/* </Pressable> */}
            </View>

            {todaysSchedule ? (
              <ScrollView horizontal={true}>
                <View style={styles.dailyContainer}>
                  {todaysSchedule.map(
                    ({ id, title, start, end, scheduleType }, idx) => (
                      <View
                        key={id}
                        style={{ ...styles.eachPeriod, marginRight: 10 }}
                      >
                        <View style={styles.periodDetail}>
                          <Text style={styles.subjectName}>{title}</Text>
                          <Text style={styles.periodTime}>
                            {start && moment(start).format("hh:mm A")} -{" "}
                            {end && moment(end).format("hh:mm A")}
                          </Text>
                        </View>
                        {/* <Text style={styles.periodName}>Period {idx + 1}</Text> */}
                      </View>
                    )
                  )}
                </View>
              </ScrollView>
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <EmptyState
                  marginTop={10}
                  height={50}
                  width={50}
                  message="No Schedules for this day!"
                />
              </View>
            )}
          </View>
          <View style={styles.weeklyTimetable}>
            <View style={styles.headerLeft}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    width: 25,
                    height: 27,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/calender_black.svg")}
                />
                <Text style={styles.headerTitle}>Weekly</Text>
              </View>
            </View>

            <ScrollView>
              <ScrollView horizontal={true}>
                <View style={styles.weeklyContainer}>
                  {timeTableData.map(({ day, schedules }) => (
                    <View style={styles.eachDay}>
                      <Text style={styles.dayTitle}>{day}</Text>
                      {schedules.map(
                        ({ id, title, start, end, scheduleType }, idx) => (
                          <View
                            key={id}
                            style={{ ...styles.eachPeriod, marginBottom: 10 }}
                          >
                            <View style={styles.periodDetail}>
                              <Text style={styles.subjectName}>{title}</Text>
                              <Text style={styles.periodTime}>
                                {start && moment(start).format("hh:mm A")} -{" "}
                                {end && moment(end).format("hh:mm A")}
                              </Text>
                            </View>
                            {/* {scheduleType === "COURSE" ? (
                              <Text style={styles.periodName}>
                                Period {idx + 1}
                              </Text>
                            ) : (
                              <Text style={styles.periodName}>
                                {scheduleType}
                              </Text>
                            )} */}
                          </View>
                        )
                      )}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionTimeTable: state.AppBaseReducer?.sectionTimeTable,
    studentDetails: state.AppBaseReducer?.studentDetails,
    institutesList: state.AppBaseReducer?.institutesList,
  };
};

export default connect(mapStateToProps, {})(TimeTable);
