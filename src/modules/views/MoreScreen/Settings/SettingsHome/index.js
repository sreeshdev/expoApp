import {
  BellDot,
  ChevronRight,
  LogOut,
  Speaker,
  Star,
  UserPlus2,
} from "@tamagui/lucide-icons";
import React from "react";
import {
  ListItem,
  Separator,
  Text,
  YGroup,
  YStack,
} from "tamagui";
import * as Actions from "modules/actions";
import { connect } from "react-redux";

const SettingsHome = (props) => {
  return (
    <YStack gap={5} backgroundColor="#e8fffa" height={"100%"}>
      {/* <XStack
        justifyContent="center"
        paddingTop={10}
        alignItems="center"
        position="relative"
      >
        <Button
          style={{
            position: "absolute",
            left: 0,
          }}
          size="$2"
          chromeless
          padding={0}
          onPress={() => props.navigation.navigate("MoreStack")}
        >
          <Image
            style={{
              width: 32,
              height: 32,
            }}
            contentFit="contain"
            source={require("../../../../../assets/close.svg")}
          />
        </Button>
        <Text fontSize={20} fontWeight={700}>
          Settings
        </Text>
      </XStack> */}
      <Separator marginBottom={10} />
      <YStack paddingHorizontal={10}>
        <Text fontWeight={700} fontSize={20} marginBottom={5}>
          PREFERENCES
        </Text>
        <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              icon={BellDot}
              title="Push Notification"
              iconAfter={ChevronRight}
              onPress={() => props.navigation.navigate("PushNotification")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              icon={Speaker}
              iconAfter={ChevronRight}
              // onPress={() => setOpenPage("SOUNDS")}
            >
              Sounds
            </ListItem>
          </YGroup.Item>
        </YGroup>
        <Separator marginVertical={15} />
        <Text fontWeight={700} fontSize={20} marginBottom={5}>
          GENERAL
        </Text>
        <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              icon={UserPlus2}
              title="Invite People"
              iconAfter={ChevronRight}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              icon={Star}
              iconAfter={ChevronRight}
            >
              Rate our App
            </ListItem>
          </YGroup.Item>
        </YGroup>
        <YGroup
          alignSelf="center"
          bordered
          size="$5"
          separator={<Separator />}
          marginVertical={10}
        >
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              icon={LogOut}
              backgroundColor={"#D2042D"}
              color="#fff"
              onPress={() => props.logout()}
            >
              Log Out
            </ListItem>
          </YGroup.Item>
        </YGroup>
      </YStack>
    </YStack>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    reqStatus: AppBaseReducer?.reqStatus,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsHome);
