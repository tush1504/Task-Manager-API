const express = require("express")
const app = express()
const tasks = require("./routes/tasks.js")
const connectDB = require("./db/connect.js")
const path = require("path")
const cors = require("cors")
require("dotenv").config()
const notFound = require("./middleware/not-found.js")
const errorHandler = require("./middleware/error-handler.js")

// middleware


app.use(express.static('./public'));
app.use(express.json())

// routes
// 1-> get all the task ("api/v1/tasks")
// 2->create a new Task ("api/v1/tasks")
// 3-> get a single task ("api/v1/tasks/:id")
// 4-> update task ("api/v1/tasks/:id")
// 5-> delete task ("api/v1/tasks/:id")

app.use("/api/v1/tasks" , tasks)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , () => console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()  

