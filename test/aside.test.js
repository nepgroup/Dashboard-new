
describe('Aside Controller', () => {
  beforeEach(module('myApp'));

  var clouds = [
    {
      name: 'drive',
      root: 1
    },
    {
      name: 'box',
      root: 2
    }
  ];

  var $rootScope = {};
  var $controller = {};
  var $state = {};
  var stateMock = {};
  var sessionService = {};
  var sessionServiceMock = {};
  var state = {};
  var $scope = {};
  var asideController = {};

  var asideFixture = (...params) => {
    sessionServiceMock.expects('getClouds')
      .once()
      .returns(clouds);

    stateMock.expects('go')
      .once()
      .withExactArgs(...params);

    $scope = $rootScope.$new();
    asideController = $controller('AsideController', {$scope: $scope});
  }

  beforeEach(inject(($injector, _$controller_, _$state_, _$rootScope_, STATE) => {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    $state = _$state_;
    state = STATE;
    sessionService = $injector.get('SessionService');
    sessionServiceMock = sinon.mock(sessionService);
    stateMock = sinon.mock($state);
  }));

  afterEach(() => {
    sessionServiceMock.restore();
    stateMock.restore();
  });


  it('when initializes get clouds from service', () => {
    sessionServiceMock.expects('getClouds')
      .once()
      .returns(clouds);
    var $scope = $rootScope.$new();
    $controller('AsideController', {$scope: $scope});
    $scope.clouds.list.should.be.eql(clouds);
  });

  it('when click files go to root', () => {
    asideFixture(state.files, {resourceId: ''});

    asideController.scope.files();
    stateMock.verify();
  });

  it('when click cloud go to cloud root', () => {
    asideFixture(state.files, {resourceId: 1});

    asideController.scope.open(clouds[0]);
    stateMock.verify();
  });

  it('when click incoming go to incoming', () => {
    asideFixture(state.incoming);

    asideController.scope.incoming();
    stateMock.verify();
  });

  it('when click recent go to recent', () => {
    asideFixture(state.recent);

    asideController.scope.recent();
    stateMock.verify();
  });

  it('when click starred go to starred', () => {
    asideFixture(state.starred);

    asideController.scope.starred();
    stateMock.verify();
  });

});
