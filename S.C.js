let modalcontainer = document.querySelector(".modalcontainer");
let insidemodalcontainer = document.querySelector(".insidemodalcontainer");
let addnewbtn = document.querySelector(".add-new");
let cancelbutton = document.querySelector("#cancelbutton");
let section = document.querySelector(".section");
let addexperiencebtn = document.querySelector("#addexperiencebtn");
let submitbtn = document.querySelector("#submitbtn");
let workerName = document.querySelector("#workerName");
let workerEmail = document.querySelector("#workerEmail");
let workerPhone = document.querySelector("#workerPhone");
let workerRole = document.querySelector("#workerRole");
let closeexperienceTable = document.querySelector("#closeexperienceTable");
let inputImage = document.querySelector("#inputImage");
let imageURl = document.querySelector("#imageURl");
let hideform = document.querySelector("#hideform");
let experienceINput = document.querySelectorAll(".experienceINput");
let cancelInfomodal = document.querySelector("#cancelInfomodal");


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


function openModal() {
  modalcontainer.style.visibility = "visible";
  modalcontainer.style.display = "flex";
 ;
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
    Email: workerEmail.value,
    Phone: workerPhone.value,
    Role: workerRole.value,
    Image: imageURl.value,
    Experiences: [],
  };

  document.querySelectorAll(".insidemodalcontainer").forEach((div) => {
    const inputs = div.querySelectorAll(".experienceINput");

    newWorker.Experiences.push({
      Company: inputs[0].value,
      exRole: inputs[1].value,
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
      const id = e.target.dataset.id;
      showWorkerInfo(id)
      console.log(e.target);
    });

    // btn.addEventListener('click', showWorkerInfo(id))
  });
}

function showWorkerInfo (id){

// chercher f lista bdak id o tle3 les info dyalu f mpodal mni tl9ah
const worker = workers.find(w => w.id == id )

if (!worker) {
  alert('worker is not found');
  return;
}
  const showData = document.createElement('div');
  showData.className = 'showAllInformation';

  showData.innerHTML = `
  <div class="modal">
    <div class="modal-header">
      <div class="user-info">
        <img src="${worker.Image}" class="profile-img" />
        <div class="name-block">
          <h2> ${worker.Name}</h2>
          <p >${worker.Role}</p>
        </div>
      </div>
    </div>

    <div class="modal-body">
      <label>Phone number</label>
      <div class="input-row">
       <h3>${worker.Phone}</h3>
        
      </div>

      <label>Email address</label>
       <h3>${worker.Email}</h3>

      
      <div>
        <label>Experiences</label>
        ${worker.Experiences.map(exp =>`
          <p>Company:${exp.Company}</p>
        <p>Role:${exp.exRole}</p>
        <p>From:${exp.From}</p>
        <p>To:${exp.To}</p>
          `).join('')}
     </div>
  </div>

  <button id="cancelInfomodal">Cancel</button>
</div>

`;

 document.body.appendChild(showData)
 
 const cancelInfomodal= document.querySelector("#cancelInfomodal");
  cancelInfomodal.addEventListener("click", () => {
    showData.remove();
  });

}
