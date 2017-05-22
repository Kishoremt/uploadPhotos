var app = angular.module('studentApp',['ui.router','ngImageAppear','angular-carousel']);
	console.log("hi");

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/index");
	$stateProvider
		.state('admin',{
			url:'/admin',
			templateUrl:'admin.html',
			controller:'myCtrl'
		})
		.state('display',{
			url:'/display',
			templateUrl:'display.html',
			controller:'myCtrl2'
		})
});

app.controller('myCtrl', function ($scope,$rootScope,getFactory) {
	
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
      };
     
  window.preview = function (input) {
    if (input.files && input.files[0]) {
        $(input.files).each(function () {
            var reader = new FileReader();
            reader.readAsDataURL(this);
            reader.onload =imageIsLoaded;
             
        });
    }
}
$scope.array=[];

function imageIsLoaded(e)
             {
                $("#previewImg").append("<img class='thumb' src='" + e.target.result + "'>");
                $scope.array.push(e.target.result);
				getFactory.setData("array",$scope.array);
				console.log($scope.array);
                // localStorage.setItem("image",e.target.result);
                // console.log(e.target.result);
	         }
  });

app.controller('myCtrl2', function ($scope,$rootScope,getFactory) {

	imageIsLoaded();
  function imageIsLoaded() {
  	// var result=localStorage.getItem("image");
  	// console.log(result);
   //  $("#previewImg").append("<img class='thumb' src='" +result+ "'>");

    $scope.data=getFactory.getData("array");
	console.log($scope.data);

  

}




});



app.factory('getFactory',function()
{
	var headInfo = [];
	return {
	    setData: function (key, data) {
	        headInfo[key] = data;
	    },
	    getData: function (key) {
	        return headInfo[key];
	    }	
}
});



app.directive("owlCarousel", function() {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
			scope.initCarousel = function(element) {
			  // provide any default options you want
				var defaultOptions = {
				};
				var customOptions = scope.$eval($(element).attr('data-options'));
				// combine the two options objects
				for(var key in customOptions) {
					defaultOptions[key] = customOptions[key];
				}
				// init carousel
				$(element).owlCarousel(defaultOptions);
			};
		}
	};
})
app.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
	}]);