import Link from "next/link";

const PageHeader = ({
  title,
  profile: { firstName, photo },
  headerLeft = <></>,
}) => (
  <div className="pt-3">
    <div className="page-title d-flex">
      <div className="align-self-center me-auto">
        <p className="color-highlight">Hello {firstName}</p>
        <h1 className="color-theme">{title}</h1>
      </div>
      <div className="align-self-center ms-auto">
        {headerLeft}
        {/* <a
          href="#"
          data-bs-toggle="offcanvas"
          data-bs-target="#menu-notifications"
          className="icon gradient-blue color-white shadow-bg shadow-bg-xs rounded-m"
        >
          <i className="bi bi-bell-fill font-17"></i>
          <em className="badge bg-red-dark color-white scale-box">3</em>
        </a> */}
        <a
          href="#"
          data-bs-toggle="dropdown"
          className="icon gradient-blue shadow-bg shadow-bg-s rounded-m"
        >
          <img
            src={photo}
            width="45"
            height="45"
            style={{ objectFit: "cover" }}
            className="rounded-m"
            alt="img"
          />
        </a>
        <div className="dropdown-menu">
          <div className="card card-style shadow-m mt-1 me-1">
            <div className="list-group list-custom list-group-s list-group-flush rounded-xs px-3 py-1">
              <Link href="/wallet" passHref>
                <a className="list-group-item">
                  <i className="has-bg gradient-green shadow-bg shadow-bg-xs color-white rounded-xs bi bi-wallet2"></i>
                  <strong className="font-13">Wallet</strong>
                </a>
              </Link>
              <Link href="/cards" passHref>
                <a className="list-group-item">
                  <i className="has-bg gradient-blue shadow-bg shadow-bg-xs color-white rounded-xs bi bi-credit-card"></i>
                  <strong className="font-13">Cards</strong>
                </a>
              </Link>
              <Link href="/invest" passHref>
                <a className="list-group-item">
                  <i className="has-bg gradient-yellow shadow-bg shadow-bg-xs color-white rounded-xs bi bi-cash-coin"></i>
                  <strong className="font-13">Invest</strong>
                </a>
              </Link>
              <Link href="/profile" passHref>
                <a className="list-group-item">
                  <i className="has-bg gradient-red shadow-bg shadow-bg-xs color-white rounded-xs bi bi-person"></i>
                  <strong className="font-13">Profile</strong>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageHeader;
