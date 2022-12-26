import { useRouter } from "next/router";

export default function Main() {
  var router = useRouter();
  if (typeof window !== "undefined" && window) {
    if (
      typeof window.navigator !== "undefined" &&
      window.navigator &&
      window.navigator.webdriver
    ) {
      var x = parseInt(localStorage.getItem("macroed") || "0") + 1;
      localStorage.setItem("macroed", x.toString());
      router.push("/usingMacro");
    }

    if (
      window.localStorage.getItem("schoolName") == null ||
      window.localStorage.getItem("schoolCode") == null
    ) {
      router.push("/findSchool");
    } else router.push("/pop");
  }
  return <></>;
}
