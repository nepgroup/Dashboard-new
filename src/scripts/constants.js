/* global config */

angular
  .module('myApp')
  .constant('CLOUDS', ['dropbox', 'drive', 'box'])
  .constant('CONFIG', config)
  .constant('STATE', {
    'general': 'general',
    'home': 'general.home',
    'resources': 'general.home.resources',
    'files': 'general.home.resources.files',
    'incoming': 'general.home.resources.incoming',
    'recent': 'general.home.resources.recent',
    'starred': 'general.home.resources.starred',
    'trash': 'general.home.resources.trash',
    'search': 'general.home.resources.search',
    'settings': 'general.home.settings',
    'clouds': 'general.home.settings.clouds',
    'legals': 'general.home.settings.legals',
    'add': 'general.home.addCloud',
    'views': 'views',
    'auth': 'auth',
    'sign': 'auth.sign',
    'signup': 'auth.sign.up',
    'signin': 'auth.sign.in',
    'forgotpassword': 'auth.sign.forgotpassword',
    'resetpassword': 'auth.sign.resetpassword',
    'activationrequired': 'auth.sign.activationrequired',
    'activation': 'auth.sign.activation'
  });
