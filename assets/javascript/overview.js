async function fetchParties() {
    const response = await fetch('http://localhost:8080/getAllParties');
    const parties = await response.json();
    return parties;
  }
  fetchParties().then(parties => {
      const total = parties.map(parti => parti.votes).reduce(function(a, b){
        return a + b;
    }, 0);

    console.log(total);

    var ctx = document.getElementById("partiChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: parties.map(parti => parti.name),
        datasets: [{
          label: 'Procentvis fordeling af stemmer for partierne',
          data: parties.map(parti => Math.round(parti.votes/total * 100)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
           //cutoutPercentage: 40,
        responsive: false,
    
      }
    });

  });

  async function fetchCandidates() {
    const response = await fetch('http://localhost:8080/getAllCandidates');
    const candidates = await response.json();
    return candidates;
  }
  fetchCandidates().then(candidates => {
      const total = candidates.map(candidate => candidate.votes).reduce(function(a, b){
        return a + b;
    }, 0);

    console.log(total);

    var ctx = document.getElementById("kandidatChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: candidates.map(candidate => candidate.name),
        datasets: [{
          label: 'Procentvis fordeling af stemmer, for kandidater.',
          data: candidates.map(candidate => Math.round(candidate.votes/total * 100)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
           //cutoutPercentage: 40,
        responsive: false,
    
      }
    });

  });


