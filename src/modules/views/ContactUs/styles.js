const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    overflow: "scroll",
    width: "100%",
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  innerContainer: {
    width: "100%",
    padding: 10,
    minHeight: 100,
  },
});
