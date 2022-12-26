export default function getSession() {
  let d = new Date();
  let mon = d.getMonth() + 1;
  let day = d.getDate();

  if (mon == 12 && day >= 24 && day <= 25) return "-christ";
  if ((mon == 1 && day <= 2) || (mon == 12 && day == 31)) return "-newyear";

  return "";
}
