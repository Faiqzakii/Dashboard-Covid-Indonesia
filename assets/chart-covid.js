"use strict";

!function (NioApp, $) {
  "use strict"; // DataTable Init

  function covid_datatable() {
    var attr = {
      responsive: false,
      dom: '<"datatable-alt-wrap"t>',
      paging: false,
      autoWidth: false,
      order: [[1, 'desc']]
    };
    var dtable = $('.cov-datatable').DataTable(attr);

    function covid_order() {
      $('.cov-sortable').on('click', function () {
        var $this = $(this),
            idx = $this.index();
        $this.parent().find('.cov-sortable').not($this).removeClass('sort-down').removeClass('sort-up');

        if ($this.hasClass('sort-down')) {
          dtable.order([idx, 'asc']).draw();
          $this.addClass('sort-up').removeClass('sort-down');
        } else {
          dtable.order([idx, 'desc']).draw();
          $this.addClass('sort-down').removeClass('sort-up');
        }

        return false;
      });
    }

    covid_order();
  }

  covid_datatable(); // Vector Map

  var worldMap = {
    map: 'indonesia_id',
    data: {
      "path01": "9",
      "path02": "111",
      "path03": "144",
      "path04": "59",
      "path05": "32",
      "path06": "143",
      "path07": "8",
      "path08": "44",
      "path09": "10",
      "path10": "89",
      "path11": "4002",
      "path12": "969",
      "path13": "682",
      "path14": "388",
      "path15": "857",
      "path16": "93",
      "path17": "215",
      "path18": "221",
      "path19": "1",
      "path20": "51",
      "path21": "121",
      "path22": "150",
      "path23": "115",
      "path24": "92",
      "path25": "43",
      "path26": "42",
      "path27": "453",
      "path28": "45",
      "path29": "15",
      "path30": "144",
      "path31": "22",
      "path32": "26",
      "path33": "177",
      "path34": "37"
    }
  };

  function jqvmap_init() {
    var elm = '.vector-map';

    if ($(elm).exists() && typeof $.fn.vectorMap === 'function') {
      $(elm).each(function () {
        var $self = $(this),
            _self_id = $self.attr('id'),
            map_data = eval(_self_id);

        $self.vectorMap({
          map: map_data.map,
          backgroundColor: 'transparent',
          borderColor: '#dee6ed',
          borderOpacity: 1,
          borderWidth: 1,
          color: '#ccd7e2',
          enableZoom: false,
          hoverColor: '#9cabff',
          hoverOpacity: null,
          normalizeFunction: 'polynomial',
          scaleColors: ['#ccd7e2', '#798bff'],
          selectedColor: '#6576ff',
          showTooltip: true,
          values: map_data.data,
          onLabelShow: function onLabelShow(event, label, code) {
            var mapData = JQVMap.maps,
                what = Object.keys(mapData)[0],
                name = mapData[what].paths[code]['name'];
            label.html(name + ' - ' + (map_data.data[code] || 0));
          }
        });
      });
    }
  }

  ;
  NioApp.coms.docReady.push(jqvmap_init);
  var confirmedCases = {
    labels: ["2 Mar", "3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar", "10 Mar", '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar', '30 Mar', '31 Mar', '1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr', '11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr', '27 Apr', '28 Apr'],
    dataUnit: 'People',
    lineTension: 0.1,
    datasets: [{
      label: "Infected",
      color: "#816bff",
      background: 'transparent',
      data: [2, 2, 2, 2, 4, 4, 6, 19, 27, 30, 27, 60, 83, 104, 121, 156, 197, 269, 321, 392, 437, 500, 600, 701, 780, 913, 994, 1107, 1217, 1311, 1417, 1508, 1671, 1751, 1911, 2090, 2313, 2494, 2761, 2924, 3229, 3509, 3778, 3954, 4221, 4472, 4796, 5082, 5307, 5423, 5677, 5869, 6168, 6520, 6845, 7032, 7180, 7484]
    }, {
      label: "Recovered",
      color: "#1ee0ac",
      background: 'transparent',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5, 8, 8, 8, 9, 11, 15, 16, 20, 29, 30, 30, 31, 35, 46, 59, 64, 75, 81, 103, 112, 134, 150, 164, 192, 204, 222, 252, 282, 286, 359, 380, 426, 446, 548, 607, 631, 686, 747, 842, 913,960, 1002, 1042, 1107, 1151, 1254]
    }, {
      label: "Deaths",
      color: "#e85347",
      background: 'transparent',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 5, 5, 5, 7, 19, 25, 32, 38, 48, 49, 55, 58, 78, 87, 102, 114, 122, 136, 157, 170, 181, 198, 209, 221, 240, 280, 306, 327, 373, 399, 459, 469, 496, 520, 535, 582, 590, 616, 636, 647, 689, 720, 743, 765, 773]
    }]
  };

  function lineCovidCase(selector, set_data) {
    var $selector = selector ? $(selector) : $('.covid-case-line-chart');
    $selector.each(function () {
      var $self = $(this),
          _self_id = $self.attr('id'),
          _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;

      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];

      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 3,
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 3,
          data: _get_data.datasets[i].data
        });
      }

      var chart = new Chart(selectCanvas, {
        type: 'line',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          legend: {
            display: _get_data.legend ? _get_data.legend : false,
            labels: {
              boxWidth: 30,
              padding: 20,
              fontColor: '#6783b8'
            }
          },
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
              title: function title(tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function label(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex]['label'] + ' - ' + data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem['index']];
              },
              footer: function footer(tooltipItems, data) {
                var total = 0;
                tooltipItems.forEach(function (tooltipItem) {
                  total += data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem['index']];
                });
                return 'Total - ' + total;
              }
            },
            backgroundColor: '#fff',
            borderColor: '#eff6ff',
            borderWidth: 2,
            titleFontSize: 11,
            titleFontWeight: 'normal',
            titleFontColor: '#6783b8',
            titleMarginBottom: 6,
            bodyFontColor: '#9eaecf',
            bodyFontSize: 11,
            bodySpacing: 4,
            yPadding: 10,
            xPadding: 10,
            footerFontSize: 11,
            footerFontColor: '#6783b8',
            footerMarginTop: 6,
            displayColors: false
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: false,
                fontSize: 12,
                fontColor: '#9eaecf',
                padding: 10,
                callback: function callback(value) {
                  return Math.abs(value) > 999 ? Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + ' k' : Math.sign(value) * Math.abs(value);
                },
                min: 100,
                stepSize: 5000
              },
              gridLines: {
                color: "#e5ecf8",
                tickMarkLength: 0,
                zeroLineColor: '#e5ecf8'
              }
            }],
            xAxes: [{
              display: false,
              ticks: {
                fontSize: 9,
                fontColor: '#9eaecf',
                source: 'auto',
                padding: 10
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: 'transparent'
              }
            }]
          }
        }
      });
    });
  } // init chart


  NioApp.coms.docReady.push(function () {
    lineCovidCase();
  });
  var dailyIncrease = {
    labels: ["2 Mar", "3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar", "10 Mar", '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar', '30 Mar', '31 Mar', '1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr', '11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr', '27 Apr', '28 Apr'],
    dataUnit: 'People',
    stacked: true,
    datasets: [{
      label: "Infected",
      color: "#816bff",
      background: '#816bff',
      data: [2, 0, 0, 0, 2, 0, 2, 13, 8, 7, 0, 35, 27, 21, 17, 38, 55, 82, 60, 81, 64, 65, 106, 105, 103, 153, 109, 130, 129, 114, 149, 113, 196, 106, 181, 218, 247, 218, 337, 219, 330, 399, 316, 282, 297, 380, 407, 325, 327, 185, 375, 283, 357, 436, 396, 275, 214, 415]
    }, {
      label: "Recovered",
      color: "#1ee0ac",
      background: "#1ee0ac",
      data: [0, 0, 0, 0, 0, 0, 0,  0, 0, 2, 1,  2, 3, 0, 0, 1, 2, 4, 1, 4, 9, 1, 0, 1, 4, 11, 13, 5, 11, 6, 22, 9, 22, 16, 14, 28, 12, 18, 30, 30, 4, 73, 21, 46, 20, 102, 59, 24, 55, 61, 95, 71, 47, 42, 40, 65, 44, 103]
    }, {
      label: "Deaths",
      color: "#e85347",
      background: '#e85347',
      data: [0, 0, 0, 0, 0, 0, 0,  0, 0, 2, 2, 0,  1,  0,  0,  2, 12,  6,  7,  6, 10,  1,  6,   3,  20,   9,  15,  12,   8,  14,  21,  13,  11,  10,   7,  11,  12,  19,  40,  26,  21,  46,  26,  60,  10,  27,  24,  15,  47,   8,  26,  20,  11,  42,  31,  23,  22,  8]
    }]
  };
  var dailyworld = {
    labels: ["31 Dec", "1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan", "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan", "28 Jan", "29 Jan", "30 Jan", "31 Jan", "1 Feb", "2 Feb", "3 Feb", "4 Feb", "5 Feb", "6 Feb", "7 Feb", "8 Feb", "9 Feb", "10 Feb", "11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb", "16 Feb", "17 Feb", "18 Feb", "19 Feb", "20 Feb", "21 Feb", "22 Feb", "23 Feb", "24 Feb", "25 Feb", "26 Feb", "27 Feb", "28 Feb", "29 Feb", "1 Mar", "2 Mar", "3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar", "10 Mar", '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar', '30 Mar', '31 Mar', '1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr', '11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr', '27 Apr', '28 Apr'],
    dataUnit: 'People',
    stacked: true,
    datasets: [{
      label: "Infected",
      color: "#816bff",
      background: 'transparent',
      data: [54,54,54,88,88,118,118,118,118,118,118,118,118,120,120,122,122,132,166,438,478,784,1068,1262,1794,2700,4046,5640,9174,12134,15646,19652,23892,29108,34744,41230,49044,56546,62982,69866,75104,81080,86210,90354,120656,129086,134206,138530,142664,146654,150382,151446,153438,155608,157624,158678,160264,161990,164202,166730,170406,174052,178136,180792,185253,189702,195526,203340,210706,218432,228095,236402,250119,266512,285591,308745,334104,359472,388982,425594,484048,541527,609765,675765,755238,833059,935488,1054982,1182596,1312972,1430058,1553586,1702473,1856286,2011430,2174948,2347761,2490506,2633280,2783066,2952888,3126942,3305624,3469040,3613816,3746582,3906876,4066794,4233898,4398224,4556272,4701290,4854010,5026102,5158950,5315124,5460790,5664246,5831316,5962158]
    }, {
      label: "Deaths",
      color: "#e85347",
      background: 'transparent',
      data: [0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,4,4,4,4,6,6,12,34,34,52,82,112,162,212,264,340,426,518,610,724,854,986,1130,1276,1448,1626,1820,2036,2230,2740,2766,3054,3338,3550,3746,4024,4256,4494,4718,4926,5238,5396,5524,5600,5714,5842,5958,6092,6227,6396,6556,6762,6968,7163,7621,8037,8577,9228,9929,10804,11513,13005,14197,15775,17677,19759,22491,25891,29199,32719,37123,41979,47341,53979,67145,74544,83801,93761,103147,116353,128538,137849,148123,162945,175625,190071,204169,216377,227011,237699,252375,273253,290335,307295,319827,330095,340547,354427,366481,381191,391529,403967,411805,421643]
    }]
  };
  var dailyworldComparison = {
    labels: ["31 Dec", "1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan", "11 Jan", "12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan", "18 Jan", "19 Jan", "20 Jan", "21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan", "28 Jan", "29 Jan", "30 Jan", "31 Jan", "1 Feb", "2 Feb", "3 Feb", "4 Feb", "5 Feb", "6 Feb", "7 Feb", "8 Feb", "9 Feb", "10 Feb", "11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb", "16 Feb", "17 Feb", "18 Feb", "19 Feb", "20 Feb", "21 Feb", "22 Feb", "23 Feb", "24 Feb", "25 Feb", "26 Feb", "27 Feb", "28 Feb", "29 Feb", "1 Mar", "2 Mar", "3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar", "10 Mar", '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar', '30 Mar', '31 Mar', '1 Apr', '2 Apr', '3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr', '11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr', '16 Apr', '17 Apr', '18 Apr', '19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr', '27 Apr', '28 Apr'],
    dataUnit: 'People',
    stacked: true,
    datasets: [{
      label: "Infected",
      color: "#816bff",
      background: "#816bff",
      data: [54,0,0,34,0,30,0,0,0,0,0,0,0,2,0,2,0,10,34,272,40,306,284,194,532,906,1946,1594,3534,2960,3512,4006,4240,5216,5636,6486,7814,7502,6432,6884,5238,5976,513,4144,30302,8430,5120,4324,4134,3990,3728,1064,1992,2170,2016,1054,1586,1726,2212,2528,3676,3646,4084,3594,4424,4478,5712,7922,7382,7742,9080,8756,13768,16712,18812,23030,25288,25352,29498,36612,58450,57484,68238,66000,77466,77826,102444,119494,127914,130076,117086,123620,148800,153808,155144,163518,172968,142590,142774,149786,169822,174054,178682,163416,144776,132766,160294,159918,167104,164326,158048,152720,172092,132848,156174,145666,203456,167070,130842]
    }, {
      label: "Deaths",
      color: "#e85347",
      background: "#e85347",
      data: [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,2,0,6,22,0,18,30,30,50,50,52,76,86,92,92,114,130,132,144,146,172,194,216,194,510,26,288,284,212,196,278,232,224,208,312,158,128,76,114,128,116,134,144,168,160,206,206,194,458,418,538,652,702,876,708,1490,1192,1578,1902,2082,2732,3400,3308,3520,4404,4856,5362,6638,6918,6248,7400,9256,9960,9386,13206,12186,9310,10274,14822,12680,14446,14098,12208,10634,10688,14676,20878,17082,16960,12532,10268,10452,16880,12054,14710,10338,12438,7838,9838,11476]
    }]
  };
  var Demography = {
    labels: ['0-9 Tahun', '10-29 Tahun', '30-49 Tahun', '50-69 Tahun', '>70 Tahun'],
    dataUnit: '%',
    datasets: [{
      labels: 'Demography',
      color: "#816bff",
      background: "#816bff",
      data: [1.53, 17.69, 38.69, 36.25, 5.85, 1.62]
    }]
  };

  function barCovidcase(selector, set_data) {
    var $selector = selector ? $(selector) : $('.covid-case-bar-chart');
    $selector.each(function () {
      var $self = $(this),
          _self_id = $self.attr('id'),
          _get_data = typeof set_data === 'undefined' ? eval(_self_id) : set_data;

      var selectCanvas = document.getElementById(_self_id).getContext("2d");
      var chart_data = [];

      for (var i = 0; i < _get_data.datasets.length; i++) {
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          data: _get_data.datasets[i].data,
          barPercentage: .7,
          categoryPercentage: .7
        });
      }

      var chart = new Chart(selectCanvas, {
        type: 'bar',
        data: {
          labels: _get_data.labels,
          datasets: chart_data
        },
        options: {
          legend: {
            display: _get_data.legend ? _get_data.legend : false,
            labels: {
              boxWidth: 12,
              padding: 20,
              fontColor: '#6783b8'
            }
          },
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            mode: 'index',
            position: 'nearest',
            callbacks: {
              title: function title(tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function label(tooltipItem, data) {
                return data.datasets[tooltipItem.datasetIndex]['label'] + ' - ' + data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem['index']];
              },
              footer: function footer(tooltipItems, data) {
                var total = 0;
                tooltipItems.forEach(function (tooltipItem) {
                  total += data.datasets[tooltipItem.datasetIndex]['data'][tooltipItem['index']];
                });
                return 'Total - ' + total;
              }
            },
            backgroundColor: '#fff',
            borderColor: '#eff6ff',
            borderWidth: 2,
            titleFontSize: 11,
            titleFontWeight: 'normal',
            titleFontColor: '#6783b8',
            titleMarginBottom: 6,
            bodyFontColor: '#9eaecf',
            bodyFontSize: 11,
            bodySpacing: 4,
            yPadding: 10,
            xPadding: 10,
            footerFontSize: 11,
            footerFontColor: '#6783b8',
            footerMarginTop: 6,
            displayColors: false
          },
          scales: {
            yAxes: [{
              display: true,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                beginAtZero: true,
                fontSize: 12,
                fontColor: '#9eaecf',
                padding: 10,
                callback: function callback(value) {
                  return Math.abs(value) > 999 ? Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + ' k' : Math.sign(value) * Math.abs(value);
                },
                stepSize: 5000
              },
              gridLines: {
                color: "#e5ecf8",
                tickMarkLength: 0,
                zeroLineColor: '#e5ecf8'
              }
            }],
            xAxes: [{
              display: false,
              stacked: _get_data.stacked ? _get_data.stacked : false,
              ticks: {
                fontSize: 9,
                fontColor: '#9eaecf',
                source: 'auto',
                padding: 10
              },
              gridLines: {
                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: 'transparent'
              }
            }]
          }
        }
      });
    });
  } // init chart

  var doughnutPercentage = {
   labels: ["Laki-Laki", "Perempuan"],
   dataUnit: "%",
   legend: 1,
   datasets: [{
    borderColor: "#fff",
    background: ["#816bff", "#e85347"],
    data: [59.01, 40.99]
   }]
  };

  function doughnutChart(selector, set_data) {
   var $selector = $(selector || ".doughnut-chart");
   $selector.each(function() {
    for (var $self = $(this), _self_id = $self.attr("id"), _get_data = void 0 === set_data ? eval(_self_id) : set_data, selectCanvas = document.getElementById(_self_id).getContext("2d"), chart_data = [], i = 0; i < _get_data.datasets.length; i++) chart_data.push({
     backgroundColor: _get_data.datasets[i].background,
     borderWidth: 2,
     borderColor: _get_data.datasets[i].borderColor,
     hoverBorderColor: _get_data.datasets[i].borderColor,
     data: _get_data.datasets[i].data
    });
    var chart = new Chart(selectCanvas, {
     type: "doughnut",
     data: {
      labels: _get_data.labels,
      datasets: chart_data
     },
     options: {
      legend: {
       display: !!_get_data.legend && _get_data.legend,
       labels: {
        boxWidth: 12,
        padding: 20,
        fontColor: "#6783b8"
       }
      },
      rotation: 1,
      cutoutPercentage: 40,
      maintainAspectRatio: !1,
      tooltips: {
       enabled: !0,
       callbacks: {
        title: function(a, t) {
         return t.labels[a[0].index]
        },
        label: function(a, t) {
         return t.datasets[a.datasetIndex].data[a.index] + " " + _get_data.dataUnit
        }
       },
       backgroundColor: "#eff6ff",
       titleFontSize: 13,
       titleFontColor: "#6783b8",
       titleMarginBottom: 6,
       bodyFontColor: "#9eaecf",
       bodyFontSize: 12,
       bodySpacing: 4,
       yPadding: 10,
       xPadding: 10,
       footerMarginTop: 0,
       displayColors: !1
      }
     }
    })
   })
  }
  doughnutChart();

  function barChart(selector, set_data) {
  var $selector = $(selector || ".bar-chart");
  $selector.each(function() {
   for (var $self = $(this), _self_id = $self.attr("id"), _get_data = void 0 === set_data ? eval(_self_id) : set_data, _d_legend = void 0 !== _get_data.legend && _get_data.legend, selectCanvas = document.getElementById(_self_id).getContext("2d"), chart_data = [], i = 0; i < _get_data.datasets.length; i++) chart_data.push({
    label: _get_data.datasets[i].label,
    data: _get_data.datasets[i].data,
    backgroundColor: _get_data.datasets[i].color,
    borderWidth: 2,
    borderColor: "transparent",
    hoverBorderColor: "transparent",
    borderSkipped: "bottom",
    barPercentage: .6,
    categoryPercentage: .7
   });
   var chart = new Chart(selectCanvas, {
    type: "bar",
    data: {
     labels: _get_data.labels,
     datasets: chart_data
    },
    options: {
     legend: {
      display: !!_get_data.legend && _get_data.legend,
      labels: {
       boxWidth: 30,
       padding: 20,
       fontColor: "#6783b8"
      }
     },
     maintainAspectRatio: !1,
     tooltips: {
      enabled: !0,
      callbacks: {
       title: function(a, t) {
        return t.datasets[a[0].datasetIndex].label
       },
       label: function(a, t) {
        return t.datasets[a.datasetIndex].data[a.index] + " " + _get_data.dataUnit
       }
      },
      backgroundColor: "#eff6ff",
      titleFontSize: 13,
      titleFontColor: "#6783b8",
      titleMarginBottom: 6,
      bodyFontColor: "#9eaecf",
      bodyFontSize: 12,
      bodySpacing: 4,
      yPadding: 10,
      xPadding: 10,
      footerMarginTop: 0,
      displayColors: !1
     },
     scales: {
      yAxes: [{
       display: !0,
       stacked: !!_get_data.stacked && _get_data.stacked,
       ticks: {
        beginAtZero: !0,
        fontSize: 12,
        fontColor: "#9eaecf"
       },
       gridLines: {
        color: "#e5ecf8",
        tickMarkLength: 0,
        zeroLineColor: "#e5ecf8"
       }
      }],
      xAxes: [{
       display: !0,
       stacked: !!_get_data.stacked && _get_data.stacked,
       ticks: {
        fontSize: 12,
        fontColor: "#9eaecf",
        source: "auto"
       },
       gridLines: {
        color: "transparent",
        tickMarkLength: 10,
        zeroLineColor: "transparent"
       }
      }]
     }
    }
   })
  })
 }
 barChart();

 function horbarChart(selector, set_data) {
 var $selector = $(selector || ".horizontal-bar-chart");
 $selector.each(function() {
  for (var $self = $(this), _self_id = $self.attr("id"), _get_data = void 0 === set_data ? eval(_self_id) : set_data, _d_legend = void 0 !== _get_data.legend && _get_data.legend, selectCanvas = document.getElementById(_self_id).getContext("2d"), chart_data = [], i = 0; i < _get_data.datasets.length; i++) chart_data.push({
   label: _get_data.datasets[i].label,
   data: _get_data.datasets[i].data,
   backgroundColor: _get_data.datasets[i].color,
   borderWidth: 2,
   borderColor: "transparent",
   hoverBorderColor: "transparent",
   borderSkipped: "bottom",
   barPercentage: .6,
   categoryPercentage: .7
  });
  var chart = new Chart(selectCanvas, {
   type: "horizontalBar",
   data: {
    labels: _get_data.labels,
    datasets: chart_data
   },
   options: {
    legend: {
     display: !!_get_data.legend && _get_data.legend,
     labels: {
      boxWidth: 30,
      padding: 20,
      fontColor: "#6783b8"
     }
    },
    maintainAspectRatio: !1,
    tooltips: {
     enabled: !0,
     callbacks: {
      title: function(a, t) {
       return t.datasets[a[0].datasetIndex].label
      },
      label: function(a, t) {
       return t.datasets[a.datasetIndex].data[a.index] + " " + _get_data.dataUnit
      }
     },
     backgroundColor: "#eff6ff",
     titleFontSize: 13,
     titleFontColor: "#6783b8",
     titleMarginBottom: 6,
     bodyFontColor: "#9eaecf",
     bodyFontSize: 12,
     bodySpacing: 4,
     yPadding: 10,
     xPadding: 10,
     footerMarginTop: 0,
     displayColors: !1
    },
    scales: {
     yAxes: [{
      display: !0,
      stacked: !!_get_data.stacked && _get_data.stacked,
      ticks: {
       beginAtZero: !0,
       fontSize: 12,
       fontColor: "#9eaecf"
      },
      gridLines: {
       color: "#e5ecf8",
       tickMarkLength: 0,
       zeroLineColor: "#e5ecf8"
      }
     }],
     xAxes: [{
      display: !0,
      stacked: !!_get_data.stacked && _get_data.stacked,
      ticks: {
       fontSize: 12,
       fontColor: "#9eaecf",
       source: "auto"
      },
      gridLines: {
       color: "transparent",
       tickMarkLength: 10,
       zeroLineColor: "transparent"
      }
     }]
    }
   }
  })
 })
}
horbarChart();

  NioApp.coms.docReady.push(function () {
    barCovidcase();
  });
}(NioApp, jQuery);
