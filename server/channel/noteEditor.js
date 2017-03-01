import User from '../models/User';


module.exports = function(socket){

	var io = this;
	var to = socket.id;

  console.log('/noteEditor channel connection success')
  socket.on('joinroom', function(data){
  	console.log('Joinroom SUCEESS')
  	socket.join(1)
  })
  socket.on('getslate', function(state){
  	console.log('getSlate SUCEESS')
  	socket.broadcast.to(1).emit('sendslate', state.data.content) 




 






}