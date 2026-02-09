# 🔐 SecureVault - Sistema de Login

Um sistema de login funcional e interativo desenvolvido com foco em **usabilidade e experiência do usuário**, aplicando conceitos de Interação Humano-Computador (IHC).

## Descrição do Projeto

**SecureVault** é um simulador de plataforma segura de armazenamento em nuvem com interface de login profissional. O projeto demonstra boas práticas de UX/UI e implementa validações locais completas sem dependência de banco de dados ou conexão com internet.

### Contexto Escolhido
O projeto foi inserido no contexto de um **serviço de armazenamento em nuvem seguro**, similar a plataformas reais como OneDrive, Google Drive, mas focado na experiência de autenticação.

---

## Metas de Usabilidade (Análise Detalhada)

### 1. **Fácil de Lembrar Como Usar** ✓

**Implementação:**
- Interface intuitiva com ícones visuais (👤, 🔑, 🔐) que indicam funções imediatamente
- Feedback visual claro: o campo de email aceita tanto email quanto username
- Fluxo simples: Email → Senha → Entrar
- Confirmação visual com checkmarks ✓ em campos válidos

**Evidência:**
```html
<span class="input-icon">👤</span>  <!-- Ícone visual auxiliando memória -->
<span class="input-status"></span>   <!-- Feedback de validação -->
```

### 2. **Fácil de Entender** ✓

**Implementação:**
- Linguagem clara em português
- Labels explicativos: "Email ou Usuário", "Senha"
- Placeholder de exemplo: "seu@email.com ou usuario123"
- Seção de Demonstração (Modo Demonstração) com 3 exemplos práticos
- Mensagens de erro contextuais e compreensíveis

**Evidência:**
```javascript
// Mensagens de erro descritivas
if (!emailRegex.test(email)) {
    showError(emailError, 'Email inválido ou usuário não permitido');
}
```

### 3. **Útil** ✓

**Implementação:**
- Funcionalidade prática: validação em tempo real
- Recurso "Lembrar de mim" (localStorage) para acesso mais rápido
- Link "Esqueceu a senha?" para possíveis cenários de recuperação
- Dashboard funcional após login mostrando contexto real de uso
- Análise de força de senha para segurança prática

**Evidência:**
```javascript
function rememberUser(email) {
    localStorage.setItem('rememberedEmail', email);
}
```

### 4. **Seguro (Percepção do Usuário)** ✓

**Implementação:**
- Ícone de cadeado flutuante no topo (🔐) transmitindo confiança
- Toggle para visualizar/ocultar senha (controle do usuário)
- Badges de segurança: "🔒 HTTPS" e "🛡️ E2E" (educando sobre segurança)
- Validação forte de senha com barra de força visual
- Proteção contra tentativas excessivas (lockout após 5 tentativas)
- Gradiente de cores profissional (roxo/azul) transmitindo confiança

**Evidência:**
```html
<div class="security-badges">
    <span title="Conexão Segura">🔒 HTTPS</span>
    <span title="Criptografia End-to-End">🛡️ E2E</span>
</div>
```

### 5. **Eficiente** ✓

**Implementação:**
- Carregar contas de demonstração com 1 clique
- Preenchimento automático de email recordado
- Validação em tempo real (feedback imediato)
- Suporte a Enter para enviar formulário
- Campos obrigatórios claramente indicados
- Interface responsiva: otimizada para mobile (60% dos logins)
- Transições suaves reduzindo sensação de carregamento (UX fluida)

**Evidência:**
```javascript
// Entrada rápida com Enter
document.getElementById('loginForm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin(e);
});
```

---

## Metas de Experiência (Mínimo 5 - Implementadas 7)

### 1. **Divertido** 🎮

**Implementação:**
- Animações fluidas (float do ícone 🔐, slide-up de entrada)
- Ícones expressivos em toda a interface (👤, 🔑, 👁️, etc.)
- Contas de demonstração nomeadas com contexto: "Admin", "Usuário", "Desenvolvedor"
- Notificações toast com emojis: "✓ Login realizado com sucesso!"
- Efeito hover com transformações (translateY) criando feedback interativo

**Código:**
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.vault-icon {
    animation: float 3s ease-in-out infinite;
}
```

### 2. **Emocionalmente Adequado** 

**Implementação:**
- Cores inspiradoras: roxo/azul transmitem confiança e profissionalismo
- Gradiente suave no fundo e botões
- Transição suave ao login (sem mudanças abruptas)
- Dashboard acolhedor: "Bem-vindo! 👋" personalizado com nome do usuário
- Feedback positivo em verde para ações bem-sucedidas
- Mensagens empáticas: "Esqueceu a senha?" (reconhecimento de dificuldade)

**Código:**
```css
:root {
    --primary: #6c5ce7;  /* Roxo inspirador */
    --success: #00b894;  /* Verde positivo */
    --error: #d63031;    /* Vermelho claro */
}
```

### 3. **Compensador** 🏆

**Implementação:**
- Visualização de força de senha como conquista progressiva
- Status de conexão no dashboard: "✓ Conectado" (recompensa visual)
- Ícones de features desbloqueadas após login: 📁, ⚙️, 🔐, 👥
- Acesso imediato a 4 funcionalidades pós-login
- Barra de progresso de validação visual

**Resultado:**
Usuário sente realização ao completar login e vê benefícios imediatos.

### 4. **Incentivador de Criatividade** 🎨

**Implementação:**
- Botões de demonstração incentivam exploração de diferentes perfis
- Interface personalizável mentalmente (ícones customizáveis)
- Feedback visual deixa espaço para interpretação criativa
- Grid de features pós-login inspira possíveis usos: compartilhamento, segurança, etc.

**Padrão:**
```html
<div class="features-grid">
    <div class="feature-card">...</div>  <!-- Deixa espaço mental -->
