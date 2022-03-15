import "../styles/globals.css";

import { useState, useEffect, useReducer, useMemo } from "react";
import { useRouter } from "next/router";
import Auth, { AuthContext, checkLoginStatus } from "../components/Auth";
import Loading from "../components/Loading";
import CreateProfile from "../components/CreateProfile";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const initialLoginState = {
    isLoading: true,
    isLoggedIn: false,
    isProfiled: false,
    profile: null,
    publicAddress: "",
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          isLoading: false,
          isLoggedIn: action.isLoggedIn,
          isProfiled: action.isProfiled,
          profile: action.profile,
          publicAddress: action.publicAddress,
        };
      case "LOGIN":
        return {
          ...prevState,
          userData: action.userData,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userData: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userData: action.userData,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: (userData) => {
        dispatch({ type: "LOGIN", userData: userData });
      },
      signOut: () => {
        localStorage.removeItem("publicAddress");
        dispatch({ type: "LOGOUT" });
      },
      signUp: (userData) => {
        dispatch({ type: "REGISTER", userData: userData });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      const data = await checkLoginStatus();
      dispatch({
        type: "RETRIEVE_TOKEN",
        ...data,
      });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <Loading />;
  }

  if (!loginState.isLoggedIn) {
    return <Auth />;
  }

  if (!loginState.isProfiled) {
    return <CreateProfile />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Component {...pageProps} profile={loginState.profile} />
    </AuthContext.Provider>
  );
}

export default MyApp;
