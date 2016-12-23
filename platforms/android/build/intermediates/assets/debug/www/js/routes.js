angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('login', {
    url: '/login',
    views: {
      '': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
  
    }
  })



  .state('menu.screen1', {
    url: '/screen1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen1.html',
        controller: 'screen1Ctrl'
      }

    }
  })

  .state('menu.screen2', {
    url: '/screen02/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen2.html',
        controller: 'screen2Ctrl'
      }
    }
  })
  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.screen3', {
    url: '/screen3/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen3.html',
        controller: 'screen3Ctrl'
      }
    }
  })

  .state('menu.screen4', {
    url: '/screen4/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen4.html',
        controller: 'screen4Ctrl'
      }
    }
  })

  .state('menu.screen5', {
    url: '/screen5/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen5.html',
        controller: 'screen5Ctrl'
      }
    }
  })

  .state('menu.screen6', {
    url: '/screen6/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen6.html',
        controller: 'screen6Ctrl'
      }
    }
  })

  .state('menu.screen7', {
    url: '/screen7/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen7.html',
        controller: 'screen7Ctrl'
      }
    }
  })

  .state('menu.screen8', {
    url: '/screen8/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen8.html',
        controller: 'screen8Ctrl'
      }
    }
  })

  .state('menu.screen9', {
    url: '/screen9/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen9.html',
        controller: 'screen9Ctrl'
      }
    }
  })

  .state('menu.screen10', {
    url: '/screen10/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen10.html',
        controller: 'screen10Ctrl'
      }
    }
  })

  .state('menu.screen11', {
    url: '/screen11/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen11.html',
        controller: 'screen11Ctrl'
      }
    }
  })

.state('menu.newAssessment', {
    url: '/screen1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/screen1.html',
        controller: 'screen1Ctrl'
      }
    }
  })
  .state('menu.myassessment', {
    url: '/myassessment',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myassessment.html',
        controller: 'screen11Ctrl'
      }
    }
  })
  .state('menu.myaccount', {
    url: '/myaccount',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myaccount.html',
        controller: 'screen11Ctrl'
      }
    }
  })
  .state('menu.editlist', {
    url: '/editlist',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editlist.html',
        controller: 'editlistCtrl'
      }
    }
  })
  .state('menu.logout', {
    url: '/logout',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'logoutCtrl'
      }
    }
  })
 .state('menu.details', {
    url: '/details/:assessment_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/details.html',
        controller: 'details'
      }
    }
  })

 .state('privacy', {
    url: '/privacy',
    views: {
      '': {
        templateUrl: 'templates/privacy.html',
        controller: 'privacyCtrl'
      }
    }
  })

  .state('terms', {
    url: '/terms',
    views: {
      '': {
        templateUrl: 'templates/terms.html',
        controller: 'termsCtrl'
      }
    }
  })


 .state('forgetpassword', {
    url: '/forgetpassword',
    views: {
      '': {
        templateUrl: 'templates/forgetpassword.html',
        controller: 'forgetpasswordCtrl'
      }
    }
  })
$urlRouterProvider.otherwise('/login')
});