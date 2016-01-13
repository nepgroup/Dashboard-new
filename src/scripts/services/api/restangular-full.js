
function RestangularFull (Restangular) {

  return Restangular.withConfig((RestangularConfigurer) => {
    RestangularConfigurer.setFullResponse(true);
  });

}

/*@ngInject;*/
angular
  .module('myApp')
  .service('RestangularFull', RestangularFull);



