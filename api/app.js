const express = require('express');
const config = require('./config/config');
   
app = config(express());
require('./database/db.js')

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en purto ${ app.get('port') }`);
})

