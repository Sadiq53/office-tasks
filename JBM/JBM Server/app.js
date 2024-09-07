const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./config/allRoutes')
const upload = require('express-fileupload');

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.use(upload());
app.use(routes);

const port = 8080;
app.listen(port, (req, res)=>{
    console.log("server running with port | "+port)
})