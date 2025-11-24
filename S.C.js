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
let zoneBtn1 = document.querySelector("#zoneBtn1");

const employeeModal = document.getElementById("employeeModal");
const employeesContainer = document.getElementById("employeesContainer");
const closeEmployeeModal = document.getElementById("closeEmployeeModal");
let currentBox = null;


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

submitbtn.addEventListener("click", () => {
  if (formValidation()) {
    addnewworker();
  }
});


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

function formValidation() {
  let isValid = true;

  document.querySelectorAll("input").forEach((input) => {
    input.style.border = "1px solid #ccc";
  });

 
  let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,}$/;
  if (!nameRegex.test(workerName.value.trim())) {
    workerName.style.border = "2px solid red";
    isValid = false;
  }


  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(workerEmail.value.trim())) {
    workerEmail.style.border = "2px solid red";
    isValid = false;
  }


 let phoneRegex = /^(06|07|05)[0-9]{8}$/;
if (!phoneRegex.test(workerPhone.value.trim())) {
    workerPhone.style.border = "2px solid red";
    isValid = false;
}

  

    if ( imageURl.value.trim() === '') {
        imageURl.style.border = "2px solid red";
        isValid = false;
    }


 if (workerRole.value.trim() === '') {
        workerRole.style.border = "2px solid red";
        isValid = false;
    }
 
  document.querySelectorAll(".insidemodalcontainer:not(:first-child)").forEach((div) => {
    const inputs = div.querySelectorAll(".experienceINput");

    inputs.forEach((inp) => {
      if (inp.value.trim() === "") {
        inp.style.border = "2px solid red";
        isValid = false;
      }
    });
  });

  if (!isValid) {
       alert('the inputs are empty or you dont respect the form');
  }

  return isValid;
}


// ربط أزرار + للبوكسات
document.querySelectorAll(".box button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const box = e.target.parentElement;
    currentBox = box;
    const boxId = box.id;
    const roleMap = {
      box1: "Confirence Room",
      box2: "Reception",
      box3: "Servers Room",
      box4: "Security Room",
      box5: "Staff Room",
      box6: "Vault"
    };
    const currentBoxRole = roleMap[boxId];
    showEmployeeModal(currentBoxRole);
  });
});


function showEmployeeModal(boxRole) {
  employeesContainer.innerHTML = "";
  const filteredWorkers = workers.filter(worker => worker.Role === boxRole);

  filteredWorkers.forEach(worker => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <img src="${worker.Image || '8380015.jpg'}" width="40" height="40">
      <span>${worker.Name}</span>
      <button class="addEmployeeBtn">Add</button>
    `;
    employeesContainer.appendChild(card);

    card.querySelector(".addEmployeeBtn").addEventListener("click", () => {
      addEmployeeToBox(worker);
    });
  });

  employeeModal.style.display = "flex";
}


document.querySelectorAll(".box button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const box = e.target.parentElement;
    currentBox = box;
    const boxId = box.id;
    const roleMap = {
      box1: "Confirence Room",
      box2: "Reception",
      box3: "Servers Room",
      box4: "Security Room",
      box5: "Staff Room",
      box6: "Vault"
    };
    const currentBoxRole = roleMap[boxId];
    showEmployeeModal(currentBoxRole);
  });
});


function showEmployeeModal(boxRole) {
  employeesContainer.innerHTML = "";
  const filteredWorkers = workers.filter(worker => worker.Role === boxRole);

  filteredWorkers.forEach(worker => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <img src="${worker.Image || '8380015.jpg'}" width="40" height="40">
      <span>${worker.Name}</span>
      <button class="addEmployeeBtn">Add</button>
    `;
    employeesContainer.appendChild(card);

    card.querySelector(".addEmployeeBtn").addEventListener("click", () => {
      addEmployeeToBox(worker);
    });
  });

  employeeModal.style.display = "flex";
}


function addEmployeeToBox(worker) {
  if (!currentBox) return;

  const roleMap = {
    box1: "Confirence Room",
    box2: "Reception",
    box3: "Servers Room",
    box4: "Security Room",
    box5: "Staff Room",
    box6: "Vault"
  };
  
 
  const existingWorker = Array.from(currentBox.querySelectorAll(".workerZonecard")).some(card => {
    return card.querySelector("h3").textContent === worker.Name;
  });
  if (existingWorker) {
    alert("This worker is already assigned");
    return;
  }

  const workerCard = document.createElement("div");
  workerCard.className = "workerZonecard";
  workerCard.innerHTML = `
  <img src="${worker.Image}" alt="">
  <h3>${worker.Name}</h3>
  `;
  currentBox.appendChild(workerCard);

  const modalCards = Array.from(employeesContainer.querySelectorAll(".employee-card"));
  modalCards.forEach(card => {
    if (card.querySelector("span").textContent === worker.Name) {
      card.remove();
    }
  });
}

closeEmployeeModal.addEventListener("click", () => {
  employeeModal.style.display = "none";
});




