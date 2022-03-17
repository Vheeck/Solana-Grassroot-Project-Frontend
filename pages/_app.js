import "../styles/globals.css";

import { useState, useEffect, useReducer, useMemo } from "react";
import { useRouter } from "next/router";
import Auth, { AuthContext, checkLoginStatus } from "../components/Auth";
import Loading from "../components/Loading";
import CreateProfile from "../components/CreateProfile";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const initialLoginState = {
    email: "",
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
          email: action.email,
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
      signIn: (data) => {
        dispatch({ type: "LOGIN", ...data });
      },
      profileCreated: (data) => {
        dispatch({ type: "RETRIEVE_TOKEN", ...data });
      },
      signOut: () => {
        dispatch({ type: "LOGOUT", ...initialLoginState });
      },
      signUp: (data) => {
        dispatch({ type: "REGISTER", ...data });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      const data = await checkLoginStatus();
      console.log("data", data)
      dispatch({
        type: "RETRIEVE_TOKEN",
        ...data,
      });
    }, 1);
  }, []);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  if (loginState.isLoading) {
    return <Loading />;
  }

  if (!loginState.isLoggedIn) {
    return (
      <AuthContext.Provider value={authContext}>
        <Auth />
      </AuthContext.Provider>
    );
  }

  const { publicAddress, email, profile } = loginState;

  if (!loginState.isProfiled) {
    return <CreateProfile {...{ publicAddress, email }} />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Component {...pageProps} profile={profile} />
    </AuthContext.Provider>
  );
}

export default MyApp;
