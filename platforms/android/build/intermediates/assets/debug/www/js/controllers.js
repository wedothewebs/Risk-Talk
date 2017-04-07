var app = angular.module('app.controllers', ['app.services'])
  
app.controller('loginCtrl',function($scope, $state, $http, $location,$ionicLoading ,Questions){

	var employee_id = sessionStorage.getItem('employee_id');
  
  if(employee_id !=null){
    //alert(employee_id);
       $location.path('side-menu21/screen1/');
   // $state.go('menu.screen1');
  }
	var username = '';
	var password = '';
	var employee_id = '';
	 $scope.logindata = {};
        $scope.login = function(datauser) {

       $ionicLoading.show({
        template: 'Loading...'
      });

        $scope.username = datauser.username;
        $scope.password = datauser.password;
        username = datauser.username;
	   	  password = datauser.password;
$scope.session =  sessionStorage.getItem('employee_id');
loginSerices();
 function loginSerices() {
   Questions.loginSerices(username,password)
      .success(function(data) {
        console.log(data);
  		   $scope.employeedata =data;
         var employee_id =data.employee_id;  
  		if(employee_id){
  		 sessionStorage.setItem('employee_id',employee_id);
  		 sessionStorage.setItem('company_id',data.company_id);
       $ionicLoading.hide();
       $location.path('side-menu21/screen1');
  		  }else{
           $ionicLoading.hide();
           $scope.error = 'Login failed, Please try again'; 
        }
  	
        })
        .error(function(data) {
            $ionicLoading.hide();
            $scope.error = 'Login failed, Please try again'; 
        });
      }
    };

}) 



app.controller('screen1Ctrl', function ($scope, $state, $http, $stateParams , $location , $ionicLoading, Questions) {
      var assessment_id  = $stateParams.assessment_id;
	    Questions.loginCheck();
      var screen = 1; 
      QuestionGet();
      function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
                $scope.questions = data;

              })
              .error(function (error) {
                 alert(error);
                 console.log('Error: ' + error);
              });
        }

     $scope.edit = function() {

        $location.path('side-menu21/editlist');

      }

})
app.controller('screen2Ctrl', function ($scope, $state, $http,$stateParams,$ionicLoading, Questions) {
       Questions.loginCheck();
      var screen = 2; 
      var assessment_id  = $stateParams.assessment_id;
     // alert(assessment_id);
      QuestionGet();
      function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
                $scope.questions = data;
               
                $scope.screen2 = function(data) {
                     $ionicLoading.show({
                      template: 'Loading...'
                    });
                        if(assessment_id != ''){
                          var assessment_id = assessment_id ; 
                        }else{
                          var assessment_id = '' ; 
                        }
                       var assessment =  data.assessmen;
                       
                       var assessment_id  = $stateParams.assessment_id;
                          if(assessment_id != ''){
                            var assessment_id = assessment_id ; 
                          }else{
                            var assessment_id = '' ; 
                          }

                        screen2Post();
                        function screen2Post() {
                            Questions.screen2Post(assessment,assessment_id)
                            .success(function (data) {
                              var assess = data.assessmen_id ;
                                console.log(data);
                                $ionicLoading.hide();
                                $state.go('menu.screen3', { 'assessment_id': assess });

                            }).error(function (error) {
                               alert(error);
                               console.log('Error: ' + error);
                            });

                        }
                      
                    }

              })
              .error(function (error) {
                 alert(error);
                 console.log('Error: ' + error);
              });
        }

})
app.controller('menuCtrl', function ( $scope,$http,$stateParams,$state,$location) {  
 $scope.logout = function() {
   sessionStorage.removeItem('employee_id');
   sessionStorage.removeItem('company_id');
   $location.path("/login");
 }
})

