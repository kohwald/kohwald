var app = angular.module('mostradadosApp', [])
app.controller('mostardadosCtrl', function($scope, $compile, $http) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.dados = {}
       
    }

    //init current app.controller
    $scope.init()

});
