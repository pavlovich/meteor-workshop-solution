toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

function errorHandler(error) {
  if (error) {
    toastr["error"](error.error, "Unable to process your request");
  } else {
    toastr["success"]("Your request was completed.", "Success!");
  }
}

Template.handleTaskErrors = errorHandler;

angular.handleTaskErrors = errorHandler;
