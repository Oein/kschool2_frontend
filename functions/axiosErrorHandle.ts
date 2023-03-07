import { toast } from "react-toastify";

import errorMessages from "../errorMessage.json";
import log from "../utils/log";

export default function errorHandle(error: any) {
  var emsg = errorMessages as { [key: string]: string };

  if (error.response?.status == 406) {
    var data = error.response.data as string;
    if (emsg[data])
      toast(emsg[data], {
        type: "error",
      });
    else
      toast(data || error.message, {
        type: "error",
      });
  } else {
    log(
      JSON.stringify(
        (error.response?.data || error.message || error).toString()
      )
    );
  }
}
