const myApp = angular.module("movies", ["ui.router", "ui.bootstrap"]);
const baseUrl = "http://localhost:3001/";

myApp.config(function ($stateProvider, $httpProvider) {
  $httpProvider.interceptors.push("BearerAuthInterceptor");
  $stateProvider
    .state({
      name: "home",
      url: "",
      templateUrl: "view/home.html",
      controller: "homeController",
    })
    .state({
      name: "show-post",
      url: "/post/:id",
      templateUrl: "view/show-post.html",
      controller: "ShowPostController",
    });
});

const isAuthorized = ($state, $rootScope) => {
  const isLogged = localStorage.getItem("token");

  if (!isLogged) {
    $state.go("home");
    return;
  }

  $rootScope.isLogged = true;
};
