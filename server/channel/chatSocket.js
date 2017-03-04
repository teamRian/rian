import Chatuser from '../models/Chat';
let students = {};
// export function for listening to the socket
module.exports = function(socket, io) {

		console.log('/chat channel connection success', socket.id)
		var name =  `GuestID ${socket.id.split('/chat#')[1]}`

		// check the connection
		socket.emit('connectMsg', 'hi');

		// send the new user their name and a list of users
		socket.on('init', function(){
				if(students[name]) {
					return;
				} else {
					students[name] = socket.id;
					socket.emit('init', { name: Object.keys(students) });	
				}
		})
		
		// testing for private message
		socket.on('user:clicked', function(data){
				socket.broadcast.to(students[data.student]).emit('private msg', data.msg, name);
				
		})

		// notify other clients that a new user has joined
		socket.broadcast.emit('user:join', {
				name: name
		});

		// test joining room
		socket.on('join', function(data){
			console.log('HELLW???', data)
				socket.join(data.studentId);
		})


		
		// broadcast a user's message to other users

		socket.on('send:message', function(data){
				// Chatuser.create({messages: {
				// 	user: name,
				// 	text: data.text
				// 	}
				// }, function(err, data){
				// 		if(err) return console.error(err);
				// });
				socket.broadcast.emit('send:message', {
						username: data.username,
						text: data.text,
						date_added: data.date_added
				})

					
		});


		// clean up when a user leaves, and broadcast it to otehr users
		socket.on('disconnect', function(){
				socket.broadcast.emit('user:left', {
						name: name
				});
				delete students[name]
				// userNames.free(name);
		});
};



