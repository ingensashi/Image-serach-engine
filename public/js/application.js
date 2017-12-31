var app = angular.module('image-search-engine',['ui.router'])
     app.config(function($stateProvider,$urlRouterProvider){
           $stateProvider
            .state('image-search',{
            	url : '/search',
            	templateUrl:'templates/images-search.html',
            	controller:'imageCtrl'
            })
            .state('image-list',{
            	url : '/list',
            	templateUrl:'templates/image_list.html',
            	controller:'imageCtrl'
            })
             .state({
             	name:'image-view',
            	url : '/result/{searchId}',
            	params:{
            		obj : null  
            	},
            	templateUrl:'templates/result-image.html',
            	controller:'imageCtrl'
            })
             $urlRouterProvider.otherwise('/search')
     })