app.controller('screen3Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
     Questions.loginCheck();
    var screen = 3; 
    var assessment_id =  $stateParams.assessment_id;
    var company_id =  sessionStorage.getItem('company_id');
   var loadFilePath='';
   var src='';
   $scope.playAudio = true;
   $scope.audioControl = true;
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;
            var ans_sound_file = 'sound.mp3';

            $scope.uploadFile = function() {
              if(loadFilePath==''){
                alert("Please record before upload");
                return;
              }
             $scope.uploadAudio();
             $scope.playAudio = true;
             $scope.audioControl = false;
                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '3',
                  ans_sound_file: ans_sound_file,
                  ans_video_file: '',
                  ans_option_check: ''
               };
                   Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    //$state.go('menu.screen4', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
	var company_id =  sessionStorage.getItem('company_id');
   $scope.screen3back = function(data) {
           $state.go('menu.screen2', { 'assessment_id': assessment_id });
        }


// file transfer plugin code
$scope.uploadAudio = function(){

//$scope.startStopRecord = false;
function win(r) {
 loadFilePath ='';
  cordova.plugin.pDialog.dismiss();
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Uploaded Successfully");
    //file deletion
    $scope.deleteAudioFile();
    $state.go('menu.screen4', { 'assessment_id': assessment_id });
  
}

function fail(error) {
   cordova.plugin.pDialog.dismiss();
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

//var uri = encodeURI("http://vasdapunjabradio.com/debug/index.php");

 if(device.platform == "Android")
        {
         
            cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL',cancelable : false, title: 'Please Wait...', message : 'Uploading audio...'});
            cordova.plugin.pDialog.setProgress(0);
        }else{
            // $ionicLoading.show({
            //     template: '<ion-spinner icon="lines"></ion-spinner>'
            // });
        }
var uri = encodeURI("http://risktalk.com.au/apiScreenAns.php");
var fileURI = loadFilePath;
console.log(loadFilePath);
        var name = fileURI.name;
        var options = new FileUploadOptions();
        options.fileKey = "ans_sound_file";
        options.chunkedMode = false;
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = 'audio/wav';
        
        var params = new Object();
        params.type = "audio/wav";
        params.file = fileURI;
       // params.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.params = params;
        console.log(JSON.stringify(options) + '.............');
        var ft = new FileTransfer();
   ft.upload(fileURI, uri, win, fail, options);    
ft.onprogress = function(progressEvent) {
   if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                if(device.platform == "Android")
                {
                    cordova.plugin.pDialog.setProgress(perc);
                }
            } else {

            }
};



}
    var mediaRec;
    $scope.startStopRecord = false;
    $scope.record = function () {
    $scope.playAudio = false;
    $scope.audioControl = true;
        $scope.startStopRecord = (!$scope.startStopRecord) ? true : false;
        if($scope.startStopRecord){
            src = "3_"+assessment_id+"_"+company_id+".wav";
            mediaRec = new Media(src,
            // success callback
            function () {
                console.log("recordAudio():Audio Success");
            },
            // error callback
            function (err) {
                alert("recordAudio():Audio Error: " + err.code)
                console.log("recordAudio():Audio Error: " + err.code);
            });
            mediaRec.startRecord();
        }else{
            mediaRec.stopRecord();
            console.log(mediaRec);
            if(device.platform == "iOS")
            {
                var path = cordova.file.tempDirectory;
            }
            else if(device.platform == "Android")
            {
                var path = cordova.file.externalRootDirectory;
                //console.log("path"  + path);
                //loadFilePath = cordova.file.externalRootDirectory;
            }
           
            //alert("File that will be saved on server: " + path + "screen3_"+assessment_id+".wav");
            loadFilePath = path + "3_"+assessment_id+"_"+company_id+".wav";
            $scope.loadFilePath = loadFilePath;
            //loadFilePath = "file:/storage/emulated/0/main_tune.mp3";
            
             console.log("path"  + loadFilePath);
            // $scope.uploadAudio();
            //mediaRec.play();
        }
        return;
        //debugger
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }
    $scope.playAudioFile = function(){
      mediaRec.play();
    }

    // File deletion code
    $scope.deleteAudioFile = function() {
      var path = "file:///storage/emulated/0";
     var filename = src;

window.resolveLocalFileSystemURL(path, function(dir) {
  dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                
                  // The file has been removed succesfully
              },function(error){
                  // Error deleting the file
              },function(){
                 // The file doesn't exist
              });
  });
});

   } 
})
   


