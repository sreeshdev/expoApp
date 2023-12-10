const { StyleSheet } = require("react-native");
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
  },
  studentCard: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f4fffc",
    borderWidth: 1,
    borderColor: "#31b796",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  tableTitle: {
    color: "#1c4a3e",
    fontSize: 15,
    fontWeight: "400",
    width: "30%",
  },
  tableValue: {
    color: "#31b796",
    fontSize: 16,
    fontWeight: "500",
    width: "70%",
  },
  button: {
    // flex: 1,
    // width: "50%",
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
});
