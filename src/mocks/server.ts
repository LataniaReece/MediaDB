import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

server.events.on("request:start", (req) => {
  console.log("new request:", req.method, req.url.href);
});
