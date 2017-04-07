'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.hospital_profile',
    'myApp.user_form',
    'myApp.version',
    'ngMaterial',
])
    .config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
    $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('grey');
}])

.factory("sharedContext", function() {
    var hospital = null;
    var service;
    var path;

    var setHospital = function(value) {
        hospital = value;
    }
    var getHospital = function() {
        return hospital;
    }

    var setMapService = function(mapService) {
        service = mapService;
    }

    var getMapService = function() {
        return service;
    }

    var getPath = function() {
        return path;
    }

    var setPath = function(Path) {
        path = Path;
    }

    return {
        setHospital: setHospital,
        getHospital: getHospital,
        setMapService: setMapService,
        getMapService: getMapService,
        getPath: getPath,
        setPath: setPath
    }
});