app.controller('screen4Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
     Questions.loginCheck();
    var screen = 4; 
    var assessment_id  = $stateParams.assessment_id;

     Questions.Dropdown('tec_criticalrisks')
            .success(function(data){

               $scope.criticalrisks = data; 
           
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
    
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
                var question_id  = data.question_id ;
                var ans_sound_file = 'sound.mp3';
                 $scope.screen4 = function(data) {
                   $ionicLoading.show({
                     template: 'Loading...'
                   });


                  var dataInfo = {
                    assessmen_id:  assessment_id,
                    question_id:  question_id,
                    screen_number: '4',
                    ans_sound_file: '',
                    ans_video_file: '',
                    ans_option_check: data.ans_option_check
                 };
                  Questions.answerPost(dataInfo)
                  .success(function(da){
                    if(da.answer_id != null){
                          $ionicLoading.hide();
                          $state.go('menu.screen5', { 'assessment_id': assessment_id });
                        }
                       }).error(function (error) {
                     alert(error);
                     console.log('Error: ' + error);
                  });
              }
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
  
  var company_id =  sessionStorage.getItem('company_id');
  $scope.screen4back = function(data) {
           $state.go('menu.screen3', { 'assessment_id': assessment_id });
        }
  
})



app.controller('screen5Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
     Questions.loginCheck();
    var screen = 5; 
    var assessment_id =  $stateParams.assessment_id;
    var company_id =  sessionStorage.getItem('company_id');
   var loadFilePath='';
   var src='';
   $scope.playAudio = true;
   $scope.audioControl = true;
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;
            var ans_sound_file = 'screen5.mp3';

            $scope.uploadFile = function() {
              if(loadFilePath==''){
                alert("Please record before upload");
                return;
              }
             $scope.uploadAudio();
             $scope.playAudio = true;
             $scope.audioControl = false;
                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '5',
                  ans_sound_file: ans_sound_file,
                  ans_video_file: '',
                  ans_option_check: ''
               };
                   Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    //$state.go('menu.screen4', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
  var company_id =  sessionStorage.getItem('company_id');
   $scope.screen5back = function(data) {
           $state.go('menu.screen4', { 'assessment_id': assessment_id });
        }
// file transfer plugin code
$scope.uploadAudio = function(){

//$scope.startStopRecord = false;
function win(r) {
 loadFilePath ='';
  cordova.plugin.pDialog.dismiss();
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Uploaded Successfully");
    //file deletion
    $scope.deleteAudioFile();
    $state.go('menu.screen6', { 'assessment_id': assessment_id });
  
}

function fail(error) {
   cordova.plugin.pDialog.dismiss();
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

//var uri = encodeURI("http://vasdapunjabradio.com/debug/index.php");

 if(device.platform == "Android")
        {
         
            cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL',cancelable : false, title: 'Please Wait...', message : 'Uploading audio...'});
            cordova.plugin.pDialog.setProgress(0);
        }else{
            // $ionicLoading.show({
            //     template: '<ion-spinner icon="lines"></ion-spinner>'
            // });
        }
var uri = encodeURI("http://risktalk.com.au/apiScreenAns.php");
var fileURI = loadFilePath;
console.log(loadFilePath);
        var name = fileURI.name;
        var options = new FileUploadOptions();
        options.fileKey = "ans_sound_file";
        options.chunkedMode = false;
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = 'audio/wav';
        
        var params = new Object();
        params.type = "audio/wav";
        params.file = fileURI;
       // params.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.params = params;
        console.log(JSON.stringify(options) + '.............');
        var ft = new FileTransfer();
   ft.upload(fileURI, uri, win, fail, options);    
ft.onprogress = function(progressEvent) {
   if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                if(device.platform == "Android")
                {
                    cordova.plugin.pDialog.setProgress(perc);
                }
            } else {

            }
};



}
    var mediaRec;
    $scope.startStopRecord = false;
    $scope.record = function () {
    $scope.playAudio = false;
    $scope.audioControl = true;
        $scope.startStopRecord = (!$scope.startStopRecord) ? true : false;
        if($scope.startStopRecord){
            src = "5_"+assessment_id+"_"+company_id+".wav";
            mediaRec = new Media(src,
            // success callback
            function () {
                console.log("recordAudio():Audio Success");
            },
            // error callback
            function (err) {
                alert("recordAudio():Audio Error: " + err.code)
                console.log("recordAudio():Audio Error: " + err.code);
            });
            mediaRec.startRecord();
        }else{
            mediaRec.stopRecord();
            console.log(mediaRec);
            if(device.platform == "iOS")
            {
                var path = cordova.file.tempDirectory;
            }
            else if(device.platform == "Android")
            {
                var path = cordova.file.externalRootDirectory;
                //console.log("path"  + path);
                //loadFilePath = cordova.file.externalRootDirectory;
            }
           
            //alert("File that will be saved on server: " + path + "screen5_"+assessment_id+".wav");
            loadFilePath = path + "5_"+assessment_id+"_"+company_id+".wav";
            $scope.loadFilePath = loadFilePath;
            //loadFilePath = "file:/storage/emulated/0/main_tune.mp3";
            
             console.log("path"  + loadFilePath);
            // $scope.uploadAudio();
            //mediaRec.play();
        }
        return;
        //debugger
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }
    $scope.playAudioFile = function(){
      mediaRec.play();
    }

    // File deletion code
    $scope.deleteAudioFile = function() {
      var path = "file:///storage/emulated/0";
     var filename = src;

window.resolveLocalFileSystemURL(path, function(dir) {
  dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                
                  // The file has been removed succesfully
              },function(error){
                  // Error deleting the file
              },function(){
                 // The file doesn't exist
              });
  });
});

   } 
})

