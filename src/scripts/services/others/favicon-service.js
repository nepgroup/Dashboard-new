/* global Favico */

class FaviconService {

  constructor() {

    this.favicon = new Favico( {animation: 'slide'});
    this.value = 0;

  }

  badge(value) {
    this.value = value || 0;
    return this.favicon.badge(this.value);
  }

  reset() {
    this.value = 0;
    return this.favicon.reset();
  }

}

angular
  .module('myApp')
  .service('FaviconService', FaviconService);
