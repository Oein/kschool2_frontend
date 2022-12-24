import style from "../styles/pop.module.css";

const tierArr = ["diamond", "platinum", "gold", "silver", "bronze"];
const scrArr = [300e4, 75e4, 25e4, 5e4, 1e4];
export default function tier(score: string) {
  let int_score = parseInt(score);
  for (let i = 0; i < scrArr.length; i++)
    if (int_score >= scrArr[i]) {
      return style[tierArr[i]];
    }

  return "none";
}
