import Toaster from "components/Toaster";
import React, { memo } from "react";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Text } from "tamagui";

const screenWidth = Dimensions.get("window").width;

const OverallAttendanceChart = ({ studentAttendance }) => {
  const overallAttendanceChartData = studentAttendance?.map(
    ({ acquiredPercentage, courseName }, idx) => ({
      value: acquiredPercentage,
      label: courseName,
      frontColor: "#4ADDBA",
      topLabelComponent: () => (
        <Text
          style={{
            color: "#055c47",
            fontSize: 12,
            marginBottom: 1,
          }}
        >
          {acquiredPercentage}
        </Text>
      ),
    })
  );

  return (
    <BarChart
      data={overallAttendanceChartData}
      barWidth={35}
      maxValue={100}
      barBorderRadius={4}
      yAxisLabelSuffix="%"
      onPress={(item, index) =>
        Toaster(`${item.label} - ${item.value}`, "SUCCESS")
      }
      width={screenWidth - 120}
      isAnimated
      noOfSections={4}
    />
  );
};

export default memo(OverallAttendanceChart);
