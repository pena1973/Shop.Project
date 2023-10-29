import express, { Express } from "express";

const host = process.env.LOCAL_PATH;    
const port = Number(process.env.LOCAL_PORT);

export function initServer(): Express {
  const app = express();

  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });
   
  const jsonMiddleware = express.json();
  app.use(jsonMiddleware);

  app.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
  });

  return app;
}