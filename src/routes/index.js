import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import LoginScreen from "../modules/views/LoginScreen";
import TabNavigator from "routes/TabNavigator";
import { connect } from "react-redux";
import Loader from "components/Loader/Loader";

const Stack = createStackNavigator();

const RouteContainer = (props) => (
  <View style={{ height: "100%" }}>
    <Loader show={props.isLoading} />
    <Stack.Navigator>
      {!props.isLoggedIn ? (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  </View>
);

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.AppBaseReducer.isLoggedIn,
    isLoading: state.AppBaseReducer.isLoading,
  };
};
export default connect(mapStateToProps, null)(RouteContainer);
