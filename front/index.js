//function add data to tasks with method post
const addData = () => {
    let title = document.getElementById('title').value;
    let instruction = document.getElementById('instruction').value;
    let data = { title, instruction }

    fetch('http://localhost:3333/tasks/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => location.reload())
        .catch((error) => {
            console.error('Error:', error);
        });
}

//function render form section and send data with addData function
const formSection = () => {
    return (
        `
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>
        <form onsubmit="addData()" target="dummyframe">
            <input type="text" name="title" id="title">
            <input type="text" name="instruction" id="instruction">
            <input type="submit">
        </form>
        `
    )
}

//function get tasks and call tasks in loop
const getTasks = async () => {
    let arr = []
    await fetch('http://localhost:3333/tasks')
        .then(async data => {
            return data.json()
        })
        .then(data => {
            data.map(data => {
                arr.push(taskSection(data))
            })
        })
    return arr.join(" ")
}

//function render task and calling from getTasks() function
const taskSection = (tasks) => {
    return (
        `<div>
            <h1>${tasks.title}</h1>
            <button onclick='edit("${tasks._id}")'>Edit</button>
            <button onclick='deleteElement("${tasks._id}")'>Delete</button>
            <hr>
        </div>
        `
    )
}

//function render edit route for single task and send data
const edit = (id) => {
    fetch('http://localhost:3333/tasks/edit/' + id).then(data => {
        data.json().then(data => {
            console.log(data)
            const main = document.querySelector('#main')
            const update = updateSection(data)
            main.innerHTML = update
        })

    })
}

//function render update form and calling from edit() function
const updateSection = (mydata) => {
    return (
        `
        <iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe"></iframe>
        <form onsubmit="putData()" target="dummyframe">
            <input type="hidden" value="${mydata._id}" name="id" id="uid">
            <input type="text" value="${mydata.title}" name="title" id="utitle">
            <input type="text" value="${mydata.instruction}" name="instruction" id="uin">
            <input type="submit">
        </form>
        `
    )
}

//function updating data
const putData = () => {
    let id = document.getElementById('uid').value;
    let title = document.getElementById('utitle').value;
    let instruction = document.getElementById('uin').value;
    let data = { id, title, instruction }

    fetch('http://localhost:3333/tasks/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => location.reload())
        .catch((error) => {
            console.error('Error:', error);
        });
}

//function delete task
const deleteElement = async (id) => {
    console.log(id)
    await fetch('http://localhost:3333/tasks/delete/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    location.reload()
}

//function render main div 
const mainSection = async () => {
    return (
        `<div id="main" class="main">
            ${formSection()}
        <div class="tasks">
            ${await getTasks()}
        </div>
        </div>
        `
    )
}


const renderUI = async () => {
    const root = document.querySelector('#root')
    const main = await mainSection()
    root.innerHTML = main
}

renderUI()