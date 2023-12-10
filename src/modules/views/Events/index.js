import React, { useCallback, useEffect, useState } from "react";
import { Platform, RefreshControl } from "react-native";
import { connect } from "react-redux";
import {
  Adapt,
  Avatar,
  Button,
  Checkbox,
  Input,
  Label,
  ListItem,
  Popover,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { debounce, startCase } from "lodash";
import usePrevious from "utils/usePrevious";
import { Image } from "expo-image";
import ContentLoader from "react-native-easy-content-loader";
import { Check, ChevronDown, ChevronRight } from "@tamagui/lucide-icons";
import moment from "moment";
import EmptyState from "components/EmptyState/EmptyState";
import { FlatList } from "react-native-gesture-handler";

const Events = (props) => {
  const { events, studentDetails, getAllEvents, reqStatus, isContentLoading } =
    props;
  const [refreshing, setRefreshing] = useState(false);
  const prevReqStatus = usePrevious(reqStatus);
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [showExpired, setShowExpired] = useState(false);
  useEffect(() => {
    getEvents(null);
  }, [types, showExpired]);

  const getEvents = (searchValue) => {
    getAllEvents({
      student_individual_ids: studentDetails.id,
      institute_id: studentDetails.instituteId,
      search_text: searchValue,
      types,
      expired: showExpired,
    });
  };

  const handleTypeFilter = (filterValue) => {
    setTypes(filterValue);
    setFilterOpen(false);
  };

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_ALL_EVENTS_SUCCESS:
        setRefreshing(false);
        break;
    }
  }, [reqStatus]);

  const handleSearchInput = (val) => {
    if (val) {
      setSearch(val);
      debounceFn(val);
    } else {
      setSearch(null);
      debounceFn(null);
    }
  };

  const debouncedSearchFilter = (val) => {
    getEvents(val);
  };

  const debounceFn = useCallback(debounce(debouncedSearchFilter, 300), []);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#e8fffa",
      }}
    >
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10,
          marginBottom: 10,
          gap: 10,
          height: 100,
        }}
      >
        <Input
          size={"$4"}
          borderRadius={50}
          onChangeText={handleSearchInput}
          value={search}
          placeholder="Search Events"
          flex={1}
        />
        <XStack
          width={"100%"}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* <XStack alignItems="center" gap={10}>
            <Label
              paddingRight="$0"
              justifyContent="flex-end"
              size={"$2"}
              htmlFor={"showExpired-switch"}
            >
              Show Expired
            </Label>
            <Separator minHeight={10} vertical />
            <Switch
              id={"showExpired-switch"}
              size={"$1"}
              native={"mobile"}
              nativeProps={{
                trackColor: { false: "#e9f0ea", true: "#e9f0ea" },
                thumbColor: showExpired ? "#007e70" : "#007e70",
                ios_backgroundColor: "#fff",
              }}
              checked={showExpired}
              onCheckedChange={(value) => setShowExpired(value)}
            >
              <Switch.Thumb animation="quick" />
            </Switch>
          </XStack> */}
          <XStack alignItems="center" space="$3">
            <Checkbox
              id={"showExpiredCheck"}
              size={"$4"}
              checked={showExpired}
              onCheckedChange={(value) => {
                setShowExpired(value);
                setSearch(null);
              }}
            >
              <Checkbox.Indicator>
                <Check />
              </Checkbox.Indicator>
            </Checkbox>

            <Label size={"$3"} htmlFor={"showExpiredCheck"}>
              Show Expired
            </Label>
          </XStack>

          <Popover
            size="$5"
            allowFlip
            placement="bottom"
            open={filterOpen}
            onOpenChange={(value) => setFilterOpen(value)}
          >
            <Popover.Trigger asChild>
              <Button chromeless width="30%" size="$2" iconAfter={ChevronDown}>
                Filter By Type
              </Button>
            </Popover.Trigger>
            <Adapt when="sm" platform="touch">
              <Popover.Sheet modal dismissOnSnapToBottom>
                <Popover.Sheet.Frame padding="$4">
                  <Adapt.Contents />
                </Popover.Sheet.Frame>
                <Popover.Sheet.Overlay
                  animation="lazy"
                  enterStyle={{ opacity: 0 }}
                  exitStyle={{ opacity: 0 }}
                />
              </Popover.Sheet>
            </Adapt>

            <Popover.Content
              borderWidth={1}
              borderColor="$borderColor"
              enterStyle={{ y: -10, opacity: 0 }}
              exitStyle={{ y: -10, opacity: 0 }}
              elevate={Platform.OS === "ios"}
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
            >
              <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

              <YStack space={2}>
                <ListItem
                  hoverTheme
                  pressTheme
                  onPress={() => handleTypeFilter("")}
                >
                  All
                </ListItem>
                <ListItem
                  hoverTheme
                  pressTheme
                  onPress={() => handleTypeFilter("EVENT")}
                >
                  Events
                </ListItem>

                <ListItem
                  hoverTheme
                  pressTheme
                  onPress={() => handleTypeFilter("TASK")}
                >
                  Tasks
                </ListItem>

                <ListItem
                  hoverTheme
                  pressTheme
                  onPress={() => handleTypeFilter("CIRCULAR")}
                >
                  Circular
                </ListItem>
                <ListItem
                  hoverTheme
                  pressTheme
                  onPress={() => handleTypeFilter("YEARLY_PLANNER")}
                >
                  Yearly Planner
                </ListItem>
              </YStack>
            </Popover.Content>
          </Popover>
        </XStack>
      </View>
      {events?.length ? (
        <FlatList
          data={events}
          keyboardShouldPersistTaps={"handled"}
          scrollEnabled={true}
          keyExtractor={({ id }) => id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getEvents(null);
              }}
            />
          }
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
                  loading={isContentLoading}
                  containerStyles={{ paddingBottom: 5, paddingTop: 5 }}
                >
                  <ListItem
                    hoverTheme
                    pressTheme
                    title={title}
                    iconAfter={ChevronRight}
                    icon={
                      <YStack
                        alignItems="center"
                        justifyContent="center"
                        gap={5}
                      >
                        <Avatar circular size="$6" backgroundColor={"#007e70"}>
                          <Image
                            style={{
                              width: 30,
                              height: 30,
                            }}
                            contentFit="contain"
                            source={
                              type === "YEARLY_PLANNER"
                                ? require(`../../../assets/YEAR_PLANNER.svg`)
                                : type === "TASK"
                                ? require(`../../../assets/TASK.svg`)
                                : type === "CIRCULAR"
                                ? require(`../../../assets/CIRCULAR.svg`)
                                : require(`../../../assets/EVENT.svg`)
                            }
                          />
                        </Avatar>
                        <Text maxWidth={60} numberOfLines={1}>
                          {startCase(type?.toLowerCase())}
                        </Text>
                      </YStack>
                    }
                    onPress={() =>
                      props.navigation.navigate("EventDetail", {
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
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    events: AppBaseReducer?.events?.content,
    reqStatus: AppBaseReducer?.reqStatus,
    isContentLoading: AppBaseReducer.isContentLoading,
    studentDetails: AppBaseReducer?.studentDetails,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
