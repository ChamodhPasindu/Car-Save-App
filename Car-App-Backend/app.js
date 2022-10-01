const express = require('express')

const user=require('./routes/user')
const vehicle=require('./routes/vehicle')

const app = express()
const port = 4000

app.use(express.json())

app.use('/user',user)
app.use('/vehicle',vehicle)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
