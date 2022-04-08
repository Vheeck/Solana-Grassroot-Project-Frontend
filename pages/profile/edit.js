import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext, checkLoginStatus, editProfile } from "../../components/Auth";
import Header from "../../components/Header";
import WavesSVG from "../../components/WavesSVG";

export default function EditProfile(props) {
  const router = useRouter();

  const [profile, setProfile] = useState(props.profile);

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

    const result = await editProfile(profile);

    if (result.status == true) {
      profileCreated(await checkLoginStatus());
      router.push("/profile");
    }

    setIsLoading(false);

  };

  return (
    <>
      <Header />
      <WavesSVG />

      <div className="card card-style">
        <div className="content">
          <h1 className="mb-0 pt-2">Edit Profile</h1>
          <p>Edit Your Profile Information</p>
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-circle font-13"></i>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              value={profile.firstName}
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              First Name
            </label>
            <span>(required)</span>
          </div>
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-circle font-13"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              value={profile.lastName}
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Last Name
            </label>
            <span>(required)</span>
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
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <label htmlFor="c1" className="color-theme">
              Email Address
            </label>
            <span>(required)</span>
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-telephone font-13"></i>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              value={profile.phone}
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Phone Number
            </label>
            <span>(required)</span>
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-calendar font-13"></i>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              value={profile.dob}
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              Date of Birth
            </label>
            <span>(required)</span>
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-badge font-13"></i>
            <input
              type="text"
              name="bvn"
              placeholder="BVN"
              onChange={(e) => setProfile({ ...profile, bvn: e.target.value })}
              className="form-control rounded-xs"
              id="c1"
              value={profile.bvn}
            />
            <label htmlFor="c1" className="color-theme">
              BVN
            </label>
            <span>(required)</span>
          </div>

          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-person-badge font-13"></i>
            <input
              type="text"
              name="ssn"
              placeholder="SSN"
              onChange={(e) => setProfile({ ...profile, ssn: e.target.value })}
              className="form-control rounded-xs"
              id="c1"
              value={profile.ssn}
            />
            <label htmlFor="c1" className="color-theme">
              SSN
            </label>
            <span>(required)</span>
          </div>

          <div>
            <div className="card card-body">
              <img
                src={profile.photo ? profile.photo : "images/placeholder.png"}
              />
              <input
                type="file"
                name="photo"
                hidden
                onChange={(e) => {
                  const image = e.target.files[0];

                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = (event) => {
                    // console.log(event.target.result);
                    setProfile({ ...profile, photo: event.target.result });
                  };
                }}
              />
              <button
                onClick={() =>
                  document.querySelector("input[type='file']").click()
                }
                className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
                style={{
                  width: "100%",
                }}
              >
                Choose a Profile Picture
              </button>
            </div>
          </div>

          {/* <h4>Upload Card Image</h4>
            <p className="mb-0">
              This is a sample page. Do not upload confidential information. Try a
              basic image instead.
            </p>
            <div className="file-data">
              <img
                id="image-data"
                src="/images/empty.png"
                className="img-fluid rounded-s"
                alt="img"
              />
              <span
                className="upload-file-name d-block text-center"
                data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:"
                data-text-after=" is ready."
              ></span>
              <div>
                <input type="file" className="upload-file" accept="image/*" />
                <p className="btn btn-full btn-m text-uppercase font-700 rounded-s upload-file-text gradient-highlight shadow-bg shadow-bg-xs no-click">
                  Upload Card Image
                </p>
              </div>
            </div>
  
            <div className="divider mt-4"></div> */}

          {/* <div className="form-check form-check-custom">
            <input
              className="form-check-input"
              type="checkbox"
              name="type"
              value=""
              id="c2a"
            />
            <label className="form-check-label font-12" htmlFor="c2a">
              I agree with the <a href="#">Terms and Conditions</a>.
            </label>
            <i className="is-checked color-highlight font-13 bi bi-check-circle-fill"></i>
            <i className="is-unchecked color-highlight font-13 bi bi-circle"></i>
          </div> */}

          <button
            disabled={isLoading}
            onClick={() => submitForm()}
            className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
            style={{
              width: "100%",
            }}
          >
            {isLoading ? "Loading" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
