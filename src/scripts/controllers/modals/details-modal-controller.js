
class DetailsModalController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, cloud, ApiService, NotificationService, SessionService, DebounceService) {
    this.scope = $scope;
    this.scope.fancyModal = $fancyModal;
    this.scope.close = () => this.close();
    this.scope.disconnect = DebounceService.apply(() => this.disconnect());
    this.scope.cloud = cloud;
    this.scope.CloudsService = ApiService.clouds;
    this.scope.step1Visible = true;
    this.scope.step2Visible = false;
    this.scope.step3Visible = false;
    this.scope.step1 = () => this.step1();
    this.scope.step2 = () => this.step2();
    this.NotificationService = NotificationService;
    this.SessionService = SessionService;
  }

  close() {
    this.scope.fancyModal.close();
  }

  step1() {
    this.scope.step1Visible = false;
    this.scope.step2Visible = true;
  }

  step2() {
    this.scope.step2Visible = false;
    this.scope.step3Visible = true;
  }

  disconnect() {
    return this.scope.CloudsService.disconnect(this.scope.cloud)
      .then(() => this.SessionService.removeCloud(this.scope.cloud))
      .then(() => this.close())
      .catch((response) => this.NotificationService.error('There was an error disconnecting your cloud.'));
  }

}

angular
  .module('myApp')
  .controller('DetailsModalController', DetailsModalController);
