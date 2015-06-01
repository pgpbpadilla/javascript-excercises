/*jslint indent:2*/
/*global Promise, window*/

(function () {

  'use strict';

  var catalogAPI,
    categories,
    metrics;

  categories = [
    [1, 'device', 'http', 'HTTP'],
    [2, 'device', 'dns', 'DNS'],
    [3, 'application', 'ldap', 'LDAP'],
    [4, 'application', 'mongo', 'MongoDB']
  ];

  metrics = [
    [1, 1, 'req', 'Requests'],
    [2, 1, 'rsp', 'Responses'],
    [3, 1, 'tprocess', 'Server Processing Time'],
    [4, 2, 'req', 'Requests'],
    [5, 2, 'rsp', 'Responses'],
    [6, 2, 'trunc', 'Truncated Responses'],
    [7, 3, 'plain', 'Plain Text Messages'],
    [8, 3, 'sasl', 'SASL Messages'],
    [9, 3, 'error', 'Errors'],
    [10, 4, 'req', 'Requests'],
    [11, 4, 'rsp', 'Responses'],
    [12, 4, 'tprocess', 'Server Processing Time']
  ];

  function CatalogAPI() {


    this.getCategories = function () {
      var promise = new Promise(function (resolve) {
        resolve(categories);
      });

      return promise;
    };



    this.getMetrics = function () {
      var promise = new Promise(function (resolve) {
        resolve(metrics);
      });

      return promise;
    };

  }

  window.sharedCatalogAPI = function () {

    if (undefined === catalogAPI) {
      catalogAPI = new CatalogAPI();
    }

    return catalogAPI;
  };

}());
