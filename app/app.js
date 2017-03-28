'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.hospital_profile',
    'myApp.version',
    'ngMaterial'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/hospital_profile'});
}]);

myApp.factory("sharedContext", function() {
    var context = [];
    var addData = function(key, value) {
        var data = {
            key: key,
            value: value
        };
        context.push(data);
    }
    var getData = function(key) {
        var data = _.find(context, {
            key: key
        });
        return data;
    }

    return {
        addData: addData,
        getData: getData
    }
});

