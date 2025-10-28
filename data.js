// Estrutura de dados para os jogos de padel
const jogos = [
  {
    id: 1,
    quadra: "Quadra 1",
    horario: "18:00 - 19:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["João", "Marcos"], 
      venceu: true 
    },
    dupla2: { 
      jogadores: ["Bruno", "Felipe"], 
      venceu: false 
    },
    placares: [
      { jogo: 1, dupla1: 6, dupla2: 2 },
      { jogo: 2, dupla1: 3, dupla2: 6 },
      { jogo: 3, dupla1: 6, dupla2: 4 }
    ],
    status: "finalizado",
    duracao: 60
  },
  {
    id: 2,
    quadra: "Quadra 2",
    horario: "18:00 - 19:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["Lucas", "Rafael"], 
      venceu: true 
    },
    dupla2: { 
      jogadores: ["Pedro", "Daniel"], 
      venceu: false 
    },
    placares: [
      { jogo: 1, dupla1: 6, dupla2: 1 },
      { jogo: 2, dupla1: 5, dupla2: 7 },
      { jogo: 3, dupla1: 6, dupla2: 4 }
    ],
    status: "finalizado",
    duracao: 60
  },
  {
    id: 3,
    quadra: "Quadra 3",
    horario: "18:00 - 19:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["Diego", "Leo"], 
      venceu: false 
    },
    dupla2: { 
      jogadores: ["André", "Caio"], 
      venceu: true 
    },
    placares: [
      { jogo: 1, dupla1: 4, dupla2: 6 },
      { jogo: 2, dupla1: 6, dupla2: 2 },
      { jogo: 3, dupla1: 6, dupla2: 3 }
    ],
    status: "em-andamento",
    duracao: 60
  },
  {
    id: 4,
    quadra: "Quadra 1",
    horario: "19:00 - 20:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["João", "Caio"], 
      venceu: null 
    },
    dupla2: { 
      jogadores: ["Marcos", "André"], 
      venceu: null 
    },
    placares: [],
    status: "agendado",
    duracao: 60
  },
  {
    id: 5,
    quadra: "Quadra 2",
    horario: "19:00 - 20:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["Bruno", "Lucas"], 
      venceu: null 
    },
    dupla2: { 
      jogadores: ["Felipe", "Pedro"], 
      venceu: null 
    },
    placares: [],
    status: "agendado",
    duracao: 60
  },
  {
    id: 6,
    quadra: "Quadra 3",
    horario: "19:00 - 20:00",
    data: "2024-01-15",
    dupla1: { 
      jogadores: ["Daniel", "Diego"], 
      venceu: null 
    },
    dupla2: { 
      jogadores: ["Leo", "Rafael"], 
      venceu: null 
    },
    placares: [],
    status: "agendado",
    duracao: 60
  }
];

// Configurações do status
const statusConfig = {
  "finalizado": { 
    texto: "Finalizado", 
    icone: "✅", 
    cor: "#00ff94" 
  },
  "em-andamento": { 
    texto: "Em andamento", 
    icone: "⏳", 
    cor: "#ffa500" 
  },
  "agendado": { 
    texto: "Agendado", 
    icone: "📅", 
    cor: "#00c896" 
  }
};

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { jogos, statusConfig };
}
