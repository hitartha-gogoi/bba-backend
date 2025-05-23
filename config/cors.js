const productionUrl = ""
const localHostUrl = "http://localhost:8080"
const socketAdminUrl = "https://admin.socket.io"
const socketUrl = "http://localhost:8080"

const corsOptions = {
    origin: [ localHostUrl],
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
    credentials: true,
  };

  export const corsConfig = {
    origin: [socketUrl, socketAdminUrl],
    methods: ["GET", "POST"],
    credentials: true,
  }

export default corsOptions
  