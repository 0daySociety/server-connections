document.addEventListener("DOMContentLoaded", initialize);

// for initializing our code
function initialize() {
  fetchingFromSever();
  console.log("render method");
  getUser();
}
// the function containing the fetch method
function fetchingFromSever() {
  fetch("http://localhost:3000/sample")
    .then((response) => response.json())
    .then((data) => data.forEach((animal) => renderOneAnimal(animal)));
}

// for rendering your code to the dom
function renderOneAnimal(animal) {
  let myElement = document.createElement("div");
  myElement.className = "animals";
  document.body.append(myElement);

  let listItem = document.createElement("ul");
  listItem.id = "listItem";
  myElement.appendChild(listItem);

  let imagesUrl = document.createElement("img");
  imagesUrl.id = "jsImage";
  imagesUrl.src = animal.image;
  imagesUrl.href = "not available";
  myElement.appendChild(imagesUrl);

  let AnimalDescription = document.createElement("li");
  AnimalDescription.id = "AnimalType";
  AnimalDescription.textContent = `${animal.description}`;
  myElement.appendChild(AnimalDescription);

  let Donations = document.createElement("p");
  Donations.innerText = `${animal.donations} only`;
  myElement.append(Donations);


  let buttonsSection=document.createElement("div");
  buttonsSection.id="actionBtn";
  myElement.appendChild(buttonsSection);

  //created a delete button  
  let deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteBtn";
  deleteBtn.innerText = "delete";
  buttonsSection.appendChild(deleteBtn);
// add an event listener to the button  to trigger the delete

deleteBtn.addEventListener("click",(e)=>{
  e.preventDefault(),
  myElement.remove()
  // hande the delete in the server side 
  deleteAction(animal);
})








  let updateBtn = document.createElement("button");
  updateBtn.id = "dontationsBtn";
  updateBtn.innerText = "Donate";
  buttonsSection.appendChild(updateBtn);



  // adding functionality to the donate button
  updateBtn.addEventListener("click", (e) => {
    animal.donations ++;
    Donations.innerText=`${animal.donations}`
    e.preventDefault(),
      fetch(`http://localhost:3000/sample/${animal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animal),
      })
      .then(response=>response.json())
       .then(data=>console.log(data))
    
  });
}

function getUser() {
  let form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let userImg = e.target.imgUser.value;
    let userDescription = e.target.userType.value;
    let userAmount = e.target.userDonation.value;

    //  creating an array of the data we got from the form
    let formData = {
      image: userImg,
      description: userDescription,
      donations: userAmount,
    };
    form.reset();
    // passing the data to a function so as to render the data to the dom

    // creating  a function to add the data to the server

    sendToServer(formData);
    renderOneAnimal(formData);
    console.log("i am listening ");
  });
}

function sendToServer(formData) {
  let url = "http://localhost:3000/sample";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// delete function
function deleteAction(animalData){
  fetch(`http://localhost:3000/sample/${animalData.id}`,{
    method:"DELETE",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(animalData)

  })
  .then(response=>response.json())
  .then(data=>renderOneAnimal(animalData))
}
