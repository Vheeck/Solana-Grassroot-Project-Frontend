// import "../styles/globals.css";
// import "../public/styles/bootstrap.css";
// import "../public/fonts/bootstrap-icons.css";
// import "../public/styles/style.css";

import Head from "next/head";
import Script from "next/script";
import { AppProps } from "next/app";

import { useState, useEffect, useReducer, useMemo } from "react";
import { useRouter } from "next/router";
import Auth, { AuthContext, checkLoginStatus } from "../components/Auth";
import Loading from "../components/Loading";
import CreateProfile from "../components/CreateProfile";
import Image from "next/image";
import Link from "next/link";

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

    // document.body.className = "theme-light";
    document.querySelector("#page").style.display = "block";

    // const script = (src) => {
    //   const script = document.createElement("script");
    //   script.src = src;
    //   return script;
    // };

    // document.body.append(
    //   script("scripts/bootstrap.min.js"),
    //   script("scripts/custom.js")
    // );
  }, []);

  useEffect(() => {
    console.log(loginState);
  }, [loginState]);

  const { publicAddress, email, profile } = loginState;

  return (
    <>
      <Head>
        <title>Grassroots</title>
        <link rel="stylesheet" type="text/css" href="styles/bootstrap.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="fonts/bootstrap-icons.css"
        />
        <link rel="stylesheet" type="text/css" href="styles/style.css" />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        /> */}
        {/* <link rel="manifest" href="_manifest.json" />
        <meta id="theme-check" name="theme-color" content="#FFFFFF" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="app/icons/icon-192x192.png"
        /> */}
      </Head>
      {loginState.isLoading ? <Loading /> : ""}

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

      <Script src="/scripts/bootstrap.min.js" />
      <Script src="/scripts/custom.js" />
    </>
  );
}

const MainTheme = ({ children }) => (
  <>
    <div id="footer-bar" className="footer-bar-1 footer-bar-detached">
      <Link href="/cards" passHref>
        <a>
          <i className="bi bi-credit-card"></i>
          <span>Cards</span>
        </a>
      </Link>
      <Link href="/wallet" passHref>
        <a>
          <i className="bi bi-wallet2"></i>
          <span>Wallet</span>
        </a>
      </Link>
      <Link href="/" passHref>
        <a className="circle-nav-2">
          <i className="bi bi-house-fill"></i>
          <span>Home</span>
        </a>
      </Link>
      <Link href="/invest" passHref>
        <a>
          <i className="bi bi-cash-coin"></i>
          <span>Invest</span>
        </a>
      </Link>
      <Link href="/profile" passHref>
        {/* <a data-bs-toggle="offcanvas" data-bs-target="#menu-sidebar"> */}
        <a>
          <i className="bi bi-person"></i>
          <span>Profile</span>
        </a>
      </Link>
    </div>

    <div className="page-content footer-clear">{children}</div>

    <div id="menu-information" className="offcanvas offcanvas-start">
      <div style={{ width: "100vw" }}>
        <div className="pt-3">
          <div className="page-title d-flex">
            <div className="align-self-center">
              <a
                href="#"
                data-bs-dismiss="offcanvas"
                className="me-3 ms-0 icon icon-xxs bg-theme rounded-s shadow-m"
              >
                <i className="bi bi-chevron-left color-theme font-14"></i>
              </a>
            </div>
            <div className="align-self-center me-auto">
              <h1 className="color-theme mb-0 font-18">Back to Profile</h1>
            </div>
            <div className="align-self-center ms-auto">
              <a
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#menu-sidebar"
                className="icon icon-xxs gradient-highlight color-white shadow-bg shadow-bg-xs rounded-s"
              >
                <i className="bi bi-list font-20"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="content mt-0">
          <h5 className="pb-3 pt-4">Personal Information</h5>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="text"
              className="form-control rounded-xs"
              id="c1a"
              placeholder="nick.user.name"
            />
            <label
              htmlFor="c1a"
              className="form-label-always-active color-highlight"
            >
              Username
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="text"
              className="form-control rounded-xs"
              id="c1ab"
              placeholder="John"
            />
            <label
              htmlFor="c1ab"
              className="form-label-always-active color-highlight"
            >
              First Name
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="text"
              className="form-control rounded-xs"
              id="c1abc"
              placeholder="Doeson"
            />
            <label
              htmlFor="c1abc"
              className="form-label-always-active color-highlight"
            >
              Last Name
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="text"
              className="form-control rounded-xs"
              id="c1abcd"
              placeholder="1 Apple Street, California, USA"
            />
            <label
              htmlFor="c1abcd"
              className="form-label-always-active color-highlight"
            >
              Address
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="email"
              className="form-control rounded-xs"
              id="c1"
              placeholder="name@domain.com"
            />
            <label
              htmlFor="c1"
              className="color-highlight form-label-always-active"
            >
              Email Address
            </label>
            <span>(required)</span>
          </div>

          <h5 className="pb-3 pt-4">Default Settings</h5>
          <div className="form-custom form-label form-border form-icon">
            <i className="bi bi-calendar font-13"></i>
            <label
              htmlFor="c6a"
              className="color-highlight form-label-always-active"
            >
              Default Account
            </label>
            <select className="form-select rounded-xs" id="c6a">
              <option value="0" selected>
                Main Account
              </option>
              <option value="01">Savings Account</option>
              <option value="02">Company Account</option>
            </select>
          </div>

          <h5 className="pb-3 pt-4">Account Security</h5>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="tel"
              className="form-control rounded-xs"
              id="c21"
              value="+1 234 567 809"
            />
            <label
              htmlFor="c21"
              className="color-highlight form-label-always-active"
            >
              Phone Number
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-3 bg-transparent">
            <input
              type="password"
              className="form-control rounded-xs"
              id="c2"
              value="Old Password"
            />
            <label
              htmlFor="c2"
              className="color-highlight form-label-always-active"
            >
              Current Password
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border mb-4 bg-transparent">
            <input
              type="password"
              className="form-control rounded-xs"
              id="c3"
              value="New Password"
            />
            <label
              htmlFor="c3"
              className="color-highlight form-label-always-active"
            >
              New Password
            </label>
            <span>(required)</span>
          </div>
          <a
            href="#"
            data-bs-dismiss="offcanvas"
            className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
          >
            Apply Settings
          </a>
        </div>
      </div>
    </div>

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
        <Image
          src="/app/icons/icon-128x128.png"
          alt="img"
          width={80}
          height={80}
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
        <Image
          src="/app/icons/icon-128x128.png"
          alt="img"
          width={80}
          height={80}
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
