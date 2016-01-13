/* eslint no-unused-vars: 0 */
/* global config */

class CloudsService {

  constructor(Restangular, SessionService) {
    this.CloudApi = Restangular.one('api');
    this.Session = SessionService;
  }

  connect(cloud) {
    window.location.href = `${config.host}/api/connect/${cloud}`;
  }

  getClouds() {
    return this.CloudApi.one('clouds').get();
  }

  disconnect(cloud) {
    return this.CloudApi
      .one('accounttoken', cloud._id)
      .remove()
      .then(() => this.Session.removeCloud(cloud));
  }

  getCloudCollaborators() {
    return this.CloudApi
      .one('me')
      .getList('cloudCollaborators', { limit: 4 });
  }

  invite(data) {
    return this.CloudApi
      .one('post')
      .post('invite', data);
  }

}

