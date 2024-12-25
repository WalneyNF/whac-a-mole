const board = document.getElementById("board"); // Referência ao tabuleiro
const scoreElement = document.getElementById("score"); // Referência ao elemento de pontuação
const restartButton = document.getElementById("restartButton"); // Referência ao botão de reiniciar
let currMoleTile; // Tile atual do mole
let currPlantTile; // Tile atual da planta
let score = 0; // Pontuação do jogador
let gameOver = false; // Estado do jogo
let moleInterval; // Intervalo para o mole
let plantInterval; // Intervalo para a planta

// Inicia o jogo quando a página carrega
window.onload = function () {
    setGame();
};

// Configura o jogo
function setGame() {
    // Cria as tiles do tabuleiro
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.classList.add("tile");
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    // Inicia os intervalos para o mole e a planta
    moleInterval = setInterval(setMole, 1000); // Mole aparece a cada 1 segundo
    plantInterval = setInterval(setPlant, 2000); // Planta aparece a cada 2 segundos

    // Adiciona o evento de clique ao botão de reiniciar
    restartButton.addEventListener("click", restartGame);
}

// Gera uma tile aleatória
function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

// Adiciona o mole a uma tile aleatória
function setMole() {
    if (gameOver) return;

    // Remove o mole da tile atual, se existir
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    // Gera uma nova tile aleatória
    let num = getRandomTile();

    // Verifica se a tile já contém a planta
    if (currPlantTile && currPlantTile.id === num) {
        return; // Tenta novamente
    }

    // Adiciona o mole à nova tile
    currMoleTile = document.getElementById(num);
    const mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.classList.add("mole");
    currMoleTile.appendChild(mole);
}

// Adiciona a planta a uma tile aleatória
function setPlant() {
    if (gameOver) return;

    // Remove a planta da tile atual, se existir
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    // Gera uma nova tile aleatória
    let num = getRandomTile();

    // Verifica se a tile já contém o mole
    if (currMoleTile && currMoleTile.id === num) {
        return; // Tenta novamente
    }

    // Adiciona a planta à nova tile
    currPlantTile = document.getElementById(num);
    const plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.classList.add("plant");
    currPlantTile.appendChild(plant);
}

// Lida com o clique em uma tile
function selectTile() {
    if (gameOver) return;

    // Verifica se o jogador clicou no mole
    if (this === currMoleTile) {
        score += 10; // Aumenta a pontuação
        scoreElement.innerText = score.toString(); // Atualiza o placar
        this.innerHTML = ""; // Remove o mole da tile
        currMoleTile = null; // Reseta a tile atual do mole
    }
    // Verifica se o jogador clicou na planta
    else if (this === currPlantTile) {
        scoreElement.innerText = `GAME OVER: ${score}`; // Exibe a pontuação final
        gameOver = true; // Encerra o jogo
        clearInterval(moleInterval); // Para o intervalo do mole
        clearInterval(plantInterval); // Para o intervalo da planta
    }
}

// Reinicia o jogo
function restartGame() {
    // Reseta as variáveis
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;

    // Limpa o tabuleiro
    board.innerHTML = "";

    // Reinicia o jogo
    setGame();
    scoreElement.innerText = "0"; // Reseta o placar
}
