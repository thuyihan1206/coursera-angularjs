(function () {
    "use strict";

    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['RegistrationService', 'MenuService'];
    function RegistrationController(RegistrationService, MenuService) {
        var $ctrl = this;

        $ctrl.submit = function () {
            if ($ctrl.user.favDish) {
                MenuService.getMenuItem($ctrl.user.favDish).then(function () {
                    RegistrationService.setUser($ctrl.user);
                    $ctrl.status = 'saved';
                }).catch(function () {
                    $ctrl.status = 'not found';
                });
            }
            else {
                RegistrationService.setUser($ctrl.user);
                $ctrl.status = 'saved';
            }
        };
    }

})();
