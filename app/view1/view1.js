'use strict';


angular.module('myApp.view1', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', function ($scope) {
        var map;
        var service;
        var infowindow;

        function miles_to_km(miles) {
            return (miles * 0.62137119);
        }


        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initialize);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        getLocation();

        $scope.searchCriteria =
        {
            location: null,
            searchDistance: null,
            keywords: null
        };

        $scope.searchMaps = function (searchCriteria) {
            var request = {
                query: searchCriteria.keywords,
                location: searchCriteria.location,
                radius: '10000'
            }

            service.textSearch(request, callback);
            alert("Searched!");
        };

        function callback(results, status) {
            var marker;
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                $scope.query_results = results;
                marker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: {lat: 59.327, lng: 18.067}
                });
                marker.addListener('click', toggleBounce);
            }

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
        }

        function initialize(position) {
            var home = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.searchCriteria.location = home;


            map = new google.maps.Map(document.getElementById('mapDiv'), {
                center: home,
                zoom: 15
            });
            service = new google.maps.places.PlacesService(map);
            console.log("done");
        }

        $scope.viewProfile= function(hospital) {
            sharedContext.addData("Hospital", hospital);
        }


}])
;