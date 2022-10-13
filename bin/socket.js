var ws = require("nodejs-websocket");
console.log("开始建立连接...");
let users = []
let haveusers = []
function broadcast(server, msg) {
	users.forEach(function(conn) {
		conn.sendText(msg)
	})
}
function addUser(user){
	let id = user.path.split('=')[1]
	let index = haveusers.includes(id)
	if(index){
		users = users.slice(index,1)
		haveusers = haveusers.slice(index,1)
		users.push(user)
		haveusers.push(id)
	}else{
		users.push(user)
		haveusers.push(id)
	}
}
var server = ws
	.createServer(function(conn) {
		addUser(conn)
		console.log(haveusers)
		conn.on("text", function(str) {
			broadcast(server, '广播' + str)
			conn.sendText(str);
		});
		conn.on("connect", function(code) {
			console.log("连接成功");
		});
		conn.on("close", function(code, reason) {
			console.log("关闭连接");
		});
		conn.on("error", function(code, reason) {
			console.log("异常关闭");
		});
	})
	.listen(8001);
