'use strict';


angular.module('myApp.view1', ['ngRoute', 'ngMaterial'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$location', 'sharedContext', function ($scope, $location, sharedContext) {

        var map;
        var service;
        var infowindow;

        getLocation();

        function miles_to_km(miles) {
            return (miles * 0.62137119);
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initialize);
                console.log("ready");
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

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
        };

        function callback(results, status) {
            var marker;
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                $scope.query_results = results;
                var i;
                for(i=0; i< results.length; i++) {
                    marker = new google.maps.Marker({
                        map: map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: results[i].geometry.location
                    });
                    marker.addListener('click', toggleBounce);
                }
                $scope.$apply();
            }

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
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
            sharedContext.setMapService(service);
            console.log("done");
        }

        $scope.viewProfile = function(hospital, path) {

            let detailsRequest = {
                placeId: hospital.place_id
            };
            sharedContext.setPath(path);
            service.getDetails(detailsRequest, setHospital);

        }

        function setHospital(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                sharedContext.setHospital(place);
                $scope.$apply();
                $location.path(sharedContext.getPath())
            }
        }


}])
;
