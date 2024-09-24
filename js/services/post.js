myApp.service("PostService", function ($http) {
  this.getPost = (id) => {
    return $http.get(`${baseUrl}posts/${id}`);
  };

  this.updatePost = (id, post) => {
    return $http.put(`${baseUrl}posts/${id}`, post);
  };

  this.createPost = (post) => {
    return $http.post(`${baseUrl}posts/`, post);
  };

  this.deletePost = (id) => {
    return $http.delete(`${baseUrl}posts/${id}`);
  };

  this.like = (id) => {
    return $http.post(`${baseUrl}posts/${id}/like`);
  };

  this.dislike = (id) => {
    return $http.post(`${baseUrl}posts/${id}/dislike`);
  };
});
