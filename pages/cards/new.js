import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageHeaderWithBack from "../../components/PageHeaderWithBack";
import Request from "../../components/Request";

const walletAfricaAPI = process.env.NEXT_PUBLIC_WALLETS_AFRICA_API_ENDPOINT;
const walletAfricaPublicKey = process.env.NEXT_PUBLIC_WALLETS_AFRICA_PUBLIC_KEY;

export default function NewCard() {
  const router = useRouter();

  const [idTypes, setIdTypes] = useState(null);
  const [states, setStates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    amount: "",
    firstName: "",
    lastName: "",
    email: "info@grader.ng",
    nameOnCard: "",
    dob: "",
    idNo: "",
    idType: "",
    currency: "",
    isPhysicalCard: "",
    address: "",
    stateId: "",
    localId: "",
    phoneNumber: "",
  });

  useEffect(() => {
    Request.get(`${walletAfricaAPI}/cards/Idtypes`, {
      authorization: `Bearer ${walletAfricaPublicKey}`,
    }).then((result) => setIdTypes(result.idType));

    Request.get(`${walletAfricaAPI}/cards/states`, {
      authorization: `Bearer ${walletAfricaPublicKey}`,
    }).then((result) => setStates(result.States));
  }, []);

  const submitForm = () => {
    if (
      !data.amount ||
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.nameOnCard ||
      !data.dob ||
      !data.idNo ||
      !data.idType ||
      !data.currency ||
      data.isPhysicalCard === "" ||
      !data.address ||
      !data.stateId ||
      !data.localId ||
      !data.phoneNumber
    ) {
      return alert("All fields on the form need to be filled");
    }

    setIsLoading(true);

    Request.post("/cards/new", data).then((result) => {
      alert("Card created successfully!");
      // console.log(result);
      setIsLoading(false);
      router.push("/cards");
    });
  };

  return (
    <>
    <PageHeaderWithBack title="Add Card" backLink="/cards" />

      <div className="card card-style">
        <div className="content">
          <h4>Enter Card Information</h4>
          <p className="mb-0">All fields are required.</p>

          <div className="row mt-5">
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-cash font-14"></i>
                <input
                  type="number"
                  className="form-control rounded-xs"
                  id="c1"
                  placeholder="Enter Amount"
                  name="amount"
                  onChange={(e) =>
                    setData({ ...data, amount: parseFloat(e.target.value) })
                  }
                />
                <label
                  htmlFor="c1"
                  className="color-highlight form-label-always-active"
                >
                  Amount
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-custom form-label mb-3">
                <input
                  type="text"
                  className="form-control rounded-xs"
                  id="c1"
                  placeholder="John"
                  name="firstName"
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
                <label
                  htmlFor="c1"
                  className="color-highlight form-label-always-active"
                >
                  First Name
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-custom form-label mb-3">
                <input
                  type="text"
                  className="form-control rounded-xs"
                  id="c1"
                  placeholder="Doe"
                  name="lastName"
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
                <label
                  htmlFor="c1"
                  className="color-highlight form-label-always-active"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-person-circle font-14"></i>
                <input
                  type="text"
                  className="form-control rounded-xs"
                  id="c1"
                  placeholder="John Doe"
                  name="nameOnCard"
                  onChange={(e) =>
                    setData({ ...data, nameOnCard: e.target.value })
                  }
                />
                <label
                  htmlFor="c1"
                  className="color-highlight form-label-always-active"
                >
                  Name on Card
                </label>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-envelope font-14"></i>
                <input
                  type="email"
                  className="form-control rounded-xs"
                  id="c1"
                  name="email"
                  placeholder="someone@example.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <label
                  htmlFor="c1"
                  className="color-highlight form-label-always-active"
                >
                  Email Address
                </label>
              </div>
            </div> */}
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-telephone font-14"></i>
                <input
                  type="tel"
                  className="form-control rounded-xs"
                  id="c3"
                  placeholder="+234 123 456 7890"
                  name="phone"
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                />
                <label
                  htmlFor="c3"
                  className="color-highlight form-label-always-active"
                >
                  Phone Number
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-calendar font-14"></i>
                <input
                  type="date"
                  className="form-control rounded-xs"
                  id="c3"
                  name="dob"
                  onChange={(e) => setData({ ...data, dob: e.target.value })}
                />
                <label
                  htmlFor="c3"
                  className="color-highlight form-label-always-active"
                >
                  Date of Birth
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-person-badge font-14"></i>
                <select
                  className="form-select rounded-xs"
                  id="c6"
                  aria-label="Floating label select example"
                  onChange={(e) =>
                    setData({ ...data, idType: parseFloat(e.target.value) })
                  }
                  disabled={!idTypes ? true : false}
                  name="idType"
                  value={data.idType}
                >
                  {!idTypes ? (
                    <option>Loading...</option>
                  ) : (
                    [
                      <option value="" key={0} disabled selected>
                        Select ID Type
                      </option>,
                      ...Object.keys(idTypes).map((key, i) => (
                        <option value={idTypes[key]} key={i + 1}>
                          {key.toUpperCase()}
                        </option>
                      )),
                    ]
                  )}
                </select>
                <label
                  htmlFor="c6"
                  className="color-highlight form-label-always-active"
                >
                  ID Type
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-person-badge font-14"></i>
                <input
                  type="text"
                  className="form-control rounded-xs"
                  id="c3"
                  placeholder="1234567890"
                  name="idNo"
                  onChange={(e) => setData({ ...data, idNo: e.target.value })}
                />
                <label
                  htmlFor="c3"
                  className="color-highlight form-label-always-active"
                >
                  ID Number
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-custom form-label form-icon mb-3">
                <i className="bi bi-currency-exchange font-14"></i>
                <select
                  className="form-select rounded-xs"
                  id="c6"
                  aria-label="Floating label select example"
                  name="currency"
                  onChange={(e) =>
                    setData({ ...data, currency: e.target.value })
                  }
                >
                  <option disabled selected>
                    Currencies
                  </option>
                  <option>NGN</option>
                  <option>USD</option>
                </select>
                <label
                  htmlFor="c6"
                  className="color-highlight form-label-always-active"
                >
                  Card Currency
                </label>
              </div>
            </div>
            <div
              className="col-6"
              style={{ display: "flex", alignItems: "center", height: "auto" }}
            >
              {/* <div> */}
              <div>Physical Card</div>
              <div className="form-switch ios-switch switch-green switch-s">
                <input
                  type="checkbox"
                  className="ios-input"
                  id="switch-5"
                  onChange={(e) => setData({
                      ...data,
                      isPhysicalCard: e.target.checked,
                    })
                  }
                />
                <label
                  className="custom-control-label"
                  htmlFor="switch-5"
                ></label>
              </div>
              {/* </div> */}
            </div>
            <div className="col-12">
              <div className="form-custom form-label mb-3">
                <input
                  type="text"
                  className="form-control rounded-xs"
                  id="c3"
                  name="address"
                  placeholder="30 Commercial Road, Fratton, PORTSMOUTH, Hampshire, PO1 1AA, UNITED KINGDOM."
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
                <label
                  htmlFor="c3"
                  className="color-highlight form-label-always-active"
                >
                  Address
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-custom form-label mb-3">
                <select
                  className="form-select rounded-xs"
                  id="c6"
                  aria-label="Floating label select example"
                  onChange={(e) =>
                    setData({ ...data, stateId: parseFloat(e.target.value), localId: "" })
                  }
                  disabled={!states ? true : false}
                  name="stateId"
                  
                  value={data.stateId}
                >
                  {!states ? (
                    <option>Loading...</option>
                  ) : (
                    [
                      <option value="" key={0} disabled selected>
                        Select State
                      </option>,
                      ...states.map(({ state: { id, name } }, i) => (
                        <option value={id} key={i + 1}>
                          {name}
                        </option>
                      )),
                    ]
                  )}
                </select>
                <label
                  htmlFor="c6"
                  className="color-highlight form-label-always-active"
                >
                  State
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-custom form-label mb-3">
                <select
                  className="form-select rounded-xs"
                  id="c61"
                  aria-label="Floating label select example"
                  onChange={(e) =>
                    setData({ ...data, localId: parseFloat(e.target.value) })
                  }
                  disabled={!states && !data.stateId ? true : false}
                  name="localId"
                  value={data.localId}
                >
                  {!states && !data.stateId ? (
                    <option>Loading...</option>
                  ) : data.stateId ? (
                    [
                      <option value="" key={0} disabled selected>
                        Select LGA
                      </option>,
                      ...states
                        .filter(({ state: { id } }, i) => id == data.stateId)[0]
                        .state.locals.map(({ name, id }, i) => (
                          <option value={id} key={i + 1}>
                            {name}
                          </option>
                        )),
                    ]
                  ) : (
                    []
                  )}
                </select>
                <label
                  htmlFor="c61"
                  className="color-highlight form-label-always-active"
                >
                  LGA
                </label>
              </div>
            </div>
          </div>
          <div className="divider mt-2 mb-4"></div>
          <button
            className="btn btn-full gradient-highlight shadow-bg shadow-bg-s"
            style={{ width: "100%" }}
            disabled={isLoading}
            onClick={submitForm}
          >
            {isLoading ? "Loading" : "Create Card"}
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <div>
      <h1>New Card</h1>
        <div>
          <label>
            <input
              type="radio"
              name="isPhysicalCard"
              value={true}
              onChange={(e) =>
                setData({
                  ...data,
                  isPhysicalCard: true,
                })
              }
            />{" "}
            Physical Card
          </label>
          <label>
            <input
              type="radio"
              name="isPhysicalCard"
              value={false}
              onChange={(e) => setData({ ...data, isPhysicalCard: false })}
            />{" "}
            Virtual Card
          </label>
        </div>

        <div>
          <button disabled={isLoading} onClick={submitForm}>
            {isLoading ? "Loading" : "Save"}
          </button>
        </div>
        <div>{JSON.stringify(data, null, 4)}</div>
      </div>
    </div> */
}
