import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import { RefreshControl, TouchableOpacity, View } from "react-native";
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

const AskUs = (props) => {
  const {
    ticketList,
    getTickets,
    getTicketInfo,
    studentDetails,
    ticketInfo,
    reqStatus,
    organizations,
  } = props;
  const prevReqStatus = usePrevious(reqStatus);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [orgLogo, setOrgLogo] = useState(null);
  useEffect(() => {
    getAllTickets(null);
    const orgDetail = organizations.find(
      ({ id }) => id === studentDetails.organizationId
    );
    setOrgLogo(orgDetail?.logoAssetDetails?.accessUrl);
  }, []);
  const getAllTickets = (searchValue) => {
    getTickets({
      institute_id: studentDetails.instituteId,
      individual_ids: studentDetails.id,
      search_text: searchValue,
    });
  };
  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_TICKET_SUCCESS: {
        setRefreshing(false);
        break;
      }
      case ActionTypes.GET_ONE_TICKET_INFO_SUCCESS: {
        // props.navigation.goBack();
        props.navigation.navigate("AskUsChat", {
          pageTitle: ticketInfo.subject,
          orgLogo,
        });
        break;
      }
    }
  }, [reqStatus]);
  const getTicketInformation = (id) => {
    getTicketInfo({ id });
  };
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
    getAllTickets(val);
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
          placeholder="Search Ticket"
          flex={1}
        />
        {/* <Button
          alignSelf="center"
          icon={Search}
          size="$4"
          scaleIcon={1.2}
          backgroundColor={"#22b693"}
        /> */}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getAllTickets(null);
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
          {ticketList?.map(({ subject, id, status, createdTs }) => (
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                title={subject}
                icon={
                  <Avatar circular size="$6" backgroundColor={"#007e70"}>
                    <H5 color={"white"}>{subject[0]}</H5>
                  </Avatar>
                }
                iconAfter={ChevronRight}
                onPress={() => getTicketInformation(id)}
              >
                <XStack justifyContent="space-between">
                  <Text flexWrap="wrap" flex={1}>
                    {moment(createdTs).format("DD MMM, hh:mm A")}
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
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate("AskUsForm")}
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
    ticketList: AppBaseReducer?.ticketList?.content,
    reqStatus: AppBaseReducer?.reqStatus,
    ticketInfo: AppBaseReducer?.ticketInfo,
    organizations: AppBaseReducer?.organizations,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(AskUs);
