// Script para a página de ranking dos jogadores

// Estado global da aplicação de ranking
let estadoRanking = {
  jogadores: [],
  filtroAtivo: 'pontos',
  termoBusca: '',
  visualizacao: 'table'
};

// Elementos DOM
const elementosRanking = {
  searchInput: null,
  filterButtons: null,
  viewButtons: null,
  tableBody: null,
  cardsContainer: null,
  noPlayers: null,
  statsOverview: {
    totalPlayers: null,
    totalGames: null,
    avgGames: null,
    winRate: null
  },
  topPerformers: {
    mostWins: null,
    bestRate: null,
    mostActive: null
  }
};

// Sistema de pontuação
const sistemaPontuacao = {
  vitoria: 3,
  derrota: 0,
  bonusSets: 1, // Pontos extras por sets ganhos
  bonusTaxa: 2  // Pontos extras para taxa de vitória > 70%
};

// Inicialização da aplicação de ranking
function inicializarRanking() {
  elementosRanking.searchInput = document.getElementById('search-players');
  elementosRanking.filterButtons = document.querySelectorAll('.filter-btn');
  elementosRanking.viewButtons = document.querySelectorAll('.view-btn');
  elementosRanking.tableBody = document.getElementById('ranking-tbody');
  elementosRanking.cardsContainer = document.getElementById('ranking-cards');
  elementosRanking.noPlayers = document.getElementById('no-players');
  
  // Elementos de estatísticas
  elementosRanking.statsOverview.totalPlayers = document.getElementById('total-players');
  elementosRanking.statsOverview.totalGames = document.getElementById('total-games');
  elementosRanking.statsOverview.avgGames = document.getElementById('avg-games');
  elementosRanking.statsOverview.winRate = document.getElementById('win-rate');
  
  // Top performers
  elementosRanking.topPerformers.mostWins = document.getElementById('most-wins');
  elementosRanking.topPerformers.bestRate = document.getElementById('best-rate');
  elementosRanking.topPerformers.mostActive = document.getElementById('most-active');
  
  configurarEventListenersRanking();
  calcularEstatisticasJogadores();
  renderizarRanking();
  atualizarEstatisticasGerais();
  atualizarTopPerformers();
}

// Configurar event listeners
function configurarEventListenersRanking() {
  // Busca
  elementosRanking.searchInput.addEventListener('input', (e) => {
    estadoRanking.termoBusca = e.target.value.toLowerCase();
    renderizarRanking();
  });
  
  // Filtros de ordenação
  elementosRanking.filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ordem = e.target.dataset.ordem;
      estadoRanking.filtroAtivo = ordem;
      atualizarFiltrosAtivos();
      renderizarRanking();
    });
  });
  
  // Alternância de visualização
  elementosRanking.viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.target.dataset.view;
      estadoRanking.visualizacao = view;
      atualizarVisualizacao();
    });
  });
}

// Atualizar visual dos filtros ativos
function atualizarFiltrosAtivos() {
  elementosRanking.filterButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    if (btn.dataset.ordem === estadoRanking.filtroAtivo) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
  });
}

// Atualizar visualização (tabela/cards)
function atualizarVisualizacao() {
  elementosRanking.viewButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    if (btn.dataset.view === estadoRanking.visualizacao) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
  });
  
  const tableView = document.getElementById('table-view');
  const cardsView = document.getElementById('cards-view');
  
  if (estadoRanking.visualizacao === 'table') {
    tableView.style.display = 'block';
    cardsView.style.display = 'none';
  } else {
    tableView.style.display = 'none';
    cardsView.style.display = 'block';
  }
  
  renderizarRanking();
}

