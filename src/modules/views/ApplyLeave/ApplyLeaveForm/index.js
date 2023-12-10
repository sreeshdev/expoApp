import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Text,
  TextArea,
  XStack,
} from "tamagui";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  View,
} from "react-native";
import { styles } from "./styles";
import { Image } from "expo-image";
import SelectInput from "components/SelectInput";
import { connect } from "react-redux";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { DatePicker } from "react-native-woodpicker";
import Toaster from "components/Toaster";
import usePrevious from "utils/usePrevious";
import { CalendarClock, Check as CheckIcon } from "@tamagui/lucide-icons";
import { useIsFocused } from "@react-navigation/native";

const ApplyLeaveForm = (props) => {
  const {
    leaveApplyReason,
    getStudentTimeOff,
    studentDetails,
    reqStatus,
    createStudentLeaveApply,
    updateStudentLeaveApply,
    studentLeaveList,
    route,
    serviceError,
    getStudentLeaveApply,
  } = props;

  const [timeOffReasonId, setTimeOffReasonId] = useState(null);
  const [comments, setComments] = useState(null);
  const [allDay, setAllDay] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromTime, setFromTime] = useState(new Date(moment().startOf("D")));
  const [toTime, setToTime] = useState(new Date(moment().endOf("D")));
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reasonOptions, setReasonOptions] = useState([]);
  const prevReqStatus = usePrevious(reqStatus);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused)
      getStudentTimeOff({ instituteId: studentDetails.instituteId });
  }, [isFocused]);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_STUDENT_TIME_OFF_SUCCESS: {
        if (route.params?.selectedLeave) {
          setEditData();
        } else {
          setShowForm(true);
        }
        setReasonOptions(
          leaveApplyReason?.map(({ id, reason }) => ({
            label: reason,
            value: id,
          }))
        );
        break;
      }
      case ActionTypes.CREATE_STUDENT_LEAVE_APPLY_SUCCESS: {
        Toaster("Leave Applied Successfully", "SUCCESS");
        getAllApplication();
        props.navigation.goBack();
        break;
      }
      case ActionTypes.UPDATE_STUDENT_LEAVE_APPLY_SUCCESS: {
        Toaster("Leave Updated Successfully", "SUCCESS");
        getAllApplication();
        props.navigation.navigate("ApplyLeave");
        break;
      }
      default:
        if (serviceError) {
          Toaster(serviceError, "SYSTEM_ERROR");
        }
        break;
    }
  }, [reqStatus]);
  const getAllApplication = () => {
    getStudentLeaveApply({
      institute_id: studentDetails.instituteId,
      individual_ids: studentDetails.id,
    });
  };
  const setEditData = () => {
    const leaveDetailData =
      studentLeaveList?.find(({ id }) => id === route.params?.selectedLeave) ||
      {};
    const {
      comments,
      approvalStatus,
      startDateTime,
      endDateTime,
      studentTimeOffConfigId,
      id,
    } = leaveDetailData;

    setComments(comments);
    setTimeOffReasonId(studentTimeOffConfigId);
    setFromDate(new Date(startDateTime));
    setToDate(new Date(endDateTime));
    setFromTime(new Date(startDateTime));
    setToTime(new Date(endDateTime));
    if (
      moment(startDateTime).format("HH:mm:ss") ===
        moment(startDateTime).startOf("D").format("HH:mm:ss") &&
      moment(endDateTime).format("HH:mm:ss") ===
        moment(endDateTime).endOf("D").format("HH:mm:ss")
    ) {
      setAllDay(true);
    } else {
      setAllDay(false);
    }
    setIsEditMode(true);
    setShowForm(true);
  };

  const submitForm = () => {
    if (!timeOffReasonId || !fromDate || !toDate || !comments) {
      Toaster("All Fields are required!");
      return;
    } else if (!allDay) {
      const fromDateTime = `${moment(fromDate).format("MM/DD/YYYY")} ${moment(
        fromTime
      ).format("HH:mm:ss")}`;
      const toDateTime = `${moment(toDate).format("MM/DD/YYYY")} ${moment(
        toTime
      ).format("HH:mm:ss")}`;
      if (
        moment(fromDateTime, "MM/DD/YYYY HH:mm:ss").isAfter(
          toDateTime,
          "MM/DD/YYYY HH:mm:ss"
        )
      ) {
        Toaster("From Time should be less than To Time");
        return;
      }
    }
    const schoolYearDetail =
      studentDetails.schoolYearDetails.schoolYearHistories.find(
        ({ current }) => current
      );
    const startDateTime = allDay
      ? moment(fromDate).startOf("D").format("MM/DD/YYYY HH:mm:ss")
      : `${moment(fromDate).format("MM/DD/YYYY")} ${moment(fromTime).format(
          "HH:mm:ss"
        )}`;
    const endDateTime = allDay
      ? moment(toDate).endOf("D").format("MM/DD/YYYY HH:mm:ss")
      : `${moment(toDate).format("MM/DD/YYYY")} ${moment(toTime).format(
          "HH:mm:ss"
        )}`;
    if (!isEditMode) {
      createStudentLeaveApply({
        instituteId: studentDetails.instituteId,
        schoolYearId: schoolYearDetail.schoolYearId,
        studentIndividualId: studentDetails.id,
        timeOffReasonId,
        startDateTime,
        endDateTime,
        comments,
      });
    } else {
      updateStudentLeaveApply({
        id: route.params?.selectedLeave,
        instituteId: studentDetails.instituteId,
        schoolYearId: schoolYearDetail.schoolYearId,
        studentIndividualId: studentDetails.id,
        timeOffReasonId,
        startDateTime,
        endDateTime,
        comments,
      });
    }
  };
  const daysSelected = moment(toDate).diff(moment(fromDate), "days") + 1;
  return showForm ? (
    <View style={styles.mainContainer}>
      <Pressable
        pressRetentionOffset={{ bottom: 0, left: 0, right: 0, top: 0 }}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.EachInput}>
          <Label htmlFor="reason">
            Reason <Text color={"#C41E3A"}>*</Text>
          </Label>
          <SelectInput
            id="reason"
            placeholder={"Select Reason"}
            items={reasonOptions}
            heading={"Reason"}
            onChange={setTimeOffReasonId}
            value={timeOffReasonId}
          />
        </View>
        <View style={{ ...styles.EachInput, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Label style={styles.inputLable}>
              From Date <Text color={"#C41E3A"}>*</Text>
            </Label>
            <DatePicker
              value={fromDate}
              onDateChange={(value) => {
                setFromDate(value);
                setToDate(value);
              }}
              doneButtonLabel={"Done"}
              isNullable={true}
              iosDisplay="spinner"
              iosMode="date"
              androidMode="calendar"
              androidDisplay="calendar"
              title={"From Date"}
              InputComponent={({ togglePicker, textInputStyle }) => (
                <Pressable onPress={() => togglePicker()}>
                  <XStack alignItems="center" gap={5}>
                    <Input
                      style={{ flex: 1 }}
                      value={fromDate && moment(fromDate).format("DD/MM/YYYY")}
                      editable={false}
                    />
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      contentFit="contain"
                      source={require("../../../../assets/dateSelectorIcon.svg")}
                    />
                  </XStack>
                </Pressable>
              )}
              textColor="#000"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Label style={styles.inputLable}>
              To Date <Text color={"#C41E3A"}>*</Text>
            </Label>
            <DatePicker
              value={toDate}
              onDateChange={setToDate}
              doneButtonLabel={"Done"}
              isNullable={true}
              iosDisplay="spinner"
              iosMode="date"
              androidMode="calendar"
              androidDisplay="calendar"
              title={"To Date"}
              minimumDate={fromDate}
              InputComponent={({ togglePicker, textInputStyle }) => (
                <Pressable onPress={() => togglePicker()}>
                  <XStack alignItems="center" gap={5}>
                    <Input
                      style={{ flex: 1 }}
                      value={toDate && moment(toDate).format("DD/MM/YYYY")}
                      editable={false}
                    />
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      contentFit="contain"
                      source={require("../../../../assets/dateSelectorIcon.svg")}
                    />
                  </XStack>
                </Pressable>
              )}
              textColor="#000"
            />
          </View>
        </View>

        <XStack alignItems="center" space="$4">
          <Checkbox
            id={"allDay"}
            size={"$4"}
            defaultChecked={allDay}
            value={allDay}
            onCheckedChange={setAllDay}
          >
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox>

          <Label size={"$4"} htmlFor={"allDay"}>
            All Day
          </Label>
        </XStack>
        {allDay && (
          <Text textAlign="center">
            {fromDate &&
              `${daysSelected} ${daysSelected === 1 ? "Day" : "Days"} Selected`}
          </Text>
        )}
        {!allDay ? (
          <View style={{ ...styles.EachInput, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Label style={styles.inputLable}>
                From Time <Text color={"#C41E3A"}>*</Text>
              </Label>
              <DatePicker
                value={fromTime}
                onDateChange={setFromTime}
                doneButtonLabel={"Done"}
                isNullable={false}
                iosDisplay="spinner"
                iosMode="time"
                androidMode="time"
                androidDisplay="default"
                title={"From Time"}
                InputComponent={({ togglePicker, textInputStyle }) => (
                  <Pressable onPress={() => togglePicker()}>
                    <XStack alignItems="center" gap={5}>
                      <Input
                        value={moment(fromTime).format("hh:mm A")}
                        editable={false}
                      />
                      <CalendarClock />
                    </XStack>
                  </Pressable>
                )}
                textColor="#000"
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Label style={styles.inputLable}>
                To Time<Text color={"#C41E3A"}>*</Text>
              </Label>
              <DatePicker
                value={toTime}
                onDateChange={setToTime}
                doneButtonLabel={"Done"}
                isNullable={false}
                iosDisplay="spinner"
                iosMode="time"
                androidMode="time"
                androidDisplay="default"
                title={"To Time"}
                InputComponent={({ togglePicker, textInputStyle }) => (
                  <Pressable onPress={() => togglePicker()}>
                    <XStack alignItems="center" gap={5}>
                      <Input
                        value={moment(toTime).format("hh:mm A")}
                        editable={false}
                      />
                      <CalendarClock />
                    </XStack>
                  </Pressable>
                )}
                textColor="#000"
              />
            </View>
          </View>
        ) : null}

        <View style={styles.EachInput}>
          <Label style={styles.inputLable}>
            Comments <Text color={"#C41E3A"}>*</Text>
          </Label>
          <TextArea
            id="comments"
            size="$4"
            placeholder="Enter Comments"
            value={comments}
            onChangeText={setComments}
            required
          />
        </View>
        <XStack alignItems="center" justifyContent={"space-between"}>
          <Button
            size="$4"
            chromeless
            style={styles.secondaryButtonText}
            onPress={() => props.navigation.goBack()}
          >
            Cancel
          </Button>
          <Pressable onPress={submitForm}>
            <LinearGradient
              colors={["#02664F", "#005441"]}
              start={{ y: 1.0, x: 0.0 }}
              end={{ y: 0.0, x: 1.0 }}
              style={{ ...styles.button }}
            >
              <Text style={styles.buttonText}>
                {isEditMode ? "Edit Leave" : "Apply Leave"}
              </Text>
            </LinearGradient>
          </Pressable>
        </XStack>
      </Pressable>
    </View>
  ) : null;
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    leaveApplyReason: AppBaseReducer?.leaveApplyReason,
    reqStatus: AppBaseReducer.reqStatus,
    studentLeaveList: AppBaseReducer?.studentLeaveList?.content,
    serviceError: AppBaseReducer?.serviceError,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeaveForm);
