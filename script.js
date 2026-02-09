// ========================================
// Usuários de Demonstração (Simulação)
// ========================================
const DEMO_USERS = [
    {
        email: 'admin@securevault.com',
        password: 'Admin@123',
        name: 'Administrador',
        role: 'Admin'
    },
    {
        email: 'user@securevault.com',
        password: 'User@456',
        name: 'João Silva',
        role: 'Usuário'
    },
    {
        email: 'dev@securevault.com',
        password: 'Dev#789',
        name: 'Maria Desenvolvedora',
        role: 'Desenvolvedor'
    }
];

// ========================================
// Estado da Aplicação
// ========================================
let currentUser = null;
let loginAttempts = 0;
const MAX_LOGIN_ATTEMPTS = 5;
let lockoutTime = 0;

// ========================================
// Inicialização
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkRememberedUser();
    restoreSessionIfExists();
});


function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
    
    document.getElementById('password').addEventListener('input', updatePasswordStrength);
    
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('email').addEventListener('input', clearEmailError);
    
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('password').addEventListener('input', clearPasswordError);
    
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    

    document.querySelector('.forgot-password').addEventListener('click', handleForgotPassword);
    
    document.querySelector('.signup-link').addEventListener('click', handleSignup);
}


function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    
    if (!email) {
        showError(emailError, 'Email é obrigatório');
        return false;
    }
    
    // Regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[a-zA-Z0-9_]{3,}$/;
    
    if (!emailRegex.test(email)) {
        showError(emailError, 'Email inválido ou usuário não permitido');
        return false;
    }
    
    clearError(emailError);
    return true;
}

function clearEmailError() {
    document.getElementById('emailError').textContent = '';
    document.getElementById('emailError').classList.remove('show');
}


function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    
    if (!password) {
        showError(passwordError, 'Senha é obrigatória');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordError, 'Senha deve ter no mínimo 6 caracteres');
        return false;
    }
    
    clearError(passwordError);
    return true;
}

function clearPasswordError() {
    document.getElementById('passwordError').textContent = '';
    document.getElementById('passwordError').classList.remove('show');
}


function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function clearError(element) {
    element.textContent = '';
    element.classList.remove('show');
}

// ========================================
// Toggle Password Visibility
// ========================================
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// ========================================
// Análise de Força da Senha
// ========================================
function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthLevel = document.getElementById('strengthLevel');
    
    if (!password) {
        strengthContainer.classList.remove('show', 'strength-weak', 'strength-medium', 'strength-strong');
        return;
    }
    
    strengthContainer.classList.add('show');
    let strength = 0;
    
    // Verificar comprimento
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Verificar tipos de caracteres
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    // Classificar força
    strengthContainer.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    
    if (strength <= 2) {
        strengthContainer.classList.add('strength-weak');
        strengthLevel.textContent = 'Fraca';
    } else if (strength <= 4) {
        strengthContainer.classList.add('strength-medium');
        strengthLevel.textContent = 'Média';
    } else {
        strengthContainer.classList.add('strength-strong');
        strengthLevel.textContent = 'Forte';
    }
}

// ========================================
// Função Principal de Login
// ========================================
async function handleLogin(e) {
    e.preventDefault();
    
    // Verificar se está em lockout
    if (isLockedOut()) {
        showErrorMessage('Muitas tentativas. Tente novamente em alguns segundos.');
        return;
    }
    
    // Validar inputs
    if (!validateEmail() || !validatePassword()) {
        loginAttempts++;
        return;
    }
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    
    // Simular requisição
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    try {
        // Simular delay de requisição
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validar credenciais
        const user = authenticateUser(email, password);
        
        if (user) {
            // Login bem-sucedido
            loginAttempts = 0;
            currentUser = user;
            
            // Salvar dados de sessão
            saveSession(user);
            
            // Verificar "Lembrar de mim"
            if (document.getElementById('rememberMe').checked) {
                rememberUser(email);
            }
            
            // Transição para dashboard
            showToast('✓ Login realizado com sucesso!');
            setTimeout(() => showDashboard(), 600);
        } else {
            // Login falhou
            loginAttempts++;
            showErrorMessage('Email ou senha incorretos. Tente novamente.');
            
            // Animar shake no formulário
            document.getElementById('loginForm').style.animation = 'shake 0.4s';
            setTimeout(() => {
                document.getElementById('loginForm').style.animation = '';
            }, 400);
        }
    } catch (error) {
        console.error('Erro durante login:', error);
        showErrorMessage('Erro ao conectar. Tente novamente.');
    } finally {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
    }
}

