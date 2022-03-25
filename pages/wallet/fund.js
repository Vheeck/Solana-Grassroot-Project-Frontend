import { useEffect, useState } from "react";
import { createQR } from "@solana/pay";
import { formatMoney } from "../../components/FormatMoney";
import { useRouter } from "next/router";
import Request from "../../components/Request";
import PageHeader from "../../components/PageHeader";

export const solToNaira = 24000;
export const minSol = 0.01;

export default function FundWallet({ profile }) {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationDisplay, setConfirmationDisplay] = useState(false);

  useEffect(() => {
    if (amount && amount < minSol) {
      setError(
        `The minimum payable amount is ${minSol}, which is ${formatMoney(
          minSol * solToNaira,
          true
        )}.`
      );
    }
  }, [amount]);

  const initFundWallet = async () => {
    setIsLoading(true);
    if (amount >= minSol) {
      console.log(amount);
      const result = await Request.post("/wallet/fund", { amount });
      localStorage.setItem("ongoingPayment", JSON.stringify(result.data));
      router.push("/wallet/confirm-payment");
    } else {
      setError(
        `The minimum payable amount is ${minSol}, which is ${formatMoney(
          minSol * solToNaira,
          true
        )}.`
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <PageHeader title="Fund Wallet" profile={profile} />
      <div className="card card-style">
        <div className="content">
          <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
            <i className="bi bi-cash font-13"></i>
            <input
              type="number"
              name="amount"
              placeholder="Fund Amount"
              onChange={(e) => {
                setError("");
                setAmount(e.target.value);
              }}
              min={minSol}
              className="form-control rounded-xs"
              id="c1"
            />
            <label htmlFor="c1" className="color-theme">
              SSN
            </label>
            <span>(required)</span>
          </div>

          <button
            style={{ width: "100%" }}
            onClick={() => setConfirmationDisplay(true)}
            className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
          >
            Fund Wallet
          </button>

          <div>
            <p className="text-center text-sm mt-2" style={{ color: "red" }}>
              {error}
            </p>
          </div>
        </div>
      </div>
      <div className="card card-style">
        <div className="content">
          <div>
            <p>
              Amount in Naira:{" "}
              <strong>{formatMoney(amount * solToNaira, true)}</strong>
            </p>
          </div>
        </div>
      </div>
      {confirmationDisplay ? (
        <div className="card card-style">
          <div className="content">
            <h3 className="text-center">Proceed to make payment?</h3>
            <button
              style={{ width: "100%" }}
              className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
              onClick={initFundWallet}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Confirm"}
            </button>
            <button
              style={{ width: "100%" }}
              className="btn btn-full gradient-red shadow-bg shadow-bg-s mt-4"
              onClick={() => setConfirmationDisplay(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

{
  /* <div>
  <div>
    <div>
      <input
        type="number"
        placeholder="Fund Amount"
        onChange={(e) => {
          setError("");
          setAmount(e.target.value);
        }}
        min={minSol}
      />
      <button onClick={() => setConfirmationDisplay(true)}>Fund Wallet</button>
    </div>
    <div>
      <p>
        Amount in Naira:{" "}
        <strong>{formatMoney(amount * solToNaira, true)}</strong>
      </p>
    </div>
    <div>
      <small style={{ color: "red" }}>{error}</small>
    </div>
    {confirmationDisplay ? (
      <div>
        <h3>Proceed to make payment?</h3>
        <button onClick={initFundWallet}>Confirm</button>
        <button onClick={() => setConfirmationDisplay(false)}>Cancel</button>
      </div>
    ) : (
      ""
    )}
  </div>
</div>; */
}
