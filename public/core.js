var app = angular.module('todoApp',[]);

app.controller('todoListController',['$scope', '$http', function($scope, $http){
	$scope.formData = {};

	$http.get('/api/todos').success(function(data){
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
		 if($scope.formData.name != undefined){
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

		$http.put('/api/todos/'+ id, $scope.formData).success(function(data){
			$scope.formData = {};
			$scope.todos = data;
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