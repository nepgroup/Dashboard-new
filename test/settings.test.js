
describe('Settings Controller', () => {
  beforeEach(module('myApp'));

  var clouds = [
    {
      _id: 1,
      cloudType: 'drive',
      used: '100',
      total: '150'
    },
    {
      _id: 2,
      cloudType: 'dropbox',
      used: '20',
      total: '100'
    }
  ];

  var $controller = {};
  var sessionService = {};
  var sessionServiceMock = {};

  beforeEach(inject(($injector, _$controller_, _$state_) => {
    $controller = _$controller_;
    sessionService = $injector.get('SessionService');
    sessionServiceMock = sinon.mock(sessionService);
  }));

  afterEach(() => {
    sessionServiceMock.restore();
  });

  it('calculating average storage', () => {
    var $scope = {};

    sessionServiceMock.expects('getClouds')
      .twice()
      .returns(clouds);

    var settingsController = $controller('SettingsController', {$scope: $scope});

    settingsController.scope.actualStorage().should.be.eql(48);
  });

  it('total used', () => {
    var $scope = {};

    sessionServiceMock.expects('getClouds')
      .once()
      .returns(clouds);

    var settingsController = $controller('SettingsController', {$scope: $scope});

    settingsController.scope.usedStorage().should.be.eql(120);
  });

  it('max storage', () => {
    var $scope = {};

    sessionServiceMock.expects('getClouds')
      .once()
      .returns(clouds);

    var settingsController = $controller('SettingsController', {$scope: $scope});

    settingsController.scope.maxStorage().should.be.eql(250);
  });

  it('cloud storage', () => {
    var $scope = {};

    sessionServiceMock.expects('getClouds')
      .once()
      .returns(clouds);

    var settingsController = $controller('SettingsController', {$scope: $scope});

    settingsController.scope.cloudStorage(clouds[1]).should.be.eql(20);
  });

  it('signout', () => {
    sessionServiceMock.expects('signout').once().withExactArgs();

    $controller('SettingsController', {$scope: {}}).scope.signout();

    sessionServiceMock.verify()
  });



});
