
class NotificationService {

  /*@ngInject;*/
  constructor($state, $timeout, FirebaseService, BreadcrumbService, ResourcesService, FaviconService, STATE) {
    this.queue = [];
    this.FirebaseService = FirebaseService;
    this.FaviconService = FaviconService;
    this.timeout = $timeout;
    this.handlers = {
      initcrawling: Promise.method((body) => {
        this.success(`You've connected your ${body.cloudType}. We are getting your files and folders`);
      }),
      finishfirstlevelcrawling: Promise.method(() => {
        if ($state.is(STATE.files) && _.isEmpty(BreadcrumbService.list) && _.isEmpty(ResourcesService.all)) {
          ResourcesService.refresh();
        }
      }),
      finishcrawling: Promise.method((body) => {
        this.success(`${_.capitalize(body.cloudType)} is fully ready. Please <a href ng-click="refresh()">refresh</a>`);
      })
    };
  }

  push(notification) {
    this.queue.push(notification);
    this.timeout(() => this.removeNotification(notification), 10000);
  }

  getNotification() {
    return _.first(this.queue);
  }

  removeNotification(notification) {
    this.queue = notification ? _.without(this.queue, notification) : _.tail(this.queue);
  }

  clear() {
    this.queue = [];
  }

  info(message) {
    this.push({ message, type: 'info' });
  }

  success(message) {
    this.push({ message, type: 'success' });
  }

  error(message) {
    this.push({ message, type: 'error' });
  }

  listenFirebase() {
    const notifications = this.FirebaseService.notifications();
    notifications.$watch((ev) => {
      if(ev.event === 'child_added') {
       const newMessage = notifications.$getRecord(ev.key);
       this.handlers[newMessage.type](newMessage.body).then(() => {
         notifications.$remove(notifications.$indexFor(ev.key));
       });
      }
    });
    const incoming = this.FirebaseService.incomingCounter();
    incoming.$watch(() => {
      this.FaviconService.badge(incoming.$value);
    });
  }

}

angular
  .module('myApp')
  .service('NotificationService', NotificationService);



