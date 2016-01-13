
describe('Resources Service', () => {
  beforeEach(module('myApp'));

  var file1 = {};
  var file2 = {};
  var folder1 = {};
  var folder2 = {};

  var resourcesService = {};

  beforeEach(inject(($injector) => {
    file1 = { mimeType: 'doc' };
    file2 = { mimeType: 'doc' };
    folder1 = { mimeType: 'folder' };
    folder2 = { mimeType: 'folder' };
    resourcesService = $injector.get('ResourcesService');
    resourcesService.setResources([ file1, file2, folder1, folder2 ]);
  }));

  context('#filesAndFoldersText', () => {

    it('when 0 files and 0 folders are selected', () => {
      resourcesService.filesAndFoldersText().should.be.eql('');
    });

    it('when 1 file and 0 folders are selected', () => {
      file1.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('1 file');
    });

    it('when 0 files and 1 folder are selected', () => {
      folder1.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('1 folder');
    });

    it('when more than 1 file and 0 folders are selected', () => {
      file1.isSelected = true;
      file2.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('2 files');
    });

    it('when 0 files and more than 1 folder are selected', () => {
      folder1.isSelected = true;
      folder2.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('2 folders');
    });

    it('when 1 file and 1 folder are selected', () => {
      file1.isSelected = true;
      folder1.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('1 file and 1 folder');
    });

    it('when 1 file and more than 1 folder are selected', () => {
      file1.isSelected = true;
      folder1.isSelected = true;
      folder2.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('1 file and 2 folders');
    });

    it('when more than 1 file and 1 folder are selected', () => {
      file1.isSelected = true;
      file2.isSelected = true;
      folder1.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('2 files and 1 folder');
    });

    it('when more than 1 file and more than 1 folder are selected', () => {
      file1.isSelected = true;
      file2.isSelected = true;
      folder1.isSelected = true;
      folder2.isSelected = true;
      resourcesService.filesAndFoldersText().should.be.eql('2 files and 2 folders');
    });

  });

});
