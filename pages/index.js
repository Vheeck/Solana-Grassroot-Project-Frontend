import { useState, useEffect } from "react";
import Auth, { logout, user } from "../components/Auth";

export default function Home() {
  const [userData, setUserData] = useState();

  return (
    <Auth>
      <div>Is Logged In, {JSON.stringify(userData)}</div>
      <a href="/payment">Go to make Payment</a>
      <button onClick={logout}>Logout</button>
    </Auth>
  );
}
