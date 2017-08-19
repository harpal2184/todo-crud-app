var app = angular.module('todoApp',[]);

app.controller('todoListController',['$scope', '$http', function($scope, $http){
	$scope.formData = {};
	$scope.ids = [];
	$http.get('/api/todos').success(function(data){
		$scope.todos = data;
		console.log(data);
		
	});

	$scope.createTodo = function(){
		 if($scope.formData.name != undefined){
			 $scope.formData.created_date = Date();
			$http.post('/api/todos', $scope.formData).success(function(data){
				$scope.formData = {};
				$scope.todos = data;
			});
		}
	};

	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/'+ id).success(function(data){
			$scope.todos = data;
		});
	}
	$scope.updateTodo = function(id){
		$scope.formData.created_date = Date();
		$http.put('/api/todos/'+ id, $scope.formData).success(function(data){
			$scope.formData = {};
			$scope.todos = data;
		});
	}
	$scope.deleteTodos = function(){
		let idArray = Object.keys($scope.ids);
		idArray.forEach(function(id){
			$http.delete('/api/todos/' + id).success(function(data){
				 $scope.todos = data;
				console.log(data);
			});
		});
	}
}]);

	

// app.factory('Todos', ['$http', function($http){
// 	return {
// 		get: function(){
// 			return $http.get('/todos');
// 		},
// 		create: function(todoData){
// 			return $http.post('/todos', todoData);
// 		},
// 		delete: function(id){
// 			return $http.delete('/todos/' + id);
// 		}
// 	}
// }]);