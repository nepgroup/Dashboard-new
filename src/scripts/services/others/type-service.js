
class TypeService {

  constructor() {
    this.map = {
      'text/html': 'misc',
      'text/css': 'css',
      'text/xml': 'xml',
      'image/gif': 'photo',
      'image/jpeg': 'photo',
      'application/x-javascript': 'js',
      'application/atom+xml': 'atom',
      'application/rss+xml': 'rss',

      'text/mathml': 'mml',
      'text/plain': 'document',
      'text/vnd.sun.j2me.app-descriptor': 'jad',
      'text/vnd.wap.wml': 'wml',
      'text/x-component': 'htc',

      'image/png': 'photo',
      'image/tiff': 'photo',
      'image/vnd.wap.wbmp': 'photo',
      'image/x-icon': 'photo',
      'image/x-jng': 'photo',
      'image/x-ms-bmp': 'photo',
      'image/svg+xml': 'photo',
      'image/webp': 'photo',

      'application/java-archive': 'jar',
      'application/mac-binhex40': 'hqx',
      'application/msword': 'word',
      'application/pdf': 'pdf',
      'application/postscript': 'illustrator',
      'application/illustrator': 'illustrator',
      'application/rtf': 'rtf',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.ms-powerpoint': 'ppt',
      'application/vnd.wap.wmlc': 'wmlc',
      'application/vnd.google-earth.kml+xml': 'kml',
      'application/vnd.google-earth.kmz': 'kmz',
      'application/x-7z-compressed': '7z',
      'application/x-cocoa': 'cco',
      'application/x-java-archive-diff': 'jardiff',
      'application/x-java-jnlp-file': 'jnlp',
      'application/x-makeself': 'run',
      'application/x-perl': 'pl',
      'application/x-pilot': 'prc',
      'application/x-rar-compressed': 'rar',
      'application/x-redhat-package-manager': 'rpm',
      'application/x-sea': 'sea',
      'application/x-shockwave-flash': 'swf',
      'application/x-stuffit': 'sit',
      'application/x-tcl': 'tcl',
      'application/x-x509-ca-cert': 'crt',
      'application/x-xpinstall': 'xpi',
      'application/xhtml+xml': 'xhtml',
      'application/zip': 'zip',

      'application/vnd.google-apps.drawing': 'drawing',
      'application/vnd.google-apps.folder': 'folder',
      'application/vnd.google-apps.document': 'document',
      'application/vnd.google-apps.presentation': 'presentation',
      'application/vnd.google-apps.spreadsheet': 'spreadsheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'powerpoint',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',

      'application/octet-stream': 'misc',

      'audio/midi': 'music',
      'audio/mpeg': 'music',
      'audio/mp3': 'music',
      'audio/ogg': 'music',
      'audio/x-realaudio': 'music',

      'video/3gpp': 'video',
      'video/mpeg': 'video',
      'video/quicktime': 'video',
      'video/x-flv': 'video',
      'video/x-mng': 'video',
      'video/x-ms-asf': 'video',
      'video/x-ms-wmv': 'video',
      'video/x-msvideo': 'video',
      'video/mp4': 'video',

      'text/x-script.perl': 'misc',
      'application/gzip': 'zip',
      'application/x-rar': 'zip',
      'application/x-gzip': 'zip',
      'image/vnd.adobe.photoshop': 'photoshop',
      'folder': 'folder'
    };
  }

  getType(resource) {
    return resource.mimeType && this.map[resource.mimeType] || 'misc';
  }

  isFolder(resource) {
    return this.getType(resource) === 'folder';
  }

  is(resource, type) {
    return _.includes(resource.mimeType, `${type}`);
  }

  isAudio(resource) {
    return this.is(resource, 'audio');
  }

  isVideo(resource) {
    return this.is(resource, 'video');
  }

  isImage(resource) {
    return this.is(resource, 'image');
  }

  isTxt(resource) {
    return this.is(resource, 'text/plain');
  }

  isGoogleDoc(resource) {
    return this.is(resource, 'vnd.google-apps');
  }

  isOfficeDoc(resource) {
    return this.is(resource, 'vnd.openxmlformats-officedocument')
        || this.is(resource, 'msword')
        || this.is(resource, 'vnd.ms');
  }

  isEditable(resource) {
    return (this.isOfficeDoc(resource) || this.isGoogleDoc(resource) || this.isTxt(resource)) && !this.isFolder(resource);
  }

}

angular
  .module('myApp')
  .service('TypeService', TypeService);


