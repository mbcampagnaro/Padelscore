# PadelScore - Sistema de Controle de Jogos

Sistema web moderno para controle e acompanhamento de jogos de padel com placares em tempo real.

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Visualização Dinâmica**: Interface responsiva com cards interativos
- **Busca Inteligente**: Pesquisa por nome dos jogadores
- **Filtros Avançados**: Filtre por status (Todos, Em Andamento, Agendados, Finalizados)
- **Sistema de Ranking**: Ranking completo com estatísticas individuais dos jogadores
- **Navegação Intuitiva**: Sistema de navegação entre páginas de jogos e ranking
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessibilidade**: Totalmente acessível com suporte a leitores de tela

### 🎯 Status dos Jogos
- **🟢 Finalizados**: Jogos concluídos com placares completos
- **🟡 Em Andamento**: Jogos em execução
- **🔵 Agendados**: Jogos programados para o futuro

## 📁 Estrutura do Projeto

```
PadelScore/
├── index.html              # Página principal com lista de jogos
├── ranking.html             # Página de ranking dos jogadores
├── styles.css              # Estilos CSS responsivos principais
├── ranking-styles.css      # Estilos específicos do ranking
├── script.js               # Lógica JavaScript da página principal
├── ranking-script.js       # Lógica JavaScript do ranking
├── data.js                 # Dados dos jogos e configurações
└── README.md               # Documentação do projeto
```

## 🛠️ Melhorias Implementadas

### 1. **Arquitetura Modular**
- Separação clara entre HTML, CSS e JavaScript
- Código organizado e manutenível
- Estrutura de dados dinâmica

### 2. **Design Responsivo**
- CSS Grid para layout flexível
- Breakpoints otimizados para diferentes dispositivos
- Cards que se adaptam ao tamanho da tela

### 3. **Funcionalidades Interativas**
- Sistema de busca em tempo real
- Filtros por status dos jogos
- Animações suaves e transições

### 4. **Acessibilidade**
- Semântica HTML adequada
- Atributos ARIA para leitores de tela
- Navegação por teclado
- Contraste de cores otimizado

### 5. **Performance**
- Renderização eficiente
- Animações otimizadas
- Suporte a `prefers-reduced-motion`

## 🎨 Paleta de Cores

- **Background Principal**: `#1D2B3A`
- **Cards**: `#314255`
- **Texto Principal**: `#ffffff`
- **Texto Secundário**: `#cccccc`
- **Sucesso/Vencedor**: `#00ff94`
- **Destaque**: `#00c896`
- **Atenção**: `#ffa500`

## 📱 Responsividade

### Desktop (> 768px)
- Grid com múltiplas colunas
- Cards com largura fixa
- Layout horizontal completo

### Tablet (768px - 480px)
- Grid adaptativo
- Cards responsivos
- Controles centralizados

### Mobile (< 480px)
- Layout em coluna única
- Controles empilhados
- Otimização para toque

## 🔧 Como Usar

### 📅 Página de Jogos (`index.html`)
1. **Abrir o arquivo**: Abra `index.html` no navegador
2. **Buscar jogos**: Use a caixa de busca para encontrar jogadores específicos
3. **Filtrar por status**: Clique nos botões de filtro para ver apenas jogos específicos
4. **Visualizar detalhes**: Cada card mostra informações completas do jogo
5. **Navegar para ranking**: Clique em "🏆 Ranking" no menu de navegação

### 🏆 Página de Ranking (`ranking.html`)
1. **Visualizar estatísticas**: Veja estatísticas gerais no topo da página
2. **Buscar jogadores**: Use a busca para encontrar jogadores específicos
3. **Ordenar ranking**: Clique nos botões para ordenar por pontos, vitórias, partidas ou nome
4. **Alternar visualização**: Mude entre visualização em tabela ou cards
5. **Ver destaques**: Confira os top performers em diferentes categorias

## 🚀 Funcionalidades Futuras

- [ ] Adicionar novos jogos dinamicamente
- [ ] Editar placares em tempo real
- [ ] Sistema de notificações
- [ ] Estatísticas detalhadas
- [ ] Exportação de dados
- [ ] Modo escuro/claro
- [ ] Integração com banco de dados

## 🛡️ Acessibilidade

O projeto segue as diretrizes WCAG 2.1 AA:
- ✅ Contraste adequado
- ✅ Navegação por teclado
- ✅ Semântica HTML
- ✅ Atributos ARIA
- ✅ Suporte a leitores de tela

## 📊 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Animações
- **JavaScript ES6+**: Funcionalidades interativas
- **Fonts**: Open Sauce One (Google Fonts)

## 🎯 Melhorias Implementadas vs. Versão Original

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Dados** | Estáticos no HTML | Dinâmicos via JavaScript |
| **Layout** | Flexbox fixo | CSS Grid responsivo |
| **Busca** | ❌ Não disponível | ✅ Busca em tempo real |
| **Filtros** | ❌ Não disponível | ✅ Filtros por status |
| **Ranking** | ❌ Não disponível | ✅ Sistema completo de ranking |
| **Navegação** | ❌ Não disponível | ✅ Navegação entre páginas |
| **Estatísticas** | ❌ Não disponível | ✅ Estatísticas detalhadas |
| **Acessibilidade** | ❌ Básica | ✅ WCAG 2.1 AA |
| **Responsividade** | ⚠️ Limitada | ✅ Totalmente responsivo |
| **Manutenibilidade** | ❌ CSS inline | ✅ Arquivos separados |
| **Performance** | ⚠️ Básica | ✅ Otimizada |

## 🏆 Sistema de Ranking

### Sistema de Pontuação
- **Vitória**: 3 pontos
- **Derrota**: 0 pontos
- **Bônus por Sets**: 1 ponto por set ganho
- **Bônus por Taxa**: 2 pontos extras para taxa de vitória > 70%

### Estatísticas Calculadas
- **Pontos Totais**: Pontuação geral do jogador
- **Vitórias/Derrotas**: Número de jogos vencidos/perdidos
- **Taxa de Vitória**: Percentual de vitórias
- **Sets Ganhos/Perdidos**: Contagem detalhada de sets
- **Partidas Jogadas**: Total de jogos participados

### Funcionalidades do Ranking
- **Ordenação**: Por pontos, vitórias, partidas ou nome
- **Busca**: Encontrar jogadores específicos
- **Visualizações**: Tabela ou cards
- **Destaques**: Top performers em diferentes categorias
- **Estatísticas Gerais**: Visão geral do sistema

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para a comunidade de padel**
