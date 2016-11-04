(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    // NarrowItDownController
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var list = this;

        list.narrowDown = function () {
            MenuSearchService.getMatchedMenuItems(list.queryStr).then(function (result) {
                list.found = result;
            });
        };

        list.removeItem = function (itemIndex) {
            list.found.splice(itemIndex, 1);
        };
    }

    //FoundItemsDirective
    function FoundItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true
        };
    }

    // MenuSearchService
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var hasSearchTerm = function (item) {
                return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            };

            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var foundItems = [];
                if (searchTerm) {
                    foundItems = result.data.menu_items.filter(hasSearchTerm);
                }
                return foundItems;
            }).catch(function (error) {
                console.log(error);
                return [];
            });
        };
    }

})();
