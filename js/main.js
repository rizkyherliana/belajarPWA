$(document).ready(function(){
	var _url ="https://my-json-server.typicode.com/rizkyherliana/pwaapi/products"

	var dataResults = ''
	var optionResults = ''
	var categories = []


function renderPage(data){
 	$.each(data, function(key,items){
 		dataResults += "<div>"
							+ "<h3>" + items.name + "</h3>"
							+ "<p>" + items.category + "</p>"
							"</div>";

		if($.inArray(items.category,categories) == -1){
			categories.push(items.categories)
			optionResults += "<option value'"+ items.category +"'>" + items.category + "</option>" 
		}
	})

	$('#products').html(dataResults)
	$('#cat_select').html("<option value='all'> semua </option>" +optionResults)

}
	var networkDataReceived = false

	//fresh data from online
	var networkUpdate = fetch(_url).then(function(response){
		return response.json()
	}).then(function(data){
		networkDataReceived = true
		renderPae(data)
	})
	
	//return data form cache 
	caches.match(_url).then(function(response){
		if(!response) throw Eror('no data on cache')
		return response.json()
	}).then(function(data){
		if(!networkDataReceived){
			renderPage(data)
			concole.log('render data from cache')
		}
	}).catch(function(){
		return networkUpdate
	})



	//fungsi filter 
	$("#cat_select").on('change', function(){
		updateProduct($(this).val())
	})

	function updateProduct(cat){
		var dataResults=''
		var _newUrl = _url 

		if(cat != 'all')
			_newUrl = _url + "?category=" +cat

		$.get(_newUrl, function(data) {
		$.each(data, function(key,items){

			dataResults += "<div>"
							+ "<h3>" + items.name + "</h3>"
							+ "<p>" + items.category + "</p>"
							"</div>";
		})
		$('#products').html(dataResults) 
	})

	}
})



//PWA 
if ('serviceWorker' in navigator) { //cek browser udah support PWA or not 
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

 