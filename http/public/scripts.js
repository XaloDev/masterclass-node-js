const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load(){
    const res = await fetch("http://localhost:3000/").then(data => data.json())
    
    res.urls.forEach(element => addElement({...element, firstLoad: true}))
}

load()

function addElement({ name, url, firstLoad }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    const baseUrl = "http://localhost:3000/" + `?name=${name}&url=${url}`

    if(!firstLoad){
        fetch(baseUrl)
    }

    const deleteUrl = "http://localhost:3000/" + `?name=${name}&url=${url}&del=1`

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, deleteUrl)

    li.append(a)
    li.append(trash)
    ul.append(li)

    
}

function removeElement(el, deleteUrl) {
    if (confirm('Are you sure you want to delete?'))
        fetch(deleteUrl)
        el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Fill the field')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('Format the text correctly')

    if (!/^http/.test(url)) 
        return alert("Type the url correctly")

    addElement({ name, url })

    input.value = ""
})