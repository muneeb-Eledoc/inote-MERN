const connectTomongo = require("./db");
const express = require('express')
const cors = require("cors")
connectTomongo();
const app = express()
app.use(express.urlencoded({extended: false}))
const port = 4000;

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})