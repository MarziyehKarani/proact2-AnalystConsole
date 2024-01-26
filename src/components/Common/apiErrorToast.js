import toastr from "toastr"
import "toastr/build/toastr.min.css"

export const apiErrorToast = ( errorMeassage ) => {

    toastr.options = {
        positionClass: "toast-top-center",
        closeButton: true,
        timeOut: 10000
      }

    toastr.error(errorMeassage, errorMeassage.response.data);
}