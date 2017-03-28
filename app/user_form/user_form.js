angular.module('myApp.user_form', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user_form', {
            templateUrl: 'user_form/user_form.html',
            controller: 'FormCtrl'
        });
    }])

    .controller('FormCtrl', ['$scope', 'sharedContext', '$location', function ($scope, sharedContext, $location) {
        var map;
        var service;
        var infowindow;

        $scope.hospital = sharedContext.getHospital();
        $scope.user =
        {
            first_name:null,
            last_name:null,
            address:null,
            city: null,
            state: null,
            zip: null,
            phone:null,
            symptoms: null
        }

        function miles_to_km(miles) {
            return (miles * 0.62137119);
        }

        console.log($scope.hospital);

        $scope.submitForm = function() {

            var ref = firebase.database().ref("user/" + $scope.user.first_name + "-" + $scope.hospital.id);
            ref.push($scope.user);
            alert("Check In Complete!")
        }

    }]);