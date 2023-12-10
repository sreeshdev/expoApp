import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import moment from "moment";
import ContentLoader from "react-native-easy-content-loader";
import { Button } from "tamagui";
import { startCase } from "lodash";
import EmptyState from "components/EmptyState/EmptyState";
import { FlatList } from "react-native-gesture-handler";

const TodaysTimetable = ({ data, isLoading }) => {
  const TODAY = moment().format("dddd");
  const [schedules, setSchedules] = useState([1, 2, 3, 4]);
  useEffect(() => {
    if (data?.schedules?.length) {
      const todaySchedules = data?.schedules?.filter(
        ({ day }) => day === TODAY.toUpperCase()
      );
      setSchedules(todaySchedules);
    } else {
      setSchedules([]);
    }
  }, [data]);
  return (
    <View style={{ ...styles.BigCard, marginTop: 15 }}>
      <View style={styles.CardTitle}>
        <Image
          style={{
            width: 25,
            height: 27,
          }}
          contentFit="contain"
          source={require("../../../../assets/calender_black.svg")}
        />
        <Text style={styles.CardHead}>Today’s Timetable</Text>
      </View>
      {schedules?.length ? (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={schedules}
          keyboardShouldPersistTaps={"handled"}
          onEndReachedThreshold={0.3}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          maxToRenderPerBatch={5}
          keyExtractor={({ id }) => id}
          style={{ height: "100%", flex: 1 }}
          renderItem={({ item, index }) => {
            const {
              id,
              title,
              start,
              end,
              scheduleType,
              attendanceStatus,
              attendanceMarkedStatus,
            } = item;

            return (
              <View key={id} style={styles.InnerCard}>
                <ContentLoader
                  active
                  title={true}
                  pRows={1}
                  pWidth={"100%"}
                  loading={isLoading}
                >
                  <View style={styles.leftCard}>
                    <Text style={styles.bold}>{title}</Text>

                    <Text style={{ color: "#777777", fontWeight: "500" }}>
                      {start && moment(start).format("hh:mm A")} -{" "}
                      {end && moment(end).format("hh:mm A")}
                    </Text>
                  </View>
                  <View style={styles.rightCard}>
                    {scheduleType === "LUNCH" ? (
                      <Image
                        style={{
                          width: 60,
                          height: 50,
                        }}
                        contentFit="cover"
                        source={require("../../../../assets/lunchBreak.png")}
                      />
                    ) : (
                      <>
                        {attendanceMarkedStatus === "COMPLETED" ? (
                          <Button
                            variant="outlined"
                            borderColor={"#4da378"}
                            color={"#4da378"}
                            fontWeight={700}
                            size="$2"
                            disabled
                          >
                            {startCase(attendanceStatus?.toUpperCase())}
                          </Button>
                        ) : (
                          <Text
                            style={{ color: "#777777", fontWeight: "500" }}
                          ></Text>
                        )}
                        <Text style={styles.bold}>Period {index + 1}</Text>
                      </>
                    )}
                  </View>
                </ContentLoader>
              </View>
            );
          }}
        />
      ) : (
        <EmptyState message="No Schedules Today!" marginTop={50} />
      )}
    </View>
  );
};

export default React.memo(TodaysTimetable);
