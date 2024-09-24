myApp.controller("ModalSignUpCtrl", ["$scope", "UserService", "$modalInstance", function ($scope, UserService, $modalInstance) {

  $scope.formData = {
      name: "",
      email: "",
      password: ""
  };

  $scope.submit = function () {
      UserService.create($scope.formData)
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
                  title: "Dados Inválidos!",
                  text: "Verifique as suas informações!",
                  icon: "error",
              });
          });
  };

  $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
  };
}]);
