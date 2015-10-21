(function (angular){

    "use strict";

    angular.module('app.controllers')
	.controller('Controller', controller);

    controller.$inject = ['$q', '$http'];

    function controller(q, http){

	var vm = this;
	vm.data= [];

	/**
	   This is sample code for using angular defer which returns a promise
	 */
	function test(){
	    var def = q.defer();
	    //sample endpoint
	    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=New+York,NY';

	    //sample rest call for simulating async calls
	    var call = function(){return http.get(url)};
	    call().then(function(response){
		//set the resulting data by using resolve
		def.resolve(response.data.results);
		//set error messag, reject will automatically fires when no response is retrieved
		//or if there is a problem
		def.reject('Not working!');
		
	    })
	    //return the promise object
	    return def.promise;
	}

	//call test promise and then extract the data
	//the resulting data will be the parameter being pass when calling def.resolve()
	test()
	    .then(function(data){
		vm.data = data;
		console.log(data);
		//return data;
	    });
    }

})(window.angular);
