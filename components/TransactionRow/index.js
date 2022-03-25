import { months } from "../../constants";
import { formatMoney } from "../FormatMoney";

const TransactionRow = ({ data: { dateTime, action, balance } }) => {
  const date = new Date(dateTime);
  const color =
    action == "Creation" ? "blue" : action == "Credit" ? "green" : "red";
  const icon =
    action == "Creation"
      ? "wallet"
      : action == "Credit"
      ? "arrow-up"
      : "arrow-down";
  return (
    <a
      // href="#"
      className="d-flex py-1"
      // data-bs-toggle="offcanvas"
      // data-bs-target="#menu-activity-1"
    >
      <div className="align-self-center">
        <span
          className={`icon rounded-s me-2 gradient-${color} shadow-bg shadow-bg-xs`}
        >
          <i className={`bi bi-${icon} color-white`}></i>
        </span>
      </div>
      <div className="align-self-center ps-1">
        <h5 className="pt-1 mb-n1">{action}</h5>
        <p className="mb-0 font-11 opacity-70">
          {date.getDate()}
          {date.getDate() == 1
            ? "st"
            : date.getDate() == 2
            ? "nd"
            : date.getDate() == 3
            ? "rd"
            : "th"}{" "}
          {months[date.getMonth()]} <span>{date.getFullYear()}</span>
        </p>
      </div>
      <div className="align-self-center ms-auto text-end">
        <h4 className={`pt-1 mb-n1 color-${color}-dark`}>
          {formatMoney(balance, true)}
        </h4>
        <p className="mb-0 font-11" style={{ textTransform: "capitalize" }}>
          amount
        </p>
      </div>
    </a>
  );
};

export default TransactionRow;
