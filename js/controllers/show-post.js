myApp.controller("ShowPostController", [
  "$scope",
  "$stateParams",
  "PostService",
  function ($scope, $stateParams, PostService) {
    $scope.post = {};
    $scope.loading = true;

    const postId = $stateParams.id;

    // Função para carregar o post
    const loadPost = () => {
      PostService.getPost(postId)
        .then((response) => {
          $scope.post = response.data.data;
          $scope.post.author = response.data.data.user.name;
          $scope.loading = false;
        })
        .catch(() => {
          $scope.loading = false;
          Swal.fire({
            title: "Erro ao carregar o post!",
            text: "Não foi possível carregar as informações do post.",
            icon: "error",
          });
        })
        .finally(() => {
          $scope.loading = false;
        });
    };

    // Função para curtir o post
    const likePost = () => {
      return PostService.like($scope.post.id)
        .then((resp) => {
          $scope.post.is_liked =  true;
          $scope.post.total_likes += 1;
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocorreu um erro ao curtir o post",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    // Função para remover curtida (dislike) do post
    const dislikePost = () => {
      console.log('dislikePost', $scope.post.id)
      return PostService.dislike($scope.post.id)
        .then((resp) => {
          $scope.post.is_liked = false;
          $scope.post.total_likes -= 1;
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocorreu um erro ao remover a curtida",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    // Função para alternar entre like e dislike
    const togglelike = () => {
      const methodsByAction = {
        like: likePost,
        dislike: dislikePost
      };
      console.log('togglelike', $scope.post.is_liked, methodsByAction)

      const action = $scope.post.is_liked ? 'dislike' : 'like'
      methodsByAction[action]();
      console.log('togglelike', post.is_liked)
    };
    loadPost();
    $scope.like = togglelike;
    $scope.dislike = togglelike;
  },
]);
