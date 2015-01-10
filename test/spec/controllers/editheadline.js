'use strict';

describe('Controller: EditheadlineCtrl', function () {

  // load the controller's module
  beforeEach(module('headlinesApp'));

  var EditheadlineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditheadlineCtrl = $controller('EditheadlineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
