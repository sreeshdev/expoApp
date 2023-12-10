// import { generateBoxShadowStyle } from "utils/generateShadow";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    overflow: "scroll",
    width: "100%",
  },
  container: {
    padding: 10,
    height: "100%",
  },
  dailyTimetable: {
    height: 150,
    backgroundColor: "#ffffff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ededed",
    borderRadius: 5,
    marginBottom: 10,
    // ...generateBoxShadowStyle(0, 2, "#000", 0.25, 3.84, 5, "#000000"),
  },
  weeklyTimetable: {
    height: "72%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ededed",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    // ...generateBoxShadowStyle(0, 2, "#000", 0.25, 3.84, 5, "#000000"),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3134",
  },
  dailyContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  eachPeriod: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodDetail: {
    borderColor: "#a2e0d1",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  subjectName: {
    fontSize: 10,
    fontWeight: "700",
    color: "#272727",
  },
  periodTime: {
    fontSize: 8,
    fontWeight: "500",
    color: "#676767",
  },
  periodName: {
    fontSize: 10,
    fontWeight: "500",
    color: "#272727",
  },
  weeklyContainer: {
    flexDirection: "row",
  },
  eachDay: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  dayTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
  },
  pickerStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 40,
    width: 200,
  },
});
