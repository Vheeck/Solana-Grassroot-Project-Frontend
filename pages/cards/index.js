import { useState, useEffect } from "react";
import Link from "next/link";
import Request from "../../components/Request";

export default function Cards() {
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => getCards(), []);

  const getCards = async () => {
    setIsLoading(true);
    const result = await Request.get("/cards");
    console.log(result);
    setCards(result.data);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Cards</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : !cards ? (
        <p>You have no cards yet.</p>
      ) : (
        <div>
          <h3>Cards</h3>
          <table>
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Details</th>
                {/* <th>Balance at the Time</th> */}
              </tr>
            </thead>
            <tbody>
              {cards.map(({ createdAt, details, balance }, i) => (
                <tr key={i}>
                  <td>{createdAt}</td>
                  <td>{JSON.stringify(details)}</td>
                  {/* <td>{balance}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link href="/cards/new">
        <button>Create Card</button>
      </Link>
    </div>
  );
}
