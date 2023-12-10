import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import { View } from "react-native";
import { ChevronRight } from "@tamagui/lucide-icons";
import {
  Avatar,
  Button,
  H5,
  Input,
  ListItem,
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
import { useIsFocused } from "@react-navigation/native";
import ContentLoader from "react-native-easy-content-loader";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Exams = (props) => {
  const {
    examsList = [{ name: "" }, { name: "" }],
    getExamRoster,
    studentDetails,
    reqStatus,
    isContentLoading,
    getOneExamData,
  } = props;
  const prevReqStatus = usePrevious(reqStatus);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllExams(null);
  }, []);

  const getAllExams = (searchValue) => {
    const schoolYearDetail =
      studentDetails.schoolYearDetails.schoolYearHistories.find(
        ({ current }) => current
      );
    getExamRoster({
      institute_id: studentDetails.instituteId,
      section_id: studentDetails.currentSectionId,
      school_year_id: schoolYearDetail?.schoolYearId,
      search_text: searchValue,
    });
  };

  const getExamDetail = (id, parentExamId) => {
    const schoolYearDetail =
      studentDetails.schoolYearDetails.schoolYearHistories.find(
        ({ current }) => current
      );
    getOneExamData({
      examId: id,
      schoolYearId: schoolYearDetail?.schoolYearId,
      individualId: studentDetails.id,
      parentExamId,
    });
  };
  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_EXAM_ROSTER_SUCCESS: {
        setRefreshing(false);
        break;
      }
      case ActionTypes.GET_ONE_EXAM_DATA_SUCCESS: {
        props.navigation.navigate("ExamsDetail");
        break;
      }
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
    getAllExams(val);
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
          placeholder="Search Exams"
          flex={1}
        />
      </View>
      <FlatList
        data={examsList}
        keyboardShouldPersistTaps={"handled"}
        scrollEnabled={true}
        keyExtractor={({ id }) => id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getAllExams(null);
            }}
          />
        }
        paddingBottom={15}
        renderItem={({ item }) => {
          const { name, id, status, description, parentExamId } = item;
          return (
            <View>
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
                  title={name}
                  icon={
                    <Avatar circular size="$6" backgroundColor={"#007e70"}>
                      <H5 color={"white"}>{name[0]}</H5>
                    </Avatar>
                  }
                  iconAfter={ChevronRight}
                  onPress={() => getExamDetail(id, parentExamId)}
                >
                  <XStack justifyContent="space-between" alignItems="center">
                    <Text flexWrap="wrap" flex={1} numberOfLines={2}>
                      {description}
                    </Text>
                    <Button
                      variant="outlined"
                      borderColor={"#4da378"}
                      color={"#4da378"}
                      fontWeight={700}
                      size="$2"
                      disabled
                    >
                      {startCase(status?.toLowerCase())}
                    </Button>
                  </XStack>
                </ListItem>
              </ContentLoader>
            </View>
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = ({ AppBaseReducer }) => {
  return {
    studentDetails: AppBaseReducer?.studentDetails,
    examsList: AppBaseReducer?.examsList?.content,
    reqStatus: AppBaseReducer?.reqStatus,
    ticketInfo: AppBaseReducer?.ticketInfo,
    isContentLoading: AppBaseReducer.isContentLoading,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Exams);
