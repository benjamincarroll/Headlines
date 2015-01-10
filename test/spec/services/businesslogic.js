'use strict';

describe('Service: businesslogic', function () {

  // load the service's module
  beforeEach(module('headlinesApp'));

  // instantiate service
  var businesslogic;
  beforeEach(inject(function (_businesslogic_) {
    businesslogic = _businesslogic_;
  }));

  it('should do something', function () {
    expect(!!businesslogic).toBe(true);
  });

});
