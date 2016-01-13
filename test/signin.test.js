
describe('Signin Controller', () => {
  beforeEach(module('myApp'));

  var fullUser = {
   _id: '1',
   name: 'Agustin',
   lastName: 'Pina',
   username: 'aguspina87@gmail.com',
   root: '123',
   clouds: [{
    _id: '1',
    cloudType: 'drive'
   }]
  };

  var $controller = {};
  var $state = {};
  var authService = {};
  var apiService = {};
  var authServiceMock = {};
  var apiServiceMock = {};
  var sessionService = {};

  beforeEach(inject(($injector, _$controller_, _$state_) => {
    $controller = _$controller_;
    $state = _$state_;
    apiService = $injector.get('ApiService');
    authService = apiService.auth;
    sessionService = $injector.get('SessionService');
    authServiceMock = sinon.mock(authService);
    apiServiceMock = sinon.mock(apiService);
    sinon.stub($state, 'go');
  }));

  afterEach(() => {
    authServiceMock.restore();
    apiServiceMock.restore();
    $state.go.restore();
    sessionService.clear();
  });

  it('when initializes user is empty', () => {
    var $scope = {};
    $controller('SigninController', {$scope: $scope});
    $scope.user.username.should.be.eql('');
    $scope.user.password.should.be.eql('');
  });

  it('when signin valid user localStorage has data', (done) => {
    var $scope = {};
    var signinController = $controller('SigninController', {$scope: $scope});

    $scope.user = { username: 'aguspina87@gmail.com', password: 'pass'};

    authServiceMock.expects('signin')
      .once()
      .withExactArgs($scope.user)
      .returns(Promise.resolve(fullUser));

    signinController.scope.signin(true)
      .then(() => {
        authServiceMock.verify();
        sessionService.getUser().name.should.be.eql('Agustin');
        sessionService.getClouds()[0].cloudType.should.be.eql('drive');
      })
      .then(done, done);
  });

  it('when signin invalid user dont do anything', (done) => {
    var $scope = {};
    var signinController = $controller('SigninController', {$scope: $scope});

    $scope.user = { username: 'aguspina87', password: 'pass'};

    authServiceMock.expects('signin')
      .never();

    signinController.scope.signin(false)
      .then(() => {
        authServiceMock.verify();
        expect(sessionService.getUser()).to.be.eql(null);
      })
      .then(done, done);
  });

});
