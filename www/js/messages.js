var myApp = angular.module("myApp1", ["ngRoute"]);

myApp.controller('MsgController',['$http','$scope','$location',function($http, $scope,$location){
console.log("inside message controllers");
$scope.messages={};

var socket = io.connect('/');
console.log("socketID"+JSON.stringify(socket.id));
socket.on('messages', function(obj) {
	console.log("Messages from server"+JSON.stringify(obj));
	$scope.messages = obj;
	$scope.$apply();
});

socket.on('newMsgServer', function(obj) {
	console.log("New message from server"+JSON.stringify(obj));
	$scope.messages.push(obj);
	$scope.$apply();
});

$scope.submitMessage = function(message){
	console.log("inside submit message method"+message);
	socket.emit('newMsg', message);
	$scope.message = {};
}
}]);