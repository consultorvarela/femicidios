// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,  $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    cache:false,
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'tabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('splash', {
    url: '/splash',
    cache:false,    
    templateUrl: 'templates/splash.html',
    controller: 'splashCtrl'
  })

  
  .state('splash2', {
    url: '/splash2',
    cache:false,    
    templateUrl: 'templates/splash2.html',

  })

  .state('login', {
      url: '/login',
      cache:false,      
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
  })

  .state('verification', {
      url: '/verification',
      templateUrl: 'templates/verification.html',
      controller: 'verificationCtrl'
  })

  .state('bienvenida', {
    url: '/bienvenida',
    cache:false,    
    templateUrl: 'templates/bienvenida.html',
    controller: 'bienvenidaCtrl'
})

  .state('enterclient', {
    url: '/enterclient',
    cache:false,    
    templateUrl: 'templates/enterclient.html',
    controller: 'enterclientCtrl'
  })

  .state('option', {
    url: '/option',
    cache:false,    
    templateUrl: 'templates/option.html',
    controller: 'optionCtrl'
  })

  .state('tab.home', {
    cache: false,
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    cache:false,    
    views: {
      'tab-search': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('tab.user2', {
    cache: false,
    cache:false,    
    url: '/user2',
    views: {
      'tab-user2': {
        templateUrl: 'templates/user2.html',
        controller: 'user2Ctrl'
      }
    }
  })

  .state('tab.bell', {
    url: '/bell',
    cache:false,    
    views: {
      'tab-bell': {
        templateUrl: 'templates/bell.html',
        controller: 'bellCtrl'
      }
    }
  })

  .state('planes', {
    url: '/planes',
    cache:false,    
    templateUrl: 'templates/planes.html',
    controller: 'planesCtrl'
  })

  .state('enterproveedor', {
    url: '/enterproveedor',
    cache:false,    
    templateUrl: 'templates/enterproveedor.html',
    controller: 'enterproveedorCtrl'
  })

  .state('enterproveedor2', {
    url: '/enterproveedor2',
    cache:false,    
    templateUrl: 'templates/enterproveedor2.html',
    controller: 'enterproveedor2Ctrl'
  })

  .state('enterproveedor3', {
    url: '/enterproveedor3',
    cache:false,    
    templateUrl: 'templates/enterproveedor3.html',
    controller: 'enterproveedor3Ctrl'
  })

  .state('perfil', {
    url: '/perfil',
    cache:false,
    templateUrl: 'templates/perfil.html',
    controller: 'perfilCtrl'
  })

  .state('gracias', {
    url: '/gracias',
    cache:false,    
    templateUrl: 'templates/gracias.html',
    controller: 'graciasCtrl'
})

.state('perfilproveedor', {
    cache: false,
    url: '/perfilproveedor',
    templateUrl: 'templates/perfilproveedor.html',
    controller: 'perfilproveedorCtrl'
})

.state('calificar', {
    url: '/calificar',
    cache:false,    
    templateUrl: 'templates/calificar.html',
    controller: 'calificarCtrl'
})

.state('solicitarcali', {
    url: '/solicitarcali',
    cache:false,    
    templateUrl: 'templates/solicitarcali.html',
    controller: 'solicitarcaliCtrl'
})

.state('solicitgracias', {
    url: '/solicitgracias',
    cache:false,    
    templateUrl: 'templates/solicitgracias.html',
    controller: 'solicitgraciasCtrl'
})

.state('graciasxenviar', {
    url: '/graciasxenviar',
    cache:false,    
    templateUrl: 'templates/graciasxenviar.html',
    controller: 'graciasxenviarCtrl'
})

.state('autenticar', {
    url: '/autenticar',
    cache:false,    
    templateUrl: 'templates/autenticar.html',
    controller: 'autenticarCtrl'
  })


   if(localStorage.getItem("session") == null){
    $urlRouterProvider.otherwise('/splash');
   }else{
     $urlRouterProvider.otherwise('/tab/home');
  }

  //$urlRouterProvider.otherwise('enterproveedor3');
  
});
