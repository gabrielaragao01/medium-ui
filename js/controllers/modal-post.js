myApp.controller("ModalPostCtrl", [
  "$rootScope",
  "$scope",
  "PostService",
  "$modalInstance",
  "post",
  function ($scope, PostService, $modalInstance, post) {
    $scope.formData = {
      title: post ? post.title : "",
      content: post ? post.content : "",
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

    $scope.submit = function () {
      if (post) {
        PostService.updatePost(post.id, $scope.formData)
          .then(() => {
            $modalInstance.close();
            Swal.fire({
              title: "Post atualizado com sucesso!",
              icon: "success",
              timer: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(() => {
            Swal.fire({
              title: "Dados Inválidos!",
              text: "Verifique as suas informações!",
              icon: "error",
            });
          });
      }
    };
  },
]);
