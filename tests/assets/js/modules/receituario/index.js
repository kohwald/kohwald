var app = angular.module('receituarioApp', ['datatables', 'bootstrap3-typeahead'])
app.controller('receituarioCtrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.receituario = {}
        $scope.receituarios = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.funcionarios = [];
        $http.get('/funcionario/query').then(function(response) {
           $scope.funcionarios = response.data.data
        });
         $scope.clientes = [];
        $http.get('/cliente/query').then(function(response) {
           $scope.clientes = response.data.data
        });
         $scope.remedios = [];
        $http.get('/remedio/query').then(function(response) {
           $scope.remedios = response.data.data
        });
        $scope.new()
    }

    $scope.displayTextFuncionario = function(item) {
        return item.nome;
    }
    $scope.afterSelectFuncionario = function(item) {
        $scope.receituario.funcionarioId = item.id
    }
    $scope.displayTextCliente = function(item) {
        return item.nome;
    }
    $scope.afterSelectCliente = function(item) {
        $scope.receituario.clienteId = item.id
    }
    $scope.displayTextRemedio = function(item) {
        return item.lote;
    }
    $scope.afterSelectRemedio = function(item) {
        $scope.receituario.remedioId = item.id
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.receituario = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.receituario = {
            dataVenda: "",
            funcionarioId: "",
            clienteId: "",
            remedioId: "",
            
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.receituario = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var receituario = $scope.db[id]
        if (receituario) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this receituario\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/receituario/remove', {id: id}, {
                        success: function(){
                            $scope.dtInstance.reloadData()
                        }
                    })
                }
            })
        }
    }

    /**
     * add or update supplier
     */
    $scope.save = function() {

        ngcurd.post('/receituario/update', $scope.receituario, {
            success: function(){
                $scope.dtInstance.reloadData()
            }
        })
    }

    /**
     * init the DataTable
     */
    $scope.init_dataTable = function() {

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
                url: '/receituario/query',
                type: 'POST'
            })
            // or here
            .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withOption('responsive', true)
            .withPaginationType('full_numbers')
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            });
        $scope.dtColumns = [
            
                DTColumnBuilder.newColumn('id').withTitle('Id'),
                DTColumnBuilder.newColumn('dataVenda').withTitle('DataVenda'),
                DTColumnBuilder.newColumn('funcionarioId').withTitle('FuncionarioId'),
                DTColumnBuilder.newColumn('clienteId').withTitle('ClienteId'),
                DTColumnBuilder.newColumn('remedioId').withTitle('RemedioId'),
                DTColumnBuilder.newColumn('id').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.id] = row
                    return '<button ng-click="view(' + row.id + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_receituario" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.id + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_receituario"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.id + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_receituario" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});