app.controller('screen7Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
   
  var assessment_id  = $stateParams.assessment_id;
  var company_id =  sessionStorage.getItem('company_id');
        $scope.screen7back = function(data) {
         
           $state.go('menu.screen6', { 'assessment_id': assessment_id });
        }

        Questions.Dropdown('tec_likelihood')
            .success(function(data){

               $scope.likelihoods = data; 
           
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });

    var screen = 7; 
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;

            $scope.screen7 = function(data) {

             $ionicLoading.show({
                template: 'Loading...'
              });


                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '7',
                  ans_sound_file: '',
                  ans_video_file: '',
                  ans_option_check: data.ans_option_check
               };
               
                  
              Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    $state.go('menu.screen8', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
                     alert(error);
                     console.log('Error: ' + error);
                  });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
})


app.controller('screen6Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
     Questions.loginCheck();
    var screen = 6; 
    var assessment_id =  $stateParams.assessment_id;
    var company_id =  sessionStorage.getItem('company_id');
   var loadFilePath='';
   var src='';
   $scope.playAudio = true;
   $scope.audioControl = true;
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;
            var ans_sound_file = 'screen6.mp3';

            $scope.uploadFile = function() {
              if(loadFilePath==''){
                alert("Please record before upload");
                return;
              }
             $scope.uploadAudio();
             $scope.playAudio = true;
             $scope.audioControl = false;
                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '6',
                  ans_sound_file: ans_sound_file,
                  ans_video_file: '',
                  ans_option_check: ''
               };
                   Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    //$state.go('menu.screen4', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
  var company_id =  sessionStorage.getItem('company_id');
   $scope.screen6back = function(data) {
           $state.go('menu.screen5', { 'assessment_id': assessment_id });
        }


// file transfer plugin code
$scope.uploadAudio = function(){

//$scope.startStopRecord = false;
function win(r) {
 loadFilePath ='';
  cordova.plugin.pDialog.dismiss();
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Uploaded Successfully");
    //file deletion
    $scope.deleteAudioFile();
    $state.go('menu.screen7', { 'assessment_id': assessment_id });
  
}

function fail(error) {
   cordova.plugin.pDialog.dismiss();
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

//var uri = encodeURI("http://vasdapunjabradio.com/debug/index.php");

 if(device.platform == "Android")
        {
         
            cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL',cancelable : false, title: 'Please Wait...', message : 'Uploading audio...'});
            cordova.plugin.pDialog.setProgress(0);
        }else{
            // $ionicLoading.show({
            //     template: '<ion-spinner icon="lines"></ion-spinner>'
            // });
        }
var uri = encodeURI("http://risktalk.com.au/apiScreenAns.php");
var fileURI = loadFilePath;
console.log(loadFilePath);
        var name = fileURI.name;
        var options = new FileUploadOptions();
        options.fileKey = "ans_sound_file";
        options.chunkedMode = false;
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = 'audio/wav';
        
        var params = new Object();
        params.type = "audio/wav";
        params.file = fileURI;
       // params.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.params = params;
        console.log(JSON.stringify(options) + '.............');
        var ft = new FileTransfer();
   ft.upload(fileURI, uri, win, fail, options);    
ft.onprogress = function(progressEvent) {
   if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                if(device.platform == "Android")
                {
                    cordova.plugin.pDialog.setProgress(perc);
                }
            } else {

            }
};



}
    var mediaRec;
    $scope.startStopRecord = false;
    $scope.record = function () {
    $scope.playAudio = false;
    $scope.audioControl = true;
        $scope.startStopRecord = (!$scope.startStopRecord) ? true : false;
        if($scope.startStopRecord){
            src = "6_"+assessment_id+"_"+company_id+".wav";
            mediaRec = new Media(src,
            // success callback
            function () {
                console.log("recordAudio():Audio Success");
            },
            // error callback
            function (err) {
                alert("recordAudio():Audio Error: " + err.code)
                console.log("recordAudio():Audio Error: " + err.code);
            });
            mediaRec.startRecord();
        }else{
            mediaRec.stopRecord();
            console.log(mediaRec);
            if(device.platform == "iOS")
            {
                var path = cordova.file.tempDirectory;
            }
            else if(device.platform == "Android")
            {
                var path = cordova.file.externalRootDirectory;
                //console.log("path"  + path);
                //loadFilePath = cordova.file.externalRootDirectory;
            }
           
            //alert("File that will be saved on server: " + path + "screen6_"+assessment_id+".wav");
            loadFilePath = path + "6_"+assessment_id+"_"+company_id+".wav";
            $scope.loadFilePath = loadFilePath;
            //loadFilePath = "file:/storage/emulated/0/main_tune.mp3";
            
             console.log("path"  + loadFilePath);
            // $scope.uploadAudio();
            //mediaRec.play();
        }
        return;
        //debugger
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }
    $scope.playAudioFile = function(){
      mediaRec.play();
    }

    // File deletion code
    $scope.deleteAudioFile = function() {
      var path = "file:///storage/emulated/0";
     var filename = src;

window.resolveLocalFileSystemURL(path, function(dir) {
  dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                
                  // The file has been removed succesfully
              },function(error){
                  // Error deleting the file
              },function(){
                 // The file doesn't exist
              });
  });
});

   } 
})

