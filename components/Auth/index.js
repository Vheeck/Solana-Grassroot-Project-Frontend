import { useState, useEffect, useContext } from "react";
import { Magic } from "magic-sdk";
import Loading from "../Loading";
import Request from "../Request";
import { useRouter } from "next/router";
import AuthContext from "./AuthContext";

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

const logout = () => magic().user.logout();

const createProfile = async (profile) => {
  // const isLoggedIn = await magic().user.isLoggedIn();
  // if (isLoggedIn) {
  // const { email, publicAddress } = await magic().user.getMetadata();
  const result = await Request.post("/profile", profile);
  console.log(result);
  return result;
  // }
};

export { AuthContext, checkLoginStatus, getUserData, logout, createProfile };

// const user

const Auth = ({ children }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { signIn, signOut } = useContext(AuthContext);

  // Make a request
  const login = async () => {
    // Initialize magic client
    await magic().auth.loginWithMagicLink({ email });
    const data = await checkLoginStatus();
    signIn(data);
  };

  const logout = async () => {
    await magic().user.logout();
    localStorage.removeItem("publicAddress");
    signOut();
  };

  return (
    <div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={login}>Login</button>
        {/* <button
          onClick={() =>
            createProfile({
              publicAddress: "string",
              email: "string",
              phone: "string",
              firstName: "string",
              lastName: "string",
              dob: "string",
              bvn: "string",
              ssn: "string",
              photo: "string",
            })
          }
        >
          Test create profile
        </button> */}
      </div>
    </div>
  );
};

export default Auth;
