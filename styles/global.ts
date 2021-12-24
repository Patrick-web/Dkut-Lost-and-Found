import { StyleSheet } from "react-native";

export const tabStyles = StyleSheet.create({
  tabDefaults: {
    backgroundColor: "white",
    position: 'relative',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
})
export const formStyles = StyleSheet.create({
  input: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#FF9387",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
  },
  form: {
    zIndex: 2,
    width: "80%",
    backgroundColor: "white",
    marginTop: 40,
    padding: 20,
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    shadowColor: '#52006A',
  },
})

