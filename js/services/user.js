myApp.service("UserService", function ($http) {
  this.create = (data) => {
    return $http.post(`${baseUrl}`, data);
  }
  this.login = (data) => {
    return $http.post(`${baseUrl}auth`, data);
  };
});
