import Chatuser from '../models/Chatuser';
let students = {};
// export function for listening to the socket
module.exports = function(socket, io) {

		console.log('/chat channel connection success', socket.id)
		var name =  `GuestID ${socket.id.split('/chat#')[1]}`

		students[name] = socket.id;

		// check the connection
		socket.emit('connectMsg', 'hi');

		// send the new user their name and a list of users
		socket.on('init', function(){
				socket.emit('init', { name: name })
		})
		
		// testing for private message
		socket.on('user:clicked', function(data){
				console.log(data.student, data.msg, students[data.student]);
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
						user: data.user,
						text: data.text
				})

					
		});


		// clean up when a user leaves, and broadcast it to otehr users
		socket.on('disconnect', function(){
				socket.broadcast.emit('user:left', {
						name: name
				});
				// userNames.free(name);
		});
};



