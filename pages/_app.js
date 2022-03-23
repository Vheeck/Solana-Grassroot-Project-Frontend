import "../styles/globals.css";

import Head from "next/head";
import Script from "next/script";
import { AppProps } from "next/app";

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
      console.log("data", data);
      dispatch({
        type: "RETRIEVE_TOKEN",
        ...data,
      });
    }, 1);

    document.body.className = "theme-light";
    document.querySelector("#page").style.display = "block";

    const script = (src) => {
      const script = document.createElement("script");
      script.src = src;
      return script;
    };

    document.body.append(
      script("scripts/bootstrap.min.js"),
      script("scripts/custom.js")
    );
  }, []);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  const { publicAddress, email, profile } = loginState;

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <title>Grassroots</title>
        <link rel="stylesheet" type="text/css" href="styles/bootstrap.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="fonts/bootstrap-icons.css"
        />
        <link rel="stylesheet" type="text/css" href="styles/style.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="_manifest.json" />
        <meta id="theme-check" name="theme-color" content="#FFFFFF" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="app/icons/icon-192x192.png"
        />
      </Head>
      {loginState.isLoading ? (
        <Loading />
      ) : (
        ""
      )}

      <div id="page">
        <MainTheme>
          {!loginState.isLoading ? (
            <AuthContext.Provider value={authContext}>
              {!loginState.isLoggedIn ? (
                <Auth />
              ) : !loginState.isProfiled ? (
                <CreateProfile {...{ publicAddress, email }} />
              ) : (
                <Component {...pageProps} profile={profile} />
              )}
            </AuthContext.Provider>
          ) : (
            ""
          )}
        </MainTheme>
      </div>
    </>
  );
}

const MainTheme = ({ children }) => (
  <>
    <div id="footer-bar" className="footer-bar-1 footer-bar-detached">
      <a href="page-wallet.html">
        <i className="bi bi-wallet2"></i>
        <span>Cards</span>
      </a>
      <a href="page-activity.html">
        <i className="bi bi-graph-up"></i>
        <span>Activity</span>
      </a>
      <a href="index-waves.html" className="circle-nav-2">
        <i className="bi bi-house-fill"></i>
        <span>Home</span>
      </a>
      <a href="page-payments.html">
        <i className="bi bi-receipt"></i>
        <span>Payments</span>
      </a>
      <a href="#" data-bs-toggle="offcanvas" data-bs-target="#menu-sidebar">
        <i className="bi bi-three-dots"></i>
        <span>More</span>
      </a>
    </div>

    <div className="page-content footer-clear">{children}</div>

    <div
      id="menu-sidebar"
      data-menu-active="nav-welcome"
      data-menu-load="menu-sidebar.html"
      className="offcanvas offcanvas-start offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-highlights"
      data-menu-load="menu-highlights.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-notifications"
      data-menu-load="menu-notifications.html"
      className="offcanvas offcanvas-top offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-card-more"
      data-menu-load="menu-card-settings.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-transfer"
      data-menu-load="menu-transfer.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>
    <div
      id="menu-friends-transfer"
      data-menu-load="menu-friends-transfer.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-request"
      data-menu-load="menu-request.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>

    <div
      id="menu-exchange"
      data-menu-load="menu-exchange.html"
      className="offcanvas offcanvas-bottom offcanvas-detached rounded-m"
    ></div>

    <div
      className="offcanvas offcanvas-bottom rounded-m offcanvas-detached"
      id="menu-install-pwa-ios"
    >
      <div className="content">
        <img
          src="app/icons/icon-128x128.png"
          alt="img"
          width="80"
          className="rounded-m mx-auto my-4"
        />
        <h1 className="text-center">Install PayApp</h1>
        <p className="boxed-text-xl">
          Install PayApp on your home screen, and access it just like a regular
          app. Open your Safari menu and tap &quot;Add to Home Screen&quot;.
        </p>
        <a
          href="#"
          className="pwa-dismiss close-menu color-theme text-uppercase font-900 opacity-50 font-11 text-center d-block mt-n2"
          data-bs-dismiss="offcanvas"
        >
          Maybe Later
        </a>
      </div>
    </div>

    <div
      className="offcanvas offcanvas-bottom rounded-m offcanvas-detached"
      id="menu-install-pwa-android"
    >
      <div className="content">
        <img
          src="app/icons/icon-128x128.png"
          alt="img"
          width="80"
          className="rounded-m mx-auto my-4"
        />
        <h1 className="text-center">Install PayApp</h1>
        <p className="boxed-text-l">
          Install PayApp to your Home Screen to enjoy a unique and native
          experience.
        </p>
        <a
          href="#"
          className="pwa-install btn btn-m rounded-s text-uppercase font-900 gradient-highlight shadow-bg shadow-bg-s btn-full"
        >
          Add to Home Screen
        </a>
        <br />
        <a
          href="#"
          data-bs-dismiss="offcanvas"
          className="pwa-dismiss close-menu color-theme text-uppercase font-900 opacity-60 font-11 text-center d-block mt-n1"
        >
          Maybe later
        </a>
      </div>
    </div>
  </>
);

export default MyApp;
