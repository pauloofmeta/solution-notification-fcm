import morgan from "morgan";

// Middleware para registrar logs no console
const morganMiddleware = morgan("combined", {
  stream: {
    write: (message: string) => console.log(message.trim()),
  },
});

export default morganMiddleware;
