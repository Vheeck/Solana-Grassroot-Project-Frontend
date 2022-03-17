import { useState, useEffect } from "react";
import Link from "next/link";
import Request from "../../components/Request";
import { formatMoney } from "../../components/FormatMoney";
import { solToNaira } from "./fund";

export default function Wallet({ profile }) {
  const { firstName, lastName } = profile;

  const [wallet, setWallet] = useState(null);

  useEffect(() => getWallet(), []);

  const getWallet = async () => {
    const result = await Request.get("/wallet");
    console.log(result);
    setWallet(result.data);
  };

  if (!wallet) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>
          {firstName} {lastName}
        </h2>
      </div>
      <div>
        <p>Wallet Balance</p>
        <h1>{wallet.balance} SOL</h1>
        <p>Amount in Naira</p>
        <h4>{formatMoney(wallet.balance * solToNaira, true)}</h4>
        <Link href="/wallet/fund">Fund Wallet</Link>
      </div>
      <div>
        <h3>Wallet History</h3>
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Action</th>
              <th>Balance at the Time</th>
            </tr>
          </thead>
          <tbody>
            {wallet.history.map(({ dateTime, action, balance }) => (
              <tr>
                <td>{dateTime}</td>
                <td>{action}</td>
                <td>{balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
