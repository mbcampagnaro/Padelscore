// Funções principais da aplicação PadelScore

// Estado global da aplicação
let estadoApp = {
  jogos: [...jogos], // Cópia dos dados originais
  filtroAtivo: 'todos',
  termoBusca: '',
  ordenacao: 'horario'
};

// Elementos DOM
const elementos = {
  grid: null,
  searchInput: null,
  filterButtons: null,
  header: null
};

// Inicialização da aplicação
function inicializarApp() {
  elementos.grid = document.getElementById('jogos-grid');
  elementos.searchInput = document.getElementById('search-input');
  elementos.filterButtons = document.querySelectorAll('.filter-btn');
  elementos.header = document.querySelector('.header');
  
  configurarEventListeners();
  renderizarJogos();
}

// Configurar event listeners
function configurarEventListeners() {
  // Busca
  elementos.searchInput.addEventListener('input', (e) => {
    estadoApp.termoBusca = e.target.value.toLowerCase();
    renderizarJogos();
  });
  
  // Filtros
  elementos.filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filtro = e.target.dataset.filtro;
      estadoApp.filtroAtivo = filtro;
      atualizarFiltrosAtivos();
      renderizarJogos();
    });
  });
}

// Atualizar visual dos filtros ativos
function atualizarFiltrosAtivos() {
  elementos.filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filtro === estadoApp.filtroAtivo) {
      btn.classList.add('active');
    }
  });
}

// Filtrar jogos baseado no estado atual
function filtrarJogos() {
  let jogosFiltrados = [...jogos];
  
  // Aplicar filtro de status
  if (estadoApp.filtroAtivo !== 'todos') {
    jogosFiltrados = jogosFiltrados.filter(jogo => 
      jogo.status === estadoApp.filtroAtivo
    );
  }
  
  // Aplicar busca por jogadores
  if (estadoApp.termoBusca) {
    jogosFiltrados = jogosFiltrados.filter(jogo => {
      const todosJogadores = [
        ...jogo.dupla1.jogadores,
        ...jogo.dupla2.jogadores
      ];
      return todosJogadores.some(jogador => 
        jogador.toLowerCase().includes(estadoApp.termoBusca)
      );
    });
  }
  
  // Ordenar jogos
  jogosFiltrados.sort((a, b) => {
    switch (estadoApp.ordenacao) {
      case 'horario':
        return a.horario.localeCompare(b.horario);
      case 'quadra':
        return a.quadra.localeCompare(b.quadra);
      case 'status':
        const ordemStatus = { 'em-andamento': 0, 'agendado': 1, 'finalizado': 2 };
        return ordemStatus[a.status] - ordemStatus[b.status];
      default:
        return 0;
    }
  });
  
  return jogosFiltrados;
}

// Criar elemento HTML para um jogo
function criarCardJogo(jogo) {
  const statusInfo = statusConfig[jogo.status];
  const temPlacares = jogo.placares && jogo.placares.length > 0;
  
  let placaresHTML = '';
  if (temPlacares) {
    placaresHTML = `
      <div class="placares">
        ${jogo.placares.map(placar => `
          <div class="placar-linha">
            <span>Jogo ${placar.jogo}:</span>
            <span>
              <span class="${jogo.dupla1.venceu ? 'vencedor' : 'perdedor'}">${placar.dupla1}</span>
              x
              <span class="${jogo.dupla2.venceu ? 'vencedor' : 'perdedor'}">${placar.dupla2}</span>
            </span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  return `
    <div class="card" data-status="${jogo.status}" role="article" aria-label="Jogo na ${jogo.quadra} às ${jogo.horario}">
      <div class="status-indicator ${jogo.status}"></div>
      
      <div class="card-header">
        <h3>${jogo.quadra}</h3>
        <time class="horario" datetime="${jogo.data}T${jogo.horario.split(' - ')[0]}:00">
          ${jogo.horario}
        </time>
      </div>
      
      <div class="dupla">
        <div class="jogador ${jogo.dupla1.venceu ? 'vencedor' : jogo.dupla1.venceu === false ? 'perdedor' : ''}">
          ${jogo.dupla1.jogadores.join(' / ')}
        </div>
        <div class="jogador ${jogo.dupla2.venceu ? 'vencedor' : jogo.dupla2.venceu === false ? 'perdedor' : ''}">
          ${jogo.dupla2.jogadores.join(' / ')}
        </div>
      </div>
      
      ${placaresHTML}
      
      <div class="status ${jogo.status}" role="status" aria-label="Status do jogo: ${statusInfo.texto}">
        ${statusInfo.texto} ${statusInfo.icone}
      </div>
    </div>
  `;
}

// Renderizar todos os jogos
function renderizarJogos() {
  const jogosFiltrados = filtrarJogos();
  
  if (jogosFiltrados.length === 0) {
    elementos.grid.innerHTML = `
      <div class="no-games">
        <div class="no-games-icon">🏓</div>
        <p>Nenhum jogo encontrado</p>
        <p>Tente ajustar os filtros ou termo de busca</p>
      </div>
    `;
    return;
  }
  
  elementos.grid.innerHTML = jogosFiltrados
    .map(jogo => criarCardJogo(jogo))
    .join('');
}

// Função para adicionar novo jogo (para futuras implementações)
function adicionarJogo(novoJogo) {
  jogos.push({
    id: jogos.length + 1,
    ...novoJogo
  });
  renderizarJogos();
}

// Função para atualizar status de um jogo
function atualizarStatusJogo(idJogo, novoStatus) {
  const jogo = jogos.find(j => j.id === idJogo);
  if (jogo) {
    jogo.status = novoStatus;
    renderizarJogos();
  }
}

// Função para adicionar placar a um jogo
function adicionarPlacar(idJogo, placar) {
  const jogo = jogos.find(j => j.id === idJogo);
  if (jogo) {
    jogo.placares.push(placar);
    renderizarJogos();
  }
}

// Estatísticas dos jogos
function obterEstatisticas() {
  const total = jogos.length;
  const finalizados = jogos.filter(j => j.status === 'finalizado').length;
  const emAndamento = jogos.filter(j => j.status === 'em-andamento').length;
  const agendados = jogos.filter(j => j.status === 'agendado').length;
  
  return {
    total,
    finalizados,
    emAndamento,
    agendados,
    percentualFinalizados: Math.round((finalizados / total) * 100)
  };
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarApp);

// Exportar funções para uso externo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    adicionarJogo,
    atualizarStatusJogo,
    adicionarPlacar,
    obterEstatisticas
  };
}
