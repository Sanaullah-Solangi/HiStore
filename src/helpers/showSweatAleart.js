import Swal from "sweetalert2";

const showSweatAlert = async (title, text, icon = "success", options) => {
  return Swal.fire({
    title,
    text,
    icon,
    ...options,
  });
};
export default showSweatAlert;
