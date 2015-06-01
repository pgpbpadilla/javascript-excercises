/*jslint indent:2*/

(function () {
  'use strict';
  
  var catalogAPI = new window.sharedCatalogAPI();

  function Catalog() {

    var metrics, 
      categories;

    this.getCategoryById = function (id) {
      var found;

      // id, object_type, stat_name, display_name
      found = categories.find(function (element, index, array) {
        if (id === element[0]) {
          return true;
        }

        return false;
      });
      
      return found;
    };

    this.getCategoryByStatString = function (statString) {
      
    };

    this.getMetricById = function (id) {

      var found;

      // id, category_id, field_name, display_name
      found = metrics.find(function (element, index, array) {
        if (id === element[0]) {
          return true;
        }

        return false;
      });

      return found;
    };

    this.getMetricByStatString = function (statString) {
      
    };

    this.initialize = function () {
      var promise = Promise.all([
        catalogAPI.getCategories(),
        catalogAPI.getMetrics()
      ]);

      promise.then(function (value) {

        categories = value[0];
        console.log('Loaded categories', categories);
        metrics = value[1];
        console.log('Loaded metrics',  metrics);
      }).catch(function (reason) {
        console.log(reason);
      });

      return promise;
    };
  };

  window.Catalog = Catalog;

}());
