'use strict';

angular.module('myApp.hospital_profile', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/hospital_profile', {
            templateUrl: 'hospital_profile/hospital_profile.html',
            controller: 'ProfileCtrl'
        });
    }])

    .controller('ProfileCtrl', ['$scope', 'sharedContext', '$location', '$mdDialog', function ($scope, sharedContext, $location, $mdDialog) {
        var map;
        var service;
        var infowindow;

        $scope.hospital = sharedContext.getHospital();
        var service = sharedContext.getMapService();
        console.log($scope.hospital.photos);
        var i;
        for (i of $scope.hospital.photos) {
            console.log(i.getUrl({'maxWidth': 200, 'maxHeight': 200}));
        }

        function miles_to_km(miles) {
            return (miles * 0.62137119);
        }

        console.log($scope.hospital);

        $scope.sendForm = function(){
            $location.path('/user_form');
        }

        $scope.showDialog = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'hospital_profile/user-form.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
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
            };

            $scope.submitForm = function() {

                var ref = firebase.database().ref("user/" + $scope.user.first_name + "-" + $scope.hospital.id);
                ref.push($scope.user);
                alert("Check In Complete!")
            };
        }


    }]);