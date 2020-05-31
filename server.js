let express = require("express")
let app = express()
let port = process.env.PORT || 5000

app.use(express.static("public"))
app.use(express.static("./node_modules/bootstrap/dist/css/bootstrap.min.css"))

app.listen(port, function () {
    console.log("running server")
})