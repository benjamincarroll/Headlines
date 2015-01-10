'use strict';

describe('Controller: UpdateheadlineCtrl', function () {

  // load the controller's module
  beforeEach(module('headlinesApp'));

  var UpdateheadlineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdateheadlineCtrl = $controller('UpdateheadlineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
