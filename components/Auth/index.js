import { useState, useEffect, useContext } from "react";
import { Magic } from "magic-sdk";
import Loading from "../Loading";
import Request from "../Request";
import { useRouter } from "next/router";
import AuthContext from "./AuthContext";
import WavesSVG from "../WavesSVG";
import Header from "../Header";

const magic = () => new Magic("pk_live_DDBF3DFDD844B1E8");

// const getUserData = () => JSON.parse(localStorage.getItem("user"));

const isLoggedIn = async () => await magic().user.isLoggedIn();

const getMetadata = async () => await magic().user.getMetadata();

const getProfile = async () => await Request.get("/profile");

const checkLoginStatus = async () => {
  const isLoggedInState = await isLoggedIn();
  let publicAddress = "",
    email = "",
    profile = null,
    isProfiled = false;

  if (isLoggedInState) {
    const data = await getMetadata();
    publicAddress = data.publicAddress;
    email = data.email;

    localStorage.setItem("publicAddress", publicAddress);

    if (publicAddress) {
      const result = await getProfile();

      if (result.status) {
        profile = result.data;
        isProfiled = true;
      }
    }
  }

  return {
    email,
    isLoggedIn: isLoggedInState,
    isProfiled,
    publicAddress,
    profile,
  };
};

const getUserData = async () => {
  const magicIsLoggedIn = await magic().user.isLoggedIn();

  if (magicIsLoggedIn) {
    const metadata = await magic().user.getMetadata();

    localStorage.setItem("publicAddress", metadata.publicAddress);

    const profile = await getProfile();
    if (profile.status) return { ...profile, ...metadata };
  }
};

const logout = async (callback) => {
  magic().user.logout();
  localStorage.removeItem("publicAddress");
  callback();
};

const createProfile = async (profile) => {
  // const isLoggedIn = await magic().user.isLoggedIn();
  // if (isLoggedIn) {
  // const { email, publicAddress } = await magic().user.getMetadata();
  const result = await Request.post("/profile", profile);
  console.log(result);
  return result;
  // }
};

const editProfile = async (profile) => {
  // const isLoggedIn = await magic().user.isLoggedIn();
  // if (isLoggedIn) {
  // const { email, publicAddress } = await magic().user.getMetadata();
  const result = await Request.post("/profile/edit", profile);
  console.log(result);
  return result;
  // }
};

export { AuthContext, checkLoginStatus, getUserData, logout, createProfile, editProfile };

// const user

const Auth = ({ children }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { signIn, signOut } = useContext(AuthContext);

  // Make a request
  const login = async () => {
    setIsLoading(true);
    // Initialize magic client
    await magic().auth.loginWithMagicLink({ email });
    const data = await checkLoginStatus();
    signIn(data);
    setIsLoading(false);
  };

  const logout = async () => {
    await magic().user.logout();
    localStorage.removeItem("publicAddress");
    signOut();
  };

  return (
    <>
      <Header />
      <WavesSVG />

      <div className="card card-style">
        <div className="content">
          <h1 className="mb-0 pt-2">Login</h1>
          <p>Fill In Your Email Address</p>
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-at font-16"></i>
            <input
              name="email"
              type="email"
              className="form-control rounded-xs"
              id="c1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="c1" className="color-theme">
              Email Address
            </label>
            <span>(required)</span>
          </div>
          <button
          disabled={isLoading}
            onClick={login}
            className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
            style={{
              width: "100%",
            }}
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
