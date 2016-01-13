
describe('Breadcrumb Controller', () => {
  beforeEach(module('myApp'));

  var $controller = {};
  var stateMock = {};
  var State = {};

  beforeEach(inject(($injector, _$controller_, $state, STATE) => {
    $controller = _$controller_;
    State = STATE;
    stateMock = sinon.mock($state);
  }));

  afterEach(() => {
    stateMock.restore();
  });

  it('when open folder change state', () => {

    stateMock.expects('go')
      .once()
      .withExactArgs(State.files, { resourceId: '1' });

    var resourcesController = $controller('BreadcrumbController', { $scope: {} });

    resourcesController.scope.open({ _id: '1' });
    stateMock.verify();
  });

});
