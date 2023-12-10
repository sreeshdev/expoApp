import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import {
  AlertDialog,
  Button,
  Card,
  H6,
  Label,
  Text,
  XStack,
  YStack,
} from "tamagui";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import moment from "moment";
import {
  Clock,
  Edit,
  Trash2,
} from "@tamagui/lucide-icons";
import { startCase } from "lodash";
import usePrevious from "utils/usePrevious";
import Toaster from "components/Toaster";
const ApplyLeaveDetail = (props) => {
  const {
    studentLeaveList,
    route,
    reqStatus,
    deleteStudentLeaveApply,
    serviceError,
  } = props;
  const leaveDetailData =
    studentLeaveList?.find(({ id }) => id === route.params.selectedLeave) || {};
  const {
    reason,
    comments,
    approvalStatus,
    startDateTime,
    endDateTime,
    autoApproved,
    createdTs,
    id,
  } = leaveDetailData;
  const prevReqStatus = usePrevious(reqStatus);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.DELETE_STUDENT_LEAVE_APPLY_SUCCESS: {
        Toaster("Leave Request Deleted Successfully", "SUCCESS");
        props.navigation.goBack();
        break;
      }
      default:
        if (serviceError) {
          Toaster(serviceError, "SYSTEM_ERROR");
        }
        break;
    }
  }, [reqStatus]);
  const deleteLeaveRequest = () => {
    deleteStudentLeaveApply({ id });
  };
  return (
    <View style={styles.mainContainer}>
      <YStack gap={15}>
        <XStack justifyContent="space-between" alignItems="center">
          <YStack gap={5}>
            <Text fontSize={20} fontWeight={700}>
              {reason}
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
          {!["APPROVED", "DENIED"].includes(approvalStatus) ? (
            <XStack>
              <Button
                padding={5}
                scaleIcon={1.5}
                icon={<Edit color="#22b693" />}
                chromeless
                onPress={() =>
                  props.navigation.navigate("ApplyLeaveForm", {
                    selectedLeave: id,
                  })
                }
              ></Button>
              <AlertDialog>
                <AlertDialog.Trigger asChild>
                  <Button
                    marginLeft={5}
                    padding={5}
                    scaleIcon={1.5}
                    icon={<Trash2 color="#D22B2B" />}
                    chromeless
                  ></Button>
                </AlertDialog.Trigger>

                <AlertDialog.Portal>
                  <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                  />
                  <AlertDialog.Content
                    bordered
                    elevate={Platform.OS === "ios"}
                    key="content"
                    animation={[
                      "quick",
                      {
                        opacity: {
                          overshootClamping: true,
                        },
                      },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    x={0}
                    scale={1}
                    opacity={1}
                    y={0}
                  >
                    <YStack space>
                      <AlertDialog.Title fontSize={18} fontWeight={700}>
                        Deleting Leave Request
                      </AlertDialog.Title>
                      <AlertDialog.Description>
                        Are you sure to Delete this leave request?
                      </AlertDialog.Description>

                      <XStack space="$3" justifyContent="flex-end">
                        <AlertDialog.Cancel asChild>
                          <Button>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                          asChild
                          onPress={() => deleteLeaveRequest()}
                        >
                          <Button
                            backgroundColor={"#D22B2B"}
                            color={"#fff"}
                            theme="active"
                          >
                            Delete
                          </Button>
                        </AlertDialog.Action>
                      </XStack>
                    </YStack>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog>
            </XStack>
          ) : (
            <></>
          )}
        </XStack>
        <YStack gap={10}>
          <H6>Leave Applied</H6>
          <Card
            elevate={Platform.OS === "ios"}
            size="$2"
            style={styles.innerContainer}
          >
            <XStack justifyContent="space-between" alignItems="center">
              <YStack gap={5}>
                <Label>Start Date & Time</Label>
                <Text>
                  {moment(startDateTime).format("DD MMM YY, hh:mm A")}
                </Text>
              </YStack>
              <YStack gap={5}>
                <Label>End Date & Time</Label>
                <Text>{moment(endDateTime).format("DD MMM YY, hh:mm A")}</Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
        <Card
          elevate={Platform.OS === "ios"}
          size="$4"
          style={styles.innerContainer}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap={5}>
              <Label>Status</Label>
              <Button
                variant="outlined"
                borderColor={"#4da378"}
                color={"#4da378"}
                fontWeight={700}
                size="$2"
                disabled
              >
                {startCase(approvalStatus?.toLowerCase())}
              </Button>
            </YStack>
          </XStack>
        </Card>
        <H6>Comments</H6>
        <Text>{comments}</Text>
      </YStack>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    studentLeaveList: AppBaseReducer?.studentLeaveList?.content,
    reqStatus: AppBaseReducer?.reqStatus,
    serviceError: AppBaseReducer?.serviceError,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeaveDetail);
