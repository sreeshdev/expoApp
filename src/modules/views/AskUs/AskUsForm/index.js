import { LinearGradient } from "expo-linear-gradient";
import { Button, Input, Label, Text, TextArea, XStack } from "tamagui";
import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import SelectInput from "components/SelectInput";
import Toaster from "components/Toaster";
import usePrevious from "utils/usePrevious";

const AskUsForm = (props) => {
  const {
    studentDetails,
    askUsCategories,
    getCommunicationCategory,
    reqStatus,
    createTickets,
    getTickets,
  } = props;
  const [parentMessageCategoryId, setParentMessageCategoryId] = useState(null);
  const [subject, setSubject] = useState(null);
  const [comments, setComments] = useState(null);
  const prevReqStatus = usePrevious(reqStatus);

  useEffect(() => {
    getCommunicationCategory({ instituteId: studentDetails.instituteId });
  }, []);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.CREATE_TICKET_SUCCESS: {
        Toaster("Ticket Created Successfully", "SUCCESS");
        getAllTickets();
        props.navigation.goBack();
        break;
      }
    }
  }, [reqStatus]);
  const getAllTickets = () => {
    getTickets({
      institute_id: studentDetails.instituteId,
      individual_ids: studentDetails.id,
    });
  };
  const submitForm = () => {
    if (!parentMessageCategoryId || !subject || !comments) {
      Toaster("All Fields are required!");
    } else {
      createTickets({
        instituteId: studentDetails.instituteId,
        studentIndividualId: studentDetails.id,
        parentMessageCategoryId,
        subject,
        comments,
      });
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Pressable
        pressRetentionOffset={{ bottom: 0, left: 0, right: 0, top: 0 }}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.EachInput}>
          <Label htmlFor="category">
            Category <Text color={"#C41E3A"}>*</Text>
          </Label>
          <SelectInput
            id="category"
            placeholder={"Select Category"}
            items={askUsCategories?.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
            heading={"Category"}
            onChange={setParentMessageCategoryId}
          />
        </View>
        <View style={styles.EachInput}>
          <Label htmlFor="subject">
            Subject <Text color={"#C41E3A"}>*</Text>
          </Label>
          <Input
            id="subject"
            size="$4"
            placeholder="Enter Subject"
            onChangeText={setSubject}
            required
          />
        </View>
        <View style={styles.EachInput}>
          <Label htmlFor="comments">
            Comments <Text color={"#C41E3A"}>*</Text>
          </Label>
          <TextArea
            id="comments"
            size="$4"
            placeholder="Enter Comments"
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
              <Text style={styles.buttonText}>Create a Ticket</Text>
            </LinearGradient>
          </Pressable>
        </XStack>
      </Pressable>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    askUsCategories: AppBaseReducer?.askUsCategories,
    reqStatus: AppBaseReducer.reqStatus,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AskUsForm);
