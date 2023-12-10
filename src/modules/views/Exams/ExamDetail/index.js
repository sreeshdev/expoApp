import React, { useState } from "react";
import { connect } from "react-redux";
import * as Actions from "modules/actions";
import {
  Card,
  H6,
  Label,
  Paragraph,
  ScrollView,
  Stack,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { styles } from "./styles";
import { Clock } from "@tamagui/lucide-icons";
import moment from "moment";
import { Image } from "expo-image";
import { startCase } from "lodash";
import { Platform } from "react-native";
const ExamDetail = (props) => {
  const { examInfo = {}, examStats } = props;
  const { examDetails, markDetail } = examInfo;
  const {
    createdTs,
    name,
    description,
    durationInMinutes,
    marks,
    mode,
    status,
    location,
    fee,
    examSubjects,
  } = examDetails;
  const { exams } = markDetail;
  const [selectedSubject, setSelectedSubject] = useState(examSubjects?.[0]);
  const getObtainedMarks = (subjectId) => {
    const subjectList = exams?.[0]?.subjects;
    const subjectDetail = subjectList?.find(
      ({ courseId }) => courseId === subjectId
    );
    return subjectDetail?.marks || "-";
  };
  const getObtainedGrade = (subjectId) => {
    const subjectList = exams?.[0]?.subjects;
    const subjectDetail = subjectList?.find(
      ({ courseId }) => courseId === subjectId
    );
    return subjectDetail?.gradingScaleLetter || "-";
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <YStack gap={15}>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap={5}>
              <Text fontSize={20} fontWeight={700}>
                {name}
              </Text>
              <XStack gap={10} alignItems="center">
                <Text fontSize={12} fontWeight={500}>
                  {moment(createdTs).fromNow()}
                </Text>
                <Clock size={"$1"} color="#22b693" />
                <Text fontSize={14} fontWeight={600} color="#22b693">
                  {moment(createdTs).format("DD MMM YY, hh:mm A")}
                </Text>
              </XStack>
            </YStack>
          </XStack>
          <Card elevate={Platform.OS === "ios"} size="$1">
            <YStack padding={10} gap={15}>
              <XStack alignItems="center" gap={10}>
                <Image
                  style={{
                    width: 25,
                    height: 27,
                  }}
                  contentFit="contain"
                  source={require("../../../../assets/calender_black.svg")}
                />
                <Text style={styles.CardHead}>Exam Timetable</Text>
              </XStack>
              <XStack flexWrap="wrap" gap={10} justifyContent="center">
                {examSubjects?.map((subject) => (
                  <View key={subject.id} style={styles.eachSubject}>
                    <View
                      style={{
                        ...styles.subjectDetail,
                        backgroundColor:
                          selectedSubject.id === subject.id
                            ? "#a2e0d1"
                            : "#fff",
                      }}
                      onPress={() => setSelectedSubject(subject)}
                    >
                      <Text style={styles.subjectName}>
                        {subject.courseName}
                      </Text>
                      <Text style={styles.periodTime}>
                        {subject.startDate &&
                          moment(subject.startDate, "YYYY-MM-DD").format(
                            "Do MMM YYYY"
                          )}
                      </Text>
                    </View>
                  </View>
                ))}
              </XStack>
            </YStack>
          </Card>
          <XStack justifyContent="center">
            <Text fontWeight={700}>{selectedSubject?.courseName}</Text>
          </XStack>
          <Card elevate={Platform.OS === "ios"} size="$2">
            <XStack gap={15} padding={10} justifyContent="space-between">
              <YStack gap={5}>
                <Label>Date</Label>
                <Paragraph size={"$2"} color={"#676767"}>
                  {moment(selectedSubject?.startDate, "YYYY-MM-DD").format(
                    "Do MMM YYYY"
                  )}
                </Paragraph>
              </YStack>
              <YStack gap={5}>
                <Label>Time</Label>
                <Paragraph size={"$2"} color={"#676767"}>
                  {moment(selectedSubject?.startTime, "HH:mm:ss").format(
                    "hh:mm A"
                  )}{" "}
                  -{" "}
                  {moment(selectedSubject?.endTime, "HH:mm:ss").format(
                    "hh:mm A"
                  )}
                </Paragraph>
              </YStack>
              <YStack gap={5}>
                <Label>Duration</Label>
                <Paragraph size={"$2"} color={"#676767"}>
                  {selectedSubject?.duration}
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
          <Card elevate={Platform.OS === "ios"} size="$2">
            <XStack gap={15} padding={10} justifyContent="space-between">
              <YStack gap={5}>
                <Label>Mode</Label>
                <Paragraph size={"$2"} color={"#676767"}>
                  {startCase(selectedSubject?.examMode?.toLowerCase())}
                </Paragraph>
              </YStack>
              {!examStats?.metaData?.gradingSystem?.letterGradePreferred ? (
                <>
                  <YStack gap={5}>
                    <Label>Mark Obtained</Label>
                    <Paragraph size={"$2"} color={"#676767"}>
                      {getObtainedMarks(selectedSubject?.courseId)}
                    </Paragraph>
                  </YStack>
                  <YStack gap={5}>
                    <Label>Total Marks</Label>
                    <Paragraph size={"$2"} color={"#676767"}>
                      {selectedSubject?.totalMarks}
                    </Paragraph>
                  </YStack>
                </>
              ) : (
                <YStack gap={5}>
                  <Label>Grade Obtained</Label>
                  <Paragraph size={"$2"} color={"#676767"}>
                    {getObtainedGrade(selectedSubject?.courseId)}
                  </Paragraph>
                </YStack>
              )}
            </XStack>
          </Card>
          {selectedSubject?.location ? (
            <Card elevate={Platform.OS === "ios"} size="$2">
              <XStack gap={15} padding={10} justifyContent="space-between">
                <YStack gap={5}>
                  <Label>Building</Label>
                  <Paragraph size={"$2"} color={"#676767"}>
                    {selectedSubject?.location?.building}
                  </Paragraph>
                </YStack>
                <YStack gap={5}>
                  <Label>Floor</Label>
                  <Paragraph size={"$2"} color={"#676767"}>
                    {selectedSubject?.location?.floor}
                  </Paragraph>
                </YStack>
                <YStack gap={5}>
                  <Label>Room No.</Label>
                  <Paragraph size={"$2"} color={"#676767"}>
                    {selectedSubject?.location?.roomNo}
                  </Paragraph>
                </YStack>
              </XStack>
            </Card>
          ) : null}
          <H6>Description</H6>
          <Text>{description}</Text>
        </YStack>
      </View>
      {examStats?.metaData?.gradingSystem?.letterGradePreferred && (
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
          marginBottom={50}
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
            {examStats?.metaData?.gradingSystem?.scales?.map(
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
    </ScrollView>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    examInfo: AppBaseReducer?.examInfo,
    reqStatus: AppBaseReducer?.reqStatus,
    serviceError: AppBaseReducer?.serviceError,
    examStats: AppBaseReducer?.examStats,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetail);
