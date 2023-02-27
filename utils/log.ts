import { toast } from "react-toastify";

if (
  typeof window != "undefined" &&
  typeof (window as any).devmode == "undefined" &&
  typeof location != "undefined"
)
  if (location.href.includes("?devmode="))
    if (location.href.includes("?devmode=2")) (window as any).devmode = 2;
    else if (location.href.includes("?devmode=1")) (window as any).devmode = 1;
    else (window as any).devmode = 0;

export default function log(...messages: any[]) {
  if (!(window as any).devmode) return;
  let msg = messages.map((i) => i as string).join(" ");
  console.log(`[${new Date().toString()}] [LOG] ${msg}`);
  if ((window as any).devmode === 2) toast.info(msg);
}
