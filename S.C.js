let modalcontainer = document.querySelector(".modalcontainer");
let insidemodalcontainer = document.querySelector(".insidemodalcontainer");
let addnewbtn = document.querySelector(".add-new");
let cancelbutton = document.querySelector("#cancelbutton");
let section = document.querySelector(".section");
let addexperiencebtn = document.querySelector("#addexperiencebtn");
let submitbtn = document.querySelector("#submitbtn");
let workerName = document.querySelector("#workerName");
let workerRole = document.querySelector("#workerRole");
let closeexperienceTable = document.querySelector("#closeexperienceTable");
let inputImage = document.querySelector("#inputImage");
let imageURl = document.querySelector("#imageURl");
let hideform = document.querySelector("#hideform");
let experienceINput = document.querySelectorAll(".experienceINput");

addnewbtn.addEventListener("click", () => {
  openModal();
});
cancelbutton.addEventListener("click", () => {
  closeModal();
});

addexperiencebtn.addEventListener("click", () => {
  showFirstExperience();
});

addnewbtn.addEventListener("click", () => {
  hideexperiencesbare();
});

submitbtn.addEventListener("click", addnewworker);

imageURl.addEventListener("input", UpdateimageProfile);

// showInFoBtn.addEventListener('click', showALldata);

function openModal() {
  modalcontainer.style.visibility = "visible";
  modalcontainer.style.display = "flex";
}

function closeModal() {
  modalcontainer.style.display = "none";
  hideform.reset();
  inputImage.src = "";
}

function UpdateimageProfile() {
  inputImage.setAttribute("src", imageURl.value.trim());
}

function showFirstExperience() {
  const experienceDiv = document.createElement("div");
  experienceDiv.className = "insidemodalcontainer";

  experienceDiv.innerHTML = ` <button id = "closeexperienceTable">X</button>
     <h4>Company:</h4>   
<input class="experienceINput" type="text">
 <h4>Role:</h4>   
<input class="experienceINput" type="text">
 <h4>From:</h4>   
<input class="experienceINput" type="date">
 <h4>To:</h4>   
<input class="experienceINput" type="date">
`;
  addexperiencebtn.after(experienceDiv);
  console.log(experienceDiv);
}

document.addEventListener("click", function (e) {
  if (e.target.id === "closeexperienceTable") {
    e.target.parentElement.remove();
  }
});

function hideexperiencesbare() {
  document
    .querySelectorAll(".insidemodalcontainer:not(:first-child)")
    .forEach((div) => div.remove());
  openModal();
}

let workers = [];

function addnewworker() {
  let newWorker = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    Name: workerName.value,
    Role: workerRole.value,
    Image: imageURl.value,
    Experiences: [],
  };

  document.querySelectorAll(".insidemodalcontainer").forEach((div) => {
    const inputs = div.querySelectorAll(".experienceINput");

    newWorker.Experiences.push({
      Company: inputs[0].value,
      Role: inputs[1].value,
      From: inputs[2].value,
      To: inputs[3].value,
    });
  });

  workers.push(newWorker);
  showAsideData();
  document
    .querySelectorAll(".experienceINput")
    .forEach((input) => (input.value = ""));
  hideform.reset();
  inputImage.src = "";
  console.log(workers);
}

function showAsideData() {
  const workersListCountainer = document.querySelector(
    "#workersListCountainer"
  );


  workersListCountainer.innerHTML = "";

  workers.forEach((worker) => {
    const readdata = document.createElement("div");
    readdata.className = "showinfo";

    readdata.innerHTML = `
                <img src="${worker.Image}">
                <h4>${worker.Name}</h4>
                <button data-id="${worker.id}" class="showInFoBtn">Show</button>
            `;

    workersListCountainer.appendChild(readdata);
  });

  const mylog = document.querySelectorAll(".showInFoBtn");

  
  mylog.forEach((btn) => {
   
    console.log(btn);
    btn.addEventListener("click", (e) => {
      console.log(e.target);
      
    });

    // btn.addEventListener('click', showWorkerInfo(id))
  });
}

// function showWorkerInfo (id){

// chercher f lista bdak id o tle3 les info dyalu f mpodal mni tl9ah

//   const showData = document.createElement('div');
//   showData.className = 'showAllInformation';

//   showData.innerHTML = ` <div class="showAllInformation">
//     <h3>name:</h3>
//     <p>Mourad</p>
//     <h3>Role:</h3>
//     <p>reciptions</p>
//      <h3>Profile:</h3>
//      <img src="8380015.jpg" alt="">
//      <div>
//         <h3>Experiences</h3>
//      </div>
// </div>
// `;

//  divtoshowinfo.innerHTML= show;

// }
