import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card, H6, Label, Text, View, XStack, YStack } from "tamagui";
import * as Actions from "modules/actions";
import { connect } from "react-redux";
import { startCase } from "lodash";
import { Platform } from "react-native";

const EventDetails = (props) => {
  const { events, route } = props;
  const eventId = route.params.selectedEvent;
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(() => {
    setSelectedEvent(events?.find(({ id }) => id === eventId));
  }, [eventId]);

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
        <XStack justifyContent="space-between" alignItems="center">
          <H6>{selectedEvent?.title}</H6>
          <Button
            variant="outlined"
            borderColor={"#007e70"}
            color={"#007e70"}
            fontWeight={700}
            size="$2"
            disabled
          >
            {startCase(selectedEvent?.type?.toLowerCase())}
          </Button>
        </XStack>
        <Card
          elevate={Platform.OS === "ios"}
          size="$2"
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <YStack gap={5}>
              <Label>Start Date & Time</Label>
              <Text>
                {moment(selectedEvent?.startDateTime).format(
                  "DD MMM YY, hh:mm A"
                )}
              </Text>
            </YStack>
            <YStack gap={5}>
              <Label>End Date & Time</Label>
              <Text>
                {moment(selectedEvent?.endDateTime).format(
                  "DD MMM YY, hh:mm A"
                )}
              </Text>
            </YStack>
          </XStack>
        </Card>
        {/* <Button
          backgroundColor={"#007e70"}
          color={"#fcfcfc"}
          fontWeight={700}
          size="$4"
          onPress={createCalendar}
        >
          Add it to your Calendar
        </Button> */}
        <H6>Description</H6>
        <Text>{selectedEvent?.description}</Text>
      </YStack>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    events: AppBaseReducer?.events?.content,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
