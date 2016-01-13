
/*@ngInject;*/
angular
  .module('myApp')
  .directive('tableEvents', ($document, $state, ResourcesService, TypeService, ModalService, STATE) => {

    const ESCAPE = 27;
    const A = 65;
    const DELETE = 46;

    return {
      restrict: 'A',
      link: ($scope) => {
        $document.bind('keydown', (event) => {
          if((event.metaKey || event.ctrlKey) && event.keyCode === A) {
            $scope.$apply(() => ResourcesService.selectAll());
            event.preventDefault();
          } else if (event.keyCode === ESCAPE) {
            $scope.$apply(() => ResourcesService.unselectAll());
          } else if (event.keyCode === DELETE && !$state.is(STATE.trash)) {
            if (!ResourcesService.anyoneSelected()) return;
            ModalService.removeFile(ResourcesService.selected());
          }
        });
      }
    };

  });
