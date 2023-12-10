import { Image } from "expo-image";
import React from "react";
import { Text, YStack } from "tamagui";

const EmptyState = ({
  marginTop = 150,
  message = "No Data at this moment!",
  width = 160,
  height = 160,
}) => {
  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      margin={20}
      marginTop={marginTop}
    >
      <Image
        style={{ width: width, height: height, opacity: 0.6 }}
        contentFit="contain"
        source={require("../../assets/emptyState.svg")}
      />
      <Text marginTop={15} fontSize={16}>
        {message}
      </Text>
    </YStack>
  );
};

export default EmptyState;
