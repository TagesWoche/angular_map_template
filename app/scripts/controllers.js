'use strict';

angular.module('projekteApp')

    .controller('mapCtrl', [ '$scope', 'dataService', 'screenSize', '$filter', 'dateFilter',
        function ($scope, dataService, screenSize, $filter, dateFilter) {

            /* set the map positions on mobile and desktop */

            if (screenSize.is('xs, sm'))
            {
                // on mobile
                $scope.latitude =  47.5655;
                $scope.longitude = 7.5965;
                $scope.zoom = 14;
            }
            else
            {
                // on desktop

                $scope.latitude =  47.5592;
                $scope.longitude = 7.5999;
                $scope.zoom = 14;
            }

            /* get the data for the markers array from the dataService */

            $scope.markers = [];

            $scope.httpStatus = 0;
            $scope.LoadRequest = dataService.loadSpreadsheetData();
            dataService.loadSpreadsheetData()

                .then(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        $scope.markers.push({
                            lat: parseFloat(results[i].gsx$latitude.$t),  //use parseFloat() to convert string to integer
                            lng: parseFloat(results[i].gsx$longitude.$t),
                            tag: results[i].gsx$tag.$t,
                            getMessageScope: function () { return $scope; },
                            message: '<h2>' + results[i].gsx$titelkarte.$t + '</h2><p>' + results[i].gsx$beschreibungkarte.$t + '</p><a href="#' + results[i].gsx$tag.$t + results[i].gsx$stunde.$t +'" target="_self" ng-click="toggleMap()">Weiterlesen »</a>',
                            icon: eval('localIcons' + '.' + results[i].gsx$kategorie.$t), //use eval() to convert string to variable
                            //layer: results[i].gsx$kategorie.$t
                        });

                    }
                    /*            // define filter for week days
                     $scope.setDateFriday = dateFilter.setDateFriday;
                     $scope.setDateSaturday =  dateFilter.setDateSaturday;
                     $scope.setDateSunday = dateFilter.setDateSunday;
                     $scope.getDatetime = dateFilter.getDatetime;*/

                    // $scope.markers = $filter('filter')($scope.markers, {tag: '!Sonntag'});

                    /* if ($scope.getDatetime.valueOf() === $scope.setDateFriday.valueOf())
                     {
                     $scope.markers = $filter('filter')($scope.markers, {tag: 'Freitag'});
                     }
                     else if ($scope.getDatetime.valueOf() === $scope.setDateSaturday.valueOf())
                     {
                     $scope.markers = $filter('filter')($scope.markers, {tag: 'Samstag'});

                     }
                     else if ($scope.getDatetime.valueOf() === $scope.setDateSunday.valueOf())
                     {
                     $scope.markers = $filter('filter')($scope.markers, {tag: 'Sonntag'});
                     }*/
                });



            /* define the icon style for the map markers */

            var localIcons = {
                Essen: {
                    iconUrl: 'images/markers/essen.svg',
                    shadowUrl: 'images/markers/dropshadow.png',
                    iconSize:     [40, 61], // size of the icon
                    shadowSize:   [36, 21], // size of the shadow
                    iconAnchor:   [18, 57], // point of the icon which will correspond to marker's location
                    shadowAnchor: [-2, 17],  // the same for the shadow
                    popupAnchor:  [2, -62] // point from which the popup should open relative to the iconAnchor
                },
                Erleben: {
                    iconUrl: 'images/markers/erleben.svg',
                    shadowUrl: 'images/markers/dropshadow.png',
                    iconSize:     [40, 61], // size of the icon
                    shadowSize:   [36, 21], // size of the shadow
                    iconAnchor:   [18, 57], // point of the icon which will correspond to marker's location
                    shadowAnchor: [-2, 17],  // the same for the shadow
                    popupAnchor:  [2, -62] // point from which the popup should open relative to the iconAnchor
                },
                Tanzen: {
                    iconUrl: 'images/markers/tanzen.svg',
                    shadowUrl: 'images/markers/dropshadow.png',
                    iconSize:     [40, 61], // size of the icon
                    shadowSize:   [36, 21], // size of the shadow
                    iconAnchor:   [18, 57], // point of the icon which will correspond to marker's location
                    shadowAnchor: [-2, 17],  // the same for the shadow
                    popupAnchor:  [2, -62] // point from which the popup should open relative to the iconAnchor
                },
                Trinken: {
                    iconUrl: 'images/markers/trinken.svg',
                    shadowUrl: 'images/markers/dropshadow.png',
                    iconSize:     [40, 61], // size of the icon
                    shadowSize:   [36, 21], // size of the shadow
                    iconAnchor:   [18, 57], // point of the icon which will correspond to marker's location
                    shadowAnchor: [-2, 17],  // the same for the shadow
                    popupAnchor:  [2, -62] // point from which the popup should open relative to the iconAnchor
                },
                Einkaufen: {
                    iconUrl: 'images/markers/einkaufen.svg',
                    shadowUrl: 'images/markers/dropshadow.png',
                    iconSize:     [40, 61], // size of the icon
                    shadowSize:   [36, 21], // size of the shadow
                    iconAnchor:   [18, 57], // point of the icon which will correspond to marker's location
                    shadowAnchor: [-2, 17],  // the same for the shadow
                    popupAnchor:  [2, -62] // point from which the popup should open relative to the iconAnchor
                }
            };

            angular.extend($scope, {


                layercontrol: {
                    icons: {
                        uncheck: 'fa fa-toggle-off',
                        check: 'fa fa-toggle-on'
                    }
                },


                layers: {
                    baselayers: {
                        MapBoxTile: {
                            name: 'Basel in Schwarz Weiss',
                            type: 'xyz',
                            url: 'https://a.tiles.mapbox.com/v4/felixmichel.me37n7fa/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmVsaXhtaWNoZWwiLCJhIjoiZWZrazRjOCJ9.62fkOEqGMxFxJZPJuo2iIQ'
                        },
                        TonerMap: {
                            name: 'Basel in Schwarz Weiss',
                            type: 'xyz',
                            url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
                        },
                        openStreetMap: {
                            name: 'ganz normale Karte',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        }
                    },

                    // define the layers
                    overlays: {
                        Essen: {
                            type: 'group',
                            name: 'Essen',
                            visible: true
                        },
                        Erleben: {
                            type: 'group',
                            name: 'Erleben',
                            visible: true
                        },
                        Trinken: {
                            type: 'group',
                            name: 'Trinken',
                            visible: true
                        },
                        Tanzen: {
                            type: 'group',
                            name: 'Tanzen',
                            visible: true
                        },
                        Einkaufen: {
                            type: 'group',
                            name: 'Einkaufen',
                            visible: true
                        }
                    }
                },

                // center position
                basel: {
                    lat: $scope.latitude,
                    lng: $scope.longitude,
                    zoom: $scope.zoom
                },

                defaults: {
                    scrollWheelZoom: false
                },

                // function to toggle different layers
                toggleLayer: function(type) {
                    if (type === "all") {
                        for (var key in $scope.layers.overlays) {

                            if ($scope.checked === true) {
                                $scope.layers.overlays[key].visible = true;
                            }
                            else {
                                $scope.layers.overlays[key].visible = false;
                            }

                        }
                    }
                    else
                    {
                        $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
                    }
                },
                events: {
                }

            });

        }]);