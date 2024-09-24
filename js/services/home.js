myApp.service("HomeService", function ($http) {
  this.list = (page) => {
    return $http.get("http://localhost:3001/posts", {
      params: { page },
    });
  };
});
