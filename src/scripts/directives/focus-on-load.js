
/*@ngInject;*/
angular
  .module('myApp')
  .directive('focusOnLoad', ($timeout) => {

    return {
      restrict: 'A',
      link: (scope, element) => $timeout(() => element.focus())
    };

  });
