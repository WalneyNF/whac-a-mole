let currMoleTile; // Armazena a tile (quadrado) onde o mole (toupeira) está atualmente
let currPlantTile; // Armazena a tile onde a planta está atualmente
let score = 0; // Pontuação do jogador
let gameOver = false; // Indica se o jogo acabou

// Quando a janela carregar, chama a função setGame para configurar o jogo
window.onload = function() {
    setGame();
}

function setGame() {
    // Configura o grid no HTML
    for (let i = 0; i < 9; i++) { // i vai de 0 a 8 (9 tiles)
        // Cria um div para cada tile com um ID único (0 a 8)
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile); // Adiciona um evento de clique para cada tile
        document.getElementById("board").appendChild(tile); // Adiciona a tile ao tabuleiro
    }
    // Configura um intervalo para chamar a função setMole a cada 1 segundo (1000 milissegundos)
    setInterval(setMole, 1000);
    // Configura um intervalo para chamar a função setPlant a cada 2 segundos (2000 milissegundos)
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    // Gera um número aleatório entre 0 e 8 para selecionar uma tile aleatória
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return; // Se o jogo acabou, não faz nada
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = ""; // Limpa a tile atual do mole, se houver
    }
    // Cria uma imagem para o mole e define a fonte da imagem
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    // Obtém uma tile aleatória para colocar o mole
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return; // Se a tile aleatória for a mesma da planta, tenta novamente
    }
    currMoleTile = document.getElementById(num); // Define a tile atual do mole
    currMoleTile.appendChild(mole); // Adiciona o mole à tile
}

function setPlant() {
    if (gameOver) {
        return; // Se o jogo acabou, não faz nada
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = ""; // Limpa a tile atual da planta, se houver
    }
    // Cria uma imagem para a planta e define a fonte da imagem
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    // Obtém uma tile aleatória para colocar a planta
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return; // Se a tile aleatória for a mesma do mole, tenta novamente
    }
    currPlantTile = document.getElementById(num); // Define a tile atual da planta
    currPlantTile.appendChild(plant); // Adiciona a planta à tile
}

function selectTile() {
    if (gameOver) {
        return; // Se o jogo acabou, não faz nada
    }
    // Verifica se a tile clicada é a do mole
    if (this == currMoleTile) {
        score += 10; // Aumenta a pontuação em 10
        document.getElementById("score").innerText = score.toString(); // Atualiza o placar no HTML
    }
    // Verifica se a tile clicada é a da planta
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // Exibe "GAME OVER" e a pontuação final
        gameOver = true; // Define o jogo como encerrado
    }
}
