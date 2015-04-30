// JavaScript Document

$(document).ready(function() {
// where do we find the api?
	$.getJSON( "./config.json", function( config ) {
		if (config.api_url) {
			window.api_url = config.api_url;
		} 
	});
	
	
	
	var pageName = $('body').attr('data-pagename');
	
// click the login button.
	$("#login_button").click(function() {
	// If checked
		var apiUsername = $('#login_username').val();
		var apiPassword = $('#login_password').val();
		$.mobile.loading("show");
		
		app.auth.login(apiUsername,apiPassword);
		
		return false;
	});
	
// click the login button.
	$("#register_button").click(function() {
	// If checked
		var apiUsername = $('#reg_username').val();
		var apiEmail	= $('#reg_email').val();
		var apiMobile 	= $('#reg_mobile').val();
		var apiPassword = $('#reg_password').val();
		var apiPassword2= $('#reg_password2').val();
		$.mobile.loading("show");
	
		app.auth.register(apiUsername,apiEmail,apiPassword);
		
		return false;
	});
	
// click the logout button.
	$("#logout_button").click(function() {
	// If checked
		app.auth.logout();
		return false;

	});
	
// sqipe left and right for menus.
	$( document ).on("swipeleft swiperight", "#contentpage,#members-box", function( e ) {
		// We check if there is no open panel on the page because otherwise
		// a swipe to close the left panel would also open the right panel (and v.v.).
		// We do this by checking the data that the framework stores on the page element (panel: open).
		if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
			if ( e.type === "swipeleft"  ) {
				$( "#rightmenu" ).panel( "open" );
			} else if ( e.type === "swiperight" ) {
				$( "#leftmenu" ).panel( "open" );
			}
		}
	});
	
// what page are we on.
	if (pageName == 'index.html' || pageName == '') {
	// login if enter key.
		$('#login_username,#login_password').keypress(function (e) {
			var key = e.which;
		 	if(key == 13)  {
				$('#login_button').click();
				return false;  
		  	}
		}); 
		
	} // END if
	
	if (pageName == 'home.html') {
	// load the loading thing
		$.mobile.loading( 'show', {
			text: 'Getting latest info...',
			textVisible: true,
			theme: 'b',
			html: ""
		});
			
	// load members into the grid.
		$.ajax({
		  type: "GET",
		  url: window.api_url+"/",
		  timeout: 5000,
		  data: { action: 'online',payload: 0,token: localStorage.token },
		  dataType: "jsonp"
		}).done(function( data ) {
			
			if(typeof data.json_data !== 'undefined') {
				
				$.each(data.json_data, function(idx, obj) {
					pageHtml = '<a href="../../1csscoy/scripts/profile.html#'+obj.username+'" id="view_profile" data-username="'+obj.username+'" data-ajax: "false"><img src="../../1csscoy/scripts/'+localStorage.apiUrl+obj.image+'" style="width: 33%;" /></a>';
					$('#members-box').append( pageHtml );
				});
										
				
				$.mobile.loading("hide");
			
			};
			
			return false;
			
		}).fail(function() {
			$.mobile.loading("hide");
			alert('error');
		});
		
		
	} // END if
	
});
