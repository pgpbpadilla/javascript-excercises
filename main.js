/*jslint indent:2, browser:true*/
/*global */

(function () {

  'use strict';

  window.onload = function () {

    function addRow(data) {

      console.log(data);

      var div = document.createElement('div');

      div.textContent = JSON.stringify(data);

      document.body.appendChild(div);

    }

    function testLookups(catalog) {
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
      txtMetricId,
      btnCategoryById,
      txtCategoryId,
      btnMetricByStatString,
      txtMetricStat,
      btnCategoryByStatString,
      txtCategoryStat,
      data;

    btnMetricById = document.getElementById('metric-by-id');
    txtMetricId = document.getElementById('metric-id');
    btnCategoryById = document.getElementById('category-by-id');
    txtCategoryId = document.getElementById('category-id');
    btnMetricByStatString = document.getElementById('metric-by-stat');
    txtMetricStat = document.getElementById('metric-stat');
    btnCategoryByStatString = document.getElementById('category-by-stat');
    txtCategoryStat = document.getElementById('category-stat');


    myCatalog = new window.Catalog();

    myCatalog.initialize()
      .then(function () {

        btnMetricById.onclick = function () {
          var id = parseInt(txtMetricId.value, 10);
          data = myCatalog.getMetricById(id);
          addRow(data);
        };

        btnCategoryById.onclick = function () {
          var id = parseInt(txtCategoryId.value, 10);
          data = myCatalog.getCategoryById(id);
          addRow(data);
        };

        btnMetricByStatString.onclick = function () {
          var stat = txtMetricStat.value;
          data = myCatalog.getMetricByStatString(stat);
          addRow(data);
        };

        btnCategoryByStatString.onclick = function () {
          var stat = txtCategoryStat.value;
          data = myCatalog.getCategoryByStatString(stat);
          addRow(data);
        };

        testLookups(myCatalog);

      })
      .catch(function (reason) {

        console.log('error', reason);

      });

  };

}());
