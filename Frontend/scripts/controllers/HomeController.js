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
            }
        };

	}]
);