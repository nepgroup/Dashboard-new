
/*@ngInject;*/
angular
  .module('myApp')
  .directive('submitOnEnter', ($document) => {

    const ENTER = 13;

    return {
      restrict: 'A',
      link: (scope, element) => {
        $document.bind('keydown', (event) => {
          if (event.keyCode === ENTER) {
            element.click();
            event.stopPropagation();
          }
        });
      }
    };

  });
