import express from 'express';
import {createServer} from 'http'
import cors from 'cors' 
import router from './controller/whatsappApi.js'; 

const app = express();
const server = createServer(app)
const port = 3000;

app.use(
    cors({
      credentials: true,
    })
  );

  app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/send-pdf", router);

server.listen(port, () =>{
    console.log(`server is listening to port http://localhost:${port}`);
});