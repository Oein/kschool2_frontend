import { toast } from "react-toastify";

import errorMessages from "../errorMessage.json";

const emsg = errorMessages as { [key: string]: string };

export default function errorHandle(error: any) {
  if (error.response.status == 404) {
    let data = error.response.data as string;
    if (emsg[data])
      toast(emsg[data], {
        type: "error",
      });
  }
}
