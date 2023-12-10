import React from "react";
import { styles } from "../styles";
import {
  Avatar,
  ListItem,
  ScrollView,
  Text,
  View,
  XStack,
  YGroup,
} from "tamagui";
import { Image } from "expo-image";
import { CalendarClock, ChevronRight } from "@tamagui/lucide-icons";
import ContentLoader from "react-native-easy-content-loader";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

const RecentEvents = ({ data, isLoading, navigation }) => {
  return (
    <View style={{ ...styles.card, marginTop: 15 }}>
      <View style={{ ...styles.CardTitle, marginBottom: 10 }}>
        <CalendarClock width={25} height={27} />
        <Text style={styles.CardHead}>Upcoming Events</Text>
      </View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        keyboardShouldPersistTaps={"handled"}
        onEndReachedThreshold={0.3}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        maxToRenderPerBatch={5}
        keyExtractor={({ id }) => id}
        style={{ height: "100%", flex: 1 }}
        renderItem={({ item }) => {
          const { title, id, description, type, startDateTime, endDateTime } =
            item;

          return (
            <View>
              <ContentLoader
                titleStyles={{ marginTop: 10, marginBottom: 20 }}
                avatar
                aSize={64}
                active
                title={true}
                pRows={1}
                pWidth={"100%"}
                loading={isLoading}
                containerStyles={{ paddingBottom: 5, paddingTop: 5 }}
              >
                <ListItem
                  hoverTheme
                  pressTheme
                  title={title}
                  iconAfter={ChevronRight}
                  // borderWidth={1}
                  // borderColor={"#e1e3e8"}
                  // borderRadius={15}
                  icon={
                    <Avatar circular size="$4" backgroundColor={"#007e70"}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        contentFit="contain"
                        source={
                          type === "YEARLY_PLANNER"
                            ? require(`../../../../assets/YEAR_PLANNER.svg`)
                            : type === "TASK"
                            ? require(`../../../../assets/TASK.svg`)
                            : type === "CIRCULAR"
                            ? require(`../../../../assets/CIRCULAR.svg`)
                            : require(`../../../../assets/EVENT.svg`)
                        }
                      />
                    </Avatar>
                  }
                  onPress={() =>
                    navigation.navigate("EventDetail", {
                      selectedEvent: id,
                    })
                  }
                >
                  <XStack justifyContent="space-between">
                    <Text numberOfLines={2} flex={1}>
                      {description}
                    </Text>

                    {moment(startDateTime).format("Do MMM") ===
                    moment(endDateTime).format("Do MMM") ? (
                      <Text>{moment(startDateTime).format("Do MMM")}</Text>
                    ) : (
                      <Text>
                        {moment(startDateTime).format("Do MMM")} -{" "}
                        {moment(endDateTime).format("Do MMM")}
                      </Text>
                    )}
                  </XStack>
                </ListItem>
              </ContentLoader>
            </View>
          );
        }}
      />
    </View>
  );
};

export default RecentEvents;
