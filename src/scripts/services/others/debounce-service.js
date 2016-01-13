
class DebounceService {

  /*@ngInject;*/
  constructor() {
  }

  apply(concept) {
    return _.debounce(concept, 10000, {
      leading: true,
      trailing: false
    });
  }

}

angular
  .module('myApp')
  .service('DebounceService', DebounceService);
