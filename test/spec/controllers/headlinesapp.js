'use strict';

describe('Controller: HeadlinesappCtrl', function () {

  // load the controller's module
  beforeEach(module('headlinesApp'));

  var HeadlinesappCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeadlinesappCtrl = $controller('HeadlinesappCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
