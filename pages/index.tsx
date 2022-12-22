import { useRouter } from "next/router";

export default function Main() {
  let router = useRouter();
  if (typeof window !== "undefined" && window) {
    if (window.localStorage.getItem("school") == null) {
      router.push("/findSchool");
    } else router.push("/pop");
  }
  return <></>;
}
