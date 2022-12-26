import style from "../styles/pop.module.css";

var tierArr = ["diamond", "platinum", "gold", "silver", "bronze"];
var scrArr = [300e4, 75e4, 25e4, 5e4, 1e4];
export default function tier(score: string) {
  var int_score = parseInt(score);
  for (var i = 0; i < scrArr.length; i++)
    if (int_score >= scrArr[i]) {
      return style[tierArr[i]];
    }

  return "none";
}
