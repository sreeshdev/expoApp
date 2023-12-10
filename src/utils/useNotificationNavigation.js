import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";
// Custom hook for navigation
export const useNotificationNavigation = () => {
  const { reqStatus, ticketInfo, organizations, studentDetails } = useSelector(
    ({ AppBaseReducer }) => AppBaseReducer
  );
  const dispatch = useDispatch();
  const [orgLogo, setOrgLogo] = useState(null);
  const navigation = useNavigation();
  const prevReqStatus = usePrevious(reqStatus);
  useEffect(() => {
    const orgDetail = organizations.find(
      ({ id }) => id === studentDetails.organizationId
    );
    setOrgLogo(orgDetail?.logoAssetDetails?.accessUrl);
  }, []);

  useEffect(() => {
    if (reqStatus === prevReqStatus) return;
    if (!prevReqStatus) return;
    switch (reqStatus) {
      case ActionTypes.GET_ONE_TICKET_INFO_SUCCESS: {
        navigation.navigate("AskUsChat", {
          pageTitle: ticketInfo.subject,
          orgLogo,
        });
        break;
      }
    }
  }, [reqStatus]);

  const navigateToScreen = (actionType, metaData = {}) => {
    const currentTypeData = metaData?.hasOwnProperty([
      actionType?.toLowerCase(),
    ])
      ? metaData?.[actionType?.toLowerCase()]
      : "";
    console.log(currentTypeData, metaData, actionType);
    switch (actionType) {
      case "STUDENT_ASK_US": {
        dispatch(Actions.getTicketInfo({ id: currentTypeData?.id }));
        break;
      }
      default: {
        navigation.navigate("Home");
        break;
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return {
    navigateToScreen,
    goBack,
  };
};
