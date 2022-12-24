import { useRouter } from "next/router";

export default function Main() {
  let router = useRouter();
  if (typeof window !== "undefined" && window) {
    if (
      (typeof window.navigator !== "undefined" && window.navigator) ||
      window.localStorage.getItem("macro")
    ) {
      if (window.navigator.webdriver) router.push("/usingMacro");
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