// ========================================
// Autenticação de Usuário
// ========================================
function authenticateUser(emailInput, passwordInput) {
    const user = DEMO_USERS.find(u => 
        (u.email === emailInput || u.email.split('@')[0] === emailInput) && 
        u.password === passwordInput
    );
    return user || null;
}

// ========================================
// Verificar Lockout
// ========================================
function isLockedOut() {
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        lockoutTime = Date.now() + 30000; // 30 segundos de lockout
        return true;
    }
    
    if (lockoutTime && Date.now() < lockoutTime) {
        return true;
    }
    
    lockoutTime = 0;
    return false;
}

// ========================================
// Mensagens de Erro
// ========================================
function showErrorMessage(message) {
    const generalError = document.getElementById('generalError');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    generalError.style.display = 'flex';
    
    // Auto-hide após 5 segundos
    setTimeout(() => {
        generalError.style.display = 'none';
    }, 5000);
}

// ========================================
// Funções de Sessão e Memória
// ========================================
function saveSession(user) {
    const sessionData = {
        email: user.email,
        name: user.name,
        role: user.role,
        loginTime: new Date().toLocaleString('pt-BR')
    };
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
}

function restoreSessionIfExists() {
    const session = sessionStorage.getItem('userSession');
    if (session) {
        try {
            const userData = JSON.parse(session);
            currentUser = userData;
            // Não mostrar automaticamente - deixar que o usuário veja a tela de login
        } catch (e) {
            console.error('Erro ao restaurar sessão:', e);
        }
    }
}

function rememberUser(email) {
    localStorage.setItem('rememberedEmail', email);
}

function checkRememberedUser() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// ========================================
// Exibir Dashboard
// ========================================
function showDashboard() {
    document.getElementById('loginPanel').style.display = 'none';
    document.getElementById('dashboardPanel').style.display = 'block';
    
    // Atualizar informações do usuário
    document.getElementById('userDisplayName').textContent = `${currentUser.name} (${currentUser.role})`;
    document.getElementById('sessionUser').textContent = currentUser.email;
    document.getElementById('sessionTime').textContent = currentUser.loginTime;
}

// ========================================
// Logout
// ========================================
function handleLogout() {
    // Confirmar logout
    if (confirm('Deseja realmente sair?')) {
        sessionStorage.removeItem('userSession');
        currentUser = null;
        
        // Limpar formulário
        document.getElementById('loginForm').reset();
        clearEmailError();
        clearPasswordError();
        
        // Voltar para login
        document.getElementById('dashboardPanel').style.display = 'none';
        document.getElementById('loginPanel').style.display = 'block';
        document.getElementById('generalError').style.display = 'none';
        
        showToast('✓ Você foi desconectado');
    }
}

// ========================================
// Preenchimento de Demonstração
// ========================================
function fillDemo(email, password) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    document.getElementById('rememberMe').checked = false;
    
    // Validar e disparar animação
    validateEmail();
    validatePassword();
    updatePasswordStrength();
    
    showToast('🎯 Conta de demonstração carregada!');
}

// ========================================
// Links de Ação (Demonstração)
// ========================================
function handleForgotPassword(e) {
    e.preventDefault();
    showToast('📧 Para demonstração, use uma conta de teste acima.');
}

function handleSignup(e) {
    e.preventDefault();
    showToast('🆕 Cadastro de nova conta em desenvolvimento.');
}

// ========================================
// Toast Notification
// ========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ========================================
// Validação em Tempo Real
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Permitir envio com Enter
    document.getElementById('loginForm').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
});
