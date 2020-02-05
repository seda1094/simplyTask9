const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose") 
const Task = require("./models/task")
var cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks);
        
    } catch (e) {
        console.log(e)
    }
});

app.post("/tasks/add", async (req, res) => {
    console.log(req.body);
        const task = Task({
        title: req.body.title,
        instruction: req.body.instruction,
    })
    try {
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        console.log(e)
    }
});

app.get("/tasks/edit/:id", async (req, res) => {
    // console.log("sdfjkhk");
    // console.log(req.params.id);
    try {
        // console.log("sendddd");
        const task = await Task.findById(req.params.id)
        res.status(200).send(task);
    }
    catch (e) {
        console.log(e)
    }
});

app.put("/tasks/edit", async (req, res) => {
    // console.log(req);
    try {
        const { id } = req.body
        delete req.body.id
        const task = await Task.findById(id)
        Object.assign(task, {
            title: req.body.title,
            instruction: req.body.instruction
        })
        await task.save()
        res.status(200).send(task)


    } catch (e) {
        console.log(e)
    }
});


app.delete("/tasks/delete/:id", async (req, res) => {
    // console.log(req.params.id);
    try {
        await Task.deleteOne({
            _id: req.params.id
        })
        res.status(200).send("success")
    } catch (e) {
        console.log(e)
    }
});

async function start() {
    const url = "mongodb+srv://seda1094:aaaa@cluster0-vzrkd.mongodb.net/todo";
    const PORT = process.env.PORT || 3333
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (e) {
        console.log(e)
    }
}

start()
