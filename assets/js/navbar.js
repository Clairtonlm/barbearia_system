import { obterSaudacao, formatarData, logout } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Função para criar navbar padrão
  function criarNavbarPadrao() {
    // Remover todas as navbars existentes
    const existingNavbars = document.querySelectorAll('nav.navbar, .container-fluid.bg-secondary');
    existingNavbars.forEach(navbar => navbar.remove());

    // Criar novo container para navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="dashboard.html">
            <img src="assets/img/logo.png" alt="Logo Barbearia" height="40" class="d-inline-block align-text-top">
            Barbearia System
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="dashboard.html">
                  <i class="bi bi-house-fill me-1"></i>Início
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="agendamento.html">
                  <i class="bi bi-calendar-check me-1"></i>Agendamentos
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="produtos.html">
                  <i class="bi bi-cart-fill me-1"></i>Produtos
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-person-circle me-1"></i>Minha Conta
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Configurações</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-danger" href="index.html" onclick="logout()"><i class="bi bi-box-arrow-right me-2"></i>Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    // Adiciona a navbar antes do primeiro elemento do body
    document.body.insertBefore(navbarContainer.firstChild, document.body.firstChild);
  }

  // Chama a função para criar navbar
  criarNavbarPadrao();

  // Atualizar navbar
  function atualizarNavbar() {
    const dataAtual = new Date();
    const nomeUsuario = JSON.parse(localStorage.getItem('usuarioLogado'))?.nome || 'Administrador';
    
    const navbarInfo = document.getElementById('navbar-info');
    if (navbarInfo) {
      navbarInfo.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="me-3">${obterSaudacao()}, ${nomeUsuario}!</span>
            <span>${formatarData(dataAtual)}</span>
          </div>
          <div>
            <button onclick="logout()" class="btn btn-outline-light btn-sm">
              <i class="bi bi-box-arrow-right me-1"></i>Sair
            </button>
          </div>
        </div>
      `;
    }
  }

  // Atualizar navbar a cada segundo
  atualizarNavbar();
  setInterval(atualizarNavbar, 1000);
});
