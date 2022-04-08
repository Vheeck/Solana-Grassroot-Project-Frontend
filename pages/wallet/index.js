import { useState, useEffect } from "react";
import Link from "next/link";
import Request from "../../components/Request";
import { formatMoney } from "../../components/FormatMoney";
import { solToNaira } from "./fund";
import PageHeader from "../../components/PageHeader";
import TransactionRow from "../../components/TransactionRow";

export default function Wallet({ profile }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => getWallet(), []);

  const getWallet = async () => {
    const result = await Request.get("/wallet");
    // console.log(result);
    setWallet(result.data);
  };

  return (
    <>
      <PageHeader title="Wallet" profile={profile} />

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
                {wallet
                  ? `${wallet.balance} SOL (${formatMoney(
                      wallet.balance * solToNaira,
                      true
                    )})`
                  : "Loading..."}
              </h1>
              <p className="mb-0 font-12 opacity-50">Wallet Balanace</p>
            </div>
          </div>
        </div>
      </div>

      <Link href="/wallet/fund" passHref>
        <a className="btn mx-3 mb-4 btn-full gradient-highlight shadow-bg shadow-bg-xs">
          Fund Wallet
        </a>
      </Link>

      <div className="card card-style">
        <div className="content">
          <div className="tabs tabs-pill" id="tab-group-2">
            <div className="tab-controls rounded-m p-1 overflow-visible">
              <a
                className="font-13 rounded-m shadow-bg shadow-bg-s"
                data-bs-toggle="collapse"
                href="#tab-4"
                aria-expanded="true"
              >
                All
              </a>
              <a
                className="font-13 rounded-m shadow-bg shadow-bg-s"
                data-bs-toggle="collapse"
                href="#tab-5"
                aria-expanded="false"
              >
                Credit
              </a>
              <a
                className="font-13 rounded-m shadow-bg shadow-bg-s"
                data-bs-toggle="collapse"
                href="#tab-6"
                aria-expanded="false"
              >
                Debit
              </a>
            </div>
            <div className="mt-3"></div>

            <div
              className="collapse show"
              id="tab-4"
              data-bs-parent="#tab-group-2"
            >
              {!wallet ? (
                "Loading..."
              ) : wallet.history.length ? (
                wallet.history.reverse().map((data, i) => (
                  <>
                    <TransactionRow key={i} data={data} />
                    {wallet.history.length !== i + 1 ? (
                      <div className="divider my-2 opacity-50"></div>
                    ) : (
                      ""
                    )}
                  </>
                ))
              ) : (
                <p className="text-center">No data available</p>
              )}
            </div>
            <div className="collapse" id="tab-5" data-bs-parent="#tab-group-2">
              {!wallet ? (
                "Loading..."
              ) : wallet.history.filter((data) => data.action === "Credit")
                  .length ? (
                wallet.history
                  .reverse()
                  .filter((data) => data.action === "Credit")
                  .map((data, i) => (
                    <>
                      <TransactionRow key={i} data={data} />
                      {wallet.history.length !== i + 1 ? (
                        <div className="divider my-2 opacity-50"></div>
                      ) : (
                        ""
                      )}
                    </>
                  ))
              ) : (
                <p className="text-center">No data available</p>
              )}
            </div>

            <div className="collapse" id="tab-6" data-bs-parent="#tab-group-2">
              {!wallet ? (
                "Loading..."
              ) : wallet.history.filter((data) => data.action === "Debit")
                  .length ? (
                wallet.history
                  .reverse()
                  .filter((data) => data.action === "Debit")
                  .map((data, i) => (
                    <>
                      <TransactionRow key={i} data={data} />
                      {wallet.history.length !== i + 1 ? (
                        <div className="divider my-2 opacity-50"></div>
                      ) : (
                        ""
                      )}
                    </>
                  ))
              ) : (
                <p className="text-center">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div>
// <div>
//   <h2>
//     {firstName} {lastName}
//   </h2>
// </div>
// <div>
//   <p>Wallet Balance</p>
//   <h1>{wallet.balance} SOL</h1>
//   <p>Amount in Naira</p>
//   <h4>{formatMoney(wallet.balance * solToNaira, true)}</h4>
//   <Link href="/wallet/fund">Fund Wallet</Link>
// </div>
// <div>
//   <h3>Wallet History</h3>
//   <table>
//     <thead>
//       <tr>
//         <th>Date and Time</th>
//         <th>Action</th>
//         <th>Balance at the Time</th>
//       </tr>
//     </thead>
//     <tbody>
//       {wallet.history.map(({ dateTime, action, balance }, i) => (
//         <tr key={i}>
//           <td>{dateTime}</td>
//           <td>{action}</td>
//           <td>{balance}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// </div>
