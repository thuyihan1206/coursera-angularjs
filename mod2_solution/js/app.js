(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // ToBuyController
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.list = ShoppingListCheckOffService.getToBuyList();

        toBuyList.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
    }


    // AlreadyBoughtController
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.list = ShoppingListCheckOffService.getBoughtList();
    }

    // ShoppingListCheckOffService
    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyList = [
            {name: "cookies", quantity: 10},
            {name: "water", quantity: 3},
            {name: "bagels", quantity: 20},
            {name: "donuts", quantity: 15},
            {name: "coffee", quantity: 5}
        ];

        var boughtList = [];

        service.buyItem = function (itemIndex) {
            var item = {
                name: toBuyList[itemIndex].name,
                quantity: toBuyList[itemIndex].quantity
            };
            boughtList.push(item);
            toBuyList.splice(itemIndex, 1);
        };

        service.getToBuyList = function () {
            return toBuyList;
        };

        service.getBoughtList = function () {
            return boughtList;
        };
    }

})();
