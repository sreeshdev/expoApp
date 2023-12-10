import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  ListItem,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
} from "tamagui";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { startCase } from "lodash";
import usePrevious from "utils/usePrevious";
import { Image } from "expo-image";
import ContentLoader from "react-native-easy-content-loader";
import { ChevronRight } from "@tamagui/lucide-icons";

const Staffs = (props) => {
  const {
    sectionCourseDetails,
    studentDetails,
    getSectionCourseDetails,
    reqStatus,
    isContentLoading,
  } = props;
  const [refreshing, setRefreshing] = useState(false);
  const prevReqStatus = usePrevious(reqStatus);
  useEffect(() => {
    getSectionCourseDetails(studentDetails.currentSectionId);
  }, []);
  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_SECTION_COURSE_DETAILS_SUCCESS:
        setRefreshing(false);
        break;
    }
  }, [reqStatus]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#e8fffa",
      }}
    >
      <ScrollView
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={() => {
      //       setRefreshing(true);
      //       getSectionCourseDetails(studentDetails.currentSectionId);
      //     }}
      //   />
      // }
      >
        <YGroup
          alignSelf="center"
          width={"100%"}
          size="$5"
          separator={<Separator />}
        >
          {sectionCourseDetails?.staffMappings?.map(
            ({ course, staffId, type }) => {
              const courseStaff = sectionCourseDetails?.staffs?.find(
                ({ id }) => id === staffId
              );
              return (
                <YGroup.Item>
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
                      title={courseStaff?.fullName}
                      icon={
                        <Avatar circular size="$6" backgroundColor={"#007e70"}>
                          {courseStaff?.dpUrl ? (
                            <Avatar.Image
                              accessibilityLabel="Cam"
                              src={courseStaff?.dpUrl}
                            />
                          ) : (
                            <Image
                              style={{ width: 38, height: 38 }}
                              contentFit="contain"
                              source={
                                courseStaff.gender === "MALE"
                                  ? require("../../../assets/maleIcon.svg")
                                  : require("../../../assets/femaleIcon.svg")
                              }
                            />
                          )}
                        </Avatar>
                      }
                      iconAfter={ChevronRight}
                      onPress={() =>
                        props.navigation.navigate("StaffDetail", {
                          selectedStaff: staffId,
                        })
                      }
                    >
                      <XStack justifyContent="space-between">
                        <Text flexWrap="wrap" flex={1}>
                          {course?.name}
                        </Text>
                        {type === "COORDINATOR" && (
                          <Button
                            variant="outlined"
                            borderColor={"#007e70"}
                            color={"#007e70"}
                            fontWeight={700}
                            size="$2"
                          >
                            {startCase(type?.toLowerCase())}
                          </Button>
                        )}
                      </XStack>
                    </ListItem>
                  </ContentLoader>
                </YGroup.Item>
              );
            }
          )}
        </YGroup>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    sectionCourseDetails: AppBaseReducer?.sectionCourseDetails,
    reqStatus: AppBaseReducer?.reqStatus,
    isContentLoading: AppBaseReducer.isContentLoading,
    studentDetails: AppBaseReducer?.studentDetails,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Staffs);
