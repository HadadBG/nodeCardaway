require("dotenv").config();
import app from "./server.js";
const port = process.env.PORT || 4000
  // Server is listening
  app.listen(port, () => {
    console.log("Server on port", port);
  });
