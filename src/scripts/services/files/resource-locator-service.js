
class ResourceLocatorService {

  /*@ngInject;*/
  constructor ($timeout, $anchorScroll, ResourcesService) {
    this.timeout = $timeout;
    this.anchorScroll = $anchorScroll;
    this.ResourcesService = ResourcesService;
  }

  locate(resourceId) {
    const resource = _.find(this.ResourcesService.all, { _id: resourceId });
    if (!_.isEmpty(resource)) resource.isSelected = true;
    this.timeout(() => this.anchorScroll(resourceId));
    return !!resource;
  }

}

angular
  .module('myApp')
  .service('ResourceLocatorService', ResourceLocatorService);
