app.controller('loginController', function (
    $scope,
    $location) {

    $scope.loginBtn = function(){
        $location.path('http://www.facebook.com/mbrsagor');
    };

});