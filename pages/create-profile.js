import { useState, useEffect } from "react";
import { user } from "../components/Auth";

export default function CreateProfile() {
  const [profile, setProfile] = useState({
    publicAddress: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    dob: "",
    bvn: "",
    ssn: "",
    photo: "",
  });

  useEffect(() => {
    console.log("user", user());
    setProfile({ ...profile, publicAddress: "", email: "" });
  }, []);
  
  return (
    <div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          disabled
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        />
      </div>
      <div>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          name="bvn"
          placeholder="BVN"
          onChange={(e) => setProfile({ ...profile, bvn: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          name="ssn"
          placeholder="SSN"
          onChange={(e) => setProfile({ ...profile, ssn: e.target.value })}
        />
      </div>
      <div>
        <input
          type="file"
          name="photo"
          onChange={(e) => console.log(e.target)}
        />
      </div>
      <div>
        <button>Save</button>
      </div>
      <div>{JSON.stringify(profile)}</div>
    </div>
  );
}
