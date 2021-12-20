async function fetchParties() {
    const response = await fetch('http://localhost:8080/getAllParties');
    const parties = await response.json();
    return parties;
  }
  fetchParties().then(parties => {
    const partiesTable = document.getElementById("parties");

    parties.map(candidate => {
        const tr = document.createElement("tr");

        const id = document.createElement("th");
        id.scope = "row";
        id.innerText = candidate.id;
        tr.appendChild(id);

        const name = document.createElement("td");
        const aTag = document.createElement("a");
        aTag.href = `/parti.html?id=${candidate.id}`;
        aTag.innerText = candidate.name;
        name.appendChild(aTag);
        tr.appendChild(name)

        const votes = document.createElement("td");
        votes.innerText = candidate.votes;
        tr.appendChild(votes);

        partiesTable.appendChild(tr);
    })

  });