
class ValidatorService {

  constructor() {
  }

  minPassword() {
    return 6;
  }

  maxPassword() {
    return 20;
  }

  passwordPattern() {
    return '/^(?=.*[A-Za-z])(?=.*\d).{6,}$/';
  }

  modelOptions() {
    return { updateOn: 'blur' };
  }

}

angular
  .module('myApp')
  .service('ValidatorService', ValidatorService);



