app.controller('imageCtrl',function($scope,Imagetags,$http,$state,$timeout){
	$scope.currentState=$state.current.name
	
	//get All images search By user
	Imagetags.getTags().success(function(result){
       $scope.getImage=result;
	}).error(function(err){
        console.log("error",err)
	})



    $scope.searchImage = function(serachImage){
		  $scope.isLoaded=true;
          if(serachImage!=undefined  || serachImage !=''){
          	var imageData = {text:serachImage}
          	     $http.post('/insertTags',imageData).then(function(res){
          	     	$scope.isLoaded=false;
                  console.log("insert ",res);
					   $scope.imageData=res.data[0].image_info;
					   //$state.go('all-images');
					   $timeout(function() {
						// code to execute after directives goes here
						jQuery('.materialboxed').materialbox();  
					});
          	     }).catch(function(err){
          	     	$scope.isLoaded=false;
          	     	console.log("err")
          	     })          
          }
    }

  
   $scope.searchImageByKeyword = function(){
    	$scope.isLoaded=true;
          if($state.params.searchId!=undefined ||$state.params.searchId!=null){
          	var imageData = {text:$state.params.searchId}
          	     $http.post('/searchTags',imageData).then(function(res){
          	     	console.log(res);
          	     	$scope.isLoaded=false;
					$scope.imageData=res.data[0].image_info;
					$timeout(function() {
						// code to execute after directives goes here
						jQuery('.materialboxed').materialbox();  
					});
						
						
					//}
				 }).catch(function(err){
          	     	$scope.isLoaded=false;
          	     	console.log("err")
          	     })
            
          }
    }

})