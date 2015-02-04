angular.module('rallly', ['ui.router','ngResource','btford.modal','ngTagsInput','ngAnimate','ngFitText'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/notfound")
        $stateProvider
        .state('index',{
            url : '/',
            templateUrl : 'templates/home.html',
            controller : 'HomeCtrl'
        })
        .state('newevent',{
            url : '/new',
            templateUrl : 'templates/newEvent/layout.html',
            controller : 'NewEventCtrl',
        })
        .state('newevent.general', {
            templateUrl : 'templates/newEvent/general.html'
        })
        .state('newevent.datetime', {
            templateUrl : 'templates/newEvent/datetime.html'
        })
        .state('newevent.invite', {
            templateUrl : 'templates/newEvent/invite.html'
        })
        .state('newevent.success', {
            templateUrl : 'templates/newEvent/success.html'
        })
        .state('about', {
            url : '/about',
            templateUrl : 'templates/about.html',
            controller : 'AboutCtrl'
        })
        .state('notfound', {
            url : '/notfound',
            templateUrl : 'templates/notfound.html'
        })
        .state('event',{
            url : '/:id',
            templateUrl : 'templates/event.html',
            controller : 'EventCtrl'
        })
        .state('editevent', {
            url: '/:id/edit',
            templateUrl : 'templates/editevent.html',
            controller : 'EditEventCtrl'
        })
        .state('verifyevent', {
            url : '/verify/:id/code/:code',
            controller : 'VerificationCtrl'
        })
        .state('deleteevent', {
            url : '/delete/:id/code/:code',
            controller : 'DeletionCtrl'
        })
    })
    .factory('Event', function($resource){
        return $resource('/api/event/:id', { id : '@_id' }, {
            'update' : { method : 'PUT' },
            'verify' : { method : 'GET', url : '/api/event/:id/code/:code' },
            'destroy': { method : 'DELETE', url: '/api/event/:id/code/:code' }
        });
    })
    .factory('Participant', function($resource){
        return $resource('/api/event/:id/participant/:pid', { id: '@_id'}, {
            'update' : { method : 'PUT' }
        });
    })
    .factory('Comment', function($resource){
        return $resource('/api/event/:id/comment/:cid', { id : '@_id' }, {
            'update' : { method : 'PUT' }
        })
    })
    .factory('Title', function(){
        return {
            set : function(title){
                document.title = title;
            }
        }
    });
