const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#e8fffa",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    // resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  paddedHead: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
  },
});
