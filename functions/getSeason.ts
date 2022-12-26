export default function getSession() {
  let d = new Date();
  let m = d.getMonth() + 1;

  if (m == 11 || m <= 3) return "winter";
  if (m >= 4 && m <= 6) return "spring";
  if (m >= 7 && m <= 9) return "summer";
  if (m == 10) return "fall";
}
