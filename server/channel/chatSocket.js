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

		console.log('/chat channel connection success')

		var name = userNames.getGuestName();
		var io = this;
		var to = socket.id;
		// send the new user their name and a list of users
		socket.emit('init', {
				name: name,
				users: userNames.get()
		});

		// TEST for private message
		

		// notify other clients that a new user has joined
		socket.broadcast.emit('user:join', {
				name: name
		});

		// test joining room
		socket.on('room', function(room){
				socket.join(room);

				io.sockets.in(room)
									.emit('message', 'Welcome to the party!!');

				io.sockets.to(to).emit('private message', {userName: socket.username, message: 'Hello world!'} );					
				io.sockets.in('foobar').emit('message', 'anyone in this room yer?');					
		})


		
		// broadcast a user's message to other users

		socket.on('send:message', function(data){
				
				socket.emit('send:message', {
						user: name,
						text: data.text
				});
				socket.broadcast.emit('send:message', {
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

						// io.sockets.in('testroom').emit('change:name', {
						// 		oldName: oldName,
						// 		newName: name
						// });
						socket.emit('change:name', {
								oldName: oldName,
								newName: name
						})
						socket.broadcast.emit('change:name', {
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



