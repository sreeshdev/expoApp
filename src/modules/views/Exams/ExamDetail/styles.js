const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#e8fffa",
    padding: 15,
  },
  innerContainer: {
    width: "100%",
    padding: 10,
    minHeight: 90,
  },
  eachSubject: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  subjectDetail: {
    borderColor: "#a2e0d1",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  subjectName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#272727",
    textAlign: "center",
  },
  periodTime: {
    fontSize: 11,
    fontWeight: "600",
    color: "#676767",
  },
  CardHead: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
