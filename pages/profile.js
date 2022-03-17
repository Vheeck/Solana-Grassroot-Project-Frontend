import { useState, useEffect, useReducer, useMemo } from "react";
import Auth, { AuthContext, logout, user } from "../components/Auth";
import Loading from "../components/Loading";

export default function Profile({ profile }) {
  const { email, phone, firstName, lastName, dob, bvn, ssn, photo } = profile;

  return (
    <>
      {/* <div>Is Logged In, {JSON.stringify(profile)}</div> */}
      <div>
          <img src={photo} />
      </div>
      <div>
        <p>
          <strong>First Name: </strong> {firstName}
        </p>
        <p>
          <strong>Last Name: </strong> {lastName}
        </p>
        <p>
          <strong>Email Address: </strong> {email}
        </p>
        <p>
          <strong>Phone Number: </strong> {phone}
        </p>
        <p>
          <strong>Date of Birth: </strong> {dob}
        </p>
        <p>
          <strong>BVN: </strong> {bvn}
        </p>
        <p>
          <strong>SSN: </strong> {ssn}
        </p>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
