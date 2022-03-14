import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import Loading from "../Loading";

const magic = () => new Magic("pk_live_DDBF3DFDD844B1E8");

const user = () => JSON.parse(localStorage.getItem("user"));

const logout = () => magic().user.logout();

export {user, logout};

// const user

const Auth = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    magic()
      .user.isLoggedIn()
      .then(async (magicIsLoggedIn) => {
        setIsLoggedIn(magicIsLoggedIn);
        setIsLoading(false);
        if (magicIsLoggedIn) {
          const metadata = await magic().user.getMetadata();

          localStorage.setItem("user", JSON.stringify(metadata));

          // setPublicAddress(metadata.publicAddress);
          // setUserMetadata(metadata);
          console.log(metadata);
        }
      });
  }, [isLoggedIn]);

  // Make a request
  const login = async () => {
    // Initialize magic client
    await magic().auth.loginWithMagicLink({ email });
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const logout = async () => {
    await magic().user.logout();
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isLoggedIn ? (
        children
      ) : (
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
