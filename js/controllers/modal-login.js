myApp.controller("ModalLoginCtrl", [
  "$scope",
  "UserService",
  "$modalInstance",
  function ($scope, UserService, $modalInstance) {
    $scope.user = {
      email: "",
      password: "",
    };

    $scope.submit = function () {
      UserService.login($scope.user)
        .then(function (resp) {
          localStorage.setItem("token", resp.data.data.token);
          localStorage.setItem("email", $scope.user.email);

          $scope.user.email = "";
          $scope.user.password = "";

          Swal.fire({
            title: "Logado",
            text: "Welcome Full",
            icon: "success",
            confirmButtonText: "Continue",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch(function (err) {
          Swal.fire({
            title: "Dados Inválidos!",
            text: "Verifique as suas informações!",
            icon: "error",
          });
          localStorage.clear();
          $scope.user.password = "";
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.logout = function () {
      UserService.logout($scope.user);
    };
  },
]);
