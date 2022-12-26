export default function getSession() {
  let d = new Date();
  let mon = d.getMonth() + 1;
  let day = d.getDate();

  if (mon == 12 && day >= 20 && day <= 30) return "-christ";
  if (mon == 1 && day <= 7) return "-newyear";

  return "";
}
