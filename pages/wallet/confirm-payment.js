import { useState, useEffect } from "react";
import { createQR } from "@solana/pay";
import { formatMoney } from "../../components/FormatMoney";
import Request from "../../components/Request";
import { useRouter } from "next/router";
import { solToNaira } from "./fund";
import PageHeader from "../../components/PageHeader";

export default function ConfirmPayment({ profile }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { id, url, details } = JSON.parse(
      localStorage.getItem("ongoingPayment")
    );
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
        const result = await Request.get(
          `/wallet/fund/status?id=${id}&reference=${reference}`
        );
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
    <>
      <PageHeader title="Make Payment" profile={profile} />

      <div className="default-link card card-style" style={{ height: "90px" }}>
        <div className="card-center px-4">
          <div className="d-flex">
            <div className="align-self-center">
              <span className="icon icon-m rounded-s gradient-blue shadow-bg shadow-bg-xs">
                <i className="bi bi-wallet2 font-20 color-white"></i>
              </span>
            </div>
            <div className="align-self-center ps-3 ms-1">
              <h1 className="font-20 mb-n1">
                {`${amount} SOL (${formatMoney(amount * solToNaira, true)})`}
              </h1>
              <p className="mb-0 font-12 opacity-50">Amount</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content">
          <h3 className="text-center">Scan QR Code to make payment</h3>
          <div style={{ width: "80vw" }} id="qr-code"></div>
          <h3 className="text-center mt-3">OR</h3>
          <p className="text-center">Click the &apos;Pay&apos; button</p>
          <a href={url} target="_blank" className="mt-3" rel="noreferrer">
            <button
              style={{ width: "100%" }}
              className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
            >
              Pay
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
