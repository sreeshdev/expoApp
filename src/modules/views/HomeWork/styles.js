// import { generateBoxShadowStyle } from "utils/generateShadow";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    overflow: "scroll",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  Container: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ededed",
    height: "100%",
    // ...generateBoxShadowStyle(0, 2, "#000", 0.25, 3.84, 5, "#000000"),
  },
  dateSelector: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  dateText: {
    color: "#4d575d",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5,
  },
  listContainer: {
    padding: 20,
    gap: 10,
  },
  eachList: {
    minHeight: 110,
    padding: 10,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#a3a3a3",
  },
  listValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f1e1e",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
