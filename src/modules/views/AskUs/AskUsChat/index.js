import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Avatar,
  Button,
  H5,
  Input,
  Separator,
  Spinner,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { Send } from "@tamagui/lucide-icons";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { connect } from "react-redux";
import moment from "moment";
import usePrevious from "utils/usePrevious";
import { Image } from "expo-image";

const AskUsChat = (props) => {
  const {
    ticketInfo,
    parentDetails,
    addMessageToTicket,
    reqStatus,
    isContentLoading,
    route,
  } = props;
  const orgLogo = route.params.orgLogo;
  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState([]);
  const prevReqStatus = usePrevious(reqStatus);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    setMessages([...ticketInfo.messages]);
  }, []);
  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.ADD_MESSAGE_TO_TICKET_SUCCESS: {
        // props.navigation.goBack();
        const newMessage = {
          senderName: parentDetails.fullName,
          sender: parentDetails.id,
          createdTs: moment().format(),
          content: chatText,
        };
        setMessages((prev) => [newMessage, ...prev]);
        setChatText("");
        break;
      }
    }
  }, [reqStatus]);
  const sendMessage = () => {
    if (chatText) {
      Keyboard.dismiss();
      addMessageToTicket({ id: ticketInfo.id, comment: chatText });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 150}
      style={{ flex: 1 }}
      windowSize={1}
      enabled
    >
      {/* {messages.length ? ( */}
      <FlatList
        inverted
        ref={scrollViewRef}
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        enableEmptySections
        data={messages}
        renderItem={({ item }) => (
          <ChatItem
            message={item}
            parentDetails={parentDetails}
            orgLogo={orgLogo}
          />
        )}
        keyExtractor={({ messageId }) => messageId}
      />
      {/* ) : null} */}

      <Separator marginVertical={5} />
      {ticketInfo.editable ? (
        <XStack
          alignSelf="flex-end"
          alignItems="center"
          justifyContent="space-between"
          gap={10}
          paddingBottom={10}
          paddingHorizontal={10}
          // height={80}
        >
          <Input
            size={"$3"}
            onChangeText={setChatText}
            value={chatText}
            placeholder="Send Messages"
            flex={1}
            multiline={true}
          />
          <Button
            alignSelf="center"
            icon={
              isContentLoading ? <Spinner size="small" color="#fff" /> : Send
            }
            size="$3"
            scaleIcon={1.4}
            backgroundColor={"#22b693"}
            onPress={sendMessage}
            disabled={isContentLoading}
          />
        </XStack>
      ) : null}
    </KeyboardAvoidingView>
    // </YStack>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    parentDetails: AppBaseReducer?.parentDetails,
    reqStatus: AppBaseReducer?.reqStatus,
    ticketInfo: AppBaseReducer?.ticketInfo,
    isContentLoading: AppBaseReducer?.isContentLoading,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AskUsChat);

const ChatItem = ({ message, parentDetails, orgLogo }) => {
  const { senderName, sender, content, createdTs, messageId } = message;
  const SEND_BY_OWNER = parentDetails.id === sender;
  return !SEND_BY_OWNER ? (
    <XStack width={"100%"} gap={10} key={messageId} padding={5}>
      <Avatar circular size="$3" backgroundColor={orgLogo ? "#fff" : "#007e70"}>
        {orgLogo ? (
          <Image
            style={{ width: 28, height: 25 }}
            contentFit="contain"
            source={orgLogo}
          />
        ) : (
          <H5 color={"white"}>{senderName ? senderName[0] : "R"}</H5>
        )}
      </Avatar>
      <XStack
        backgroundColor={"#b8f0e852"}
        maxWidth={300}
        borderRadius={10}
        padding={10}
      >
        <YStack gap={5}>
          <XStack justifyContent="space-between">
            <Text
              numberOfLines={1}
              fontSize={12}
              textAlign="left"
              fontWeight={700}
            >
              {senderName}
            </Text>
            <Text fontSize={11} fontWeight={600}>
              {moment(createdTs).format("DD MMM hh:mm A")}
            </Text>
          </XStack>
          <Text>{content}</Text>
        </YStack>
      </XStack>
    </XStack>
  ) : (
    <XStack
      width={"100%"}
      gap={10}
      justifyContent="flex-end"
      key={messageId}
      padding={5}
    >
      <XStack
        backgroundColor={"#08d59d7a"}
        maxWidth={300}
        borderRadius={10}
        padding={10}
      >
        <YStack gap={5}>
          <XStack justifyContent="space-between">
            <Text fontSize={11} fontWeight={600}>
              {moment(createdTs).format("DD MMM hh:mm A")}
            </Text>
            <Text
              numberOfLines={1}
              fontSize={12}
              textAlign="left"
              fontWeight={800}
            >
              {senderName}
            </Text>
          </XStack>
          <Text>{content}</Text>
        </YStack>
      </XStack>
      <Avatar circular size="$3" backgroundColor={"#007e70"}>
        <H5 color={"white"}>{senderName ? senderName[0] : "U"}</H5>
      </Avatar>
    </XStack>
  );
};
