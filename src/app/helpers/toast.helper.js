import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const show_Toast = (data) => {
  if (data.status === true) {
    toast.success(data.message, {
      position: "top-center",
    });
  } else {
    if (typeof data.message === "object") {
      for (var k in data.message) {
        if (Array.isArray(data.message[k])) {
          for (var j in data.message[k]) {
            toast.error(data.message[k][j], {
              position: "top-center",
            });
          }
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      }
    } else {
      toast.error(data.message, {
        position: "top-center",
      });
    }
  }
};

export default show_Toast;
