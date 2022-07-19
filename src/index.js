const dog_bar = document.querySelector('#dog-bar')
URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", init)

// Manipulting DOM
function init(event){
    const filterDogsButton = document.querySelector("#good-dog-filter")
    filterDogsButton.addEventListener("click", toggleFilterDogs)
    getDogs().then(addAllDogstoBar)

}

function toggleFilterDogs(event){
    const filterDogsButton = document.querySelector("#good-dog-filter")
    if (filterDogsButton.innerText.includes("OFF")){
        filterDogsButton.innerText = "Filter Dogs ON"
        updateDogBar()
    } else {
        filterDogsButton.innerText = "Filter good dogs: OFF"
        updateDogBar()
    }
}

function addAllDogstoBar(dogs){
    dogs.forEach(dog => addDogSpantoBar(dog))
}

function addDogSpantoBar(dog){
    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.dataset.id = dog.id

    dogSpan.addEventListener("click", onDogSpanClick)

    dogBar.append(dogSpan)
}

function onDogSpanClick(event){

    getOneDog(event.target.dataset.id)
    .then(showDogInfo)
}

function showDogInfo(dog){
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ""
    
    const dogName = document.createElement('h2')
    dogName.innerText = dog.name

    const dogImg = document.createElement('img')
    dogImg.src = dog.image

    const dogButton = document.createElement("button")
    dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogButton.dataset.id = dog.id
    dogButton.addEventListener("click", onDogButtonClick)

    dogInfo.append(dogImg, dogName, dogButton)
}

function onDogButtonClick(event){
    let newVal; 
    if (event.target.innerText === "Good Dog!"){
        event.target.innerText = "Bad Dog!"
        newVal = false
    } else {
        event.target.innerText = "Good Dog!"
        newVal = true
    }
    updateDog(event.target.dataset.id, newVal)
}


// Fetches
function getDogs() {
    return fetch ("http://localhost:3000/pups")
    .then(res => res.json())
}

function getOneDog(id) {
    return fetch (`http://localhost:3000/pups/${id}`)
    .then(res => res.json())

}

function toggleGoodDopg(id, newVal){
    return fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newVal
        })
    })
    .then (res => res.json())
}