// Calcular estatísticas de todos os jogadores
function calcularEstatisticasJogadores() {
  const estatisticasJogadores = {};
  
  // Inicializar estatísticas para cada jogador
  jogos.forEach(jogo => {
    const todosJogadores = [...jogo.dupla1.jogadores, ...jogo.dupla2.jogadores];
    todosJogadores.forEach(jogador => {
      if (!estatisticasJogadores[jogador]) {
        estatisticasJogadores[jogador] = {
          nome: jogador,
          vitorias: 0,
          derrotas: 0,
          partidas: 0,
          setsGanhos: 0,
          setsPerdidos: 0,
          pontos: 0
        };
      }
    });
  });
  
  // Calcular estatísticas baseadas nos jogos
  jogos.forEach(jogo => {
    if (jogo.status === 'finalizado' && jogo.placares && jogo.placares.length > 0) {
      const dupla1Venceu = jogo.dupla1.venceu;
      const dupla2Venceu = jogo.dupla2.venceu;
      
      // Contar sets
      let setsDupla1 = 0;
      let setsDupla2 = 0;
      
      jogo.placares.forEach(placar => {
        if (placar.dupla1 > placar.dupla2) {
          setsDupla1++;
        } else {
          setsDupla2++;
        }
      });
      
      // Atualizar estatísticas dos jogadores da dupla 1
      jogo.dupla1.jogadores.forEach(jogador => {
        const stats = estatisticasJogadores[jogador];
        stats.partidas++;
        stats.setsGanhos += setsDupla1;
        stats.setsPerdidos += setsDupla2;
        
        if (dupla1Venceu) {
          stats.vitorias++;
          stats.pontos += sistemaPontuacao.vitoria;
        } else {
          stats.derrotas++;
          stats.pontos += sistemaPontuacao.derrota;
        }
      });
      
      // Atualizar estatísticas dos jogadores da dupla 2
      jogo.dupla2.jogadores.forEach(jogador => {
        const stats = estatisticasJogadores[jogador];
        stats.partidas++;
        stats.setsGanhos += setsDupla2;
        stats.setsPerdidos += setsDupla1;
        
        if (dupla2Venceu) {
          stats.vitorias++;
          stats.pontos += sistemaPontuacao.vitoria;
        } else {
          stats.derrotas++;
          stats.pontos += sistemaPontuacao.derrota;
        }
      });
    }
  });
  
  // Calcular pontos extras e taxa de vitória
  Object.values(estatisticasJogadores).forEach(stats => {
    // Pontos extras por sets ganhos
    stats.pontos += stats.setsGanhos * sistemaPontuacao.bonusSets;
    
    // Calcular taxa de vitória
    stats.taxaVitoria = stats.partidas > 0 ? (stats.vitorias / stats.partidas) * 100 : 0;
    
    // Pontos extras para alta taxa de vitória
    if (stats.taxaVitoria > 70) {
      stats.pontos += sistemaPontuacao.bonusTaxa;
    }
  });
  
  estadoRanking.jogadores = Object.values(estatisticasJogadores);
}

// Filtrar e ordenar jogadores
function filtrarJogadores() {
  let jogadoresFiltrados = [...estadoRanking.jogadores];
  
  // Aplicar busca
  if (estadoRanking.termoBusca) {
    jogadoresFiltrados = jogadoresFiltrados.filter(jogador =>
      jogador.nome.toLowerCase().includes(estadoRanking.termoBusca)
    );
  }
  
  // Aplicar ordenação
  jogadoresFiltrados.sort((a, b) => {
    switch (estadoRanking.filtroAtivo) {
      case 'pontos':
        return b.pontos - a.pontos;
      case 'vitorias':
        return b.vitorias - a.vitorias;
      case 'partidas':
        return b.partidas - a.partidas;
      case 'nome':
        return a.nome.localeCompare(b.nome);
      default:
        return b.pontos - a.pontos;
    }
  });
  
  return jogadoresFiltrados;
}

// Renderizar ranking
function renderizarRanking() {
  const jogadoresFiltrados = filtrarJogadores();
  
  if (jogadoresFiltrados.length === 0) {
    elementosRanking.noPlayers.style.display = 'block';
    elementosRanking.tableBody.innerHTML = '';
    elementosRanking.cardsContainer.innerHTML = '';
    return;
  }
  
  elementosRanking.noPlayers.style.display = 'none';
  
  if (estadoRanking.visualizacao === 'table') {
    renderizarTabela(jogadoresFiltrados);
  } else {
    renderizarCards(jogadoresFiltrados);
  }
}

// Renderizar tabela
function renderizarTabela(jogadores) {
  elementosRanking.tableBody.innerHTML = jogadores.map((jogador, index) => {
    const posicao = index + 1;
    const classePosicao = posicao <= 3 ? `position-${posicao}` : '';
    
    return `
      <tr class="${classePosicao}" role="row">
        <td role="cell">${posicao}º</td>
        <td role="cell">${jogador.nome}</td>
        <td role="cell">${jogador.pontos}</td>
        <td role="cell">${jogador.vitorias}</td>
        <td role="cell">${jogador.partidas}</td>
        <td role="cell">${jogador.taxaVitoria.toFixed(1)}%</td>
        <td role="cell">${jogador.setsGanhos}</td>
        <td role="cell">${jogador.setsPerdidos}</td>
      </tr>
    `;
  }).join('');
}

