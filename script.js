// Configurações econômicas das plantas
const plantasConfig = {
    milho: { nome: 'Milho', custo: 10, venda: 25, emojiSemente: '🌱', emojiPronto: '🌽' },
    tomate: { nome: 'Tomate', custo: 15, venda: 40, emojiSemente: '🌱', emojiPronto: '🍅' }
};

// Estado do jogo
let moedas = 50;
let colheitas = 0;

// Estado dos 4 lotes de terra (0 a 3)
// Estados possíveis: 'vazio', 'plantado', 'regado', 'pronto'
let canteiros = [
    { estado: 'vazio', tipo: null },
    { estado: 'vazio', tipo: null },
    { estado: 'vazio', tipo: null },
    { estado: 'vazio', tipo: null }
];

// Elementos da Interface (DOM)
const txtMoedas = document.getElementById('moedas');
const txtColheitas = document.getElementById('colheitas');
const seletorSemente = document.getElementById('semente-seletor');

// Atualiza os dados na tela
function atualizarInterface() {
    txtMoedas.textContent = moedas;
    txtColheitas.textContent = colheitas;

    canteiros.forEach((canteiro, index) => {
        const slotEl = document.getElementById(`slot-${index}`);
        const emojiEl = slotEl.querySelector('.emoji');
        const legendaEl = slotEl.querySelector('.legenda');

        if (canteiro.estado === 'vazio') {
            emojiEl.textContent = '🟫';
            legendaEl.textContent = 'Vazio';
        } else if (canteiro.estado === 'plantado') {
            emojiEl.textContent = plantasConfig[canteiro.tipo].emojiSemente;
            legendaEl.textContent = 'Precisa de Água';
        } else if (canteiro.estado === 'regado') {
            emojiEl.textContent = '💧';
            legendaEl.textContent = 'Crescendo...';
        } else if (canteiro.estado === 'pronto') {
            emojiEl.textContent = plantasConfig[canteiro.tipo].emojiPronto;
            legendaEl.textContent = 'Colher!';
        }
    });
}

// Gerencia o clique em um lote de terra
function interagir(index) {
    let canteiro = canteiros[index];
    let sementeSelecionada = seletorSemente.value;
    let config = plantasConfig[sementeSelecionada];

    // 1. Se estiver vazio: Planta a semente selecionada
    if (canteiro.estado === 'vazio') {
        if (moedas >= config.custo) {
            moedas -= config.custo;
            canteiro.estado = 'plantado';
            canteiro.tipo = sementeSelecionada;
        } else {
            alert('Moedas insuficientes para comprar esta semente!');
        }
    } 
    // 2. Se estiver plantado: Rega a semente para começar a crescer
    else if (canteiro.estado === 'plantado') {
        canteiro.estado = 'regado';
        atualizarInterface();

        // Simula o tempo de crescimento (3 segundos)
        setTimeout(() => {
            canteiro.estado = 'pronto';
            atualizarInterface();
        }, 3000);
    } 
    // 3. Se estiver pronto: Faz a colheita e recebe o lucro
    else if (canteiro.estado === 'pronto') {
        let lucro = plantasConfig[canteiro.tipo].venda;
        moedas += lucro;
        colheitas += 1;
        
        // Reseta o canteiro de terra
        canteiro.estado = 'vazio';
        canteiro.tipo = null;
    }

    atualizarInterface();
}

// Inicializa a tela com os valores padrões
atualizarInterface();