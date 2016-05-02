var chartData;

$(function(){
  $.ajax({

    url: 'http://localhost:3300/fuelPrices',
    type: 'GET',
    success : function(data) {
      chartData = data;
      var template = Handlebars.compile($("#tabular-template").html());
      $("#table-location").html(template(data));

      var chartProperties = {
        "caption": "Daily Stock Price HRYS",
        "numberprefix": "$",
        "vNumberPrefix": " ",
        "pYAxisName": "Price",
        "vYAxisName": "Volume (In Millions)",
        "vYAxisName": "Volume (In Millions)",
        "bgColor": "#ffffff",
        "showBorder": "0",
        "canvasBgColor": "#ffffff",
        "showCanvasBorder": "0",
        "showAlternateHGridColor": "0",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "toolTipColor": "#ffffff",
        "toolTipBorderThickness": "0",
        "toolTipBgColor": "#000000",
        "toolTipBgAlpha": "80",
        "toolTipBorderRadius": "2",
        "toolTipPadding": "5",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
      };

      var categoriesArray1 = [{
          "category" : data["categories"]
      }];

      var categoriesArray2 = [{
          "data" : data["dataset"]
      }];
      var candlestickChart = new FusionCharts({
        type: 'candlestick',
        renderAt: 'chart-container',
        width: '600',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray1,
          dataset : categoriesArray2
          //dataset : data["dataset"]
        }
      });
      candlestickChart.render();
    }
  });
});
