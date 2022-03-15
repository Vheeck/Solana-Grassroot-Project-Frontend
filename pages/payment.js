import { useState, useEffect } from "react";
import Auth, { user } from "../components/Auth";
import {
  Cluster,
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";

export default function Payment() {
  const [userData, setUserData] = useState();

  async function main() {
    // Variable to keep state of the payment status
    let paymentStatus;

    // Connecting to devnet for this example
    console.log("1. ✅ Establish connection to the network");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // -- snippet -- //

    /**
     * Simulate a checkout experience
     *
     * Recommendation:
     * `amount` and `reference` should be created in a trusted environment (server).
     * The `reference` should be unique to a single customer session,
     * and will be used to find and validate the payment in the future.
     *
     */
    console.log("2. 🛍 Simulate a customer checkout \n");
    const recipient = new PublicKey(
      "27j5uCqQQvRWUpkPTKow3Nwf2gvznF5FGVmt4ckF26FV"
    );
    const amount = new BigNumber(20);
    const reference = new Keypair().publicKey;
    //   const reference = "qHzmuyyTE5PJsQRLhq2v3NWfw2MoTX8C3ykWQpA64sC";
    const label = "Jungle Cats store";
    const message = "Jungle Cats store - your order - #001234";
    const memo = "JC#4098";

    /**
     * Create a payment request link
     *
     * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
     * Several parameters are encoded within the link representing an intent to collect payment from a customer.
     */
    console.log("3. 💰 Create a payment request link \n");
    const url = encodeURL({
      recipient,
      amount,
      reference,
      label,
      message,
      memo,
    });
    console.log("url", url);

    /**
     * Simulate a checkout experience with an SPL token
     */
    console.log("2. 🛍 Simulate a customer checkout \n");
    // const splToken = new PublicKey(
    //   "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    // );

    /**
     * Create a payment request link
     *
     * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
     * Several parameters are encoded within the link representing an intent to collect payment from a customer.
     */
    console.log("3. 💰 Create a payment request link \n");
    // const url = encodeURL({
    //   recipient,
    //   amount,
    //   splToken,
    //   reference,
    //   label,
    //   message,
    //   memo,
    // });

    // encode URL in QR code
    const qrCode = createQR(url);

    // get a handle of the element
    const element = document.getElementById("qr-code");

    // append QR code to the element
    qrCode.append(element);
  }

  useEffect(main, []);

  return (
    <>
      <div>Payment</div>
      <a href="solana:27j5uCqQQvRWUpkPTKow3Nwf2gvznF5FGVmt4ckF26FV?amount=20&reference=FPW3rq67dZGDFqkc8oBcVi8traPk6G5bqRwUYX6R62Jb&label=Jungle%20Cats%20store&message=Jungle%20Cats%20store%20-%20your%20order%20-%20%23001234&memo=JC%234098">
        Pay
      </a>
      <div id="qr-code"></div>
    </>
  );
}
