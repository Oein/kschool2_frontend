export default function getSession() {
  var d = new Date();
  var mon = d.getMonth() + 1;
  var day = d.getDate();

  if (mon == 12 && day >= 24 && day <= 25) return "-christ";
  if ((mon == 1 && day <= 2) || (mon == 12 && day == 31)) return "-newyear";
  if (mon == 5 && day == 5) return "-child";
  if (mon == 10 && day == 9) return "-han";

  return "";
}
