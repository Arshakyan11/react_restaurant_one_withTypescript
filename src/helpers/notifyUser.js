import { Bounce, toast } from "react-toastify";

export const notifyForSMth = (mess) => {
  toast(mess, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type: "success",
    className: "toastifyEditing",
  });
};

export const notifyForError = (mess) => {
  toast(mess, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type: "error",
    className: "toastifyEditing",
  });
};
  