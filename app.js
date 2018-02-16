document.getElementById('getText').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getPosts').addEventListener('click', getPosts);
document.getElementById('addPost').addEventListener('submit', addPost);


function getText(){
    fetch('sample.txt')
    .then(res => res.text())
    .then(data => {
        document.getElementById('output').innerHTML = data
    })
    .catch(err => console.error(err))
}


function getUsers(){
    fetch('users.json')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>Users</h2>';
        data.forEach(user => {
            output += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>
            `
        })
        document.getElementById('output').innerHTML = output
    })
}


function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        let output = '<h2>Posts</h2> <div class="row">';
        data.forEach(post => {
            output += `
                <div class="col s12">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${post.title}</span>
                            <p>${post.body}</p>
                        </div>
                    </div>
                </div>
            `
        })
        output += `</div>`
        document.getElementById('output').innerHTML = output
    })
}


function addPost(e){
    e.preventDefault();

    let title = document.getElementById('title').value
    let body = document.getElementById('body').value

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json' 
        },
        body: JSON.stringify({
            title: title,
            body: body
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById('title').value = "";
        document.getElementById('body').value = "";
    })
}