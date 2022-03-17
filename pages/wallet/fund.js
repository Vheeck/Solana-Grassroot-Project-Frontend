import { useState } from "react";
import { createQR } from "@solana/pay";
import { formatMoney } from "../../components/FormatMoney";
import { useRouter } from "next/router";
import Request from "../../components/Request";

export const solToNaira = 24000;
export const minSol = 0.01;

export default function FundWallet() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [confirmationDisplay, setConfirmationDisplay] = useState(false);

  const initFundWallet = async () => {
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
  };

  return (
    <div>
      <h1>Fund Wallet</h1>
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
          <button onClick={() => setConfirmationDisplay(true)}>
            Fund Wallet
          </button>
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
            <button onClick={() => setConfirmationDisplay(false)}>
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
