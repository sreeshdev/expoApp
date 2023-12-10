import {
  AnimatePresence,
  Button,
  Card,
  RadioGroup,
  Stack,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { styles } from "../styles";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Image } from "expo-image";
import { RadioGroupItemWithLabel } from "../../../../components/RadioGroup";
import { DatePicker } from "react-native-woodpicker";
import { CalendarDays } from "@tamagui/lucide-icons";
import { LayoutGrid, PieChart as PieChartIcon } from "@tamagui/lucide-icons";
import { BarChart } from "react-native-gifted-charts";
import Toaster from "components/Toaster";
import EmptyState from "components/EmptyState/EmptyState";
import OverallAttendanceChart from "./OverallAttendanceChart";

const screenWidth = Dimensions.get("window").width;

const Attendance = ({
  data,
  studentData,
  showAll = true,
  getAttendance,
  dailyAttendanceData,
  sectionTimeTable,
  attendanceStatusTypes,
  overallAttendanceView,
  setOverallAttendanceView,
  attendanceReportView,
  setAttendanceReportView,
  studentAttendanceDateMode,
  changeState,
}) => {
  const [date, setDate] = useState(new Date());
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [overallAttendance, setOverallAttendance] = useState(null);
  const [timeTableTimings, setTimeTableTimings] = useState([]);
  const [attendanceDatum, setAttendanceDatum] = useState([]);
  const [attendanceReportChartData, setAttendanceReportChartData] = useState(
    {}
  );
  const prevDate = () => {
    setDate(new Date(moment(date).subtract(1, "day").format()));
  };
  const nextDate = () => {
    setDate(new Date(moment(date).add(1, "day").format()));
  };
  const prevMonth = () => {
    setDate(new Date(moment(date).subtract(1, "month").format()));
  };
  const nextMonth = () => {
    setDate(new Date(moment(date).add(1, "month").format()));
  };

  useEffect(() => {
    if (
      data &&
      Object.keys(data).length !== 0 &&
      data?.gradeSummaries[0]?.sectionSummaries[0]?.studentSummaries.length
    ) {
      setStudentAttendance([
        ...data?.gradeSummaries[0]?.sectionSummaries[0]?.studentSummaries[0]
          ?.courseSummaries,
      ]);

      setOverallAttendance(
        data?.gradeSummaries[0]?.sectionSummaries[0]?.studentSummaries[0]
          ?.acquiredPercentage
      );
    } else {
      setStudentAttendance([]);
      setOverallAttendance(null);
    }
  }, [data]);
  useEffect(() => {
    if (showAll && sectionTimeTable?.schedules?.length) {
      let timings = sectionTimeTable?.schedules
        ?.map((schedules) => {
          let startTime = moment(schedules.start).format("hh:mm A");
          let endTime = moment(schedules.end).format("hh:mm A");
          return { ...schedules, title: startTime + " - " + endTime };
        })
        ?.reduce((prev, curr) => {
          let duplicateIndex = prev?.findIndex(
            ({ title }) => title === curr.title
          );

          if (duplicateIndex !== -1) {
            let prevData = [...prev];
            prevData[duplicateIndex].ids.push(curr.scheduleId);
            return prev;
          } else {
            return [...prev, { ...curr, ids: [curr.scheduleId] }];
          }
        }, [])
        ?.sort(
          (a, b) =>
            moment(a.startTime, "HH:mm:ss") - moment(b.startTime, "HH:mm:ss")
        );
      setTimeTableTimings(timings);
    }
  }, [sectionTimeTable]);
  useEffect(() => {
    if (showAll) {
      setAttendanceDatum(dailyAttendanceData);

      // let chartData = dailyAttendanceData
      //   ?.map(({ date, gradeSummaries }) => {
      //     return gradeSummaries?.[0]?.sectionSummaries?.[0]?.studentSummaries?.[0]?.courseSummaries?.map(
      //       ({ courseName, acquiredPercentage }) => ({
      //         value: acquiredPercentage,
      //         dataPointText: `${courseName}-${acquiredPercentage}`,
      //         label: date,
      //         courseName,
      //       })
      //     );
      //   })
      //   ?.flatMap((data) => data);
      // let group = chartData.reduce((acc, curr) => {
      //   acc[curr.courseName] = acc[curr.courseName] || [];
      //   acc[curr.courseName].push(curr);
      //   return acc;
      // }, {});
      // let processedChartData = {};
      // Object.entries(group).forEach(([key, value], idx) => {
      //   processedChartData = {
      //     ...processedChartData,
      //     [`data${idx === 0 ? "" : idx + 2}`]: value,
      //   };
      // });
      // setAttendanceReportChartData(processedChartData);
    }
  }, [dailyAttendanceData]);
  useEffect(() => {
    if (showAll) {
      let params = null;
      if (studentAttendanceDateMode === "DAILY") {
        params = {
          startDate: moment(date).format("MM-DD-YYYY"),
          endDate: moment(date).format("MM-DD-YYYY"),
        };
      } else if (studentAttendanceDateMode === "WEEKLY") {
        params = {
          startDate: moment().clone().startOf("week").format("MM-DD-YYYY"),
          endDate: moment().clone().endOf("week").format("MM-DD-YYYY"),
        };
      } else if (studentAttendanceDateMode === "MONTHLY") {
        params = {
          startDate: moment(date).clone().startOf("month").format("MM-DD-YYYY"),
          endDate: moment(date).clone().endOf("month").format("MM-DD-YYYY"),
        };
      }
      if (params)
        getAttendance({
          studentId: studentData?.id,
          ...params,
        });
    }
  }, [date, studentAttendanceDateMode]);
  const changeView = () => {
    changeState();
  };
  const changeReportView = () => {
    setAttendanceReportView(([prevType]) => [
      prevType === "STATS" ? "CHART" : "STATS",
      prevType === "STATS" ? 0 : 1,
    ]);
  };
  return (
    <View>
      <XStack
        position="relative"
        height={overallAttendanceView === "STATS" ? 135 : 320}
        width="100%"
        alignItems="center"
        marginBottom={10}
      >
        <AnimatePresence initial>
          <YStackEnterable
            key={overallAttendanceView}
            fullscreen
            x={0}
            opacity={1}
          >
            <Stack
              key="my-square1"
              size={50}
              animation={"bouncy"}
              enterStyle={{
                opacity: 0,
                y: 10,
                scale: 0.9,
              }}
              exitStyle={{
                opacity: 0,
                y: -10,
                scale: 0.9,
              }}
            >
              <Card
                elevate={Platform.OS === "ios"}
                size="$2"
                style={{
                  width: "100%",
                  padding: 20,
                }}
                backgroundColor={"#FFFFFF"}
                borderRadius={10}
                marginTop={15}
              >
                <View style={styles.cardRow}>
                  <View style={styles.CardTitle}>
                    <Image
                      style={{
                        width: 26,
                        height: 21,
                      }}
                      contentFit="contain"
                      source={require("../../../../assets/AttendanceBlack.svg")}
                    />
                    <Text style={styles.CardHead}>Overall Attendance</Text>
                    {!showAll && (
                      <XStack marginLeft={5}>
                        <Button
                          size="$3"
                          chromeless
                          onPress={() => {
                            changeView();
                          }}
                        >
                          {overallAttendanceView === "CHART" ? (
                            <LayoutGrid />
                          ) : (
                            <PieChartIcon />
                          )}
                        </Button>
                      </XStack>
                    )}
                  </View>
                  <View style={styles.row}>
                    {/* <Text style={{ marginRight: 20, fontWeight: "600" }}>
              45/50 <Text style={{ fontWeight: "400" }}>Days</Text>
            </Text> */}
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        color: "#12aa86",
                      }}
                    >
                      {overallAttendance || 0}%
                    </Text>
                  </View>
                </View>
                {overallAttendanceView === "STATS" ? (
                  <ScrollView horizontal={true} nestedScrollEnabled={true}>
                    <View style={styles.cardDetail}>
                      {studentAttendance?.map(
                        ({ acquiredPercentage, courseName }, idx) => (
                          <View key={idx} style={styles.eachItem}>
                            <View
                              style={{
                                ...styles.itemValueContainer,
                                backgroundColor:
                                  acquiredPercentage < 50
                                    ? "#ffa7a8"
                                    : "#9ce2c9",
                              }}
                            >
                              <Text style={styles.itemValue}>
                                {acquiredPercentage}%
                              </Text>
                            </View>
                            <Text style={styles.itemHead}>{courseName}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </ScrollView>
                ) : (
                  <OverallAttendanceChart
                    studentAttendance={studentAttendance}
                  />
                )}
              </Card>
            </Stack>
          </YStackEnterable>
        </AnimatePresence>
      </XStack>
      {showAll && (
        <>
          <View
            style={{
              ...styles.cardRow,
              justifyContent: "flex-start",
              marginTop: 15,
            }}
          >
            <Text style={styles.title}>Attendance Report</Text>

            {!showAll && (
              <XStack marginLeft={5}>
                <Button
                  size="$3"
                  chromeless
                  onPress={() => {
                    changeReportView();
                  }}
                >
                  {attendanceReportView === "CHART" ? (
                    <LayoutGrid color="#fff" />
                  ) : (
                    <PieChartIcon color="#fff" />
                  )}
                </Button>
              </XStack>
            )}
          </View>
          {studentAttendanceDateMode === "DAILY" && (
            <XStack
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={5}
            >
              <Pressable onPress={prevDate}>
                <Image
                  source={require("../../../../assets/chevronLeftWhiteBg.png")}
                  marginRight={5}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
              </Pressable>
              <Text color={"#fff"} fontSize={14} fontWeight={"bold"}>
                {moment(date).format("DD MMMM, YYYY")}
              </Text>
              <Pressable onPress={nextDate}>
                <Image
                  source={require("../../../../assets/chevronRightWhiteBg.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                  marginLeft={5}
                />
              </Pressable>
            </XStack>
          )}
          {studentAttendanceDateMode === "MONTHLY" && (
            <XStack
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={5}
              gap={10}
            >
              <Pressable onPress={prevMonth}>
                <Image
                  source={require("../../../../assets/chevronLeftWhiteBg.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
              </Pressable>
              <Text color={"#fff"} fontSize={14} fontWeight={"bold"}>
                {moment(date).format("MMMM")}
              </Text>
              <Pressable onPress={nextMonth}>
                <Image
                  source={require("../../../../assets/chevronRightWhiteBg.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
              </Pressable>
            </XStack>
          )}
          <XStack
            marginTop={5}
            paddingHorizontal={10}
            justifyContent={"space-between"}
          >
            <RadioGroup
              name="studentAttendanceDateMode"
              defaultValue="DAILY"
              accessibilityLabel="pick a date mode"
              value={studentAttendanceDateMode}
              onValueChange={(nextValue) => {
                changeState({
                  stateName: "studentAttendanceDateMode",
                  stateValue: nextValue,
                });
              }}
            >
              <XStack gap={10}>
                <RadioGroupItemWithLabel
                  size="$3"
                  value="DAILY"
                  label="Daily"
                />
                {/* <RadioGroupItemWithLabel
                  size="$3"
                  value="WEEKLY"
                  label="Weekly"
                /> */}
                <RadioGroupItemWithLabel
                  size="$3"
                  value="MONTHLY"
                  label="Monthly"
                />
              </XStack>
            </RadioGroup>
            {studentAttendanceDateMode === "DAILY" && (
              <XStack alignItems={"center"} space={4}>
                <Text color={"#fff"} fontWeight={"500"}>
                  Date
                </Text>
                <DatePicker
                  value={date}
                  onDateChange={setDate}
                  doneButtonLabel={"Done"}
                  isNullable={false}
                  iosDisplay="spinner"
                  iosMode="date"
                  androidMode="calendar"
                  androidDisplay="calendar"
                  InputComponent={({ togglePicker, textInputStyle }) => (
                    <Pressable onPress={() => togglePicker()}>
                      <CalendarDays size={"$1"} color="#fff" />
                    </Pressable>
                  )}
                  textColor="#000"
                />
              </XStack>
            )}
          </XStack>
          {attendanceReportView === "STATS" ? (
            <View style={styles.AttendanceContainer}>
              <ScrollView>
                <ScrollView horizontal={true} nestedScrollEnabled={true}>
                  <View style={{ width: "100%" }}>
                    <XStack>
                      <View
                        style={{
                          ...styles.cell,
                          borderTopWidth: 0,
                          width: 100,
                        }}
                      >
                        <Text style={styles.tableHead}>GMT+05:30</Text>
                      </View>
                      {attendanceDatum?.dailySummaries?.map(({ date }) => (
                        <View style={{ ...styles.cell, borderTopWidth: 0 }}>
                          <Text style={styles.tableHead}>
                            {moment(date).format("ddd")}{" "}
                            {moment(date).format("DD")}
                          </Text>
                        </View>
                      ))}
                    </XStack>

                    {timeTableTimings.map(({ title, ids, scheduleType }) => (
                      <XStack>
                        <View
                          style={{
                            ...styles.cell,
                            borderTopWidth: 0,
                            width: 100,
                          }}
                        >
                          <Text style={styles.tableHead}>{title}</Text>
                        </View>
                        {attendanceDatum?.dailySummaries?.map(
                          ({ gradeSummaries }) => {
                            let schedule =
                              gradeSummaries?.[0]?.sectionSummaries?.[0]?.studentSummaries?.[0].schedules?.find(
                                ({ scheduleId }) => ids.includes(scheduleId)
                              );
                            let statusColor = attendanceStatusTypes.find(
                              ({ id }) => id === schedule?.statusId
                            )?.color;
                            return schedule ? (
                              <View
                                style={{ ...styles.cell, borderTopWidth: 0 }}
                              >
                                <View
                                  style={{
                                    ...styles.presentContainer,
                                    backgroundColor: statusColor
                                      ? statusColor
                                      : "#9ce2c9",
                                  }}
                                >
                                  <Text style={styles.tableHead}>
                                    {schedule?.statusName}
                                  </Text>
                                  <Text style={styles.tableHead}>
                                    {schedule?.courseName}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View
                                style={{ ...styles.cell, borderTopWidth: 0 }}
                              ></View>
                            );
                          }
                        )}
                      </XStack>
                    ))}
                  </View>
                </ScrollView>
              </ScrollView>
            </View>
          ) : (
            <View style={styles.AttendanceContainer}>
              {studentAttendanceDateMode === "DAILY" ? (
                attendanceDatum?.dailySummaries?.length ? (
                  <BarChart
                    data={
                      attendanceDatum?.dailySummaries?.[0]?.gradeSummaries?.[0]?.sectionSummaries?.[0]?.courseSummaries?.map(
                        ({ acquiredPercentage, courseName }) => ({
                          value: acquiredPercentage,
                          label: courseName,
                          frontColor: "#4ADDBA",
                          topLabelComponent: () => (
                            <Text
                              style={{
                                color: "#055c47",
                                fontSize: 12,
                                marginBottom: 1,
                              }}
                            >
                              {acquiredPercentage}
                            </Text>
                          ),
                        })
                      ) || []
                    }
                    barWidth={35}
                    maxValue={100}
                    barBorderRadius={4}
                    yAxisLabelSuffix="%"
                    onPress={(item, index) =>
                      Toaster(`${item.label} - ${item.value}`, "SUCCESS")
                    }
                    width={screenWidth - 120}
                    isAnimated
                    noOfSections={4}
                  />
                ) : (
                  <>
                    <EmptyState marginTop={20} />
                  </>
                )
              ) : (
                <YStack justifyContent="center" alignItems="center">
                  {attendanceDatum?.gradeSummaries?.length ? (
                    <>
                      <BarChart
                        data={
                          attendanceDatum?.gradeSummaries?.[0]?.sectionSummaries?.[0]?.courseSummaries?.map(
                            ({ acquiredPercentage, courseName }) => ({
                              value: acquiredPercentage,
                              label: courseName,
                              frontColor: "#4ADDBA",
                              topLabelComponent: () => (
                                <Text
                                  style={{
                                    color: "#055c47",
                                    fontSize: 12,
                                    marginBottom: 1,
                                  }}
                                >
                                  {acquiredPercentage}
                                </Text>
                              ),
                            })
                          ) || []
                        }
                        barWidth={35}
                        maxValue={100}
                        barBorderRadius={4}
                        yAxisLabelSuffix="%"
                        onPress={(item, index) =>
                          Toaster(`${item.label} - ${item.value}`, "SUCCESS")
                        }
                        width={screenWidth - 120}
                        isAnimated
                        noOfSections={4}
                      />
                    </>
                  ) : (
                    <>
                      <EmptyState marginTop={20} />
                    </>
                  )}
                </YStack>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Attendance;

const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },
    isRight: { true: { x: 300, opacity: 0 } },
  },
});
