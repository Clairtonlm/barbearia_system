import { salvarNoLocalStorage, obterDoLocalStorage } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    listarAgendamentos();
    document.getElementById('form-agendamento').addEventListener('submit', adicionarAgendamento);
});

function getAgendamentos() {
    return obterDoLocalStorage('agendamentos') || [];
}

function salvarAgendamentos(agendamentos) {
    salvarNoLocalStorage('agendamentos', agendamentos);
}

function listarAgendamentos() {
    const tabela = document.querySelector('#tabela-agendamentos tbody');
    tabela.innerHTML = '';
    const agendamentos = getAgendamentos();

    agendamentos.forEach((agendamento, index) => {
        const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${agendamento.cliente}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.horario}</td>
            <td>
                <button onclick="editarAgendamento(${index})" class="btn btn-sm btn-warning">
                    <i class="bi bi-pencil"></i>
                </button>
                <button onclick="excluirAgendamento(${index})" class="btn btn-sm btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
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

function editarAgendamento(index) {
    const agendamentos = getAgendamentos();
    const agendamento = agendamentos[index];

    document.getElementById('nome-cliente').value = agendamento.cliente;
    document.getElementById('servico').value = agendamento.servico;
    document.getElementById('data-agendamento').value = agendamento.data;
    document.getElementById('horario-agendamento').value = agendamento.horario;

    // Remove o agendamento atual para ser substituído
    agendamentos.splice(index, 1);
    salvarAgendamentos(agendamentos);
    listarAgendamentos();
}

function excluirAgendamento(index) {
    if(confirm('Tem certeza que deseja excluir este agendamento?')) {
        const agendamentos = getAgendamentos();
        agendamentos.splice(index, 1);
        salvarAgendamentos(agendamentos);
        listarAgendamentos();
    }
}
