import { toast } from "react-toastify";

if (
  typeof window != "undefined" &&
  typeof (window as any).devmode == "undefined"
)
  (window as any).devmode = 0;

export default function log(...messages: any[]) {
  if (!(window as any).devmode) return;
  let msg = messages.map((i) => i as string).join(" ");
  console.log(`[${new Date().toString()}] [LOG] ${msg}`);
  if ((window as any).devmode === 2) toast.info(msg);
}
