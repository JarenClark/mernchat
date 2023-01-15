const express = require('express')
const app = express();

const PORT = process.env.PORT || 5000

// HOME ROUTE
app.get('/', (req,res) => {
    res.send(`THIS IS FROM BACKEND`)
})

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})