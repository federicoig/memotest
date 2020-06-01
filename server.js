let express = require("express")
let app = express()
let port = process.env.PORT || 5000

app.use(express.static("public"))

app.listen(port, function () {
    console.log("running server")
})