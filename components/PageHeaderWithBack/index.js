import Link from "next/link";

const PageHeaderWithBack = ({
    title,
    backLink,
    headerLeft = <></>,
  }) => (
  <div className="pt-3">
    <div className="page-title d-flex">
      <div className="align-self-center">
        <Link href={backLink} passHref>
          <a
            data-back-button
            className="me-3 ms-0 icon icon-xxs bg-theme rounded-s shadow-m"
          >
            <i className="bi bi-chevron-left color-theme font-14"></i>
          </a>
        </Link>
      </div>
      <div className="align-self-center me-auto">
        <h1 className="color-theme mb-0 font-18">{title}</h1>
      </div>
      {headerLeft}
      {/* <div className="align-self-center ms-auto">
        <a
          href="#"
          data-bs-toggle="offcanvas"
          data-bs-target="#menu-sidebar"
          className="icon icon-xxs gradient-highlight color-white shadow-bg shadow-bg-xs rounded-s"
        >
          <i className="bi bi-list font-20"></i>
        </a>
      </div> */}
    </div>
  </div>
);

export default PageHeaderWithBack;