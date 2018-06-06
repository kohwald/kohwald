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
		ngcurd.post('/login',login,{
			success: function(a,b,c){
				console.log(a,b,c);
				if (a.user){
					window.location = "/";
				}
				else
				{
					$scope.mensagem = a.message;
				}
			}
		})
	}
	$scope.init()
});
console.log("Carregou");