app.controller('screen8Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
   
  var assessment_id  = $stateParams.assessment_id;
  var company_id =  sessionStorage.getItem('company_id');
        $scope.screen8back = function(data) {
           
           $state.go('menu.screen7', { 'assessment_id': assessment_id });
        }
   
      Questions.Dropdown('tec_consequence')
            .success(function(data){
              
               $scope.consequences = data; 
           
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });

    var screen = 8; 
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;

            $scope.screen8 = function(data) {
               $ionicLoading.show({
                template: 'Loading...'
              });


                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '8',
                  ans_sound_file: '',
                  ans_video_file: '',
                  ans_option_check: data.ans_option_check
               };
                  
                   Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    $state.go('menu.screen9', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }
})
app.controller('screen9Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
 

  var assessment_id  = $stateParams.assessment_id;
  var company_id =  sessionStorage.getItem('company_id');
        $scope.screen9back = function(data) {
           $state.go('menu.screen8', { 'assessment_id': assessment_id });
        }
    var screen = 9; 
    QuestionGet();
    function QuestionGet() {
         $ionicLoading.show({
           template: 'Loading...'
        });
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
         Questions.valueName(assessment_id)
            .success(function(data){     
               $scope.valueName = data; 
                $scope.screen9 = function(data) {
                     $state.go('menu.screen10', { 'assessment_id': assessment_id });
                   }
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
                  
            })

            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }

      $ionicLoading.hide();
})

