import { useState, useEffect } from "react";
import Request from "../components/Request";
import PageHeader from "../components/PageHeader";
import TransactionRow from "../components/TransactionRow";

export default function Invest({ profile }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => getWallet(), []);

  const getWallet = async () => {
    const result = await Request.get("/wallet");
    console.log(result);
    setWallet(result.data);
  };

  return (
    <>
      <PageHeader title="Invest" profile={profile} />

      <div className="card card-style">
        <div className="content">
          <h2 className="text-center">No charity products available currently</h2>
          <p className="text-center">Please check this page frequently for updates</p>
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
