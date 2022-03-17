export function formatMoney(x, kobo) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (kobo) {
    parts[1] = parts[1] ? parts[1].slice(0, 2) : "00";
    return "₦" + parts.join(".");
  } else {
    return "₦" + parts[0];
  }
}
