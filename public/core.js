var app = angular.module('todoApp',[]);

app.controller('todoListController',['$scope', '$http', 'Todos', function($scope, $http, Todos){
	$scope.formData = {};

	Todos.get().success(function(data){
		$scope.todos = data;
		console.log(data);
	});
	// $http.get('/todos').success(function(data){
	// 	$scope.todos = data;
	// })
	// .error(function(data){
	// 	console.log('Error : ' + data);
	// });

	$scope.createTodo = function(){
		console.log($scope.formData.name);
		if($scope.formData.name != undefined){
			Todos.create($scope.formData).success(function(data){
				$scope.formData = {};
				$scope.todos = data;
			})
		}
	};

	$scope.deleteTodo = function(id){
		Todos.delete(id).success(function(data){
			$scope.todos = data;
		});

	}
}]);
	

app.factory('Todos', ['$http', function($http){
	return {
		get: function(){
			return $http.get('/todos');
		},
		create: function(todoData){
			return $http.post('/todos', todoData);
		},
		delete: function(id){
			return $http.delete('/todos/' + id);
		}
	}
}]);