
/*@ngInject;*/
angular
  .module('myApp')
  .directive('scrollOn', ($window) => {

    return {
      restrict: 'A',
      link: () => {

        const scrolling = angular.element($window);

        scrolling.bind('scroll', () => {
          if (scrolling.scrollTop() !== 0) {
            angular.element('.file-header').addClass('scroll');
          } else {
            angular.element('.file-header').removeClass('scroll');
          }
        });
      }
    };

  });
