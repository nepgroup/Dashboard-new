
class BreadcrumbController {

  /*@ngInject;*/
  constructor($scope, $state, ResourcesService, BreadcrumbService, STATE) {
    this.scope = $scope;
    this.scope.state = $state;
    this.scope.STATE = STATE;
    this.scope.Breadcrumb = BreadcrumbService;
    this.scope.Resources = ResourcesService;
    this.scope.open = (folder) => this.open(folder);
  }

  open(folder) {
    this.scope.state.go(this.scope.STATE.files, { resourceId: folder._id });
  }

}

angular
  .module('myApp')
  .controller('BreadcrumbController', BreadcrumbController);
