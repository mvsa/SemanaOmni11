const express = require('express'); 
const cors = require('cors');
const { errors} = require('celebrate')
const routes = require('./routes');

const app = express();
app.use(cors(
    //origin: 'httP/linkdofrontendhospedad'
));
app.use(express.json()); //informa ao app que vamos usar json no corpo das req
app.use(routes);
app.use(errors());


app.listen(3333);





