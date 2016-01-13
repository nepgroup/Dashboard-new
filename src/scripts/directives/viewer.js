
/*@ngInject;*/
angular
  .module('myApp')
  .directive('viewer', ($sce, TypeService) => {

    return {
      restrict: 'E',
      templateUrl: 'views/pages/viewer/viewer-preview.html',
      scope: {
        url: '=url',
        mimeType: '=mimeType'
      },
      controller: ($scope) => {

        const needsViewer = () => $scope.isFile && !$scope.isGoogleDoc;

        const addRandomParam = (url) => {
          const queryParam = _.isEmpty(url.split('?')[1]) ? '?' : '&';
          return `${url}${queryParam}r=${Math.random() * 10e15}`;
        };

        const viewer = (url) => {
          return !$scope.isOfficeDoc ?
            `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}` :
            `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(addRandomParam(url))}`;
        };

        const setFileUrl = (url) => {
          const fileUrl = needsViewer() ? viewer(url) : url;
          const embeddedFileUrl = $scope.isGoogleDoc ? `${fileUrl}${_.include(url, '?') ? '&' : '?'}rm=embedded` : fileUrl;
          $scope.fileUrl = $sce.trustAsResourceUrl(embeddedFileUrl);
        };

        const setFileType = (mimeType) => {
          $scope.isAudio = TypeService.isAudio({ mimeType });
          $scope.isVideo = TypeService.isVideo({ mimeType });
          $scope.isImage = TypeService.isImage({ mimeType });
          $scope.isGoogleDoc = TypeService.isGoogleDoc({ mimeType });
          $scope.isOfficeDoc = TypeService.isOfficeDoc({ mimeType });
          $scope.isFile = !$scope.isAudio && !$scope.isVideo && !$scope.isImage;
        };

        $scope.$watch('mimeType', (mimeType) => setFileType(mimeType));
        $scope.$watch('url', (url) => setFileUrl(url));

        setFileType($scope.mimeType);
        setFileUrl($scope.url);

      }
    };

  });
