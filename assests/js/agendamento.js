document.addEventListener("DOMContentLoaded", () => {
    listarAgendamentos();
    document.getElementById('form-agendamento').addEventListener('submit', adicionarAgendamento);
  });
  
  function getAgendamentos() {
    return JSON.parse(localStorage.getItem('agendamentos')) || [];
  }
  
  function salvarAgendamentos(agendamentos) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }
  
  function listarAgendamentos() {
    const tabela = document.querySelector('#tabela-agendamentos tbody');
    tabela.innerHTML = '';
    const agendamentos = getAgendamentos();
  
    agendamentos.forEach((agendamento, index) => {
      const row = `<tr>
        <td>${index + 1}</td>
        <td>${agendamento.cliente}</td>
        <td>${agendamento.servico}</td>
        <td>${agendamento.data}</td>
        <td>${agendamento.horario}</td>
      </tr>`;
      tabela.innerHTML += row;
    });
  }
  
  function adicionarAgendamento(event) {
    event.preventDefault();
  
    const cliente = document.getElementById('nome-cliente').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data-agendamento').value;
    const horario = document.getElementById('horario-agendamento').value;
  
    const agendamentos = getAgendamentos();
    agendamentos.push({ cliente, servico, data, horario });
    salvarAgendamentos(agendamentos);
  
    alert('Agendamento adicionado com sucesso!');
    listarAgendamentos();
    document.getElementById('form-agendamento').reset();
  }
  