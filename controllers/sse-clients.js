// utils/sse-clients.js

let clients = [];

export const addClient = (res) => {
  clients.push(res);
};

export const removeClient = (res) => {
  clients = clients.filter((client) => client !== res);
};

export const broadcast = (data) => {
  clients.forEach((res) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

export { clients }