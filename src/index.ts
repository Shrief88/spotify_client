import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const {PORT} = process.env;

const app = express();
const port = parseInt(PORT as string);
const host = "localhost";

app.get('/',(req,res)=>{
  res.send('testing....')
})

app.listen(port,host,()=>{
  console.log(`Express app is listening on: http://${host}:${port}`);
})