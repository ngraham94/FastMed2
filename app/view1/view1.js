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
        var home
        var service;
        var infowindow;
        var adShown = false;

        $scope.query_results = sharedContext.getResults();
        $scope.addAd = function() {
            var card = document.getElementById("item3");
            if (card != null && !adShown) {
                var img = document.createElement('img');
                img.src = "http://i.imgur.com/g6SnH6X.jpg";
                img.style = "width: 100%";
                document.getElementById("content_list").insertBefore(img, card);
                adShown = true;
            }
        }

        getLocation();
        function randomDistance() {
            return Math.floor(Math.random() * 20);
        }

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

        $scope.searchCriteria =
        {
            keywords: null
        };

        $scope.searchMaps = function (searchCriteria) {
            var request = {
                query: searchCriteria.keywords,
                location: home,
                radius: miles_to_km($scope.radius),
                type: 'hospital'
            }
            if($scope.type == "pc" || $scope.type == "sp") {
                request.type = 'doctor';
            }
            service.textSearch(request, callback);
        };

        function callback(results, status) {
            var marker;
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                $scope.query_results = results;
                sharedContext.setResults(results);
                var i;
                for(i=0; i< results.length; i++) {
                    marker = new google.maps.Marker({
                        map: map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        position: results[i].geometry.location
                    });
                    marker.addListener('click', toggleBounce);
                    results[i].distance = randomDistance();
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
            home = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
