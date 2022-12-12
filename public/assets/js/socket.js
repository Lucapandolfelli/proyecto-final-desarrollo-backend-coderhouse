const socket = io();

export const loadMessages = (callback) => {
  socket.on("messages", callback);
};
