import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ChevronRight } from "@tamagui/lucide-icons";
import {
  Avatar,
  Button,
  H5,
  Input,
  ListItem,
  ScrollView,
  Separator,
  Text,
  XStack,
  YGroup,
} from "tamagui";
import { connect } from "react-redux";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import usePrevious from "utils/usePrevious";
import { debounce, startCase } from "lodash";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader from "react-native-easy-content-loader";
import { RefreshControl } from "react-native";

const ApplyLeave = (props) => {
  const {
    studentLeaveList = [{ reason: "" }, { reason: "" }],
    getStudentLeaveApply,
    studentDetails,
    reqStatus,
    isContentLoading,
  } = props;
  const prevReqStatus = usePrevious(reqStatus);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getAllApplication(null);
  }, []);
  const getAllApplication = (searchValue) => {
    getStudentLeaveApply({
      institute_id: studentDetails.instituteId,
      individual_ids: studentDetails.id,
      search_text: searchValue,
    });
  };
  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_STUDENT_LEAVE_APPLY_SUCCESS:
        setRefreshing(false);
        break;
    }
  }, [reqStatus]);

  const handleSearchInput = (val) => {
    if (val) {
      setSearch(val);
      debounceFn(val);
    } else {
      setSearch(null);
      debounceFn(null);
    }
  };
  const debouncedCategoryFilter = (val) => {
    getAllApplication(val);
  };
  const debounceFn = useCallback(debounce(debouncedCategoryFilter, 300), []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.paddedHead}>
        <Input
          size={"$4"}
          borderRadius={50}
          onChangeText={handleSearchInput}
          value={search}
          placeholder="Search Leaves"
          flex={1}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getAllApplication(null);
            }}
          />
        }
      >
        <YGroup
          alignSelf="center"
          width={"100%"}
          size="$5"
          separator={<Separator />}
        >
          {studentLeaveList?.map(
            ({ reason, id, approvalStatus, startDateTime, endDateTime }) => (
              <YGroup.Item>
                <ContentLoader
                  titleStyles={{ marginTop: 10, marginBottom: 20 }}
                  avatar
                  aSize={64}
                  active
                  title={true}
                  pRows={1}
                  pWidth={"100%"}
                  loading={isContentLoading}
                  containerStyles={{ paddingBottom: 5, paddingTop: 5 }}
                >
                  <ListItem
                    hoverTheme
                    pressTheme
                    title={reason}
                    icon={
                      <Avatar circular size="$6" backgroundColor={"#007e70"}>
                        <H5 color={"white"}>{reason[0]}</H5>
                      </Avatar>
                    }
                    iconAfter={ChevronRight}
                    onPress={() =>
                      props.navigation.navigate("ApplyLeaveDetail", {
                        selectedLeave: id,
                      })
                    }
                  >
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text flexWrap="wrap" flex={1}>
                        {moment(startDateTime).format("DD MMM")} -{" "}
                        {moment(endDateTime).format("DD MMM")}
                      </Text>
                      <Button
                        variant="outlined"
                        borderColor={"#4da378"}
                        color={"#4da378"}
                        fontWeight={700}
                        size="$2"
                        disabled
                      >
                        {startCase(approvalStatus?.toLowerCase())}
                      </Button>
                    </XStack>
                  </ListItem>
                </ContentLoader>
              </YGroup.Item>
            )
          )}
        </YGroup>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate("ApplyLeaveForm")}
        style={styles.touchableOpacityStyle}
      >
        <Image
          source={require("../../../assets/AddFabButton.svg")}
          style={styles.floatingButtonStyle}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    studentLeaveList: AppBaseReducer?.studentLeaveList?.content,
    reqStatus: AppBaseReducer?.reqStatus,
    ticketInfo: AppBaseReducer?.ticketInfo,
    isContentLoading: AppBaseReducer.isContentLoading,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeave);
