angular.module('flickrApp').filter('dateFormat', function () {
     return function(dateStr) {
     	var d = new Date(dateStr);
     	var curr_day = d.getDate();
   		var curr_month = d.getMonth() + 1;
    	var curr_year = d.getFullYear();   
        return  curr_month + "/" + curr_day + "/" + curr_year
    }
})
