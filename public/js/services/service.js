app.factory('Imagetags',function($http){
  var tagListResponse ={};
  tagListResponse.getTags = function(){
  	return $http({'method':'GET','url':'/getTags'})
  }
  return tagListResponse;
})