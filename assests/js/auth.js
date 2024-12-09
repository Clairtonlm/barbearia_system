// Simulação de banco de dados local
class AuthService {
    constructor() {
        // Inicializa usuários no localStorage se não existir
        if (!localStorage.getItem('usuarios')) {
            const usuariosPadrao = [
                {
                    id: 1,
                    nome: 'Admin',
                    email: 'admin@barbearia.com',
                    telefone: '(11) 99999-9999',
                    senha: 'admin123',
                    dataCadastro: new Date().toISOString()
                }
            ];
            localStorage.setItem('usuarios', JSON.stringify(usuariosPadrao));
        }
    }

    // Método de registro
    registrar(nome, email, telefone, senha) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        
        // Verifica se usuário já existe
        const usuarioExistente = usuarios.find(u => u.email === email);
        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado');
        }

        const novoUsuario = {
            id: Date.now(),
            nome,
            email,
            telefone,
            senha,
            dataCadastro: new Date().toISOString()
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return novoUsuario;
    }

    // Método de login
    login(email, senha) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuario) {
            // Log para debug
            console.log('Login realizado com sucesso:', usuario);
            
            // Armazena usuário logado
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            return usuario;
        } else {
            console.log('Falha no login para:', email);
            throw new Error('Credenciais inválidas');
        }
    }

    // Método de logout
    logout() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    }

    // Verifica se usuário está logado
    estaLogado() {
        return !!localStorage.getItem('usuarioLogado');
    }

    // Recupera usuário logado
    usuarioLogado() {
        return JSON.parse(localStorage.getItem('usuarioLogado'));
    }
}

// Instância global do serviço de autenticação
const authService = new AuthService();

// Event Listeners para login e registro
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registroForm = document.getElementById('registroForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const usuario = authService.login(email, senha);
                alert('Login realizado com sucesso!');
                window.location.href = 'index.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;

            if (senha !== confirmarSenha) {
                alert('Senhas não coincidem');
                return;
            }

            try {
                const usuario = authService.registrar(nome, email, telefone, senha);
                alert('Registro realizado com sucesso!');
                window.location.href = 'login.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Verificação de autenticação para páginas restritas
    const paginasRestritas = ['index.html', 'agendamento.html', 'clientes.html', 'produtos.html', 'funcionarios.html', 'financeiro.html', 'relatorio.html'];
    const paginaAtual = window.location.pathname.split('/').pop();

    if (paginasRestritas.includes(paginaAtual) && !authService.estaLogado()) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = 'login.html';
    }
});

// Adiciona logout em todas as páginas
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            authService.logout();
        });
    }
});

// Exporta o serviço de autenticação para uso em outros scripts
export default authService;
