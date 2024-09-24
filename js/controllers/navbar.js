myApp.controller("navbarController", [
  "$rootScope",
  "$scope",
  "$modal",
  function ($rootScope, $scope, $modal) {
    $scope.isUserLoggedIn = $rootScope.userLogged;

    $scope.openLoginModal = function () {
      console.log("Open Login Modal");
      const modalInstance = $modal.open({
        templateUrl: "view/modal-login.html",
        controller: "ModalLoginCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
      });
      modalInstance.result.then(function (user) {
        console.log("Logado", user);
      });
    };

    $scope.openSignupModal = function () {
      const modalInstance = $modal.open({
        templateUrl: "view/modal-signup.html",
        controller: "ModalSignUpCtrl",
        windowClass: "doca-modal modal-dark fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
      });
      modalInstance.result.then(function (user) {
        console.log("Created", user);
      });
    };
    $scope.userLogout = function () {
      localStorage.clear();
      window.location.reload();
    };
  },
]);
