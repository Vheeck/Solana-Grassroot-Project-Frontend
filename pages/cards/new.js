import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Request from "../../components/Request";

const walletAfricaAPI = process.env.NEXT_PUBLIC_WALLETS_AFRICA_API_ENPOINT;
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
    email: "",
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
      console.log(result);
      setIsLoading(false);
      router.push("/cards")
    });
  };

  return (
    <div>
      <h1>New Card</h1>

      <div>
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={(e) =>
              setData({ ...data, amount: parseFloat(e.target.value) })
            }
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>
        <div>
          <input
            type="text"
            name="nameOnCard"
            placeholder="Name On Card"
            onChange={(e) => setData({ ...data, nameOnCard: e.target.value })}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
          />
        </div>
        <div>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            onChange={(e) => setData({ ...data, dob: e.target.value })}
          />
        </div>
        <div>
          <select
            onChange={(e) => setData({ ...data, idType: parseFloat(e.target.value) })}
            disabled={!idTypes ? true : false}
            name="idType"
          >
            {!idTypes ? (
              <option>Loading...</option>
            ) : (
              [
                <option key={0}>Select ID Type</option>,
                ...Object.keys(idTypes).map((key, i) => (
                  <option value={idTypes[key]} key={i+1}>{key.toUpperCase()}</option>
                )),
              ]
            )}
          </select>
        </div>
        <div>
          <input
            type="text"
            name="idNo"
            placeholder="ID Number"
            onChange={(e) => setData({ ...data, idNo: e.target.value })}
          />
        </div>
        <div>
          <select
            name="currency"
            onChange={(e) => setData({ ...data, currency: e.target.value })}
          >
            <option>Select Card Currency</option>
            <option>NGN</option>
            <option>USD</option>
          </select>
        </div>
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
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>

        <div>
          <select
            onChange={(e) => setData({ ...data, stateId: parseFloat(e.target.value) })}
            disabled={!states ? true : false}
            name="stateId"
          >
            {!states ? (
              <option>Loading...</option>
            ) : (
              [
                <option key={0}>Select State</option>,
                ...states.map(({ state: { id, name } }, i) => (
                  <option value={id} key={i+1}>{name}</option>
                )),
              ]
            )}
          </select>
        </div>

        <div>
          <select
            onChange={(e) => setData({ ...data, localId: parseFloat(e.target.value) })}
            disabled={!states && !data.stateId ? true : false}
            name="localId"
          >
            {!states && !data.stateId ? (
              <option>Loading...</option>
            ) : (
              [
                <option key={0}>Select LGA</option>,

                ...(data.stateId
                  ? states
                      .filter(({ state: { id } }, i) => id == data.stateId)[0]
                      .state.locals.map(({ name, id }, i) => (
                        <option value={id} key={i+1}>{name}</option>
                      ))
                  : []),
              ]
            )}
          </select>
        </div>

        <div>
          <button disabled={isLoading} onClick={submitForm}>
            {isLoading ? "Loading" : "Save"}
          </button>
        </div>
        <div>{JSON.stringify(data, null, 4)}</div>
      </div>
    </div>
  );
}
