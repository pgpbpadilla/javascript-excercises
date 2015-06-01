/*jslint indent:2, browser:true*/
/*global */

(function () {

  'use strict';

  window.onload = function () {

    function testLookups (catalog) {
      var category1, 
        category2, 
        metric1, 
        metric2;

      category1 = catalog.getCategoryById(1);

      category2 = catalog.getCategoryByStatString('extrahop.device.http');

      if (category1.id === category2.id) {
        console.log(category1.display_name + ' lookups match!');
      }

      metric1 = catalog.getMetricById(4);
      metric2 = catalog.getMetricByStatString('extrahop.device.dns:req');

      if (metric1.id === metric2.id) {
        console.log(metric1.display_name + ' lookups match!');
      }
    }

    var myCatalog,
      btnMetricById,
      btnCategoryById,
      btnMetricByStatString,
      btnCategoryByStatString;

    btnMetricById = document.getElementById('metric-by-id');
    btnCategoryById = document.getElementById('category-by-id');
    btnMetricByStatString = document.getElementById('metric-by-stat');
    btnCategoryByStatString = document.getElementById('category-by-stat');


    myCatalog = new window.Catalog();

    myCatalog.initialize()
      .then(function (value) {

        btnMetricById.onclick = function () {
          console.log(myCatalog.getMetricById(3));
        };

        btnCategoryById.onclick = function () {
          console.log(myCatalog.getCategoryById(2));
        };

        btnMetricByStatString.onclick = function () {
          console.log(myCatalog.getMetricByStatString());
        };

        btnCategoryByStatString.onclick = function () {
          console.log(myCatalog.getCategoryByStatString());
        };

        //testLookups(myCatalog);

      })
      .catch(function (reason) {

        console.log('error', reason);

      });

  };

}());
