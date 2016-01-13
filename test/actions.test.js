
describe('Actions Controller', () => {
  beforeEach(module('myApp'));

  var $controller = {};
  var resourcesService = {};

  beforeEach(inject(($injector, _$controller_) => {
    $controller = _$controller_;
    resourcesService = $injector.get('ResourcesService');
  }));



  it('when initializes set resources service', () => {
    var $scope = {};
    var ActionsController = $controller('ActionsController', {$scope: $scope});
    ActionsController.scope.Resources.should.be.eql(resourcesService);
  });


});
