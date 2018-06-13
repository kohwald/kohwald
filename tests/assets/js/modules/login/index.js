var app = angular.module('loginApp',[])
app.controller('loginCtrl',
function($scope, $compile,$http){
	
	$scope.init = function() {
		console.log("init");
		$scope.mensagem = "";
		$scope.user = {
			username: "",
			password:""
		};
	}

	$scope.login = function(){
		console.log("entrou");
		console.log($scope.user);
		$http({
			url: '/login',
			method: 'POST',
			data: $scope.user
		}).then(function(a,b,c){
				console.log(a,b,c);
				if (a.data.user){
					window.location = "/";
				}
				else
				{
					$scope.mensagem = a.data.message;
				}
			}
		)
	}
	$scope.init()
});
console.log("Carregou");