'use strict';

app.controller('HomeController', 
	['$scope', 'articleService', function ($scope, articleService) {
        articleService.getArticlesPerCategoryOverview().then(function(response) {
        	debugger;
            var series = [];

        	for(var category in response.articles){
        	    var set = {
        	        name: category,
                    data: Array.apply(null, Array(response.months.length)).map(function(){ return null;})
                };

        	    for(var month in response.articles[category]){
                    var monthIdx = response.months.indexOf(month);

                    set.data[monthIdx] = response.articles[category][month];
                }

                series.push(set);
            }

            $scope.articlesChart.xAxis.categories = response.months;
            $scope.articlesChart.series = series;
            $scope.articlesChart.version++;
		});

        $scope.articlesChart = {
        	version: 0,
            title: {
                text: 'Articles per month (by category)',
                x: -20 //center
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Articles (count)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                //valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        };

	}]
);