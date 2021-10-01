const socket = require("socket.io-client")("52.73.116.190:9002");

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
