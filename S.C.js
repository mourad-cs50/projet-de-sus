let modalcontainer = document.querySelector('.modalcontainer');
let insidemodalcontainer = document.querySelector('.insidemodalcontainer');
let addnewbtn = document.querySelector('.add-new');
let cancelbutton = document.querySelector('#cancelbutton');
let section = document.querySelector('.section');

function openmodal(){
addnewbtn.addEventListener('click', ()=> {
    modalcontainer.style.display = 'block';
    modalcontainer.style.display = 'flex'; 
    
} )

}

function closemodal (){
cancelbutton.addEventListener('click', ()=> {
    modalcontainer.style.display = 'none';
} )
}

openmodal()
closemodal ()




