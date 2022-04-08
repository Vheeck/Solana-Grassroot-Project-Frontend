import { useState, useEffect, useReducer, useMemo } from "react";
import Link from "next/link";
import Auth, { AuthContext, logout, user } from "../components/Auth";
import Loading from "../components/Loading";
import Request from "../components/Request";
import Header from "../components/Header";
import WavesSVG from "../components/WavesSVG";
import getSlides from "../components/Splide";
import { formatMoney } from "../components/FormatMoney";
import { solToNaira } from "./wallet/fund";

export default function Home({ profile }) {
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    getWallet();
    getSlides();
    getCards();
  }, []);

  useEffect(() => {
    setTimeout(getSlides, 500);
    // getSlides();
  }, [cards]);

  const getWallet = async () => {
    const result = await Request.get("/wallet");
    // console.log(result);
    setWallet(result.data);
  };

  const getCards = async () => {
    setIsLoading(true);
    const result = await Request.get("/cards");
    // console.log(result);
    setCards(result.data);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <WavesSVG />

      <div className="card card-style gradient-green shadow-bg shadow-bg-s">
        <div className="content">
          <Link href="/wallet" passHref>
            <a className="d-flex">
              <div className="align-self-center">
                <h1 className="mb-0 font-40">
                  <i className="bi bi-wallet2 color-white pe-3"></i>
                </h1>
              </div>
              <div className="align-self-center">
                <h5 className="color-white font-700 mb-0 mt-0">
                  {wallet ? `${wallet.balance} SOL (${formatMoney(wallet.balance * solToNaira, true)})` : "Loading..."}
                </h5>
                <h6 className="color-white font-700 mb-0 mt-0">Wallet Balanace</h6>
              </div>
            </a>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <p
          style={{
            position: "inherit",
            color: "white",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : !cards.length ? (
        <p
          style={{
            position: "inherit",
            color: "white",
            textAlign: "center",
          }}
        >
          You have no cards yet.
        </p>
      ) : (
        <div
          className="splide single-slider slider-no-dots slider-no-arrows slider-visible"
          id="single-slider-1"
        >
          <div className="splide__track">
            <div className="splide__list">
              {cards.map(({ createdAt, details, balance }, i) => (
                <div className="splide__slide" key={i}>
                  <div
                    className="card card-style m-0 bg-5 shadow-card shadow-card-m"
                    style={{ height: "200px" }}
                  >
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
                          <h2 className="color-theme font-26">
                            {formatMoney(123400)}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <strong className="card-top no-click font-12 p-3 color-white font-monospace">
                      Main Account
                    </strong>
                    <strong className="card-bottom no-click p-3 font-12 text-start color-white font-monospace">
                      XXXX XXXX XXXX{" "}
                      {details.last4Digits ? details.last4Digits : "XXXX"}
                    </strong>
                    <strong className="card-bottom no-click p-3 font-12 text-end color-white font-monospace">
                      {details.expiryMonth ? details.expiryMonth : "XX"} /{" "}
                      {details.expiryYear ? details.expiryYear : "XX"}
                    </strong>
                    <div className="card-overlay bg-black opacity-50"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="content py-2">
        <div className="d-flex text-center">
          <div className="me-auto">
            <a
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu-transfer"
              className="icon icon-xxl rounded-m bg-theme shadow-m"
            >
              <i className="font-28 color-green-dark bi bi-arrow-up-circle"></i>
            </a>
            <h6 className="font-13 opacity-80 font-500 mb-0 pt-2">Transfer</h6>
          </div>
          <div className="m-auto">
            <a
              href="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu-request"
              className="icon icon-xxl rounded-m bg-theme shadow-m"
            >
              <i className="font-28 color-red-dark bi bi-arrow-down-circle"></i>
            </a>
            <h6 className="font-13 opacity-80 font-500 mb-0 pt-2">Request</h6>
          </div>
          <div
            data-bs-toggle="offcanvas"
            data-bs-target="#menu-exchange"
            className="m-auto"
          >
            <a href="#" className="icon icon-xxl rounded-m bg-theme shadow-m">
              <i className="font-28 color-blue-dark bi bi-arrow-repeat"></i>
            </a>
            <h6 className="font-13 opacity-80 font-500 mb-0 pt-2">Exchange</h6>
          </div>
          <div className="ms-auto">
            <a
              href="page-payment-bill.html"
              className="icon icon-xxl rounded-m bg-theme shadow-m"
            >
              <i className="font-28 color-brown-dark bi bi-filter-circle"></i>
            </a>
            <h6 className="font-13 opacity-80 font-500 mb-0 pt-2">Bills</h6>
          </div>
        </div>
      </div>

      <div className="content my-0 mt-n2 px-1">
        <div className="d-flex">
          <div className="align-self-center">
            <h3 className="font-16 mb-2">Recent Activity</h3>
          </div>
          <div className="align-self-center ms-auto">
            <a href="page-activity.html" className="font-12 pt-1">
              View All
            </a>
          </div>
        </div>
      </div>

      <div className="card card-style">
        <div className="content">
          <a href="page-activity.html" className="d-flex py-1">
            <div className="align-self-center">
              <span className="icon rounded-s me-2 gradient-orange shadow-bg shadow-bg-s">
                <i className="bi bi-google color-white"></i>
              </span>
            </div>
            <div className="align-self-center ps-1">
              <h5 className="pt-1 mb-n1">Google Ads</h5>
              <p className="mb-0 font-11 opacity-50">
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
              <span className="icon rounded-s me-2 gradient-green shadow-bg shadow-bg-s">
                <i className="bi bi-caret-up-fill color-white"></i>
              </span>
            </div>
            <div className="align-self-center ps-1">
              <h5 className="pt-1 mb-n1">Bitcoin</h5>
              <p className="mb-0 font-11 opacity-50">
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
              <span className="icon rounded-s me-2 gradient-yellow shadow-bg shadow-bg-s">
                <i className="bi bi-pie-chart-fill color-white"></i>
              </span>
            </div>
            <div className="align-self-center ps-1">
              <h5 className="pt-1 mb-n1">Dividends</h5>
              <p className="mb-0 font-11 opacity-50">
                13th March <span className="copyright-year"></span>
              </p>
            </div>
            <div className="align-self-center ms-auto text-end">
              <h4 className="pt-1 mb-n1 color-green-dark">$950.00</h4>
              <p className="mb-0 font-11">Wire Transfer</p>
            </div>
          </a>
        </div>
      </div>

      <div className="content my-0 mt-n2 px-1">
        <div className="d-flex">
          <div className="align-self-center">
            <h3 className="font-16 mb-2">Account Activity</h3>
          </div>
          <div className="align-self-center ms-auto">
            <a href="page-activity.html" className="font-12 pt-1">
              View All
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* 
      <div>Is Logged In, {JSON.stringify(profile)}</div>
      <div>
        <Link href="/payment">Go to make Payment</Link>
      </div>
      <div>
        <Link href="/profile">Go to Profile</Link>
      </div>
      <div>
        <Link href="/wallet">Go to Wallet</Link>
      </div>
      <div>
        <Link href="/cards">Go to Cards</Link>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div> */
}

// <div className="splide__slide">
// <div
//   className="card card-style m-0 bg-5 shadow-card shadow-card-m"
//   style={{ height: "200px" }}
// >
//   <div className="card-top p-3">
//     <a
//       href="#"
//       data-bs-toggle="offcanvas"
//       data-bs-target="#menu-card-more"
//       className="icon icon-xxs bg-white color-black float-end"
//     >
//       <i className="bi bi-three-dots font-18"></i>
//     </a>
//   </div>
//   <div className="card-center">
//     <div className="bg-theme px-3 py-2 rounded-end d-inline-block">
//       <h1 className="font-13 my-n1">
//         <a
//           className="color-theme"
//           data-bs-toggle="collapse"
//           href="#balance3"
//           aria-controls="balance2"
//         >
//           Click for Balance
//         </a>
//       </h1>
//       <div className="collapse" id="balance3">
//         <h2 className="color-theme font-26">$26,315</h2>
//       </div>
//     </div>
//   </div>
//   <strong className="card-top no-click font-12 p-3 color-white font-monospace">
//     Main Account
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-start color-white font-monospace">
//     1234 5678 1234 5661
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-end color-white font-monospace">
//     08 / 25
//   </strong>
//   <div className="card-overlay bg-black opacity-50"></div>
// </div>
// </div>
// <div className="splide__slide">
// <div
//   className="card card-style m-0 bg-9 shadow-card shadow-card-m"
//   style={{ height: "200px" }}
// >
//   <div className="card-top p-3">
//     <a
//       href="#"
//       data-bs-toggle="offcanvas"
//       data-bs-target="#menu-card-more"
//       className="icon icon-xxs bg-white color-black float-end"
//     >
//       <i className="bi bi-three-dots font-18"></i>
//     </a>
//   </div>
//   <div className="card-center">
//     <div className="bg-theme px-3 py-2 rounded-end d-inline-block">
//       <h1 className="font-13 my-n1">
//         <a
//           className="color-theme"
//           data-bs-toggle="collapse"
//           href="#balance1"
//           aria-controls="balance1"
//         >
//           Click for Balance
//         </a>
//       </h1>
//       <div className="collapse" id="balance1">
//         <h2 className="color-theme font-26">$65,500</h2>
//       </div>
//     </div>
//   </div>
//   <strong className="card-top no-click font-12 p-3 color-white font-monospace">
//     Company Account
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-start color-white font-monospace">
//     1234 5678 1234 5661
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-end color-white font-monospace">
//     08 / 25
//   </strong>
//   <div className="card-overlay bg-black opacity-50"></div>
// </div>
// </div>
// <div className="splide__slide">
// <div
//   className="card card-style m-0 bg-7 shadow-card shadow-card-m"
//   style={{ height: "200px" }}
// >
//   <div className="card-top p-3">
//     <a
//       href="#"
//       data-bs-toggle="offcanvas"
//       data-bs-target="#menu-card-more"
//       className="icon icon-xxs bg-white color-black float-end"
//     >
//       <i className="bi bi-three-dots font-18"></i>
//     </a>
//   </div>
//   <div className="card-center">
//     <div className="bg-theme px-3 py-2 rounded-end d-inline-block">
//       <h1 className="font-13 my-n1">
//         <a
//           className="color-theme"
//           data-bs-toggle="collapse"
//           href="#balance2"
//           aria-controls="balance2"
//         >
//           Click for Balance
//         </a>
//       </h1>
//       <div className="collapse" id="balance2">
//         <h2 className="color-theme font-26">$15,100</h2>
//       </div>
//     </div>
//   </div>
//   <strong className="card-top no-click font-12 p-3 color-white font-monospace">
//     Savings Account
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-start color-white font-monospace">
//     1234 5678 1234 5661
//   </strong>
//   <strong className="card-bottom no-click p-3 font-12 text-end color-white font-monospace">
//     08 / 25
//   </strong>
//   <div className="card-overlay bg-black opacity-50"></div>
// </div>
// </div>
