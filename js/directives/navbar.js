myApp.directive("navbar", function () {
  return {
    templateUrl: "view/navbar.html",
    replace: true,
    restrict: "E",
    controller: "navbarController",
    scope: {
      title: "@",
      onCreatePost: "=",
    },
  };
});
