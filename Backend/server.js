const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const app = require("./App");
const connectToDb = require("./db/db.js");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
  await connectToDb(); // Connect to MongoDB first

  server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}

startServer();
