
var app = angular.module('drf-angular', [
	'ui.router'
]);

app.constant('BASE_URL', 'http://localhost:8000/api/todos/');

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/static/templates/home.html',
			controller: 'MainCtrl'
		})
		.state('add-todo', {
			url: "/add",
			templateUrl: 'static/templates/add_todo.html',
			controller: 'MainCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', function($scope, Todos){
	$scope.newTodo = {};
	$scope.addTodo = function() {
		Todos.addOne($scope.newTodo)
			.then(function(res){
				console.log('response from addTodo = ', res);
			});
	};

	Todos.all().then(function(res){
		$scope.todos = res.data;
	});
});

app.service('Todos', function($http, BASE_URL){
	var Todos = {};

	Todos.all = function(){
		return $http.get(BASE_URL);
	};

	Todos.addOne = function(newTodo){
		return $http.post(BASE_URL, newTodo);
	};

	return Todos;
});




