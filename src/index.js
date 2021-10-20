const express = require('express');
const app = express()
// const bodyParser = require('body-parser')
require('./db/mongoose')
const Post = require('./models/posts')
const Work = require('./models/works')
const postsRouter = require('./routers/posts')
const workRouter = require('./routers/work')


app.use(express.json())

// app.use(postsRouter)
app.use(workRouter)


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('port listning up on port ' +port)
})