import { useState, useEffect } from "react";
import { createQR } from "@solana/pay";
import { formatMoney } from "../../components/FormatMoney";
import Request from "../../components/Request";
import { useRouter } from "next/router";
import { solToNaira } from "./fund";

export default function ConfirmPayment() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { id, url, details } = JSON.parse(localStorage.getItem("ongoingPayment"));
    setAmount(details.amount);
    setUrl(url);
    initQRCode(url);

    checkPaymentStatus(id, details.reference);
  }, []);

  useEffect(() => {
    if (status === true) {
      alert("Payment successful");
      router.push("/wallet");
    } else if (status === false) {
      alert("Transaction failed, please try again.");
      router.push("/wallet");
    }
  }, [status]);

  const checkPaymentStatus = (id, reference) => {
    let signatureInfo;

    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const result = await Request.get(`/wallet/fund/status?id=${id}&reference=${reference}`);
        if (result.status && result.data.status == "successful") {
          signatureInfo = result.data;
          clearInterval(interval);

          setStatus(false);

          resolve(result.data);
        } else if (result.error) {
            clearInterval(interval);
          setStatus(false);
          reject(result);
        }
      }, 5000);
    });
  };

  const initQRCode = (url) => {
    // encode URL in QR code
    const qrCode = createQR(url);

    // get a handle of the element
    const element = document.getElementById("qr-code");

    element.innerHTML = "";

    // append QR code to the element
    qrCode.append(element);
  };

  return (
    <div>
      <h1>Make Payment</h1>
      <div>
        <h2>
          Amount: {amount} sol, {formatMoney(amount * solToNaira, true)}
        </h2>
        <h3>Scan QR Code to make payment</h3>
        <div id="qr-code"></div>
        <h3>OR</h3>
        <p>Click the &apos;Pay&apos; button</p>
        <a href={url}>
          <button>Pay</button>
        </a>
      </div>
    </div>
  );
}
