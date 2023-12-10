import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  H5,
  H6,
  Label,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import * as Actions from "modules/actions";
import { connect } from "react-redux";
import { Image } from "expo-image";
import { Linking, Platform } from "react-native";

const StaffDetail = (props) => {
  const { sectionCourseDetails, route } = props;
  const staffId = route.params.selectedStaff;
  const [staffDetail, setStaffDetail] = useState({});
  useEffect(() => {
    setStaffDetail(
      sectionCourseDetails?.staffs?.find(({ id }) => id === staffId)
    );
  }, [staffId]);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#e8fffa",
        padding: 15,
      }}
    >
      <YStack gap={15}>
        <XStack alignItems="center" gap={10}>
          <Avatar circular size="$8" backgroundColor={"#007e70"}>
            {staffDetail?.dpUrl ? (
              <Avatar.Image accessibilityLabel="Cam" src={staffDetail?.dpUrl} />
            ) : (
              <H5 color={"white"}>{staffDetail?.fullName?.[0]}</H5>
            )}
          </Avatar>
          <H6 width={"70%"} flexWrap="wrap">
            {staffDetail?.fullName}
          </H6>
        </XStack>

        <Card
          elevate={Platform.OS === "ios"}
          size="$2"
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <YStack gap={15}>
            <XStack>
              <YStack gap={5} width={"50%"}>
                <Label>Academic Degrees</Label>
                <Text>{staffDetail?.staffProfile?.academicDegrees || "-"}</Text>
              </YStack>
              <YStack gap={5} width={"50%"}>
                <Label>Academic Area</Label>
                <Text>{staffDetail?.staffProfile?.academicArea}</Text>
              </YStack>
            </XStack>
            <XStack>
              <YStack gap={5} width={"50%"}>
                <Label>Specialization</Label>
                <Text>
                  {staffDetail?.staffProfile?.specialization?.join(", ")}
                </Text>
              </YStack>
              <YStack gap={5} width={"50%"}>
                <Label>Additional Titles</Label>
                <Text>
                  {staffDetail?.staffProfile?.additionalTitles?.join(", ")}
                </Text>
              </YStack>
            </XStack>
            <XStack>
              <YStack gap={5} width={"50%"}>
                <Label>Awards & Honors</Label>
                <Text>
                  {staffDetail?.staffProfile?.awardsAndHonors?.join(", ")}
                </Text>
              </YStack>
              <YStack gap={5} width={"50%"}>
                <Label>Bio</Label>
                <Text>{staffDetail?.staffProfile?.bio}</Text>
              </YStack>
            </XStack>
          </YStack>
        </Card>
        {staffDetail?.staffProfile?.socialMediaLinks?.facebook && (
          <XStack
            borderWidth={1}
            borderRadius={50}
            paddingHorizontal={10}
            paddingVertical={10}
            borderColor={"#22b693"}
            backgroundColor={"#ffffff"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={14} fontWeight={500}>
              Facebook
            </Text>
            <Button
              backgroundColor={"#ffffff"}
              borderRadius={50}
              width={32}
              height={32}
              onPress={() =>
                Linking.openURL(
                  staffDetail?.staffProfile?.socialMediaLinks?.facebook
                )
              }
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                }}
                contentFit="contain"
                source={require("../../../../assets/facebook.svg")}
              />
            </Button>
          </XStack>
        )}
        {staffDetail?.staffProfile?.socialMediaLinks?.linkedIn && (
          <XStack
            borderWidth={1}
            borderRadius={50}
            paddingHorizontal={10}
            paddingVertical={10}
            borderColor={"#22b693"}
            backgroundColor={"#ffffff"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={14} fontWeight={500}>
              LinkedIn
            </Text>
            <Button
              backgroundColor={"#ffffff"}
              borderRadius={50}
              width={32}
              height={32}
              onPress={() =>
                Linking.openURL(
                  staffDetail?.staffProfile?.socialMediaLinks?.linkedIn
                )
              }
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                }}
                contentFit="contain"
                source={require("../../../../assets/linkedIn.svg")}
              />
            </Button>
          </XStack>
        )}
      </YStack>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffDetail);
