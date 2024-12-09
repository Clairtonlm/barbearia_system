// Módulo de Utilitários para o Sistema de Barbearia

// Funções de Manipulação de LocalStorage
export function salvarNoLocalStorage(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

export function obterDoLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

// Função de Saudação
export function obterSaudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
}

// Função de Logout Unificada
export function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// Função para Formatar Data
export function formatarData(data) {
    const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    return `${diasSemana[data.getDay()]}, ${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}`;
}