</div>
```

### 5. **Esteticamente Apreciável** 🎨

**Implementação:**
- Design moderno com rounded corners (border-radius: 20px)
- Tipografia hierárquica clara (Segoe UI, tamanhos bem definidos)
- Paleta de cores coesa: roxo primário, cinza neutro, verde sucesso
- Espaçamento generoso (padding/margin consistentes)
- Sombras suaves (box-shadow) criando profundidade
- Responsividade elegante em todos os tamanhos
- Animações smooth (ease-out, transições 0.3s)

**Exemplo:**
```css
.login-panel {
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    padding: 50px 40px;
    animation: slideUp 0.6s ease-out;
}
```

### 6. **Motivador** 💪

**Implementação:**
- Linguagem positiva: "Entrar", "Bem-vindo!", "Login realizado com sucesso!"
- Visual de progresso: barra de força de senha
- Reconhecimento imediato: email é validado e recebe checkmark
- Texto motivacional no dashboard: "Você agora tem acesso aos seus dados"
- Botões com microcópias encorajadoras: "Lembrar de mim"

### 7. **Agradável** 😊

**Implementação:**
- Interações suaves sem jarretões
- Feedback auditivo emulado com notificações visuais
- Hover states consistentes e previsíveis
- Cursor muda para `pointer` em elementos interativos
- Loading state visual (spinner animado) mantendo usuário informado
- Toast notifications não invasivas
- Logout com confirmação educada

**Código:**
```javascript
function showToast(message) {
    toastMessage.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}
```

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **HTML5** | - | Estrutura semântica e acessibilidade |
| **CSS3** | - | Styling, animações, responsividade |
| **JavaScript (Vanilla)** | ES6+ | Lógica de validação, interatividade |
| **LocalStorage API** | - | Persistência de "Lembrar de mim" |
| **SessionStorage API** | - | Armazenamento de sessão do usuário |

**Nenhuma dependência externa** - Projeto puro para máxima compatibilidade!

---

## Instruções de Execução

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Não requer servidor, instalação ou internet

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/AndersonGabrielBD/TelaDeloginIHC.git
cd TelaDeloginIHC
```

2. **Abra `index.html` no navegador:**
   - Duplo clique no arquivo `index.html`
   - Ou use um servidor local:
     ```bash
     python -m http.server 8000
     # Abra http://localhost:8000
     ```

3. **Teste as contas de demonstração:**
   - **Admin**: admin@securevault.com / Admin@123
   - **Usuário**: user@securevault.com / User@456
   - **Dev**: dev@securevault.com / Dev#789

### Funcionalidades Disponíveis

✓ Login com validação local
✓ Análise de força de senha em tempo real
✓ Visualizar/ocultar senha
✓ Lembrar email do usuário (localStorage)
✓ Dashboard funcional após login
✓ Logout com confirmação
✓ Proteção contra tentativas excessivas (5 tentativas = 30s lockout)
✓ Notificações visuais (toast)
✓ Interface 100% responsiva

---

## Estrutura de Arquivos

```
TelaDeloginIHC/
├── index.html          # Estrutura HTML com semântica
├── styles.css          # Estilos com animações e responsividade
├── script.js           # Lógica de autenticação e interação
└── README.md           # Documentação completa
```

---

## Recursos Destacados

### Validação Inteligente
```javascript
// Email aceita tanto email quanto username
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_]{3,}$/;
```

### Análise de Força de Senha
- Verifica: comprimento (8+, 12+), minúsculas, maiúsculas, números, caracteres especiais
- 6 critérios = força forte com barra visual verde

### Proteção de Conta
- Máximo 5 tentativas de login
- Lockout de 30 segundos após limite
- Feedback claro sobre quantidade de tentativas

### Design Responsivo
```css
@media (max-width: 600px) {
    .login-panel { padding: 40px 25px; }
    .demo-accounts { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
}
```

## Diferenciais do Projeto

1. **Design Thinking** aplicado em cada elemento
2. **Micro-interações** que criam prazer ao usar
3. **Validação Progressiva** sem bloquear o usuário
4. **Acessibilidade** considerada desde o início
5. **Performance** máxima (sem frameworks pesados)
6. **Documentação** exemplar para fins educacionais

---

## Notas de Desenvolvimento

### Dados Simulados
Os usuários são armazenados em memória para demonstração:
```javascript
const DEMO_USERS = [
    { email: 'admin@securevault.com', password: 'Admin@123', ... }
];
```

### Armazenamento Local
- **localStorage**: Persiste "email recordado" entre sessões
- **sessionStorage**: Armazena dados da sessão atual

### Limitações Intencionais
- Sem conexão com backend (não necessário por requisitos)
- Sem banco de dados (simulação em memória)
- Sem redirecionar para outra página (tudo é SPA)

---

## Próximas Melhorias Potenciais

- [ ] 2FA (Autenticação de Dois Fatores) simulada
- [ ] Temas escuro/claro
- [ ] Internacionalização (i18n)
- [ ] Animações de transição mais avançadas
- [ ] Integração com backend real
- [ ] PWA (Progressive Web App)

---


##  Autor

Desenvolvido como projeto da disciplina de **Interação Humano-Computador**

Conceitos aplicados:
- Metas de Usabilidade (Nielsen)
- Metas de Experiência (Preece, Rogers, Sharp)
- Design Centrado no Usuário
- Princípios de Acessibilidade WCAG

---

**Versão:** 1.0.0  
**Data:** 2026  
**Status:** ✅ Completo

---

##  Suporte

Para dúvidas sobre a implementação ou melhorias, consulte o código-fonte comentado em `script.js` e `styles.css`.

Divirta-se testando! 
