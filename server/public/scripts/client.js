var myApp = angular.module('myApp', ['xeditable','ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.utils', 'ui.bootstrap.modal']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/patientIntake', {
      templateUrl: '/views/templates/patientIntake.html',
      controller: 'PeopleController as patient'
    })
    .when('/user', {
      templateUrl: '/views/templates/patientIntake.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

});
myApp.run(function(editableOptions) {
  editableOptions.theme = 'font-awesome'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
