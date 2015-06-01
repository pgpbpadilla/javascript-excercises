/*jslint indent:2*/

(function () {
  'use strict';
  
  var catalogAPI = new window.sharedCatalogAPI();

  function Catalog() {

    var metrics, 
      categories;

    this.getCategoryById = function (id) {
      
    };

    this.getCategoryByStatString = function (statString) {
      
    };

    this.getMetricById = function (id) {
      
    };

    this.getMetricByStatString = function (statString) {
      
    };

    this.initialize = function () {
      return Promise.all([
        catalogAPI.getCategories(),
        catalogAPI.getMetrics()
      ]);
    };
  };

  window.Catalog = Catalog;

}());
