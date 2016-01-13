
class UploadService {

  /*@ngInject;*/
  constructor(cfpLoadingBar, FileUploader, SessionService, NotificationService, ResourcesService, BreadcrumbService, ModalService, CONFIG) {

    this.CONFIG = CONFIG;
    this.FileUploader = FileUploader;
    this.ModalService = ModalService;
    this.SessionService = SessionService;
    this.ResourcesService = ResourcesService;
    this.BreadcrumbService = BreadcrumbService;
    this.NotificationService = NotificationService;
    this.cfpLoadingBar = cfpLoadingBar;

    this._fileUploader = this.newFileUploader();
    this._photoUploader = this.newPhotoUploader();

  }

  newPhotoUploader() {
    const uploader = new this.FileUploader({
      url: `${this.CONFIG.host}/api/me/photo`,
      withCredentials: true,
      autoUpload: true
    });

    uploader.onCompleteItem = (item, response, status) => {
      if (status === 200) {
        this.SessionService.setUser(response);
        item.remove();
        this.cfpLoadingBar.complete();
      }
    };

    uploader.onAfterAddingFile = () => {
      if (uploader.queue.length > 1) {
        uploader.queue[0].remove();
      }
    };

    uploader.onBeforeUploadItem = () => {
      this.cfpLoadingBar.start();
    };

    uploader.onWhenAddingFileFailed = (item, filter, options) => {
      this.NotificationService.error(filter.message);
    };

    uploader.onProgressItem = (item, progress) => {
      this.cfpLoadingBar.inc(progress);
    };

    uploader.filters.push({
      'name': 'fileExtension',
      'fn': function (item) {
        return _.includes(item.type, 'image/');
      },
      message: 'The file you have selected is not a valid image. Please try again.'
    });

    uploader.onErrorItem = (item, response, status, headers) => {
      this.NotificationService.error('There was an error while uploading your photo. Please try again later.');
    };

    uploader.onAfterAddingFile = () => {
      if (uploader.queue.length > 1) {
        uploader.queue[0].remove();
      }
    };

    return uploader;
  }

  newFileUploader() {
    const uploader = new this.FileUploader({
      url: `${this.CONFIG.host}/api/resources/upload`,
      withCredentials: true,
      autoUpload: false
    });

    uploader.onCompleteItem = (item, response, status) => {
      if (status === 201) {
        item.resource = response;
        this.ResourcesService.add(item.resource);
      }
    };

    uploader.onAfterAddingFile = (item) => {
      item.formData.push(_.omit({ parent: this.BreadcrumbService.last()._id }, _.isEmpty));
      item.upload();
      this.ModalService.uploadFiles(uploader);
    };

    return uploader;
  }

  fileUploader() {
    return this._fileUploader;
  }

  photoUploader() {
    return this._photoUploader;
  }

}

angular
  .module('myApp')
  .service('UploadService', UploadService);
