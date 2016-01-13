Dende
=====

### How to run the server

#### Prerequisites

1. Make sure you have installed **nvm**
1. Make sure you have installed **node** version **0.12**. If not, run `nvm install 0.12 && nvm use 0.12`
1. Make sure you have installed **npm**
1. Make sure you have installed **gulp**. If not, run `npm install -g gulp`
1. Make sure you have installed **bower**. If not, run `npm install -g bower`

#### Running the server

1. Run `nvm use 0.12 && npm install && bower install`
1. Check `config/development.js` configuration file. Host value must point to `http[s]://<shenlongIP>:3000`
1. `gulp serve`
1. Be happy :smile:

**_Note:_** if you install [**avn**](https://www.npmjs.com/package/avn) package, you don't need to run `nvm use 0.12` every time
