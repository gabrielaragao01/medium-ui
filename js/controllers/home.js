myApp.controller("homeController", [
  "$scope",
  "HomeService",
  "$modal",
  "$window",
  function ($scope, HomeService, $modal, $window) {
    $scope.posts = [];
    $scope.page = 1;
    $scope.loading = false;
    $scope.hasMorePosts = true;

    const loadPosts = (page) => {
      if ($scope.loading || !$scope.hasMorePosts) return;

      $scope.loading = true;

      HomeService.list(page)
        .then((resp) => {
          const newPosts = resp.data.data.posts;

          if (page === 1) {
            // Substituir posts na primeira página
            $scope.posts = newPosts;
          } else {
            // Concatenar novos posts às páginas anteriores
            $scope.posts = $scope.posts.concat(newPosts);
          }

          // Verifica se existem mais páginas para carregar
          $scope.numPages = resp.data.data.totalPages;
          if (newPosts.length === 0 || $scope.page >= $scope.numPages) {
            $scope.hasMorePosts = false;
          }

          $scope.loading = false;
        })
        .catch(() => {
          window.alert("Algo de errado aconteceu ao listar as publicações");
          $scope.loading = false;
        });
    };

    // Inicializa o carregamento da primeira página
    loadPoinitsts($scope.page);

    // Função para detectar scroll e carregar mais posts
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isOnPageScrollEnd = scrollTop + clientHeight >= scrollHeight - 100;

      if (
        isOnPageScrollEnd &&
        !$scope.loading &&
        $scope.page < $scope.numPages
      ) {
        $scope.page++;
        loadPosts($scope.page);
      }
    };

    // Bind do evento de scroll para carregar mais posts
    angular.element($window).bind("scroll", onScroll);

    // Remover o evento de scroll quando o controller for destruído
    $scope.$on("$destroy", function () {
      angular.element($window).unbind("scroll", onScroll);
    });

    $scope.openCreateModal = function () {
      const modalInstance = $modal.open({
        templateUrl: "view/modal-create.html",
        controller: "ModalCreateCtrl",
        windowClass: "fullscreen-modal",
        backdropClass: "doca-modal__backdrop",
      });
      modalInstance.result.then(function (user) {
        console.log("Post Created", user);
      });
    };
  },
]);
