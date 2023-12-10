import axios from "axios";
// import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Actions from "modules/actions";
import { store } from "../store";

export const serviceEndPointBaseURL = "https://dev-api.eskooler.com"; //API_URL;
// const headerConfig = { Authorization: "3erf5y5rxpenr836ltg8aj3faqxl4lr5" };

const createAxiosInstance = (version) => {
  return axios.create({
    baseURL: version
      ? `${serviceEndPointBaseURL}/${version}`
      : serviceEndPointBaseURL,
    timeout: 10000,
    // headers: headerConfig,
    withCredentials: true,
    crossDomain: true,
    // rejectUnauthorized: false, //add when working with https sites
    // requestCert: false, //add when working with https sites
    // agent: false,
  });
};

export const APIv2 = createAxiosInstance("v2");
export const APIBase = createAxiosInstance("");

const API = createAxiosInstance("v1");

API.interceptors.request.use(
  async (config) => {
    const uid = await AsyncStorage.getItem("uid");
    const did = await AsyncStorage.getItem("did");
    const sid = await AsyncStorage.getItem("sid");
    const token = await AsyncStorage.getItem("token");

    if (uid) {
      config.headers.uid = uid;
    }
    if (did) {
      config.headers.did = did;
    }
    if (sid) {
      config.headers.sid = sid;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.apptype = "PARENT";
    return config;
  },
  (error) => {
    console.log(error);
  }
);
API.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    console.log(error);
    if (
      error.response.status === 401 &&
      !error.request.responseURL.includes("oauth")
    ) {
      store.dispatch(Actions.getToken("REFRESH"));
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);
export default API;