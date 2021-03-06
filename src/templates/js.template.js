var app = angular.module('<%= module %>App', ['datatables'])
app.controller('<%= module %>Ctrl', function($scope, $compile, $http, DTOptionsBuilder, DTColumnBuilder) {

    /**
     * init the controller
     */
    $scope.init = function() {
        $scope.db = {}
        $scope.<%= module %> = {}
        $scope.<%= module %>s = {}
        $scope.dtInstance = {};
        $scope.init_dataTable()
        $scope.new()
    }

    /**
     * edit the supplier
     */
    $scope.edit = function(id) {
        $('#saveButton').show()
        $scope.<%= module %> = $scope.db[id]
    }

    /**
     * add new supplier
     */
    $scope.new = function() {
        $('#saveButton').show()
        $scope.<%= module %> = {
            <% for(var i in attrs){
                if(attrs[i].primary)continue
            %><%=attrs[i].name%>: <%=JSON.stringify(attrs[i].value)%>,
            <%}%>
        }
    }

    $scope.view = function(id){
        $('#saveButton').hide();
        $scope.<%= module %> = $scope.db[id]
    }

    /**
     * confirm to delete supplier
     */
    $scope.remove = function(id) {
        var <%= module %> = $scope.db[id]
        if (<%= module %>) {
            ngcurd.confirm({
                title: 'Confirm remove ',
                message: 'Warning: all this <%= module %>\'s data will be removed!',
                ok: function() {
                    ngcurd.post('/<%= module %>/remove', {<%=primary.name%>: id}, {
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

        ngcurd.post('/<%= module %>/update', $scope.<%= module %>, {
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
                url: '/<%= module %>/query',
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
            <% for(var i in attrs){%>
                DTColumnBuilder.newColumn('<%=attrs[i].name%>').withTitle('<%=attrs[i].title%>'),<%}%>
                DTColumnBuilder.newColumn('<%=primary.name%>').withTitle('').notSortable().renderWith(function(col, type, row) {
                    $scope.db[row.<%=primary.name%>] = row
                    return '<button ng-click="view(' + row.<%=primary.name%> + ')" class="btn btn-default btn-circle" data-toggle="modal"  data-target="#edit_<%= module %>" ><i class="fa fa-eye"></i></button> '
                         + '<button ng-click="edit(' + row.<%=primary.name%> + ')" class="btn btn-success btn-circle" data-toggle="modal"  data-target="#edit_<%= module %>"><i class="fa fa-edit"></i></button> ' 
                         + '<button ng-click="remove(' + row.<%=primary.name%> + ')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#edit_<%= module %>" ><i class="fa fa-remove"></i></button>'
                        
                })
            ]
    }


    //init current app.controller
    $scope.init()

});
