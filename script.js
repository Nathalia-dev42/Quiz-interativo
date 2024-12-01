let players = [
  { nome: "", pontuacao: 0 },
  { nome: "", pontuacao: 0 }
];

let currentPlayerIndex = 0;
let currentTheme = '';
let currentQuestionIndex = 0;

const questions = {
  filmes: [
    { pergunta: "Qual filme ganhou o Oscar de Melhor Filme em 2020?", opcoes: ["Parasita", "1917", "Coringa", "Era uma vez em Hollywood"], resposta: 0 },
    { pergunta: "Quem dirigiu o filme 'A Origem'?", opcoes: ["Christopher Nolan", "Steven Spielberg", "Quentin Tarantino", "James Cameron"], resposta: 0 },
    { pergunta: "Qual filme é sobre um personagem chamado Andy?", opcoes: ["Toy Story", "Shrek", "Os Incríveis", "Monstros S.A."], resposta: 0 },
    { pergunta: "Quem interpretou o Coringa em 'O Cavaleiro das Trevas'?", opcoes: ["Heath Ledger", "Joaquin Phoenix", "Jared Leto", "Jack Nicholson"], resposta: 0 },
    { pergunta: "Qual é o nome do super-herói que é um homem-aranha?", opcoes: ["Peter Parker", "Clark Kent", "Bruce Wayne", "Tony Stark"], resposta: 0 }
  ],
  jogos: [
    { pergunta: "Qual é o personagem principal da franquia 'The Legend of Zelda'?", opcoes: ["Link", "Zelda", "Mario", "Samus"], resposta: 0 },
    { pergunta: "Em que ano o PlayStation 5 foi lançado?", opcoes: ["2020", "2019", "2021", "2018"], resposta: 0 },
    { pergunta: "Qual jogo é conhecido como o 'Battle Royale' mais popular?", opcoes: ["Fortnite", "PUBG", "Call of Duty", "Apex Legends"], resposta: 0 },
    { pergunta: "Qual é o nome do famoso encanador da Nintendo?", opcoes: ["Mario", "Luigi", "Wario", "Toad"], resposta: 0 },
    { pergunta: "Em que jogo os jogadores coletam criaturas chamadas 'Pokémon'?", opcoes: ["Pokémon", "Digimon", "Monster Hunter", "Dragon Quest"], resposta: 0 }
  ],
  historia: [
    { pergunta: "Em que ano aconteceu a Revolução Francesa?", opcoes: ["1789", "1776", "1804", "1815"], resposta: 0 },
    { pergunta: "Quem foi o primeiro imperador do Brasil?", opcoes: ["Dom Pedro I", "Princesa Isabel", "Marechal Deodoro", "Getúlio Vargas"], resposta: 0 },
    { pergunta: "Qual foi o nome da primeira colônia britânica na América?", opcoes: ["Jamestown", "Plymouth", "Nova York", "Filadélfia"], resposta: 0 },
    { pergunta: "Quem descobriu o Brasil?", opcoes: ["Pedro Álvares Cabral", "Cristóvão Colombo", "Vasco da Gama", "Fernando de Magalhães"], resposta: 0 },
    { pergunta: "Em que ano terminou a Segunda Guerra Mundial?", opcoes: ["1945", "1940", "1939", "1946"], resposta: 0 }
  ],
  musicas: [
    { pergunta: "Qual banda lançou o álbum 'Abbey Road'?", opcoes: ["The Beatles", "The Rolling Stones", "Pink Floyd", "Queen"], resposta: 0 },
    { pergunta: "Quem é conhecido como o 'Rei do Pop'?", opcoes: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"], resposta: 1 },
    { pergunta: "Qual cantor é famoso por 'Shape of You'?", opcoes: ["Ed Sheeran", "Justin Bieber", "Sam Smith", "Bruno Mars"], resposta: 0 },
    { pergunta: "Qual banda é famosa pela canção 'Bohemian Rhapsody'?", opcoes: ["Queen", "Led Zeppelin", "AC/DC", "Pink Floyd"], resposta: 0 },
    { pergunta: "Qual artista é conhecido por seu estilo country e por 'Jolene'?", opcoes: ["Dolly Parton", "Taylor Swift", "Carrie Underwood", "Miranda Lambert"], resposta: 0 }
  ]
};

function savePlayerNames() {
  players[0].nome = document.getElementById('player1').value;
  players[1].nome = document.getElementById('player2').value;

  document.getElementById('nameEntrySection').style.display = 'none';
  document.getElementById('player-info').style.display = 'block';
  document.getElementById('themeSelection').style.display = 'block';

  updatePlayerName();
}

function updatePlayerName() {
  document.getElementById('currentPlayerName').textContent = `Jogador: ${players[currentPlayerIndex].nome}`;
}

function startQuiz(theme) {
  currentTheme = theme;
  currentQuestionIndex = 0;

  document.getElementById("themeTitle").textContent = `Tema: ${theme}`;
  document.getElementById("themeSelection").style.display = 'none';
  document.getElementById('questionSection').style.display = 'block';

  showQuestion();
}

function showQuestion() {
  const themeQuestions = questions[currentTheme];

  if (currentQuestionIndex < themeQuestions.length) {
    const currentQuestion = themeQuestions[currentQuestionIndex];

    document.getElementById("question").textContent = currentQuestion.pergunta;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';

    currentQuestion.opcoes.forEach((opcao, index) => {
      const button = document.createElement("button");
      button.textContent = opcao;
      button.onclick = () => checkAnswer(index);
      optionsDiv.appendChild(button);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedOption) {
  const themeQuestions = questions[currentTheme];
  const correctAnswer = themeQuestions[currentQuestionIndex].resposta;

  if (selectedOption === correctAnswer) {
    players[currentPlayerIndex].pontuacao++;
  }

  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  currentPlayerIndex++;

  if (currentPlayerIndex < players.length) {
    document.getElementById('questionSection').style.display = 'none';
    document.getElementById('themeSelection').style.display = 'block';
    updatePlayerName();
  } else {
    showFinalScores();
  }
}

function showFinalScores() {
  document.getElementById('questionSection').style.display = 'none';
  document.getElementById('themeSelection').style.display = 'none';
  document.getElementById('scoreSection').style.display = 'block';

  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = '';

  players.forEach(player => {
    const playerScore = document.createElement('div');
    playerScore.textContent = `${player.nome}: ${player.pontuacao} pontos`;
    scoreboard.appendChild(playerScore);
  });
}

function restartQuiz() {
  players.forEach(player => player.pontuacao = 0);
  currentPlayerIndex = 0;

  document.getElementById('scoreSection').style.display = 'none';
  document.getElementById('themeSelection').style.display = 'block';

  updatePlayerName();
}
