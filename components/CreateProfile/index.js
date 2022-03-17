import { useState, useEffect, useContext } from "react";
import { AuthContext, createProfile } from "../Auth";

const CreateProfile = ({ email, publicAddress }) => {
  const [profile, setProfile] = useState({
    email,
    phone: "",
    firstName: "",
    lastName: "",
    dob: "",
    bvn: "",
    ssn: "",
    photo: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { profileCreated } = useContext(AuthContext);

  useEffect(() => {
    // console.log("user", user());
    // setProfile({ ...profile, publicAddress: "", email: "" });
  }, []);

  const submitForm = async () => {
    setIsLoading(true);

    const { email, phone, firstName, lastName, dob, bvn, ssn, photo } = profile;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      (!bvn && !ssn) ||
      !photo
    ) {
      return alert("Error");
    }

    const result = await createProfile(profile);

    if (result.status == true) {
      profileCreated(await checkLoginStatus());
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Create Profile</h2>
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
          value={email}
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
        <img src={profile.photo} />
        <input
          type="file"
          name="photo"
          onChange={(e) => {
            const image = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = (event) => {
              console.log(event.target.result);
              setProfile({ ...profile, photo: event.target.result });
            };
          }}
        />
      </div>
      <div>
        <button disabled={isLoading} onClick={() => submitForm()}>
          {isLoading ? "Loading" : "Save"}
        </button>
      </div>
      <div>{JSON.stringify(profile, null, 4)}</div>
    </div>
  );
};

export default CreateProfile;
