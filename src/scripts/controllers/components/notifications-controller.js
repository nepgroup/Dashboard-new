
class NotificationsController {

  /*@ngInject;*/
  constructor ($scope, $state, $sce, NotificationService, ResourcesService, STATE) {
    this.scope = $scope;
    this.sce = $sce;
    this.state = $state;
    this.NotificationService = NotificationService;
    this.ResourcesService = ResourcesService;
    this.STATE = STATE;
    this.current = () => NotificationService.getNotification() || { message: '', type: '' };
    this.scope.message = () => this.message();
    this.scope.type = () => this.type();
    this.scope.close = () => this.close();
    this.scope.refresh = () => this.refresh();
    this.scope.showNotification = () => this.showNotification();
  }

  close() {
    this.NotificationService.removeNotification();
  }

  refresh() {
    this.state.go(this.STATE.files);
    this.ResourcesService.refresh();
    this.close();
  }

  showNotification() {
    return this.NotificationService.queue.length > 0;
  }

  message() {
    return this.sce.trustAsHtml(this.current().message);
  }

  type() {
    return this.current().type;
  }

}

angular
  .module('myApp')
  .controller('NotificationsController', NotificationsController);
