import StudentSelector from "modules/views/StudentSelector";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "modules/views/MoreScreen";
import HomeScreen from "modules/views/HomeScreen";
import TimeTable from "modules/views/TimeTable";
import HomeWork from "modules/views/HomeWork";
import AskUs from "modules/views/AskUs";
import ApplyLeave from "modules/views/ApplyLeave";
import StudentDetail from "modules/views/StudentDetail";
import { Image } from "expo-image";
import AskUsForm from "modules/views/AskUs/AskUsForm";
import AskUsChat from "modules/views/AskUs/AskUsChat";
import ApplyLeaveForm from "modules/views/ApplyLeave/ApplyLeaveForm";
import ApplyLeaveDetail from "modules/views/ApplyLeave/ApplyLeaveDetail";
import Exams from "modules/views/Exams";
import ExamDetail from "modules/views/Exams/ExamDetail";
import Staffs from "modules/views/Staffs";
import ContactUs from "modules/views/ContactUs";
import Events from "modules/views/Events";
import EventDetails from "modules/views/Events/EventDetails";
import StaffDetail from "modules/views/Staffs/StaffDetail";

const Stack = createStackNavigator();
const headerBackImage = () => (
  <Image
    style={{
      marginLeft: 10,
      width: 13,
      height: 23,
    }}
    contentFit="contain"
    source={require("../../assets/chevronLeftWhite.svg")}
  />
);

const headerRight = () => (
  <Image
    style={{
      marginRight: 30,
      width: 27,
      height: 30,
    }}
    contentFit="cover"
    source={require("../../assets/shareWhite.svg")}
  />
);
function MoreStack() {
  return (
    <Stack.Navigator
      initialRouteName="More"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#22b693",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "800",
          letterSpacing: 1,
        },
        headerStatusBarHeight: 0,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackImage,
      }}
    >
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentSelector"
        component={StudentSelector}
        options={{
          title: "Student Selector",
        }}
      />
      <Stack.Screen
        name="TimeTable"
        options={{
          title: "Timetable",
          // headerRight,
        }}
        component={TimeTable}
      />
      <Stack.Screen
        name="HomeWork"
        options={{
          title: "Home Work",
          // headerRight,
        }}
        component={HomeWork}
      />
      <Stack.Screen
        name="AskUs"
        options={{
          title: "Ask Us",
        }}
        component={AskUs}
      />
      <Stack.Screen
        name="AskUsForm"
        options={{
          title: "Ask Us",
        }}
        component={AskUsForm}
      />
      <Stack.Screen
        name="AskUsChat"
        options={({ route }) => ({
          title: route.params.pageTitle,
        })}
        component={AskUsChat}
      />
      <Stack.Screen
        name="ApplyLeave"
        options={{
          title: "Apply Leave",
        }}
        component={ApplyLeave}
      />
      <Stack.Screen
        name="ApplyLeaveForm"
        options={{
          title: "Apply Leave",
        }}
        component={ApplyLeaveForm}
      />
      <Stack.Screen
        name="ApplyLeaveDetail"
        options={{
          title: "Leave Detail",
        }}
        component={ApplyLeaveDetail}
      />
      <Stack.Screen
        name="StudentDetail"
        options={{
          title: "Student Detail",
          // headerRight,
        }}
        component={StudentDetail}
      />
      <Stack.Screen
        name="exams"
        options={{
          title: "Exams",
          // headerRight,
        }}
        component={Exams}
      />
      <Stack.Screen
        name="ExamsDetail"
        options={{
          title: "Exam Detail",
          // headerRight,
        }}
        component={ExamDetail}
      />
      <Stack.Screen
        name="Staffs"
        options={{
          title: "Staffs",
          // headerRight,
        }}
        component={Staffs}
      />
      <Stack.Screen
        name="StaffDetail"
        options={{
          title: "Staff Detail",
          // headerRight,
        }}
        component={StaffDetail}
      />
      <Stack.Screen
        name="ContactUs"
        options={{
          title: "Contact Us",
          // headerRight,
        }}
        component={ContactUs}
      />
      <Stack.Screen
        name="Events"
        options={{
          title: "Events",
          // headerRight,
        }}
        component={Events}
      />
      <Stack.Screen
        name="EventDetail"
        options={{
          title: "Event Detail",
          // headerRight,
        }}
        component={EventDetails}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#22b693",
        },
        headerTintColor: "#fff",
        headerStatusBarHeight: 0,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackImage,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudentSelector"
        component={StudentSelector}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TimeTable"
        options={{
          title: "Timetable",
          // headerRight,
        }}
        component={TimeTable}
      />
      <Stack.Screen
        name="AskUs"
        options={{
          title: "Ask Us",
        }}
        component={AskUs}
      />
      <Stack.Screen
        name="AskUsForm"
        options={{
          title: "Ask Us",
        }}
        component={AskUsForm}
      />
      <Stack.Screen
        name="AskUsChat"
        options={({ route }) => ({
          title: route.params.pageTitle,
        })}
        component={AskUsChat}
      />
      <Stack.Screen
        name="ApplyLeave"
        options={{
          title: "Apply Leave",
        }}
        component={ApplyLeave}
      />
      <Stack.Screen
        name="ApplyLeaveForm"
        options={{
          title: "Apply Leave",
        }}
        component={ApplyLeaveForm}
      />
      <Stack.Screen
        name="ApplyLeaveDetail"
        options={{
          title: "Leave Detail",
        }}
        component={ApplyLeaveDetail}
      />
      <Stack.Screen
        name="exams"
        options={{
          title: "Exams",
          // headerRight,
        }}
        component={Exams}
      />
      <Stack.Screen
        name="ExamsDetail"
        options={{
          title: "Exam Detail",
          // headerRight,
        }}
        component={ExamDetail}
      />
      <Stack.Screen
        name="Staffs"
        options={{
          title: "Staffs",
          // headerRight,
        }}
        component={Staffs}
      />
      <Stack.Screen
        name="ContactUs"
        options={{
          title: "Contact Us",
          // headerRight,
        }}
        component={ContactUs}
      />
      <Stack.Screen
        name="Events"
        options={{
          title: "Events",
          // headerRight,
        }}
        component={Events}
      />
      <Stack.Screen
        name="EventDetail"
        options={{
          title: "Event Detail",
          // headerRight,
        }}
        component={EventDetails}
      />
      <Stack.Screen
        name="StudentDetail"
        options={{
          title: "Student Detail",
          // headerRight,
        }}
        component={StudentDetail}
      />
      <Stack.Screen
        name="StaffDetail"
        options={{
          title: "Staff Detail",
          // headerRight,
        }}
        component={StaffDetail}
      />
    </Stack.Navigator>
  );
}

export { MoreStack, HomeStack };