// Renderizar cards
function renderizarCards(jogadores) {
  elementosRanking.cardsContainer.innerHTML = jogadores.map((jogador, index) => {
    const posicao = index + 1;
    const classePosicao = posicao <= 3 ? `position-${posicao}` : '';
    
    return `
      <div class="ranking-card ${classePosicao}" role="article" aria-label="Jogador ${jogador.nome} em ${posicao}º lugar">
        <div class="ranking-card-header">
          <div class="player-position">${posicao}º</div>
          <div class="player-name">${jogador.nome}</div>
        </div>
        
        <div class="player-stats">
          <div class="stat-item">
            <span class="stat-value">${jogador.pontos}</span>
            <div class="stat-label">Pontos</div>
          </div>
          
          <div class="stat-item">
            <span class="stat-value">${jogador.vitorias}</span>
            <div class="stat-label">Vitórias</div>
          </div>
          
          <div class="stat-item">
            <span class="stat-value">${jogador.partidas}</span>
            <div class="stat-label">Partidas</div>
          </div>
          
          <div class="stat-item">
            <span class="stat-value">${jogador.taxaVitoria.toFixed(1)}%</span>
            <div class="stat-label">Taxa Vitória</div>
          </div>
        </div>
        
        <div class="win-rate-bar">
          <div class="win-rate-fill" style="width: ${jogador.taxaVitoria}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Atualizar estatísticas gerais
function atualizarEstatisticasGerais() {
  const totalJogadores = estadoRanking.jogadores.length;
  const totalJogos = jogos.filter(j => j.status === 'finalizado').length;
  const totalVitorias = estadoRanking.jogadores.reduce((sum, j) => sum + j.vitorias, 0);
  const totalPartidas = estadoRanking.jogadores.reduce((sum, j) => sum + j.partidas, 0);
  
  elementosRanking.statsOverview.totalPlayers.textContent = totalJogadores;
  elementosRanking.statsOverview.totalGames.textContent = totalJogos;
  elementosRanking.statsOverview.avgGames.textContent = totalJogadores > 0 ? 
    (totalPartidas / totalJogadores).toFixed(1) : '0';
  elementosRanking.statsOverview.winRate.textContent = totalPartidas > 0 ? 
    ((totalVitorias / totalPartidas) * 100).toFixed(1) + '%' : '0%';
}

// Atualizar top performers
function atualizarTopPerformers() {
  const jogadores = [...estadoRanking.jogadores];
  
  // Mais vitórias
  const maisVitorias = jogadores.reduce((max, jogador) => 
    jogador.vitorias > max.vitorias ? jogador : max, jogadores[0]);
  
  // Melhor taxa de vitória (mínimo 3 partidas)
  const melhorTaxa = jogadores
    .filter(j => j.partidas >= 3)
    .reduce((max, jogador) => 
      jogador.taxaVitoria > max.taxaVitoria ? jogador : max, 
      jogadores.find(j => j.partidas >= 3) || jogadores[0]);
  
  // Mais ativo (mais partidas)
  const maisAtivo = jogadores.reduce((max, jogador) => 
    jogador.partidas > max.partidas ? jogador : max, jogadores[0]);
  
  elementosRanking.topPerformers.mostWins.innerHTML = `
    <div class="top-player-name">${maisVitorias.nome}</div>
    <div class="top-player-value">${maisVitorias.vitorias} vitórias</div>
  `;
  
  elementosRanking.topPerformers.bestRate.innerHTML = `
    <div class="top-player-name">${melhorTaxa.nome}</div>
    <div class="top-player-value">${melhorTaxa.taxaVitoria.toFixed(1)}%</div>
  `;
  
  elementosRanking.topPerformers.mostActive.innerHTML = `
    <div class="top-player-name">${maisAtivo.nome}</div>
    <div class="top-player-value">${maisAtivo.partidas} partidas</div>
  `;
}

// Função para adicionar novo jogo e recalcular estatísticas
function adicionarJogoERecalcular(novoJogo) {
  jogos.push(novoJogo);
  calcularEstatisticasJogadores();
  renderizarRanking();
  atualizarEstatisticasGerais();
  atualizarTopPerformers();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarRanking);

// Exportar funções para uso externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    adicionarJogoERecalcular,
    calcularEstatisticasJogadores,
    obterRankingJogadores: () => estadoRanking.jogadores
  };
}
