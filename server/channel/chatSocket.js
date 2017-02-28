import Chatuser from '../models/Chatuser';
var count = 1;
// export function for listening to the socket
module.exports = function(socket, io) {

		console.log('/chat channel connection success')

		var name =  `Guest ID ${socket.id.slice(18)}`
	
		socket.emit('connectMsg', 'hi');
		socket.on('init', function(){
				socket.emit('init', { name: name })
		})
		// send the new user their name and a list of users
		// socket.on('init', function(msg){
		// 	console.log('헐?')
			
		// })
		
		
		

		// notify other clients that a new user has joined
		socket.broadcast.emit('user:join', {
				name: name
		});

		// test joining room
		socket.on('room', function(room){
			console.log('HELLW???')
				socket.join(room);
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
				// io.sockets.emit('send:message', {
				// 	user: data.user,
				// 	text: data.text
				// })
				// socket.emit('send:message', {
				// 		user: data.user,
				// 		text: data.text
				// });
				// 
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



