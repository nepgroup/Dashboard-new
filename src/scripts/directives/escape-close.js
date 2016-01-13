
/*@ngInject;*/
angular
  .module('myApp')
  .directive('escapeClose', ($parse, $document) => {

    const ESCAPE = 27;

    return {
      restrict: 'A',
      link: ($scope, element, attrs) => {
        const handler = $parse(attrs.escapeClose);
        $document.bind('keydown', (event) => {
          if (event.keyCode === ESCAPE) $scope.$apply(() => handler($scope));
        });
      }
    };

  });
