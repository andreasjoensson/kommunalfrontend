const createKandidatBtn = document.getElementById("save-kandidat")
const editKandidatBtn = document.getElementById("edit-kandidat");
const candidateTable = document.getElementById("kandidater");
let candidateToEdit = 0;
let candidateChosenParti = '';



async function fetchParties() {
    const response = await fetch('http://localhost:8080/getAllParties');
    const parties = await response.json();
    return parties;
  }
  fetchParties().then(parties => {
    const partiesDropdown = document.getElementById("parties-dropdown");

    parties.map(parti => {
        const option = document.createElement("option");
        option.className = "dropdown-item";
        option.innerText = parti.name;
        option.value = parti.id;

        partiesDropdown.appendChild(option);
    })

    const partiesDropdownEdit = document.getElementById("parties-dropdown-edit");
    parties.map(parti => {
        const option = document.createElement("option");
        option.className = "dropdown-item";
        option.innerText = parti.name;
        option.value = parti.id;

        partiesDropdownEdit.appendChild(option);
    })


  });



  async function createCandidate() {
    const name = document.getElementById("kandidat-name").value;
    var partiHtml = document.getElementById("parties-dropdown");
    var parti = partiHtml.value;


    const bodyData = {
    "name": name,
    "votes": 0
  }

    const response = await fetch(`http://localhost:8080/createCandidate/${parti}`,{
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData) 
      });
      await response.json().then(candidate => {
        createCandidateHtml(candidate)
      })
      .catch(err => {
          console.log(err);
      })
  }


  const createCandidateHtml = (candidate) => {
    const tr = document.createElement("tr");
    tr.id = candidate.id;

    const id = document.createElement("th");
    id.scope = "row";
    id.innerText = candidate.id;
    tr.appendChild(id);

    const name = document.createElement("td");
    name.innerText = candidate.name;
    tr.appendChild(name)

    const votes = document.createElement("td");
    votes.innerText = candidate.votes;
    tr.appendChild(votes);

    const parti = document.createElement("td");
    parti.innerText = candidate.parti;
    tr.appendChild(parti);


    const deleteBtnTag = document.createElement("td");
    const deleteBtn = document.createElement("a");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash-alt";
    deleteBtn.appendChild(deleteIcon);
    deleteBtnTag.appendChild(deleteBtn);
    tr.appendChild(deleteBtnTag);
    deleteBtn.style.cursor = "pointer";
    deleteBtn.onclick =function() { deleteCandidate(candidate.id) }; 

    const editBtnTag = document.createElement("td");
    const editBtn = document.createElement("a");
    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-user-edit";
    editBtn.appendChild(editIcon);
    editBtnTag.appendChild(editBtn);
    editBtn.style.cursor = "pointer";
    function openEditModal(){ 
        $("#editModal").modal('toggle'); //see here usage
        candidateToEdit = candidate.id;
    };

    tr.appendChild(editBtnTag);
    editBtn.onclick = function() { 
        openEditModal() 
    }; 

    candidateTable.appendChild(tr);

  }

  
  async function deleteCandidate(id) {

    await fetch(`http://localhost:8080/deleteCandidate/${id}`,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(res => {
        const candidateElement = document.getElementById(`${id}`);
        candidateElement.remove();
      })
      .catch(err => {
         alert("Kunne ikke slette kandidat.")
      })
  }
 
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function myNewFunction(sel) {
  candidateChosenParti = sel.options[sel.selectedIndex].text;
}

  async function editCandidate() {
    const candidateName = document.getElementById("kandidat-name-edit").value;
    const votes = document.getElementById("kandidat-votes-edit").value;
    var partiHtml = document.getElementById("parties-dropdown-edit");
    var parti = partiHtml.value;
    

   const bodyData = {"name":candidateName,"votes":votes};
   const res =  await fetch(`http://localhost:8080/editCandidate/${candidateToEdit}/${parti}`,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(bodyData)
      })
      const candidate = await res.json();
      const candidateElement = document.getElementById(`${candidateToEdit}`);
      removeAllChildNodes(candidateElement);
  
      const id = document.createElement("th");
      id.scope = "row";
      id.innerText = candidate.id;
      candidateElement.appendChild(id);
  
      const name = document.createElement("td");
      name.innerText = candidate.name;
      candidateElement.appendChild(name)
  
      const votesElm = document.createElement("td");
      votesElm.innerText = candidate.votes;
      candidateElement.appendChild(votesElm);
  
      const partiElm = document.createElement("td");
      partiElm.innerText = candidateChosenParti
      candidateElement.appendChild(partiElm);
  
  
      const deleteBtnTag = document.createElement("td");
      const deleteBtn = document.createElement("a");
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash-alt";
      deleteBtn.appendChild(deleteIcon);
      deleteBtnTag.appendChild(deleteBtn);
      candidateElement.appendChild(deleteBtnTag);
      deleteBtn.style.cursor = "pointer";
      deleteBtn.onclick =function() { deleteCandidate(candidate.id) }; 
  
      const editBtnTag = document.createElement("td");
      const editBtn = document.createElement("a");
      const editIcon = document.createElement("i");
      editIcon.className = "fas fa-user-edit";
      editBtn.appendChild(editIcon);
      editBtnTag.appendChild(editBtn);
      editBtn.style.cursor = "pointer";
      function openEditModal(){ 
          $("#editModal").modal('toggle'); //see here usage
          candidateToEdit = candidate.id;
      };
  
      candidateElement.appendChild(editBtnTag);
      editBtn.onclick = function() { 
          openEditModal() 
      }; 
  
      
  }

  createKandidatBtn.addEventListener('click', createCandidate);
  editKandidatBtn.addEventListener('click', editCandidate);

async function fetchCandidates() {
    const response = await fetch('http://localhost:8080/getAllCandidates');
    const candidates = await response.json();
    return candidates;
  }
  fetchCandidates().then(candidates => {
    candidates.map(candidate => {
       createCandidateHtml(candidate)
    })

  });