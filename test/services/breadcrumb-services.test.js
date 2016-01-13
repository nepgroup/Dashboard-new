
describe('Breadcrumb Service', () => {
  beforeEach(module('myApp'));

  var folder1 = {};
  var folder2 = {};

  var filesServiceMock = {};
  var breadcrumbService = {};

  beforeEach(inject(($injector, ApiService) => {
    folder1 = {
      _id: '1',
      name: 'Folder1',
      cloudResource: {
        name: 'Folder1',
        owner: {
          displayName: 'Federico Scarpa',
          cloudUserId: '63375746',
          cloudUserEmail: 'fedescarpa@gmail.com'
        },
        user: {
          username: 'fedescarpa@gmail.com',
          name: 'federico',
          lastName: 'scarpa'
        }
      }
    };
    folder2 = {
      _id: '2',
      name: 'Folder2',
      owner: {
        displayName: 'Federico Scarpa',
        cloudUserId: '63375746',
        cloudUserEmail: 'fedescarpa@gmail.com'
      },
      user: {
        username: 'fedescarpa@gmail.com',
        name: 'federico',
        lastName: 'scarpa'
      }
    };

    folder2.parents = [folder1];

    filesServiceMock = sinon.mock(ApiService.files);
    breadcrumbService = $injector.get('BreadcrumbService');

  }));

  afterEach(() => {
    filesServiceMock.restore();
  });

  context('#last', () => {

    it('should return null if list is empty', () => {
      breadcrumbService.list = [];
      expect(breadcrumbService.last()).to.be.empty;
    });

    it('should return null if list is empty', () => {
      breadcrumbService.list = [ folder2, folder1 ];
      breadcrumbService.last().should.be.eql(folder1);
    });

  });

  context('#fetchParents', () => {

    it('should return an array with one element and it is capitalized', (done) => {
      breadcrumbService
        .fetchParents({ name: 'general.home.resources.files' }, {})
        .then(() => {
          breadcrumbService.list.should.be.eql([{ name: 'Files' }]);
        })
        .then(done, done);
    });

    it('should return the parents flattened', (done) => {
      filesServiceMock
        .expects('getMetadata')
        .once()
        .withExactArgs('2')
        .returns(Promise.resolve(folder2));

      breadcrumbService
        .fetchParents({ name: 'general.home.resources.files' }, { resourceId: '2'})
        .then(() => {
          filesServiceMock.verify();
          breadcrumbService.list.should.be.eql([{
            _id: '1',
            name: 'Folder1',
            owner: {
              displayName: 'Federico Scarpa',
              cloudUserId: '63375746',
              cloudUserEmail: 'fedescarpa@gmail.com'
            },
            user: {
              username: 'fedescarpa@gmail.com',
              name: 'federico',
              lastName: 'scarpa'
            }
          }, {
            _id: '2',
            name: 'Folder2',
            owner: {
              displayName: 'Federico Scarpa',
              cloudUserId: '63375746',
              cloudUserEmail: 'fedescarpa@gmail.com'
            },
            user: {
              username: 'fedescarpa@gmail.com',
              name: 'federico',
              lastName: 'scarpa'
            }
          }]);
        })
        .then(done, done);
    });

  });

});
