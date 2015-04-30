// JavaScript Document

app.auth = {
    username: null,
	password: null,
    login: function (username,password,remember) {
    // define error.
		var error = 0;
	
	// json string.
		if (username.length < 4) {
			error = 1;
		}
		
		if (password.length < 4) {
			error = 1;
		}
		
		if(error == '0'){
		  
			$.mobile.loading( 'show', {
				text: 'Logging you in standby...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
			
			$.ajax({
			  type: "GET",
			  url: window.api_url+'/auth',
			  timeout: 10000,
			  data: { action: 'auth' },
			  headers: {'ApiKey': app.apiKey,'ApiUser': username, 'ApiPass': password },
			  dataType: "jsonp"
			}).done(function( data ) {
				
				if(typeof data.error !== 'undefined') {
				// your code here.
					if(typeof data.error_text !== 'undefined') {
						$("#error_text_msg").html(data.error_text);
					};

					$.mobile.loading("hide");
					$("#login_error").popup("open");
					return false;
				};
				
				if(typeof data.token !== 'undefined') {
				// your code here.
					localStorage.token = data.token;
					window.location.href = "home.html";
					return false;
				};

				//alert(payload);
			}).fail(function() {
				$.mobile.loading("hide");
				$("#login_error").popup("open");
			});
		
		
		} else {
			$.mobile.loading( "hide");
			$("#error_text_msg").html('The details you have provided are not valid.');
			$("#login_error").popup('open');
			return false;
		}
    },
    logout: function () {
    // logout here.
		localStorage.clear();
		window.location = "index.html";
    },
    register: function (username,email,password) {
	// register
    	// define error.
		var error = 0;
		
	// json string.
		if (username.length < 4) {
			error = 1;
		}
		
		if (email.length < 4) {
			error = 1;
		}
		
		if (password.length < 4) {
			error = 1;
		}
		
		if(error == '0'){
		  
			$.mobile.loading( 'show', {
				text: 'Registering user standby...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
			
			$.ajax({
			  type: "GET",
			  url: window.api_url+'/reg',
			  timeout: 10000,
			  data: { action: 'reg','email': email.toLowerCase() },
			  headers: {'ApiKey': app.apiKey,'ApiUser': username, 'ApiPass': password },
			  dataType: "jsonp"
			}).done(function( data ) {
				
				if(typeof data.error !== 'undefined') {
				// your code here.
					if(typeof data.error_text !== 'undefined') {
						$("#error_text_reg").html(data.error_text);
					};
					
					$.mobile.loading("hide");
					$("#register_error").popup("open");
					
					return false;
				};
				
				if(typeof data.token !== 'undefined') {
				// your code here.
					localStorage.token = data.token;
					window.location.href = "home.html";
					return false;
				};

				//alert(payload);
			}).fail(function() {
				$.mobile.loading("hide");
				$("#register_error").popup("open");
			});
		
		
		} else {
			$.mobile.loading( "hide");
			$("#error_text_reg").html('The details you have provided are not valid.');
			$("#register_error").popup('open');
			return false;
		}
	},
    recover: function () {
    	// recover pass
    }

};  
