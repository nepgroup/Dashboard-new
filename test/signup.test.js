
describe('Signup Controller', () => {
  beforeEach(module('myApp'));

  var fullUser = {
   _id: '1',
   name: 'Agustin',
   lastName: 'Pina',
   username: 'aguspina87@gmail.com',
   password: 'pass',
   confirm: 'pass'
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
    $controller('SignupController', {$scope: $scope, invite: false });
    $scope.user.username.should.be.eql('');
    $scope.user.name.should.be.eql('');
    $scope.user.lastName.should.be.eql('');
    $scope.user.password.should.be.eql('');
    $scope.user.confirm.should.be.eql('');
  });

  it('when signup localStorage has data', (done) => {
    var $scope = {};
    var signupController = $controller('SignupController', {$scope: $scope, invite: false });

    $scope.user = fullUser;

    authServiceMock.expects('signup')
      .once()
      .withExactArgs($scope.user)
      .returns(Promise.resolve(fullUser));

    signupController.scope.signup(true)
      .then(() => {
        authServiceMock.verify();
        sessionService.getUser().name.should.be.eql('Agustin');
        expect(sessionService.getClouds()).to.be.empty;
      })
      .then(done, done);
  });

  it('when signup localStorage has data', (done) => {
    var $scope = {};
    var signupController = $controller('SignupController', {$scope: $scope, invite: false });

    $scope.user = fullUser;

    authServiceMock.expects('signup')
      .never();

    signupController.scope.signup(false)
      .then(() => {
        authServiceMock.verify();
        expect(sessionService.getUser()).to.be.eql(null);
        expect(sessionService.getClouds()).to.be.eql(null);
      })
      .then(done, done);
  });

});
