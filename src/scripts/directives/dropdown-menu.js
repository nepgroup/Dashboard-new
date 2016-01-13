
/*@ngInject;*/
angular
  .module('myApp')
  .directive('dropdownMenu', ($document, $compile) => {

    const ESC = 27;

    return {
      restrict: 'A',
      scope: {
        dropdownMenu: '@dropdownMenu'
      },
      link: (scope, element, attr) => {

        let isVisible = false;

        const dropdown = angular.element(`#${scope.dropdownMenu}.dropdown`);

        dropdown.attr('ng-show', isVisible);
        $compile(dropdown)(scope);

        var hideDropdown = () => {
          scope.$apply(() => {
            isVisible = false;
            dropdown.attr('ng-show', isVisible);
            $compile(dropdown)(scope);
          });
        };

        $document.bind('keydown', (ev) => {
          if (isVisible && ev.keyCode === ESC) {
            hideDropdown();
          }
        });

        element.bind('click', (ev) => {
          scope.$apply(() => {
            isVisible = !isVisible;
            dropdown.attr('ng-show', isVisible);
            $compile(dropdown)(scope);
          });
          ev.stopPropagation();
        });

        $document.bind('click', () => {
          if (isVisible) {
            hideDropdown();
          }
        });

      }
    };
  });