app.controller('screen10Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
  
   Questions.loginCheck();
   var screen = 10; 
   var assessment_id =  $stateParams.assessment_id;
   var company_id =  sessionStorage.getItem('company_id');
   var loadFilePath='';
   var src='';
   $scope.playAudio = true;
   $scope.audioControl = true;
   
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
            .success(function (data) {
            $scope.questions = data;
            var question_id  = data.question_id ;
            var ans_sound_file = 'screen10.mp3';

            $scope.uploadFile = function() {
              if(loadFilePath==''){
                alert("Please record before upload");
                return;
              }
             $scope.uploadAudio();
             $scope.playAudio = true;
             $scope.audioControl = false;
                var dataInfo = {
                  assessmen_id:  assessment_id,
                  question_id:  question_id,
                  screen_number: '10',
                  ans_sound_file: ans_sound_file,
                  ans_video_file: '',
                  ans_option_check: ''
               };
                   Questions.answerPost(dataInfo)
                  .success(function(da){
                  if(da.answer_id != null){
                    $ionicLoading.hide();
                    //$state.go('menu.screen4', { 'assessment_id': assessment_id });
                  }
                 }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
               } 
            })
            .error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });
        }

  var company_id =  sessionStorage.getItem('company_id');
   $scope.screen10back = function(data) {
           $state.go('menu.screen9', { 'assessment_id': assessment_id });
        }


