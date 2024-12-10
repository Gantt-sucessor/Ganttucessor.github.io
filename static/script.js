async function fetchCharacter() {
    const characterName = document.getElementById('characterName').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpa resultados anteriores

    if (characterName === '') {
        resultsDiv.innerText = 'Por favor, digite um nome.';
        return;
    }

    try {
        // URL do arquivo JSON estático
        const response = await fetch('caracteres_bleach.json'); // Carrega o arquivo JSON local
        const data = await response.json();

        let found = false;

        // Itera sobre as raças e seus respectivos personagens
        for (const [race, characters] of Object.entries(data)) {
            characters.forEach(character => {
                if (character.name.toLowerCase().includes(characterName)) {
                    found = true;
                    const characterDiv = document.createElement('div');
                    characterDiv.classList.add('character');

                    // Define imagens padrão caso alguma esteja faltando
                    const characterImage = character.image || 'https://via.placeholder.com/150';
                    const characterImage2 = character.image2 || 'https://via.placeholder.com/150';

                    // Atributo específico por raça
                    let skillOrResurrection = '';
                    if (race === 'Shinigami') {
                        skillOrResurrection = character.zanpakuto || 'Não informado';
                    } else if (race === 'Quincy') {
                        skillOrResurrection = character.special_ability || 'Não informado';
                    } else if (race === 'Fullbringer') {
                        skillOrResurrection = character.fullbring || 'Não informado';
                    } else if (race === 'Arrancar') {
                        skillOrResurrection = character.Resurrection || 'Não informado';
                    }

                    // HTML para flip card e informações
                    characterDiv.innerHTML = `
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img src="${characterImage}" alt="${character.name}" class="character-img">
                                </div>
                                <div class="flip-card-back">
                                    <img src="${characterImage2}" alt="${character.name}" class="character-img">
                                </div>
                            </div>
                        </div>
                        <h3>${character.name}</h3>
                        <p><strong>Rank:</strong> ${character.rank || 'Não informado'}</p>
                        <p><strong>Raça:</strong> ${race}</p>
                        <p><strong>Zanpakuto/Skill/Fullbring/Resurrection:</strong> ${skillOrResurrection}</p>
                    `;

                    resultsDiv.appendChild(characterDiv);
                }
            });
        }

        // Caso nenhum personagem seja encontrado
        if (!found) {
            resultsDiv.innerText = 'Personagem não encontrado.';
        }
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
        resultsDiv.innerText = 'Erro ao buscar personagem.';
    }
}

// Seleciona os itens do carrossel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0; // Índice do GIF atual

// Função para alterar o GIF do carrossel
function changeGif() {
    carouselItems.forEach(item => item.classList.remove('active')); // Remove classe 'active'
    currentIndex = (currentIndex + 1) % carouselItems.length; // Avança ou reinicia índice
    carouselItems[currentIndex].classList.add('active'); // Adiciona classe ao próximo
}

// Inicializa o carrossel com o primeiro GIF ativo
if (carouselItems.length > 0) {
    carouselItems[currentIndex].classList.add('active');
    setInterval(changeGif, 2000); // Troca o GIF a cada 2 segundos
}
