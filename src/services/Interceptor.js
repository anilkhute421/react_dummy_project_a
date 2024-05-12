import axios from "axios";
import { loginSuccess } from "../app/Auth/Login/LoginStore";
import { store } from "../app/store";
import { apiVersion, BaseUrl } from "../Utils/Constanturl";

// const EndPoint = BaseUrl + apiVersion;

const EndPoint = process.env.REACT_APP_TEMP_BASEURL + process.env.REACT_APP_API_VERSION;

const Api = axios.create({
  timeout: 1000000,
  baseURL: EndPoint,
});

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// Api.defaults.headers.post["module_type"] = "HELLO";
Api.interceptors.request.use(
  (config) => {
    if (store?.getState()?.loginAuth?.token) {
      const token = `Bearer ${store.getState().loginAuth.token}`;
      const lang = store.getState().languageDirection.language;
      config.headers = {
        Authorization: token,
        "Accept-Language": lang,
        // "module_type": "/aglut/menu/sections"
      };
    } else {
      const lang = store.getState().languageDirection.language;
      config.headers = {
        "Accept-Language": lang,
      };
    }
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
Api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      store.dispatch(
        loginSuccess({
          email: null,
          password: null,
        })
      );
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
