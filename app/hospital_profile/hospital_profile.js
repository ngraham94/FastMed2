'use strict';

angular.module('myApp.hospital_profile', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/hospital_profile', {
            templateUrl: 'hospital_profile/hospital_profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl', ['$scope', 'sharedContext', '$location', function ($scope, sharedContext, $location) {
        var map;
        var service;
        var infowindow;

        $scope.hospital = sharedContext.getHospital();

        function miles_to_km(miles) {
            return (miles * 0.62137119);
        }

        console.log($scope.hospital);

        $scope.sendForm = function(){
            $location.path('/user_form');
        }

}]);