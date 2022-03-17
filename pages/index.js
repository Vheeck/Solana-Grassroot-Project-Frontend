import { useState, useEffect, useReducer, useMemo } from "react";
import Link from "next/link";
import Auth, { AuthContext, logout, user } from "../components/Auth";
import Loading from "../components/Loading";
import Request from "../components/Request";

export default function Home({ profile }) {
  return (
    <>
      <div>Is Logged In, {JSON.stringify(profile)}</div>
      <div>
        <Link href="/payment">Go to make Payment</Link>
      </div>
      <div>
        <Link href="/profile">Go to Profile</Link>
      </div>
      <div>
        <Link href="/wallet">Go to Wallet</Link>
      </div>
      <div>
        <Link href="/cards">Go to Cards</Link>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
