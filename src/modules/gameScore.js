class GameScore {
  constructor(user, score) {
  this.user = user;
  this.score = score;
}
  
//  stores data in array
scoresData = [];

// API URL
apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yMzG8blKxFRkRarKy24E/scores/';

// Show Scores
showScores = () => {
  const scoresList = document.getElementById('list');
  scoresList.innerHTML = this.scoresData.map((item) => `
  <li>${item.user} : ${item.score}</li>`).join('');
};

// fetching data from API
fetchScores = async () => {
  try {
    const data = await fetch(this.apiURL);
    const response = await data.json();
    this.scoresData = [];
    response.result.map((item) => this.scoresData.push(item));
    this.sortScores(this.scoresData, 'numerical');
    return this.showScores();
  } catch (error) { return error; }
};

// Add a new Score
addNewScore = async ({ user, score }) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    };
       const data = await fetch(this.apiURL, config);
    const response = await data.json();
    this.scoresData.push(response);
    this.sortScores(this.scoresData, 'numerical');
    return this.fetchScores();
  } catch (error) { return error; }
};

// sort Scores
sortScores = (scores, sortMethod) => {
  if (sortMethod === 'alphabetical') {
    scores.sort((a, b) => a.user.localeCompare(b.user));
  } else if (sortMethod === 'numerical') {
    scores.sort((a, b) => b.score - a.score);
  }
}
}

export default GameScore;
