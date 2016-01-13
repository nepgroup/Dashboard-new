
describe('Resources Controller', () => {
  beforeEach(module('myApp'));

  var resources = [
    {
      _id: 1,
      name: 'archivo.txt',
      author: 'aguspina',
      mimeType: 'folder'
    },
    {
      _id: 2,
      name: 'archivo.pdf',
      author: 'fedescarpa',
      mimeType: 'file'
    }
  ];

  var locate = () => '';
  var reverse = false;
  var strategy = 'byName';
  var $controller = {};
  var $state = {};
  var stateMock = {};
  var resourcesService = {};

  beforeEach(inject(($injector, _$controller_, _$state_) => {
    $controller = _$controller_;
    $state = _$state_;
    resourcesService = $injector.get('ResourcesService');
    stateMock = sinon.mock($state);
  }));

  afterEach(() => {
    stateMock.restore();
  });

  it('when initializes set resources in service', () => {
    var $scope = {};
    $controller('ResourcesController', { $scope, resources, reverse, strategy, locate });
    resourcesService.all.should.be.eql(resources);
  });

  it('when open folder change state', () => {
    var $scope = {};

    stateMock.expects('go')
      .once()
      .withExactArgs('general.home.resources.files', { resourceId: 1 });

    var resourcesController = $controller('ResourcesController', { $scope, resources, reverse, strategy, locate });

    var resourcesControllerSpy = sinon.spy(resourcesController, 'openFolder');

    resourcesController.scope.open(resources[0]);
    resourcesControllerSpy.calledOnce.should.be.eql(true);
  });

  it('when open file change state', () => {
    var $scope = {};

    stateMock.expects('go')
      .once()
      .withExactArgs('views', { resourceId: 2 });

    var resourcesController = $controller('ResourcesController', { $scope, resources, reverse, strategy, locate });
    var resourcesControllerSpy = sinon.spy(resourcesController, 'openFile');

    resourcesController.scope.open(resources[1]);
    resourcesControllerSpy.calledOnce.should.be.eql(true);
  });

});
