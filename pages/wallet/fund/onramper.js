import dynamic from "next/dynamic";

import PageHeaderWithBack from "../../../components/PageHeaderWithBack";

export const solToNaira = 24000;
export const minSol = 0.01;

export const solWalletAddr = process.env.NEXT_PUBLIC_SOLANA_WALLET_ADDRESS;
export const onramperApiKey = process.env.NEXT_PUBLIC_ONRAMPER_PUBLIC_KEY;

export default function FundWallet({ profile }) {
  const OnramperWidget = dynamic(() => import("@onramper/widget"));

  return (
    <>
      <PageHeaderWithBack title="Onramper" backLink="/wallet/fund" />
      <div className="card card-style">
        <div className="content">
          <div
            style={{
              width: "calc(100vw - 60px)",
              height: "calc(100vh - 105px)",
            }}
          >
            <OnramperWidget
              color="#4A89DC"
              fontFamily="'Source Sans Pro', sans-serif"
              defaultAddrs={{
                SOL: { address: solWalletAddr },
              }}
              isAddressEditable={false}
              API_KEY={onramperApiKey}
              filters={{
                onlyCryptos: ["SOL"],
              }}
              // amountInCrypto={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
