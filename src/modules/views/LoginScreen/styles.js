const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    height: "100%",
    padding: 0,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    flexDirection: "column",
    height: "40%",
    padding: 0,
  },
  bgimage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerBanner: {
    height: 100,
    backgroundColor: "#0055422B",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "column",
    height: "40%",
    alignItems: "center",
    paddingTop: 60,
    padding: 40,
    gap: 25,
  },
  head: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
  },
  loginButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 6,
  },
  rightAlined: {
    marginTop: 20,
    width: "100%",
    alignItems: "flex-end",
  },
  biometricContainer: {
    height: "24%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#adadad",
    marginLeft: 20,
    marginRight: 20,
  },
  GreenText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#005542",
  },
  emptyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
});
