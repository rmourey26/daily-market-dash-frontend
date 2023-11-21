import axios from "axios";
import { getCookie, setCookieTime } from "src/utils/Cookies";
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_key = process.env.REACT_APP_CLIENT_KEY;
const baseURL = process.env.REACT_APP_BASE_URL;

const isTokenSet = getCookie("isTokenSet")

const axiosInstance = axios.create({
   baseURL: baseURL,
});

const refreshToken = async () => await axiosInstance
   .post("/token/", {
      action: "authenticate",
      client: client_id,
      key: client_key,
   })
   .then(function (response) {
      window.localStorage.setItem("data", JSON.stringify(response.data));
   })
   .catch(function (error) {
      console.log(error);
   });


var currentUser = "";
if (!currentUser) {
   axiosInstance
      .post("/token/", {
         action: "authenticate",
         client: client_id,
         key: client_key,
      })
      .then(function (response) {
         let url = window.location.href;
         let isClear = false;

         if (url.includes("localhost")) {
            url = url.split(":3000")[1] || "";
            if (url.trim() === "/") {
               isClear = true;
            }
         } else {
            url = url.split(".com")[1] || "";
            if (url.trim() === "/") {
               isClear = true;
            }
         }

         if (window.location.href.includes("AdditionalPassword") || isClear) {
            localStorage.clear();
         }

         window.localStorage.setItem("data", JSON.stringify(response.data));
      })
      .catch(function (error) {
         console.log(error);
      });

   setInterval(() => {
      refreshToken()
   }, 1750000);
}


const requestHandler = async (request) => {
   let requestUrl = request?.url
   let requestData = request?.data?.action
   const deviceId = window.localStorage.getItem("deviceId");
   const appId = JSON.parse(window.localStorage.getItem("data")).appid;
   const appIdExists = window.localStorage.getItem("appid");
   let sendAppid;
   if (appIdExists) {
      sendAppid = appIdExists;
   } else {
      sendAppid = appId;
   }

   const authToken = JSON.parse(window.localStorage.getItem("data")).token;
   if (!request.headers.token) request.headers.token = authToken;
   if (deviceId !== "") request.headers.device = deviceId;
   if (appId !== "") request.headers.appid = sendAppid;


   if (requestUrl == "/members/" && requestData == "status") {
      request.headers.device = null
   }

   return request;
};

const responseHandler = (response) => {
   return response;
};

const errorHandler = (errors) => {
   setTimeout(() => {
      if (!isTokenSet)
         refreshToken()
      setCookieTime("isTokenSet", true, 1)
   }, 1000)
   return Promise.reject(errors);
};

axiosInstance.interceptors.request.use(
   (request) => requestHandler(request),
   (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
   (response) => responseHandler(response),
   (error) => errorHandler(error)
);

export default axiosInstance;
