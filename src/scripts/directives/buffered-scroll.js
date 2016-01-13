
/*@ngInject;*/
angular
  .module('myApp')
  .directive('bufferedScroll', ($parse, $window, $document) => {

    return {
      restrict: 'A',
      link: ($scope, element, attrs) => {

        const handler = $parse(attrs.bufferedScroll);
        const scrolling = angular.element($window);

        scrolling.bind('scroll', () => {

          const scrollTop = scrolling.scrollTop();
          const scrollHeight = scrolling.height();
          const offsetHeight = $document[0].body.offsetHeight;

          if (scrollTop + scrollHeight >= offsetHeight * 0.95) {
            $scope.$apply(() => handler($scope));
          }

        });
      }
    };

  });
