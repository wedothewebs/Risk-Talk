'use strict';
//var app = angular.module('', [])
var ServiceApp = angular.module('app.services', [])
ServiceApp.factory('Questions', ['$http','$location', function ($http,$location) {

	var Questions = {};

	Questions.QuestionGet = function (screen,assessment_id) {

		var company_id = sessionStorage.getItem('company_id');

		 return $http({
            url: 'http://risktalk.com.au/apiQuestions.php',
            method: "POST",
            data: {'company_id':company_id,'screen':screen,'assessment_id':assessment_id},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
		
		//return $http.get('http://risktalk.com.au/apiQuestions.php?company_id='+company_id+'&screen='+screen+'&assessment_id='+assessment_id);
	};

	Questions.screen2Post = function (assessment,assessment_id) {

		var company_id =  sessionStorage.getItem('company_id');
		var employee_id =  sessionStorage.getItem('employee_id');

		 return $http({
            url: 'http://risktalk.com.au/apiScreen2.php',
            method: "POST",
            data: {'company_id':company_id, 'employee_id': employee_id, 'assessment':assessment,'assessment_id':assessment_id},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
		//return $http.get('http://risktalk.com.au/apiScreen2.php?employee_id='+employee_id+'&company_id='+company_id+'&assessment='+assessment+'&assessment_id='+assessment_id);
	};
	Questions.Dropdown = function (tableName) {
		var company_id =  sessionStorage.getItem('company_id');

	    return $http({
            url: 'http://risktalk.com.au/apiDropdown.php',
            method: "POST",
            data: {'tableName':tableName,'companyid':company_id},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
	};


  Questions.Page = function (tableName) { 
      return $http({
            url: 'http://risktalk.com.au/apiPage.php',
            method: "POST",
            data: {'tableName':tableName},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
  };

	Questions.valueName = function (assessment_id) {

		return $http({
            url: 'http://risktalk.com.au/apiScreen9.php',
            method: "POST",
            data: {'assessment':assessment_id},
            headers: {
                     'Content-Type': 'application/json'
            }
        })

		//return $http.get('http://risktalk.com.au/apiScreen9.php?assessment='+assessment_id);
	};
	Questions.answerPost = function (info) {

               
           

			//{'assessmen_id':info.assessmen_id,'question_id':info.question_id,'screen_number':info.screen_number,'ans_sound_file':info.ans_sound_file,'ans_video_file':info.ans_video_file,'ans_option_check':info.ans_option_check},
		  return $http({
            url: 'http://risktalk.com.au/apiScreenAns.php',
            method: "POST",
            data: {'assessmen_id':info.assessmen_id,'question_id':info.question_id,'screen_number':info.screen_number,'ans_sound_file':info.ans_sound_file,'ans_video_file':info.ans_video_file,'ans_option_check':info.ans_option_check},
            headers: {
                     'Content-Type': 'application/json'
            }
        })
		
		//return $http.get('http://risktalk.com.au/apiScreenAns.php?assessmen_id='+info.assessmen_id+'&question_id='+info.question_id+'&screen_number='+info.screen_number+'&ans_sound_file='+info.ans_sound_file+'&ans_video_file='+info.ans_video_file+'&ans_option_check='+info.ans_option_check);
	};
	Questions.loginSerices = function (username,password) {
		//alert(username);
	    return $http({
           url: 'http://risktalk.com.au/apiLogin.php',

           // url: 'http://localhost/talk/apiLogin.php',
            method: "POST",
            data: {'username':username,'password':password},
            headers: {
                     'Content-Type': 'application/json'
            }
        })/*.success(function(data){
            alert(data)
        })
         .error(function(data) {
            alert(data);
            console.log('Error: ' + data);
        });*/ 
		//return $http.get('http://risktalk.com.au/apiLogin.php?username='+username+'&password='+password);
		 // return $http.post('http://risktalk.com.au/apiLogin.php',{'username':username,'password':password});
	};

	Questions.loginCheck = function () {
		var employee_id = sessionStorage.getItem('employee_id');
		 if(employee_id ==null){
			$location.path("/login");
		}
		
	};

	Questions.getLastId= function () {
	
      var employee_id =  sessionStorage.getItem('employee_id');
      //alert(employee_id);
	  return $http.get('http://risktalk.com.au/apiLastId.php?employee_id='+employee_id);

	}

	return Questions;

}]);

