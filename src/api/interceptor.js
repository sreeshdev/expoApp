import API from "./index";
const attachInterceptor = () => {
  API.interceptors.request.use((request) => {
    const { bootupInfo } = this.props;
    const isLoginRequest = request.url.indexOf("/oauth/token") !== -1;
    if (!isLoginRequest) {
      const { loginTokens = {} } = bootupInfo;
      const { access_token } = loginTokens;
      if (access_token) {
        request.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return request;
  });
  API.interceptors.response.use(
    (response) => {
      const reqURL = get(response, "config.url", "");
      if (reqURL.indexOf("/logout") >= 0 && response.status === 200) {
        this.redirectToLoginPage();
      }
      const { data = null } = response || {};
      return data || response;
    },
    (error) => {
      const errorStatusCode = error.response && error.response.status;
      switch (errorStatusCode) {
        case 404: {
          this.props.navigate("/404");
          return;
        }
        case 401: {
          // Un UnAuthorized access: Clear existing tokens and redirect
          localStorage.removeItem("loginTokens");
          const pageRoute = this.props.location.pathname;
          if (ExcludedRoutes.indexOf(pageRoute) === -1) {
            this.redirectToLoginPage();
          }
          return;
        }
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
};

export default attachInterceptor;
