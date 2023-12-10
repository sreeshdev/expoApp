import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { styles } from "../styles";
import { Image } from "expo-image";
import { Dimensions, Switch } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {
  AnimatePresence,
  Button,
  Card,
  Stack,
  Text,
  XStack,
  YStack,
  styled,
} from "tamagui";
import { LayoutGrid, PieChart as PieChartIcon } from "@tamagui/lucide-icons";
import Toaster from "components/Toaster";
import OverallScoreChart from "./OverallScoreChart";

const screenWidth = Dimensions.get("window").width;

const Score = (props) => {
  const {
    data,
    studentData,
    showAll = true,
    overallScoreView,
    direction,
    reportView,
    setReportView,
    setOverallScoreView,
    changeState,
    studentPageEvaluationMode,
  } = props;
  const scrollViewRef = useRef();
  const [scrollViewXValue, setScrollViewXValue] = useState(0);
  const scrollValue = 100;
  const [studentExamScore, setStudentExamScore] = useState([]);
  const [overallExamScore, setOverallExamScore] = useState(null);
  const [examReportSubjectList, setExamReportSubjectList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [evaluationMode, setEvaluationMode] = useState("EXAM");
  // const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
  // const [overallScoreChart, setOverallScoreChart] = useState(false);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: scrollViewXValue,
      animated: true,
    });
  }, [scrollViewXValue]);
  useEffect(() => {
    setStudentExamScore(data?.subjectWise);
    setOverallExamScore(data?.overallPercentage);
    setExamList(data?.exams);
    let allSubjects = [];
    data?.exams?.forEach(({ subjects }) => {
      allSubjects = [...allSubjects, ...subjects];
    });
    let uniqueSubjects = [];
    allSubjects.forEach(function (item) {
      var i = uniqueSubjects.findIndex(
        (subject) => subject.courseId == item.courseId
      );
      if (i <= -1) {
        uniqueSubjects.push(item);
      }
    });
    setExamReportSubjectList(uniqueSubjects);
  }, [data]);
  const getActualMarks = (subjects, subjectId, chart) => {
    let value = subjects.find(({ courseId }) => courseId === subjectId)?.marks;
    return value ? value : chart ? 0 : "-";
  };
  const getTotalMarks = (subjects, subjectId) => {
    let value = subjects.find(
      ({ courseId }) => courseId === subjectId
    )?.totalMarks;
    return value ? value : "-";
  };
  const getGrade = (subjects, subjectId) => {
    let value = subjects.find(
      ({ courseId }) => courseId === subjectId
    )?.gradingScaleLetter;
    return value ? value : "-";
  };
  const getGradeValue = (subjects, subjectId, chart) => {
    let gradeScaleId = subjects.find(
      ({ courseId }) => courseId === subjectId
    )?.gradingScaleId;
    const maxValue = data?.metaData?.gradingSystem?.scales?.find(
      ({ id }) => id === gradeScaleId
    )?.rangeEnd;
    return maxValue ? maxValue : chart ? 0 : "-";
  };
  const changeView = () => {
    changeState();
  };

  const changeReportView = () => {
    setReportView(([prevType]) => [
      prevType === "STATS" ? "CHART" : "STATS",
      prevType === "STATS" ? 0 : 1,
    ]);
  };
  const enterVariant =
    direction === 1 || direction === 0 ? "isRight" : "isLeft";
  const exitVariant = direction === 1 ? "isLeft" : "isRight";

  const getReportChartDataByExam = (subjects) => {
    const chartData = subjects?.map(({ examCourseName, courseId: id }, idx) => {
      const value = data?.metaData?.gradingSystem?.letterGradePreferred
        ? getGradeValue(subjects, id, true)
        : getActualMarks(subjects, id, true);
      const topLabel = data?.metaData?.gradingSystem?.letterGradePreferred
        ? getGrade(subjects, id, true)
        : value;
      return {
        value,
        label: examCourseName,
        frontColor: "#4ADDBA",
        topLabel,
        topLabelComponent: () => (
          <Text
            style={{
              color: "#055c47",
              fontSize: 12,
              marginBottom: 1,
            }}
          >
            {topLabel}
          </Text>
        ),
      };
    });
    return chartData;
  };

  const getReportChartDataBySubject = (id) => {
    return examList?.map(({ examName, subjects }, idx) => {
      const value = data?.metaData?.gradingSystem?.letterGradePreferred
        ? getGradeValue(subjects, id, true)
        : getActualMarks(subjects, id, true);
      const topLabel = data?.metaData?.gradingSystem?.letterGradePreferred
        ? getGrade(subjects, id, true)
        : value;
      return {
        value: value,
        label: examName,
        frontColor: "#4ADDBA",
        topLabel,
        topLabelComponent: () => (
          <Text
            style={{
              color: "#055c47",
              fontSize: 12,
              marginBottom: 1,
            }}
          >
            {topLabel}
          </Text>
        ),
      };
    });
  };

  return (
    <View>
      <XStack
        position="relative"
        height={overallScoreView === "STATS" ? 135 : 320}
        width="100%"
        alignItems="center"
        marginBottom={10}
      >
        <AnimatePresence initial>
          <YStackEnterable key={overallScoreView} fullscreen x={0} opacity={1}>
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
                        width: 22,
                        height: 27,
                      }}
                      contentFit="contain"
                      source={require("../../../../assets/ReportBlack.svg")}
                    />
                    <Text style={styles.CardHead}>Overall Score</Text>
                    {!showAll && (
                      <XStack marginLeft={5}>
                        <Button
                          size="$3"
                          chromeless
                          onPress={() => {
                            changeView();
                          }}
                        >
                          {overallScoreView === "CHART" ? (
                            <LayoutGrid />
                          ) : (
                            <PieChartIcon />
                          )}
                        </Button>
                      </XStack>
                    )}
                  </View>
                  <View style={styles.row}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        color: "#12aa86",
                      }}
                    >
                      {overallExamScore || 0}%
                    </Text>
                  </View>
                </View>

                {overallScoreView === "STATS" ? (
                  <ScrollView horizontal={true} nestedScrollEnabled={true}>
                    <View style={styles.cardDetail}>
                      {studentExamScore?.map(
                        ({ markPercentage, courseName }, idx) => (
                          <View key={idx} style={styles.eachItem}>
                            <View
                              style={{
                                ...styles.itemValueContainer,
                                backgroundColor:
                                  markPercentage < 50 ? "#ffa7a8" : "#9ce2c9",
                              }}
                            >
                              <Text style={styles.itemValue}>
                                {markPercentage}%
                              </Text>
                            </View>
                            <Text style={styles.itemHead}>{courseName}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </ScrollView>
                ) : (
                  <OverallScoreChart studentExamScore={studentExamScore} />
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
            <Text style={styles.title}>Evaluation Report</Text>
            {!showAll && (
              <XStack marginLeft={5}>
                <Button
                  size="$3"
                  chromeless
                  onPress={() => {
                    changeReportView();
                  }}
                >
                  {reportView === "CHART" ? (
                    <LayoutGrid color="#fff" />
                  ) : (
                    <PieChartIcon color="#fff" />
                  )}
                </Button>
              </XStack>
            )}
          </View>
          <View style={styles.SelectorBar}>
            <Text style={{ ...styles.WhiteText, marginRight: 10 }}>
              By Exam
            </Text>
            <Switch
              trackColor={{ false: "#fff", true: "#fff" }}
              thumbColor={
                studentPageEvaluationMode === "SUBJECT" ? "#003428" : "#003428"
              }
              ios_backgroundColor="#fff"
              onValueChange={() =>
                changeState({
                  stateName: "studentPageEvaluationMode",
                  stateValue:
                    studentPageEvaluationMode === "SUBJECT"
                      ? "EXAM"
                      : "SUBJECT",
                })
              }
              value={studentPageEvaluationMode === "SUBJECT"}
            />
            <Text style={{ ...styles.WhiteText, marginLeft: 10 }}>
              By Subject
            </Text>
          </View>
          {/* <View style={styles.ExamsContainer}>
        <Pressable
          onPress={() => {
            if (scrollViewXValue !== 0)
              setScrollViewXValue((prev) => prev - scrollValue);
          }}
        >
          <Image
            source={require("../../../../assets/chevronLeft-white.png")}
            style={{ marginRight: 10 }}
          />
        </Pressable>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          nestedScrollEnabled={true}
        >
          {Array.from(Array(10).keys()).map((item, idx) => (
            <View style={styles.eachExam}>
              <Text style={styles.examTitle}>Term {idx}</Text>
            </View>
          ))}
        </ScrollView>
        <Pressable
          onPress={() => setScrollViewXValue((prev) => prev + scrollValue)}
        >
          <Image
            source={require("../../../../assets/chevronRight-white.png")}
            style={{ marginLeft: 10 }}
          />
        </Pressable>
      </View> */}
          {studentPageEvaluationMode === "SUBJECT" ? (
            <View>
              {reportView === "STATS" ? (
                <View>
                  {examReportSubjectList?.map(
                    ({ courseId: id, examCourseName }) => (
                      <View style={styles.reportCard}>
                        <Text style={styles.reportTile}>{examCourseName}</Text>
                        <View style={styles.whiteCard}>
                          <View style={styles.reportRow}>
                            <View style={styles.reportCell}>
                              <Text></Text>
                            </View>
                            <View style={styles.reportCell}>
                              <Text style={styles.cellValue}>Actual Mark</Text>
                            </View>
                            <View style={styles.reportCell}>
                              <Text style={styles.cellValue}>Total Mark</Text>
                            </View>
                            <View style={styles.reportCell}>
                              <Text style={styles.cellValue}>Grade</Text>
                            </View>
                          </View>
                          {examList?.map(({ examName, subjects }) => (
                            <View style={styles.reportRow}>
                              <View style={styles.reportCell}>
                                <Text
                                  style={{
                                    ...styles.cellValue,
                                    color: "#2d469a",
                                  }}
                                >
                                  {examName}
                                </Text>
                              </View>
                              <View style={styles.reportCell}>
                                <View style={styles.cellBg}>
                                  <Text style={styles.cellValue}>
                                    {getActualMarks(subjects, id)}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.reportCell}>
                                <View style={styles.cellBg}>
                                  <Text style={styles.cellValue}>
                                    {getTotalMarks(subjects, id)}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.reportCell}>
                                <View style={styles.cellBg}>
                                  <Text style={styles.cellValue}>
                                    {getGrade(subjects, id)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    )
                  )}
                </View>
              ) : (
                <View>
                  {examReportSubjectList?.map(
                    ({ courseId: id, examCourseName }) => (
                      <View style={styles.reportCard}>
                        <Text style={styles.reportTile}>{examCourseName}</Text>
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
                          <BarChart
                            data={getReportChartDataBySubject(id)}
                            barWidth={35}
                            maxValue={100}
                            barBorderRadius={4}
                            yAxisLabelSuffix="%"
                            onPress={(item, index) =>
                              Toaster(
                                `${item.label} - ${item.topLabel}`,
                                "SUCCESS"
                              )
                            }
                            width={screenWidth - 130}
                            isAnimated
                            noOfSections={4}
                            spacing={50}
                            xAxisLabelTextStyle={{ marginBottom: -10 }}
                          />
                        </Card>
                      </View>
                    )
                  )}
                </View>
              )}
            </View>
          ) : (
            <View>
              {reportView === "STATS" ? (
                <View>
                  {examList?.map(({ examName, subjects }) => (
                    <View style={styles.reportCard}>
                      <Text style={styles.reportTile}>{examName}</Text>
                      <View style={styles.whiteCard}>
                        <View style={styles.reportRow}>
                          <View style={styles.reportCell}>
                            <Text></Text>
                          </View>
                          {!data?.metaData?.gradingSystem ? (
                            <>
                              <View style={styles.reportCell}>
                                <Text style={styles.cellValue}>
                                  Actual Mark
                                </Text>
                              </View>
                              <View style={styles.reportCell}>
                                <Text style={styles.cellValue}>Total Mark</Text>
                              </View>
                            </>
                          ) : (
                            <View style={styles.reportCell}>
                              <Text style={styles.cellValue}>Grade</Text>
                            </View>
                          )}
                        </View>
                        {examReportSubjectList?.map(
                          ({ courseId: id, examCourseName }) => (
                            <View style={styles.reportRow}>
                              <View style={styles.reportCell}>
                                <Text
                                  style={{
                                    ...styles.cellValue,
                                    color: "#2d469a",
                                  }}
                                >
                                  {examCourseName}
                                </Text>
                              </View>
                              {!data?.metaData?.gradingSystem
                                ?.letterGradePreferred ? (
                                <>
                                  <View style={styles.reportCell}>
                                    <View style={styles.cellBg}>
                                      <Text style={styles.cellValue}>
                                        {getActualMarks(subjects, id)}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={styles.reportCell}>
                                    <View style={styles.cellBg}>
                                      <Text style={styles.cellValue}>
                                        {getTotalMarks(subjects, id)}
                                      </Text>
                                    </View>
                                  </View>
                                </>
                              ) : (
                                <View style={styles.reportCell}>
                                  <View style={styles.cellBg}>
                                    <Text style={styles.cellValue}>
                                      {getGrade(subjects, id)}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  {examList?.map(({ examName, subjects }) => (
                    <View style={styles.reportCard}>
                      <Text style={styles.reportTile}>{examName}</Text>
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
                        <BarChart
                          data={getReportChartDataByExam(subjects)}
                          barWidth={35}
                          maxValue={100}
                          barBorderRadius={4}
                          yAxisLabelSuffix="%"
                          onPress={(item, index) =>
                            Toaster(
                              `${item.label} - ${item.topLabel}`,
                              "SUCCESS"
                            )
                          }
                          width={screenWidth - 120}
                          isAnimated
                          noOfSections={4}
                        />
                      </Card>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          {data?.metaData?.gradingSystem?.letterGradePreferred && (
            <Card
              elevate={Platform.OS === "ios"}
              size="$2"
              style={{
                width: "100%",
                padding: 10,
              }}
              backgroundColor={"#FFFFFF"}
              borderRadius={10}
              marginTop={15}
              justifyContent="center"
              alignItems="center"
            >
              <Text
                marginBottom={10}
                color={"#22b693"}
                fontSize={18}
                fontWeight={600}
              >
                Grade Chart
              </Text>
              <YStack
                gap={10}
                flexWrap="wrap"
                justifyContent="center"
                width={"100%"}
              >
                <XStack
                  alignItems="center"
                  padding={5}
                  gap={5}
                  width={"100%"}
                  borderBottomColor={"#acadac"}
                  borderBottomWidth={1}
                >
                  <Stack width={"49%"} alignItems="center">
                    <Text fontWeight={600}>Letter Grade</Text>
                  </Stack>
                  <Stack width={"49%"} alignItems="center">
                    <Text fontWeight={600}>Range</Text>
                  </Stack>
                </XStack>
                {data?.metaData?.gradingSystem?.scales?.map(
                  ({ letterGrade, rangeStart, rangeEnd }) => (
                    <XStack
                      alignItems="center"
                      padding={5}
                      borderRadius={10}
                      gap={5}
                      width={"100%"}
                      borderBottomColor={"#acadac"}
                      borderBottomWidth={1}
                    >
                      <Stack width={"49%"} alignItems="center">
                        <Text fontWeight={600}>{letterGrade}</Text>
                      </Stack>
                      <Stack width={"49%"} alignItems="center">
                        <Text>
                          {rangeStart} - {rangeEnd}
                        </Text>
                      </Stack>
                    </XStack>
                  )
                )}
              </YStack>
            </Card>
          )}
        </>
      )}
    </View>
  );
};

export default Score;

const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },
    isRight: { true: { x: 300, opacity: 0 } },
  },
});
