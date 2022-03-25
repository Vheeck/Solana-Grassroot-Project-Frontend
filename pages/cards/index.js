import { useState, useEffect } from "react";
import Link from "next/link";
import Request from "../../components/Request";
import getSlides from "../../components/Splide";
import setCardStack from "../../components/CardStack";
import PageHeader from "../../components/PageHeader";

export default function Cards({ profile }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCards();
    setCardStack();
  }, []);

  useEffect(() => {
    setTimeout(setCardStack, 500);
    // getSlides();
  }, [cards]);

  const getCards = async () => {
    setIsLoading(true);
    const result = await Request.get("/cards");
    console.log(result);
    setCards(result.data);
    setIsLoading(false);
  };

  return (
    <>
      <PageHeader
        title="Cards"
        profile={profile}
        headerLeft={
          <Link href="/cards/new" passHref>
            <a className="icon gradient-green color-white shadow-bg shadow-bg-xs rounded-m">
              <i className="bi bi-plus-circle font-17"></i>
            </a>
          </Link>
        }
      />

      {isLoading ? (
        <p
          style={{
            position: "inherit",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : !cards.length ? (
        <p
          style={{
            position: "inherit",
            textAlign: "center",
          }}
        >
          You have no cards yet.
        </p>
      ) : (
        <div className="card-stack" data-stack-height="180">
          <div className="card-stack-click"></div>
          {cards.map(({ createdAt, details, balance }, i) => (
            <div key={i} className="card card-style bg-5">
              <div className="card-top p-3">
                <a
                  href="#"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#menu-card-more"
                  className="icon icon-xxs bg-white color-black float-end"
                >
                  <i className="bi bi-three-dots font-18"></i>
                </a>
              </div>
              <div className="card-center">
                <div className="bg-theme px-3 py-2 rounded-end d-inline-block">
                  <h1 className="font-13 my-n1">
                    <a
                      className="color-theme"
                      data-bs-toggle="collapse"
                      href="#balance3"
                      aria-controls="balance2"
                    >
                      Click for Balance
                    </a>
                  </h1>
                  <div className="collapse" id="balance3">
                    <h2 className="color-theme font-26">$26,315</h2>
                  </div>
                </div>
              </div>
              <strong className="card-top no-click font-12 p-3 color-white font-monospace">
                Main Account
              </strong>
              <strong className="card-bottom no-click p-3 text-start color-white font-monospace">
                1234 5678 1234 5661
              </strong>
              <strong className="card-bottom no-click p-3 text-end color-white font-monospace">
                08 / 2025
              </strong>
              <div className="card-overlay bg-black opacity-50"></div>
            </div>
          ))}
        </div>
      )}

      <h6
        className={`btn-stack-info color-theme opacity-80 text-center ${
          cards.length === 1 ? "mt-2" : "mt-n2"
        } mb-3`}
      >
        {!cards.length || isLoading
          ? ""
          : "Tap the Cards to Expand your Wallet"}
      </h6>
      <a
        href="#"
        className="disabled btn-stack-click btn mx-3 mb-4 btn-full gradient-highlight shadow-bg shadow-bg-xs"
      >
        Close my Wallet
      </a>

      <Link href="/cards/new" passHref>
        <a className="btn mx-3 mb-4 btn-full gradient-highlight shadow-bg shadow-bg-xs">
          Create a Card
        </a>
      </Link>

      {/* <button className="btn mx-3 mb-4 btn-full gradient-highlight shadow-bg shadow-bg-xs" style={{}}>Create a Card</button> */}

      {/* <div className="card card-style">
        <div className="content mb-0">
          <div className="tabs tabs-pill" id="tab-group-2">
            <div className="tab-controls rounded-m p-1">
              <a
                className="font-13 rounded-m"
                data-bs-toggle="collapse"
                href="#tab-4"
                aria-expanded="true"
              >
                Settings
              </a>
              <a
                className="font-13 rounded-m"
                data-bs-toggle="collapse"
                href="#tab-5"
                aria-expanded="false"
              >
                History
              </a>
              <a
                className="font-13 rounded-m"
                data-bs-toggle="collapse"
                href="#tab-x"
                aria-expanded="false"
              >
                Activity
              </a>
            </div>

            <div className="mt-3"></div>
            <div
              className="collapse show"
              id="tab-4"
              data-bs-parent="#tab-group-2"
            >
              <div className="list-group list-custom list-group-m list-group-flush rounded-xs px-1">
                <a
                  href="#"
                  className="list-group-item pe-2"
                  data-trigger-switch="switch-5"
                >
                  <i className="has-bg gradient-green color-white shadow-bg shadow-bg-xs rounded-xs bi bi-gear-fill"></i>
                  <div>
                    <strong> Use Online Payments</strong>
                    <span>Use this card to pay online</span>
                  </div>
                  <div className="form-switch ios-switch switch-green switch-s">
                    <input
                      type="checkbox"
                      className="ios-input"
                      id="switch-5"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="switch-5"
                    ></label>
                  </div>
                </a>
                <a
                  href="#"
                  className="list-group-item pe-2"
                  data-trigger-switch="switch-51"
                >
                  <i className="has-bg gradient-magenta color-white shadow-bg shadow-bg-xs rounded-xs bi bi-wifi"></i>
                  <div>
                    <strong> Use NFC Payments</strong>
                    <span>Pay With Card Contactless</span>
                  </div>
                  <div className="form-switch ios-switch switch-green switch-s">
                    <input
                      type="checkbox"
                      className="ios-input"
                      id="switch-51"
                      checked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="switch-51"
                    ></label>
                  </div>
                </a>
                <a
                  href="#"
                  className="list-group-item pe-2"
                  data-trigger-switch="switch-5"
                >
                  <i className="has-bg gradient-blue color-white shadow-bg shadow-bg-xs rounded-xs bi bi-filter-circle"></i>
                  <div>
                    <strong>Change Card Name</strong>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </a>
                <a
                  href="#"
                  className="list-group-item pe-2"
                  data-trigger-switch="switch-5"
                >
                  <i className="has-bg gradient-red color-white shadow-bg shadow-bg-xs rounded-xs bi bi-x-circle"></i>
                  <div>
                    <strong>Remove this Card</strong>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </a>
                <a
                  href="#"
                  className="list-group-item pe-2"
                  data-trigger-switch="switch-5"
                >
                  <i className="has-bg gradient-yellow color-white shadow-bg shadow-bg-xs rounded-xs bi bi-question-circle"></i>
                  <div>
                    <strong>Report Lost or Stolen</strong>
                  </div>
                  <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>

            <div className="collapse" id="tab-5" data-bs-parent="#tab-group-2">
              <div className="form-custom form-label form-border form-icon mt-0 mb-0">
                <i className="bi bi-check-circle font-13"></i>
                <select
                  className="form-select rounded-xs"
                  id="c6"
                  aria-label="Floating label select example"
                >
                  <option selected>Latest Activity</option>
                  <option value="1">Last 30 Days</option>
                  <option value="2">Last 90 Days</option>
                  <option value="3">Last 6 Months</option>
                </select>
              </div>
              <div className="list-group list-custom list-group-m list-group-flush rounded-xs">
                <a href="#" className="list-group-item">
                  <i className="has-bg gradient-green color-white rounded-xs bi bi-cash-coin"></i>
                  <div>
                    <strong>Savings</strong>
                    <span>14 Transactions</span>
                  </div>
                  <span className="badge bg-transparent color-theme text-end font-15">
                    $414
                    <br />
                    <em className="fst-normal font-12 opacity-30">13.5%</em>
                  </span>
                </a>
                <a href="#" className="list-group-item">
                  <i className="has-bg gradient-yellow color-white rounded-xs bi bi-droplet"></i>
                  <div>
                    <strong>Utilities</strong>
                    <span>11 Transactions</span>
                  </div>
                  <span className="badge bg-transparent color-theme text-end font-15">
                    $631
                    <br />
                    <em className="fst-normal font-12 opacity-30">20.3%</em>
                  </span>
                </a>
                <a href="#" className="list-group-item">
                  <i className="has-bg gradient-blue color-white rounded-xs bi bi-bag"></i>
                  <div>
                    <strong>Shopping</strong>
                    <span>23 Transactions</span>
                  </div>
                  <span className="badge bg-transparent color-theme text-end font-15">
                    $950
                    <br />
                    <em className="fst-normal font-12 opacity-30">45.7%</em>
                  </span>
                </a>
                <a href="#" className="list-group-item">
                  <i className="has-bg gradient-red color-white rounded-xs bi bi-gear"></i>
                  <div>
                    <strong>Construction</strong>
                    <span>34 Transactions</span>
                  </div>
                  <span className="badge bg-transparent color-theme text-end font-15">
                    $315
                    <br />
                    <em className="fst-normal font-12 opacity-30">19.5%</em>
                  </span>
                </a>
                <a href="#" className="list-group-item">
                  <i className="has-bg gradient-magenta color-white rounded-xs bi bi-shuffle"></i>
                  <div>
                    <strong>Other Costs</strong>
                    <span>15 Transactions</span>
                  </div>
                  <span className="badge bg-transparent color-theme text-end font-15">
                    $530
                    <br />
                    <em className="fst-normal font-12 opacity-30">35.5%</em>
                  </span>
                </a>
              </div>
            </div>

            <div className="collapse" id="tab-x" data-bs-parent="#tab-group-2">
              <a href="page-activity.html" className="d-flex py-1">
                <div className="align-self-center">
                  <span className="icon rounded-s me-2 gradient-orange shadow-bg shadow-bg-xs">
                    <i className="bi bi-google color-white"></i>
                  </span>
                </div>
                <div className="align-self-center ps-1">
                  <h5 className="pt-1 mb-n1">Google Ads</h5>
                  <p className="mb-0 font-11 opacity-70">
                    14th March <span className="copyright-year"></span>
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <h4 className="pt-1 mb-n1 color-red-dark">$150.55</h4>
                  <p className="mb-0 font-11">Bill Payment</p>
                </div>
              </a>
              <div className="divider my-2 opacity-50"></div>
              <a href="page-activity.html" className="d-flex py-1">
                <div className="align-self-center">
                  <span className="icon rounded-s me-2 gradient-blue shadow-bg shadow-bg-xs">
                    <i className="bi bi-cloud-fill color-white"></i>
                  </span>
                </div>
                <div className="align-self-center ps-1">
                  <h5 className="pt-1 mb-n1">Cloud Storage</h5>
                  <p className="mb-0 font-11 opacity-70">
                    14th March <span className="copyright-year"></span>
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <h4 className="pt-1 mb-n1 color-red-dark">$15.55</h4>
                  <p className="mb-0 font-11">Subscription</p>
                </div>
              </a>
              <div className="divider my-2 opacity-50"></div>
              <a href="page-activity.html" className="d-flex py-1">
                <div className="align-self-center">
                  <span className="icon rounded-s me-2 gradient-orange shadow-bg shadow-bg-xs">
                    <img
                      src="images/pictures/31s.jpg"
                      width="46"
                      className="rounded-s"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="align-self-center ps-1">
                  <h5 className="pt-1 mb-n1">Jane Son</h5>
                  <p className="mb-0 font-11 opacity-70">
                    14th March <span className="copyright-year"></span>
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <h4 className="pt-1 mb-n1 color-green-dark">$130.55</h4>
                  <p className="mb-0 font-11">Direct Transfer</p>
                </div>
              </a>
              <div className="divider my-2 opacity-50"></div>
              <a href="page-activity.html" className="d-flex py-1">
                <div className="align-self-center">
                  <span className="icon rounded-s me-2 gradient-green shadow-bg shadow-bg-xs">
                    <i className="bi bi-caret-up-fill color-white"></i>
                  </span>
                </div>
                <div className="align-self-center ps-1">
                  <h5 className="pt-1 mb-n1">Bitcoin</h5>
                  <p className="mb-0 font-11 opacity-70">
                    14th March <span className="copyright-year"></span>
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <h4 className="pt-1 mb-n1 color-blue-dark">+0.315%</h4>
                  <p className="mb-0 font-11">Stock Update</p>
                </div>
              </a>
              <div className="divider my-2 opacity-50"></div>
              <a href="page-activity.html" className="d-flex py-1">
                <div className="align-self-center">
                  <span className="icon rounded-s me-2 gradient-yellow shadow-bg shadow-bg-xs">
                    <i className="bi bi-pie-chart-fill color-white"></i>
                  </span>
                </div>
                <div className="align-self-center ps-1">
                  <h5 className="pt-1 mb-n1">Dividends</h5>
                  <p className="mb-0 font-11 opacity-70">
                    13th March <span className="copyright-year"></span>
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <h4 className="pt-1 mb-n1 color-green-dark">$950.00</h4>
                  <p className="mb-0 font-11">Wire Transfer</p>
                </div>
              </a>
              <div className="pb-3"></div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

// <div>
//       <h1>Cards</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : !cards ? (
//         <p>You have no cards yet.</p>
//       ) : (
//         <div>
//           <h3>Cards</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date and Time</th>
//                 <th>Details</th>
//                 {/* <th>Balance at the Time</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {cards.map(({ createdAt, details, balance }, i) => (
//                 <tr key={i}>
//                   <td>{createdAt}</td>
//                   <td>{JSON.stringify(details)}</td>
//                   {/* <td>{balance}</td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <Link href="/cards/new">
//         <button>Create Card</button>
//       </Link>
//     </div>
