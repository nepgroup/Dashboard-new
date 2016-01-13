
describe('Trash Controller', () => {
  beforeEach(module('myApp'));

  var resources = [
    {
      _id: 1,
      name: 'archivo.txt',
      author: 'aguspina',
      mimeType: 'folder'
    }

  ];

  var locate = () => '';
  var reverse = false;
  var strategy = 'byName';
  var $controller = {};
  var resourcesService = {};

  beforeEach(inject(($injector, _$controller_) => {
    $controller = _$controller_;
    resourcesService = $injector.get('ResourcesService');
  }));

  it('when initializes resources are set', () => {
    var $scope = {};
    $controller('TrashController', { $scope, resources, reverse, strategy, locate });
    resourcesService.all.should.be.eql(resources);
  });

  it('when open nothing happend', () => {
    var $scope = {};
    var TrashController = $controller('TrashController', { $scope, resources, reverse, strategy, locate });

    var trashControllerSpyFile = sinon.spy(TrashController, 'openFile');
    var trashControllerSpyFolder = sinon.spy(TrashController, 'openFolder');

    TrashController.scope.open(resources[0]);

    trashControllerSpyFile.called.should.be.eql(false);
    trashControllerSpyFolder.called.should.be.eql(false);
  });

});
