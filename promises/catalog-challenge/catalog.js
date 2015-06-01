/*jslint indent:2, browser:true*/
/*global Promise*/

(function () {
  'use strict';

  var catalogAPI = new window.sharedCatalogAPI();

  function Catalog() {

    function makeCategory(values) {
      return {
        id: values[0],
        object_type: values[1],
        stat_name: values[2],
        display_name: values[3]
      };
    }
    function makeMetric(values) {
      return {
        id: values[0],
        category_id: values[1],
        field_name: values[2],
        display_name: values[3]
      };
    }

    var metrics,
      categories,
      that;

    that = this;

    this.getCategoryById = function (id) {
      var found, category;

      // id, object_type, stat_name, display_name
      found = categories.find(function (element) {
        if (id === element[0]) {
          return true;
        }

        return false;
      });

      if (undefined !== found) {
        category = makeCategory(found);
      }

      return category;
    };

    this.getCategoryByStatString = function (statString) {

      var found, category, objectType, statName;

      objectType = statString.split(':')[0].split('.')[1];
      statName = statString.split(':')[0].split('.')[2];

      found = categories.find(function (element) {
        if (objectType === element[1]
            && statName === element[2]) {
          return true;
        }

        return false;
      });

      if (undefined !== found) {
        category = makeCategory(found);
      }

      return category;
    };

    this.getMetricById = function (id) {

      var found, metric;

      // id, category_id, field_name, display_name
      found = metrics.find(function (element) {
        if (id === element[0]) {
          return true;
        }

        return false;
      });

      if (undefined !== found) {
        metric = makeMetric(found);
      }

      return metric;
    };

    this.getMetricByStatString = function (statString) {
      var category, found, fieldName, metric;

      fieldName = statString.split(':')[1];

      category = that.getCategoryByStatString(statString);

      if (undefined !== category) {
        found = metrics.find(function (element) {

          if (category.id === element[1]
              && fieldName === element[2]) {
            return true;
          }
          return false;
        });

        if (undefined !== found) {
          metric = makeMetric(found);
        }
      }

      return metric;
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
  }

  window.Catalog = Catalog;

}());
