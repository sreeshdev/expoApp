import { createDrawerNavigator } from "@react-navigation/drawer";
import StudentSelector from "modules/views/StudentSelector";
import TabNavigator from "routes/TabNavigator";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Student Selector" component={StudentSelector} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
