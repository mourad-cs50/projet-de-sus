let modalcontainer = document.querySelector('.modalcontainer');
let insidemodalcontainer = document.querySelector('.insidemodalcontainer');
let addnewbtn = document.querySelector('.add-new');
let cancelbutton = document.querySelector('#cancelbutton');
let section = document.querySelector('.section');
let addexperiencebtn = document.querySelector('#addexperiencebtn');
let submitbtn = document.querySelector('#submitbtn');
let workerName = document.querySelector('#workerName');
let workerRole = document.querySelector('#workerRole');
let closeexperienceTable = document.querySelector('#closeexperienceTable')
let inputImage = document.querySelector('#inputImage');
let imageURl = document.querySelector('#imageURl');



addnewbtn.addEventListener('click', () => {
    openModal()
})
cancelbutton.addEventListener('click', () => {
    closeModal()
})


addexperiencebtn.addEventListener('click', () => {
    showFirstExperience();
})

addnewbtn.addEventListener('click', () => {
    hideexperiencesbare ();
});

submitbtn.addEventListener('click', addnewworker);

imageURl.addEventListener('input' ,UpdateimageProfile );

function openModal() {

    modalcontainer.style.visibility = 'visible';
    modalcontainer.style.display = 'flex';

}

function closeModal() {
    modalcontainer.style.display = 'none';

}


function UpdateimageProfile (){
    inputImage.setAttribute("src" , imageURl.value.trim());

}


function showFirstExperience() {
    const experienceDiv = document.createElement('div')
    experienceDiv.className = 'insidemodalcontainer'


    experienceDiv.innerHTML = ` <button id = "closeexperienceTable">X</button>
     <h4>Company:</h4>   
<input type="text">
 <h4>Role:</h4>   
<input type="text">
 <h4>From:</h4>   
<input type="date">
 <h4>To:</h4>   
<input type="date">
`;
    addexperiencebtn.after(experienceDiv)
    console.log(experienceDiv)

}


document.addEventListener('click', function(e) {
    if (e.target.id === 'closeexperienceTable') {
        e.target.parentElement.remove(); 
    }
});

function hideexperiencesbare () {
document.querySelectorAll('.insidemodalcontainer:not(:first-child)').forEach(div => div.remove());
    openModal();
}
  


let Workers = [];

function addnewworker () {
    
    let newworkers = {
     Name : workerName.value,
     Role : workerRole.value,
     Image : imageURl.value,
     
    }

    Workers.push(newworkers);
    console.log(Workers);
    hideform.reset();
}



   

    