// file transfer plugin code
$scope.uploadAudio = function(){

//$scope.startStopRecord = false;
function win(r) {
 loadFilePath ='';
  cordova.plugin.pDialog.dismiss();
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert("Uploaded Successfully");
    //file deletion
    $scope.deleteAudioFile();
    $state.go('menu.screen11', { 'assessment_id': assessment_id });
  
}

function fail(error) {
   cordova.plugin.pDialog.dismiss();
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

//var uri = encodeURI("http://vasdapunjabradio.com/debug/index.php");

 if(device.platform == "Android")
        {
         
            cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL',cancelable : false, title: 'Please Wait...', message : 'Uploading audio...'});
            cordova.plugin.pDialog.setProgress(0);
        }else{
            // $ionicLoading.show({
            //     template: '<ion-spinner icon="lines"></ion-spinner>'
            // });
        }
var uri = encodeURI("http://risktalk.com.au/apiScreenAns.php");
var fileURI = loadFilePath;
console.log(loadFilePath);
        var name = fileURI.name;
        var options = new FileUploadOptions();
        options.fileKey = "ans_sound_file";
        options.chunkedMode = false;
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = 'audio/wav';
        
        var params = new Object();
        params.type = "audio/wav";
        params.file = fileURI;
       // params.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.params = params;
        console.log(JSON.stringify(options) + '.............');
        var ft = new FileTransfer();
   ft.upload(fileURI, uri, win, fail, options);    
ft.onprogress = function(progressEvent) {
   if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                if(device.platform == "Android")
                {
                    cordova.plugin.pDialog.setProgress(perc);
                }
            } else {

            }
};



}
    var mediaRec;
    $scope.startStopRecord = false;
    $scope.record = function () {
    $scope.playAudio = false;
    $scope.audioControl = true;
        $scope.startStopRecord = (!$scope.startStopRecord) ? true : false;
        if($scope.startStopRecord){
            src = "10_"+assessment_id+"_"+company_id+".wav";
            mediaRec = new Media(src,
            // success callback
            function () {
                console.log("recordAudio():Audio Success");
            },
            // error callback
            function (err) {
                alert("recordAudio():Audio Error: " + err.code)
                console.log("recordAudio():Audio Error: " + err.code);
            });
            mediaRec.startRecord();
        }else{
            mediaRec.stopRecord();
            console.log(mediaRec);
            if(device.platform == "iOS")
            {
                var path = cordova.file.tempDirectory;
            }
            else if(device.platform == "Android")
            {
                var path = cordova.file.externalRootDirectory;
                //console.log("path"  + path);
                //loadFilePath = cordova.file.externalRootDirectory;
            }
           
           // alert("File that will be saved on server: " + path + "screen10_"+assessment_id+".wav");
            loadFilePath = path + "10_"+assessment_id+"_"+company_id+".wav";
            $scope.loadFilePath = loadFilePath;
            //loadFilePath = "file:/storage/emulated/0/main_tune.mp3";
            
             console.log("path"  + loadFilePath);
            // $scope.uploadAudio();
            //mediaRec.play();
        }
        return;
        //debugger
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }
    $scope.playAudioFile = function(){
      mediaRec.play();
    }

    // File deletion code
    $scope.deleteAudioFile = function() {
      var path = "file:///storage/emulated/0";
     var filename = src;

window.resolveLocalFileSystemURL(path, function(dir) {
  dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                
                  // The file has been removed succesfully
              },function(error){
                  // Error deleting the file
              },function(){
                 // The file doesn't exist
              });
  });
});

   } 
})
app.controller('screen11Ctrl', function ( $scope, $state, $http,$stateParams,$ionicLoading,Questions) {
   var assessment_id  = $stateParams.assessment_id;
   var company_id =  sessionStorage.getItem('company_id');
   var screen = 11; 
    QuestionGet();
    function QuestionGet() {
        Questions.QuestionGet(screen,assessment_id)
      .success(function(data) {
        $scope.questions = data;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });
      }
})
   app.controller('myassessmentCtrl', function ( $scope, $state, $http,$stateParams, $location,$ionicLoading) {
       $ionicLoading.show({
          template: 'Loading...'
       });
  $scope.created_by = sessionStorage.getItem('employee_id');
  var created_by =  sessionStorage.getItem('employee_id');
   $scope.details = function(data) {
     // $location.path('side-menu21/details/'+data);

      $state.go('menu.details', {assessment_id:data}, {reload: true});
  } 
      $http({
            url: 'http://risktalk.com.au/apiAssessment.php',
            method: "POST",
            data: {'created_by':created_by},
            headers: {
                     'Content-Type': 'application/json'
            }
        }).success(function(data) {
          $ionicLoading.hide();
        $scope.assessment = data;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });
})
  app.controller('editlistCtrl', function ( $scope, $state, $http,$stateParams, $location,$ionicLoading) {
   $ionicLoading.show({
                template: 'Loading...'
              });
  $scope.assessEdit = function(data) {
     $location.path('side-menu21/screen02/'+data.assessmen_id);
  }
  $scope.created_by = sessionStorage.getItem('employee_id');
  var created_by =  sessionStorage.getItem('employee_id');
      $http({
            url: 'http://risktalk.com.au/apiAssessment.php',
            method: "POST",
            data: {'created_by':created_by},
            headers: {
                     'Content-Type': 'application/json'
            }
        }).success(function(data) {
          $ionicLoading.hide();
        $scope.assessments = data;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });
})
 app.controller('myaccountCtrl', function ( $scope, $state, $http,$stateParams, $location,$ionicLoading) {
   $ionicLoading.show({
                template: 'Loading...'
              });
  $scope.update = function(data){
  $scope.created_by = sessionStorage.getItem('employee_id');
  var employee_id =  sessionStorage.getItem('employee_id');
  var newpassword = data.newpassword;
  //alert(newpassword);
  if(newpassword){
      $http({
            url: 'http://risktalk.com.au/apiResetpass.php',
            method: "POST",
            data: {'employee_id':employee_id,'employee_name':data.employee_name,'newpassword':data.newpassword},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
      .success(function(data) {
        $ionicLoading.hide();
        $scope.smg = 'Successfully Updated' ;

        $scope.success_sms = 'success_sms' ;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });

  }else{
    $scope.smg = 'The name and password field is required.  ' ;
    $scope.success_sms ='';
  }
 }
  $scope.created_by = sessionStorage.getItem('employee_id');
  var created_by =  sessionStorage.getItem('employee_id');
      $http({
            url: 'http://risktalk.com.au/apiMyaccount.php',
            method: "POST",
            data: {'employee_id':created_by},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
      .success(function(data) {
        $ionicLoading.hide();
        $scope.employee = data;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });
})
 app.controller('details', function ( $scope, $state, $http,$stateParams, $location,$ionicLoading) {
 $ionicLoading.show({
                template: 'Loading...'
              });
   $scope.created_by = sessionStorage.getItem('employee_id');
   var created_by =  sessionStorage.getItem('employee_id');
   var assessment_id  = $stateParams.assessment_id;
   $scope.editassessment = function(data) {
     $location.path('side-menu21/screen02/'+data);
  }
   $http({
           url: 'http://risktalk.com.au/apiDetails.php',
            method: "POST",
            data: {'assessment_id':assessment_id},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
        .success(function(data) {
        $ionicLoading.hide();
        $scope.assessment = data.assessment;
        $scope.answer = data.answer;
        $scope.assessment_id =  assessment_id;
        $scope.rating = data.rating ;
        console.log(data);
        })
        .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });
    $scope.playSound = function (data,id) {
          /*alert(id);*/
           var myMedia = new Media(data);
           myMedia.play();
          $scope.PlayId = id;
      };
    $scope.pause = function (data) { 
       var myMedia = new Media(data);
       myMedia.stop();
       $scope.PlayId = 0 ;

    };
})
app.controller('logoutCtrl',function($scope, $state, $http,$ionicLoading){
   sessionStorage.removeItem('employee_id');
   sessionStorage.removeItem('company_id');
   $state.go('menu.logout');   
}) 
app.controller('forgetpasswordCtrl',function($scope, $state, $http,$ionicLoading){
   $scope.email = function(data){
    
    var  email = data.email ;

    if(email){
    $ionicLoading.show();
    }
    $http({
           url: 'http://risktalk.com.au/apiForgetpassword.php',
            method: "POST",
            data: {'email':email},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
        .success(function(dataInfo) {
        $ionicLoading.hide();
        $scope.sms = dataInfo ;
        $scope.data = datareturn ;
        $scope.type = 0 ;

        console.log(data);
        
        })
        .error(function(data) {
          $ionicLoading.hide();
            alert(data);
            $scope.type = 1 ;
            console.log('Error: ' + data);
        });
        $ionicLoading.hide();

   }
}) 

app.controller('termsCtrl',function($scope, $state, $http,$ionicLoading,Questions){
 
    Questions.Page('tec_terms')
            .success(function(data){

               $scope.terms = data[0]; 
           
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });


}) 

app.controller('privacyCtrl',function($scope, $state, $http,$ionicLoading,Questions){
    Questions.Page('tec_privacy')
            .success(function(data){

               $scope.privacy = data[0]; 
           
           }).error(function (error) {
               alert(error);
               console.log('Error: ' + error);
            });

}) 