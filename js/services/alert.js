myApp.service("AlertMessage", function () {
    this.success = (title) => {
      return Swal.fire({
        title,
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });
    };
    this.error = (text) => {
      return Swal.fire(text, "", "error");
    };
    // return {
    //   success, error
    // };
  });