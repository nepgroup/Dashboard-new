angular
  .module('myApp')
  .run(($rootScope, $state, $fancyModal, SessionService, BreadcrumbService, NotificationService, UploadService, ResourcesService, Restangular, RestangularFull, STATE) => {

    // XXX: if the state is (or is going to be) activationrequired it should ignore the 401 error
    let isActivationRequired = $state.is(STATE.activationrequired);

    $rootScope.$on('$stateChangeStart', (ev, toState, toParams, fromState, fromParams) => {
      isActivationRequired = _.includes(toState.name, STATE.activationrequired);
      if (toState.needsAuthentication) {
        if (!SessionService.isLogged()) {
          $state.go(STATE.signin);
          ev.preventDefault();
        } else if (_.includes(toState.name, STATE.add) && SessionService.getSignupReferrer()) {
          $state.go(STATE.signup);
          ev.preventDefault();
        } else if (!SessionService.hasClouds() && !_.includes(toState.name, STATE.settings) && !_.includes(toState.name, STATE.add)) {
          $state.go(STATE.add);
          ev.preventDefault();
        }
      }
      if (_.includes(toState.name, STATE.resources)) {
        BreadcrumbService.fetchParents(toState, toParams);
      }
      if (!toState.needsAuthentication) {
        // XXX: this shall stay here to avoid circular dependendy error in SessionService
        ResourcesService.clear();
        if (!_.includes(fromState.name, STATE.resetpassword) && !_.includes(fromState.name, STATE.forgotpassword)) {
          NotificationService.clear();
        }
        if (SessionService.isLogged() && !_.includes(toState.name, STATE.signup)) {
          $state.go(STATE.files);
        } else {
          UploadService.fileUploader().cancelAll();
          $fancyModal.close();
        }
      }
    });

    const interceptor = (response) => {
      if (response.status === 401 && !isActivationRequired) {
        SessionService.signout();
        $state.go(STATE.signin);
      } else if (response.status === 403) {
        if (response.data.error.message.type === 'ACCESS_DENIED') {
          NotificationService.error(response.data.error.message.message);
        } else if (response.data.error.message.type === 'NEED_ACTIVATION') {
          SessionService.signout();
          const email = SessionService.getUser();
          $state.go(STATE.activationrequired, email ? { email } : {});
        }
      } else if (response.status === 500) {
        NotificationService.error('Oops. Something went wrong.');
      }
    };

    Restangular.setErrorInterceptor(interceptor);
    RestangularFull.setErrorInterceptor(interceptor);

    $rootScope.$on('$stateChangeSuccess', (ev) => {
      ev.preventDefault();
      if(SessionService.isLogged()) NotificationService.listenFirebase();
    });
  });
