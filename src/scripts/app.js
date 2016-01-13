
const myAppDependencies = [
  'ui.router',
  'smart-table',
  'dndLists',
  'restangular',
  'LocalStorageModule',
  'angular-loading-bar',
  'cfp.loadingBar',
  'ngAnimate',
  'firebase',
  'ng-context-menu',
  'vesparny.fancyModal',
  'angular-humanize',
  'ngPassword',
  'angularFileUpload'
];

/*ngInject;*/
angular
  .module('myApp', myAppDependencies)
  .config(($stateProvider, $locationProvider, $urlRouterProvider, cfpLoadingBarProvider, RestangularProvider, STATE, CONFIG) => {

    cfpLoadingBarProvider.includeSpinner = false;

    const resourceId = '{resourceId:[0-9a-f]{0}|[0-9a-f]{24}}';

    const asideState = ({ url, resources, reverse = false, strategy = 'byName', locate = () => {} }) => {
      return {
        needsAuthentication: true,
        url: url,
        views: {
          'container@general': {
            templateUrl: 'views/pages/files/files-page.html',
            controller: 'ResourcesController',
            resolve: /*ngInject;*/ {
              locate: locate,
              resources: resources,
              reverse: () => reverse,
              strategy: () => strategy
            }
          }
        }
      };
    };

    $stateProvider
      .state(STATE.general, {
        templateUrl: 'views/layout.html'
      })
      .state(STATE.home, {
        views: {
          'aside': {
            templateUrl: 'views/components/aside.html',
            controller: 'AsideController'
          },
          'settings': {
            templateUrl: 'views/components/settings.html',
            controller: 'SettingsController'
          },
          'notifications': {
            templateUrl: 'views/components/notifications.html',
            controller: 'NotificationsController'
          }
        }
      })
      .state(STATE.resources, {
        abstract: true,
        views: {
          'messages@general': {
            templateUrl: 'views/components/messages.html',
            controller: 'ActionsController'
          },
          'search@general': {
            templateUrl: 'views/components/search.html',
            controller: 'SearchController'
          },
          'breadcrumb@general': {
            templateUrl: 'views/components/breadcrumb.html',
            controller: 'BreadcrumbController'
          },
          'actions@general': {
            templateUrl: 'views/components/actions.html',
            controller: 'ActionsController'
          }
        }
      })
      .state(STATE.files, asideState({
        url: `/files/${resourceId}?{locate:[0-9a-f]{0}|[0-9a-f]{24}}`,
        resources: ($stateParams, ApiService) => ApiService.files.list($stateParams.resourceId),
        locate: ($stateParams) => {
          const locate = $stateParams.locate;
          delete $stateParams.locate;
          return locate;
        }
      }))
      .state(STATE.incoming, asideState({
        url: '/incoming',
        reverse: true,
        strategy: 'bySharedDate',
        resources: (ApiService, FirebaseService) => {
          FirebaseService.resetIncoming();
          return ApiService.files.listIncoming();
        }
      }))
      .state(STATE.recent, asideState({
        url: '/recent',
        reverse: false,
        strategy: 'byLastAccess',
        resources: (ApiService) => ApiService.files.listRecent()
      }))
      .state(STATE.starred, asideState({
        url: '/starred',
        resources: (ApiService) => ApiService.files.listStarred()
      }))
      .state(STATE.trash, {
        needsAuthentication: true,
        url: '/trash',
        views: {
          'container@general': {
            templateUrl: 'views/pages/files/files-page.html',
            controller: 'TrashController',
            resolve: /*ngInject;*/ {
              resources: (ApiService) => ApiService.files.listTrash(),
              locate: () => '',
              reverse: () => false,
              strategy: () => 'byName'
            }
          }
        }
      })
      .state(STATE.search, {
        needsAuthentication: true,
        url: '/search?name',
        views: {
          'container@general': {
            templateUrl: 'views/pages/files/files-page.html',
            controller: 'ResourcesController',
            resolve: /*ngInject;*/ {
              resources: ($stateParams, ApiService) => ApiService.files.search($stateParams.name),
              locate: () => '',
              reverse: () => false,
              strategy: () => 'noSort'
            }
          }
        }
      })
      .state(STATE.settings, {
        abstract: true,
        url: '/settings',
        views: {
          'section-title@general': {
            templateUrl: 'views/pages/settings/settings-title.html',
            controller: 'SettingsController'
          },
          'container@general': {
            templateUrl: 'views/pages/settings/settings-page.html',
            controller: 'SettingsController'
          }
        }
      })
      .state(STATE.clouds, {
        needsAuthentication: true,
        url: '/clouds',
        views: {
          'settings-container': {
            templateUrl: 'views/pages/settings/clouds/clouds-page.html',
            controller: 'SettingsController'
          }
        }
      })
      .state(STATE.legals, {
        needsAuthentication: true,
        url: '/legals',
        views: {
          'settings-container': {
            templateUrl: 'views/pages/settings/legals/legals-page.html',
            controller: 'SettingsController'
          }
        }
      })
      .state(STATE.add, {
        needsAuthentication: true,
        url: '/add-cloud?errorCode&cloud',
        views: {
          'container@general': {
            templateUrl: 'views/pages/add-cloud/add-cloud-page.html',
            'controller': 'AddCloudController'
          },
          'section-title@general': {
            templateUrl: 'views/pages/add-cloud/add-cloud-title.html',
            controller: 'SettingsController'
          }
        }
      })
      .state(STATE.views, {
        needsAuthentication: true,
        url: '/views/{resourceId:[0-9a-f]{24}}?edit',
        templateUrl: 'views/pages/viewer/viewer-page.html',
        controller: 'FileViewerController',
        resolve: /*ngInject;*/ {
          resource: ($stateParams, ApiService) => ApiService.files.getMetadata($stateParams.resourceId),
          file: ($stateParams, ApiService) => ApiService.files.open($stateParams.resourceId),
          isEditMode: ($stateParams) => {
            const edit = $stateParams.edit;
            delete $stateParams.edit;
            return edit;
          }
        }
      })
      .state(STATE.auth, {
        abstract: true,
        templateUrl: 'views/pages/auth/auth-page.html'
      })
      .state(STATE.sign, {
        abstract: true,
        views: {
          'auth-logo': {
            templateUrl: 'views/pages/auth/auth-logo.html'
          },
          'notifications': {
            templateUrl: 'views/components/notifications.html',
            controller: 'NotificationsController'
          }
        }
      })
      .state(STATE.signup, {
        needsAuthentication: false,
        url: '/signup?invite',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/signup.html',
            controller: 'SignupController',
            resolve: {
              invite: ($stateParams) => $stateParams.invite
            }
          }
        }
      })
      .state(STATE.signin, {
        needsAuthentication: false,
        url: '/signin',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/signin.html',
            controller: 'SigninController'
          }
        }
      })
      .state(STATE.forgotpassword, {
        needsAuthentication: false,
        url: '/forgotpassword',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/forgotpassword.html',
            controller: 'ForgotPasswordController'
          }
        }
      })
      .state(STATE.resetpassword, {
        needsAuthentication: false,
        url: '/resetPassword?token',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/resetpassword.html',
            controller: 'ResetPasswordController',
            resolve: {
              token: ($stateParams) => $stateParams.token
            }
          }
        }
      })
      .state(STATE.activationrequired, {
        needsAuthentication: false,
        url: '/activationrequired?token&email',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/activationrequired.html',
            controller: 'ActivationRequiredController',
            resolve: {
              email: ($stateParams) => $stateParams.email,
              token: ($stateParams) => $stateParams.token
            }
          }
        }
      })
      .state(STATE.activation, {
        needsAuthentication: false,
        url: '/activation?token&email',
        views: {
          'container@auth': {
            templateUrl: 'views/pages/auth/activation.html',
            controller: 'ActivationController',
            resolve: {
              email: ($stateParams) => $stateParams.email,
              token: ($stateParams) => $stateParams.token
            }
          }
        }
      });

    $urlRouterProvider.otherwise(($injector) => {
      $injector.get('$state').go(STATE.files, { resourceId: '' }, { reload: true, location: 'replace' });
    });

    RestangularProvider.setBaseUrl(CONFIG.host);
    RestangularProvider.setDefaultHttpFields({ withCredentials: true });

  });
