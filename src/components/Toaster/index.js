import { Platform } from "react-native";
import Toast from "react-native-root-toast";

const Toaster = (notificationData, type = "ERROR") => {
  const message =
    type === "SYSTEM_ERROR"
      ? Array.isArray(notificationData?.response?.data?.details?.errors)
        ? notificationData?.response?.data?.details?.errors
            ?.map(({ message }) => message)
            .join(".\n\n")
        : notificationData?.response?.data?.code
        ? notificationData?.response?.data?.code
        : "Something went wrong!"
      : notificationData;
  const position = Platform.OS === "ios" ? 100 : 60;
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: ["ERROR", "SYSTEM_ERROR"].includes(type)
      ? "#D22B2B"
      : "#08d59d",
    textColor: ["ERROR", "SYSTEM_ERROR"].includes(type) ? "#fff" : "#000000",
  });
};

export default Toaster;
