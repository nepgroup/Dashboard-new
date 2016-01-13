
class DownloadService {

  /*@ngInject;*/
  constructor(Restangular, SessionService, ApiService, FirebaseService, NotificationService) {
    this.FilesService = ApiService.files;
    this.FirebaseService = FirebaseService;
    this.NotificationService = NotificationService;

  }

  doSimpleDownload(url) {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.display = 'none';
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  }

  doMultipleDownload(compressId) {
    var compressNode = this.FirebaseService.compressFolder(compressId);

    compressNode.on('value', (val) => {
      var downloadUrl = val.val();
      val.ref().remove();

      if (!_.isEmpty(downloadUrl)) return this.doSimpleDownload(downloadUrl);
    });
  }

  download(resources) {
    this.FilesService.download(resources)
      .then((response) => {
        if (response.status === 200) return this.doSimpleDownload(response.data.url);
        if (response.status === 202) return this.doMultipleDownload(response.data.data);
        this.NotificationService.error('Oops. Something went wrong.');
      });
  }

}

angular
  .module('myApp')
  .service('DownloadService', DownloadService);



