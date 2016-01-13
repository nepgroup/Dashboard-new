/* global AuthService FilesService CloudsService */

class ApiService {

  /*@ngInject;*/
  constructor(Restangular, SessionService, RestangularFull) {

    this.auth = new AuthService(Restangular);
    this.files = new FilesService(Restangular, SessionService, RestangularFull);
    this.clouds = new CloudsService(Restangular, SessionService);

  }

}

angular
  .module('myApp')
  .service('ApiService', ApiService);



