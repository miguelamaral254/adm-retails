import Swal, { SweetAlertOptions } from "sweetalert2";

const useSweetAlert = () => {
  const showAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
  };

  const showSuccess = (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const showError = (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const showWarning = (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const showConfirm = (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    });
  };

  return { showAlert, showSuccess, showError, showWarning, showConfirm };
};

export default useSweetAlert;