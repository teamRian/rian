var userNames = (function () {
		var names = {};

		var claim = function(name) {
				if(!name || names[name]) {
						return false;
				} else {
						names[name] = true;
						return true;
				}
		};


	// find the lowest unused 'guest' name and claim it
	var getGuestName = function() {
			var name,
			nextUserId = 1;

			do {
					name = 'Guest' + nextUserId;
					nextUserId += 1;
			} while (!claim(name));

			return name;
	};

	// serialize claimed names as an array
	var get = function() {
		 var res = [];
		 for (var user in names) {
		 		res.push(user);
		 }

		 return res;
	};

	var free = function(name) {
			if(names[name]) {
					delete names[name];
			}
	};

	return {
			claim: claim,
			free: free,
			get: get,
			getGuestName: getGuestName
	};
}());

// export function for listening to the socket
module.exports = function(socket) {
		var name = userNames.getGuestName();
		var io = this;
		// send the new user their name and a list of users
		socket.emit('init', {
				name: name,
				users: userNames.get()
		});

		// notify other clients that a new user has joined
		socket.broadcast.emit('user:join', {
				name: name
		});

		// broadcast a user's message to other users

		socket.on('send:message', function(data){
				
				io.sockets.emit('send:message', {
						user: name,
						text: data.text
				});
		});

		// validate a user's name change, and broadcast it on success
		
		socket.on('change:name', function(data, fn) {
				if(userNames.claim(data.name)) {
						
						var oldName = name;
						userNames.free(oldName);

						name = data.name;

						io.sockets.emit('change:name', {
								oldName: oldName,
								newName: name
						});

						fn(true);
				} else {
					fn(false);
				}
		});

		// clean up when a user leaves, and broadcast it to otehr users
		socket.on('disconnect', function(){
				socket.broadcast.emit('user:left', {
						name: name
				});
				userNames.free(name);
		});
};