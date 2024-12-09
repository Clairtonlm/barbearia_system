document.addEventListener("DOMContentLoaded", () => {
    listarClientes();
    document.getElementById('form-cliente').addEventListener('submit', adicionarCliente);
});

function getClientes() {
    return JSON.parse(localStorage.getItem('clientes')) || [];
}

function salvarClientes(clientes) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function listarClientes() {
    const tabela = document.querySelector('#tabela-clientes tbody');
    tabela.innerHTML = '';
    const clientes = getClientes();

    clientes.forEach((cliente, index) => {
        const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.email}</td>
            <td>
                <button onclick="editarCliente(${index})" class="btn btn-sm btn-warning">
                    <i class="bi bi-pencil"></i>
                </button>
                <button onclick="excluirCliente(${index})" class="btn btn-sm btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

function adicionarCliente(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    const email = document.getElementById('email-cliente').value;

    const clientes = getClientes();
    clientes.push({ nome, telefone, email });
    salvarClientes(clientes);

    alert('Cliente adicionado com sucesso!');
    listarClientes();
    document.getElementById('form-cliente').reset();
}

function editarCliente(index) {
    const clientes = getClientes();
    const cliente = clientes[index];

    document.getElementById('nome-cliente').value = cliente.nome;
    document.getElementById('telefone-cliente').value = cliente.telefone;
    document.getElementById('email-cliente').value = cliente.email;

    // Remove o cliente atual para ser substituído
    clientes.splice(index, 1);
    salvarClientes(clientes);
    listarClientes();
}

function excluirCliente(index) {
    if(confirm('Tem certeza que deseja excluir este cliente?')) {
        const clientes = getClientes();
        clientes.splice(index, 1);
        salvarClientes(clientes);
        listarClientes();
    }
}
