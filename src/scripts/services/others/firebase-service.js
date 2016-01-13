/* global Firebase */

class FirebaseService {

  /*@ngInject;*/
  constructor($firebaseArray, $firebaseObject, SessionService, FaviconService, CONFIG) {
    this.firebaseArray = $firebaseArray;
    this.firebaseObject = $firebaseObject;
    this.SessionService = SessionService;
    this.rootFirebase = new Firebase(CONFIG.firebase);
    this.compressedFolder = this.rootFirebase.child('compresed_folders');
    this.FaviconService = FaviconService;
  }

  compressFolder(compressId) {
    return this.compressedFolder.child(compressId);
  }

  notifications() {
    return this.firebaseArray(this.profile().child('notifications'));
  }

  incomingCounter() {
    return this.firebaseObject(this.profile().child('incomingCounter'));
  }

  resetIncoming() {
    this.FaviconService.reset();
    this.profile().child('incomingCounter').transaction(_.constant(''));
  }

  profile() {
    return this.rootFirebase.child(this.SessionService.getUser()._id);
  }

}

angular
  .module('myApp')
  .service('FirebaseService', FirebaseService);



