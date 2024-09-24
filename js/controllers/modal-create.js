myApp.controller("ModalCreateCtrl", [
  "$scope",
  "$modalInstance",
  "PostService",
  function ($scope, $modalInstance, PostService) {
    $scope.postData = {
      title: "",
      content: "",
      summary: "",
    };

    $scope.submit = function () {
      PostService.createPost($scope.postData)
        .then(() => {
          Swal.fire({
            title: "Created!",
            text: "Please, login to continue",
            icon: "success",
          });
          $modalInstance.close();
        })
        .catch(() => {
          Swal.fire({
            title: "Fail in create Post",
            text: "Please log in and try again",
            icon: "error",
          });
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
    };
  },
]);
