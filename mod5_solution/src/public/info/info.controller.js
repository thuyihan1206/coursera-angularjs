(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['user', 'ApiPath', 'MenuService'];
    function InfoController(user, ApiPath, MenuService) {
        var $ctrl = this;

        // for developing only
        // user.firstName = 'John';
        // user.lastName = 'Smith';
        // user.email = 'abc@example.com';
        // user.phone = '123-456-7890';
        // user.favDish = 'A1';

        $ctrl.user = user;
        $ctrl.basePath = ApiPath;
        if (user.favDish) {
            MenuService.getMenuItem(user.favDish).then(function (result) {
                $ctrl.favItem = result;
            });
        }
    }

})();
