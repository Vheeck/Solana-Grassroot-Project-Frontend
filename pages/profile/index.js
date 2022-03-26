/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useReducer, useMemo, useContext } from "react";
import Auth, { AuthContext, logout, user } from "../../components/Auth";
import Loading from "../../components/Loading";
import WavesSVG from "../../components/WavesSVG";

export default function Profile({ profile }) {
  const { email, phone, firstName, lastName, dob, bvn, ssn, photo } = profile;

  const { signOut } = useContext(AuthContext);

  return (
    <>
      <div className="pt-3 disabled">
        <div className="page-title d-flex">
          <div className="align-self-center me-auto">
            <p className="color-white">Welcome Back</p>
            <h1 className="color-white">PayApp</h1>
          </div>
          <div className="align-self-center ms-auto">
            <a
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu-sidebar"
              className="icon bg-white rounded-m"
            >
              <i className="bi bi-list font-20"></i>
            </a>
          </div>
        </div>
      </div>

      <WavesSVG />

      <div className="notch-clear"></div>
      <div className="pt-5 mt-4"></div>
      <div className="card card-style overflow-visible mt-5">
        <div className="mt-n5"></div>
        <img
          src={photo}
          alt="img"
          width="180"
          className="mx-auto rounded-circle mt-n5 shadow-l"
        />
        <h1 className="color-theme text-center font-30 pt-3 mb-0">
          {firstName} {lastName}
        </h1>
        <p className="text-center font-11">
          <i className="bi bi-check-circle-fill color-green-dark pe-2"></i>
          Verified Account Holder
        </p>
        <div className="content mt-0 mb-2">
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-circle font-13"></i>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              // onChange={(e) =>
              //   setProfile({ ...profile, firstName: e.target.value })
              // }
              value={firstName}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              First Name
            </label>
            {/* <span>(required)</span> */}
          </div>
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-circle font-13"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              // onChange={(e) =>
              //   setProfile({ ...profile, lastName: e.target.value })
              // }
              value={lastName}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Last Name
            </label>
            {/* <span>(required)</span> */}
          </div>
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-at font-16"></i>
            <input
              className="form-control rounded-xs"
              id="c1"
              type="email"
              name="email"
              placeholder="Email Address"
              disabled
              value={email}
              // onChange={(e) =>
              //   setProfile({ ...profile, email: e.target.value })
              // }
            />
            <label htmlFor="c1" className="color-theme">
              Email Address
            </label>
            {/* <span>(required)</span> */}
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-telephone font-13"></i>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              // onChange={(e) =>
              //   setProfile({ ...profile, phone: e.target.value })
              // }
              value={phone}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Phone Number
            </label>
            {/* <span>(required)</span> */}
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-calendar font-13"></i>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              // onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              value={dob}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Date of Birth
            </label>
            {/* <span>(required)</span> */}
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-badge font-13"></i>
            <input
              type="text"
              name="bvn"
              placeholder="BVN"
              // onChange={(e) => setProfile({ ...profile, bvn: e.target.value })}
              value={bvn}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              BVN
            </label>
            {/* <span>(required)</span> */}
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-badge font-13"></i>
            <input
              type="text"
              name="ssn"
              placeholder="SSN"
              // onChange={(e) => setProfile({ ...profile, ssn: e.target.value })}
              value={ssn}
              disabled
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              SSN
            </label>
            {/* <span>(required)</span> */}
          </div>
          <Link href="/profile/edit" passHref>
            <div className="btn btn-full mx-3 gradient-blue shadow-bg shadow-bg-xs mb-3">
              Edit Profile
            </div>
          </Link>
        </div>
      </div>

      <div className="btn btn-full mx-3 gradient-highlight shadow-bg shadow-bg-xs mb-3">
        Contact Support
      </div>

      <div
        onClick={() => logout(signOut)}
        className="btn btn-full mx-3 gradient-red shadow-bg shadow-bg-xs"
      >
        Logout
      </div>
    </>
  );
}

{
  /* <div>Is Logged In, {JSON.stringify(profile)}</div> */
}
// <div>
//     <img src={photo} />
// </div>
// <div>
//   <p>
//     <strong>First Name: </strong> {firstName}
//   </p>
//   <p>
//     <strong>Last Name: </strong> {lastName}
//   </p>
//   <p>
//     <strong>Email Address: </strong> {email}
//   </p>
//   <p>
//     <strong>Phone Number: </strong> {phone}
//   </p>
//   <p>
//     <strong>Date of Birth: </strong> {dob}
//   </p>
//   <p>
//     <strong>BVN: </strong> {bvn}
//   </p>
//   <p>
//     <strong>SSN: </strong> {ssn}
//   </p>
// </div>
// <div>
//   <button onClick={logout}>Logout</button>
// </div>
