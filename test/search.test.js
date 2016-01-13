
describe('Search Controller', () => {
  beforeEach(module('myApp'));

  var resources = [
    {
      name: 'archivo.txt',
      author: 'aguspina'
    },
    {
      name: 'archivo.pdf',
      author: 'fedescarpa'
    }
  ];

  var $controller = {};
  var $state = {};
  var stateMock = {};
  var apiService = {};

  beforeEach(inject(($injector, _$controller_, _$state_) => {
    $controller = _$controller_;
    $state = _$state_;
    stateMock = sinon.mock($state);
  }));

  afterEach(() => {
    stateMock.restore();
  });

  it('when search for a word can do search return true', () => {
    var $scope = {};
    var searchController = $controller('SearchController', {$scope: $scope});
    searchController.canDoSearch('archivo').should.be.true;
  });

  it('when search for non word it cannot do search', () => {
    var $scope = {};
    var searchController = $controller('SearchController', {$scope: $scope});
    searchController.canDoSearch('').should.be.false;
  });

  it('when search for a word resources service is set', (done) => {
    var $scope = {};
    var searchController = $controller('SearchController', {$scope: $scope});
    stateMock.expects('go')
      .returns(Promise.resolve());

    searchController.search('archivo')
      .then(() => { stateMock.verify(); })
      .then(done, done);
  });

});
