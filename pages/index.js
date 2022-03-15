import { useState, useEffect, useReducer, useMemo } from "react";
import Auth, { AuthContext, logout, user } from "../components/Auth";
import Loading from "../components/Loading";

export default function Home({ loginState }) {
  return (
    <>
      <div>Is Logged In, {JSON.stringify(loginState.userData)}</div>
      <a href="/payment">Go to make Payment</a>
      <button onClick={logout}>Logout</button>
    </>
  );
}
