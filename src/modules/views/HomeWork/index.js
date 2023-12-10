import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import moment from "moment";
import * as Actions from "modules/actions";
import { connect } from "react-redux";
import { Image } from "expo-image";
import { DatePicker } from "react-native-woodpicker";
import { Button, Card } from "tamagui";
import * as WebBrowser from "expo-web-browser";
import { Download } from "@tamagui/lucide-icons";
import ContentLoader from "react-native-easy-content-loader";
import EmptyState from "components/EmptyState/EmptyState";

const HomeWork = (props) => {
  const {
    studentDetails,
    allCourseActivity,
    getActivitySummary,
    isContentLoading,
  } = props;
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isContentLoading) {
      setData([{ activities: [{}, {}, {}, {}, {}] }]);
    } else {
      setData(allCourseActivity);
    }
  }, [isContentLoading]);
  useEffect(() => {
    getActivitySummary({
      sectionId: studentDetails?.currentSectionId,
      startRange: moment(date).unix(),
      endRange: moment(date).add(1, "day").unix(),
    });
  }, [date]);

  const prevDate = () => {
    setDate(new Date(moment(date).subtract(1, "day").format()));
  };
  const nextDate = () => {
    setDate(new Date(moment(date).add(1, "day").format()));
  };
  const handleDateChange = (event) => {
    setDate(event);
  };
  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={["#22b693", "#03a07a"]}
        style={styles.mainContainer}
      >
        <View style={styles.Container}>
          <View style={styles.dateSelector}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable onPress={prevDate}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  contentFit="cover"
                  source={require("../../../assets/chevronBgLeft.svg")}
                />
              </Pressable>
              <Text style={styles.dateText}>
                {moment(date).format("DD MMMM,YYYY")}
              </Text>
              {moment(date)
                .startOf("d")
                .isSameOrBefore(moment().add(2, "day").startOf("d")) && (
                <Pressable onPress={nextDate}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    contentFit="cover"
                    source={require("../../../assets/chevronBgRight.svg")}
                  />
                </Pressable>
              )}
            </View>
            {/* <Pressable onPress={showDatepicker}> */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", marginRight: 10 }}>Date</Text>
              <DatePicker
                value={date}
                onDateChange={handleDateChange}
                doneButtonLabel={"Done"}
                isNullable={false}
                iosDisplay="spinner"
                iosMode="date"
                androidMode="calendar"
                androidDisplay="calendar"
                maximumDate={new Date(moment().add(2, "day").format())}
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
          <ScrollView>
            {data?.length ? (
              <View style={styles.listContainer}>
                {data?.map((course) =>
                  course.activities?.map((activity) => {
                    const activityType =
                      activity?.type === "PORTION_TAKEN"
                        ? "Portion Covered"
                        : activity?.type === "HOMEWORK"
                        ? "Home Work"
                        : "";
                    const activityData =
                      activity?.type === "PORTION_TAKEN"
                        ? activity?.portionTaken
                        : activity?.homework;
                    const attachments =
                      activity?.type === "PORTION_TAKEN"
                        ? activityData?.portionTakenDocuments
                        : activityData?.homeWorkDocuments;
                    return (
                      <Card
                        elevate={Platform.OS === "ios"}
                        size="$4"
                        bordered
                        style={styles.eachList}
                        key={activityData?.id}
                      >
                        <ContentLoader
                          active
                          title={true}
                          pRows={2}
                          pWidth={["50%", "100%"]}
                          pHeight={[15, 50]}
                          loading={isContentLoading}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 10,
                              }}
                            >
                              <Image
                                style={{
                                  width: 23,
                                  height: 23,
                                }}
                                contentFit="contain"
                                source={
                                  activity?.type === "PORTION_TAKEN"
                                    ? require("../../../assets/portionActivity.svg")
                                    : require("../../../assets/homeworkActivity.svg")
                                }
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "500",
                                  color: "#2c3134",
                                }}
                              >
                                {activityType}
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#2c3134",
                              }}
                            >
                              {activityData?.subjectName}
                            </Text>
                          </View>
                          {activity?.type === "HOMEWORK" && (
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: 10,
                                flexWrap: "wrap",
                                width: "90%",
                                gap: 10,
                              }}
                            >
                              {activityData?.componentName && (
                                <View
                                  style={{
                                    flexDirection: "column",
                                  }}
                                >
                                  <Text style={styles.listTitle}>
                                    Component Name
                                  </Text>
                                  <Text style={{ ...styles.listValue }}>
                                    {activityData?.componentName}
                                  </Text>
                                </View>
                              )}
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginTop: 10,
                                }}
                              >
                                {activityData?.due && (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Text style={styles.listTitle}>Due</Text>
                                    <Text
                                      style={{
                                        ...styles.listValue,
                                        marginLeft: 10,
                                      }}
                                    >
                                      {moment(activityData?.due).format(
                                        "DD, MMM hh:mm A"
                                      )}
                                    </Text>
                                  </View>
                                )}
                                {activityData.marks && (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginLeft: 20,
                                    }}
                                  >
                                    <Text style={styles.listTitle}>Mark</Text>
                                    <Text
                                      style={{
                                        ...styles.listValue,
                                        marginLeft: 10,
                                      }}
                                    >
                                      {activityData.marks}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            </View>
                          )}
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 10,
                              flexWrap: "wrap",
                              width: "90%",
                              gap: 10,
                            }}
                          >
                            {activityData?.topic && (
                              <View
                                style={{
                                  flexDirection: "column",
                                }}
                              >
                                <Text style={styles.listTitle}>Topic</Text>
                                <Text style={styles.listValue}>
                                  {activityData?.topic}
                                </Text>
                              </View>
                            )}

                            {activityData?.subTopic && (
                              <View
                                style={{
                                  flexDirection: "column",
                                }}
                              >
                                <Text style={styles.listTitle}>Sub Topic</Text>
                                <Text style={styles.listValue}>
                                  {activityData?.subTopic}
                                </Text>
                              </View>
                            )}

                            <View
                              style={{
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <Text style={styles.listTitle}>Comment</Text>
                              <Text style={styles.listValue}>
                                {activityData?.comments ||
                                  activityData?.topicComments ||
                                  activity?.subTopicsComments}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              gap: 10,
                              marginTop: 10,
                            }}
                          >
                            {attachments?.length
                              ? attachments?.map(
                                  ({ downloadableUrl, id }, idx) => (
                                    <Button
                                      key={id}
                                      icon={Download}
                                      onPress={() => {
                                        WebBrowser.openBrowserAsync(
                                          downloadableUrl
                                        );
                                        // Linking.openURL();
                                      }}
                                    >
                                      {`Attachment ${idx + 1}`}
                                    </Button>
                                  )
                                )
                              : null}
                          </View>
                        </ContentLoader>
                      </Card>
                    );
                  })
                )}
              </View>
            ) : (
              <EmptyState message="No Homework Entry at this moment!" />
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    studentDetails: state.AppBaseReducer?.studentDetails,
    allCourseActivity: state.AppBaseReducer?.allCourseActivity,
    isContentLoading: state.AppBaseReducer.isContentLoading,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWork);
