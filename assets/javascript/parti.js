const candidateTable = document.getElementById("kandidater");

var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}

var id = urlParam('id');



async function fetchCandidates() {
    const response = await fetch(`http://localhost:8080/getCandidatesFromParti/${id}`);
    const candidates = await response.json();
    return candidates;
  }
  fetchCandidates().then(candidates => {
    candidates.map(candidate => {
       createCandidateHtml(candidate)
    })

  });

  
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
    parti.innerText = "Nye Borgerelige";
    tr.appendChild(parti);

    candidateTable.appendChild(tr);

  }


  async function fetchParti() {
    const response = await fetch(`http://localhost:8080/getParti/${id}`);
    const parti = await response.json();
    return parti;
  }
  fetchParti().then(parti => {
    const partiTitle= document.getElementById("parti-title");
    const partiVotes = document.getElementById("parti-votes");
    console.log(parti);
    partiTitle.innerText = parti.name;
    partiVotes.innerText = `Stemmer: ${parti.votes}`
    
  });