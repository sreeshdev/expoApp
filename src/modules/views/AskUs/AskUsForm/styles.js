const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#e8fffa",
    padding: 30,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  EachInput: {
    marginBottom: 10,
  },
  inputLable: {
    color: "#292929",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 3,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "#015744",
    fontSize: 18,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#ffffff",
  },
});
