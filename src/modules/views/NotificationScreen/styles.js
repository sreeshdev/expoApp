const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderColor: "#c6c6c6",
    borderWidth: 1,
    borderRadius: 16,
    height: 36,
  },
  paddedHead: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  Head: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#414141",
  },
  eachNotification: {
    backgroundColor: "#e8fffa",
    minHeight: 110,
    marginBottom: 10,
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
  },
  notificationLeft: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 18,
  },
  notificationTypeIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#007e70",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "500",
  },
  notificationRight: {
    justifyContent: "space-between",
    padding: 18,
    paddingRight: 60,
    paddingLeft: 10,
  },
  notificationHead: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#313131",
  },
  noticationBody: {
    fontSize: 14,
    fontWeight: "400",
    color: "#292929",
  },
  notificationTime: {
    fontSize: 10,
    fontWeight: "500",
    color: "#727272",
  },
});
