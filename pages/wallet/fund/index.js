import dynamic from "next/dynamic";
import Link from "next/link";

import PageHeader from "../../../components/PageHeader";

export const solToNaira = 24000;
export const minSol = 0.01;

export const solWalletAddr = process.env.NEXT_PUBLIC_SOLANA_WALLET_ADDRESS;
export const onramperApiKey = process.env.NEXT_PUBLIC_ONRAMPER_PUBLIC_KEY;

export default function FundWallet({ profile }) {
  const OnramperWidget = dynamic(() => import("@onramper/widget"));

  return (
    <>
      <PageHeader title="Fund Wallet" profile={profile} />
      <div className="card card-style">
        <div className="content">
          <h4 className="text-center">How do you wish to fund your wallet?</h4>
          <p className="text-center">Select a funding method</p>
          <Link href="/wallet/fund/solana-pay" passHref>
            <button
              style={{ width: "100%" }}
              className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
            >
              Fund via Solana Pay
            </button>
          </Link>
          <Link href="/wallet/fund/onramper" passHref>
            <button
              style={{ width: "100%" }}
              className="btn btn-full gradient-highlight shadow-bg shadow-bg-s mt-4"
            >
              Fund via Onramper
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
