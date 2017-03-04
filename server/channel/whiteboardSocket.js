module.exports = function(socket){

	let io = this;
	let to = socket.id;
	
	socket.on('hi', function(msg){
		console.log('client msg hi!!!1')
		io.emit('ioMsg', 'ioMsg');	
	})
  console.log('/whiteboard channel connection success')
  socket.emit('connectMsg', 'We Are Connected!!');

  socket.on('editorState', function (editorState) {
    //console.log(editorState)
    //socket.emit('editorState', editorState); // 현재 연결된 socket 에만 send함
    socket.broadcast.emit('editorState', editorState); // 서버에 연결된 모든 socket에 send함(자신 제외!)
    
  });
}