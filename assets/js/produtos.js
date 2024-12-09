import { salvarNoLocalStorage, obterDoLocalStorage } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    listarProdutos();
    document.getElementById('form-produto').addEventListener('submit', adicionarProduto);
});

function getProdutos() {
    return obterDoLocalStorage('produtos') || [];
}

function salvarProdutos(produtos) {
    salvarNoLocalStorage('produtos', produtos);
}

function listarProdutos() {
    const tabela = document.querySelector('#tabela-produtos tbody');
    tabela.innerHTML = '';
    const produtos = getProdutos();

    produtos.forEach((produto, index) => {
        const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
            <td>${produto.estoque}</td>
            <td>
                <button onclick="editarProduto(${index})" class="btn btn-sm btn-warning">
                    <i class="bi bi-pencil"></i>
                </button>
                <button onclick="excluirProduto(${index})" class="btn btn-sm btn-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

function adicionarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-produto').value;
    const categoria = document.getElementById('categoria').value;
    const preco = document.getElementById('preco').value;
    const estoque = document.getElementById('estoque').value;

    const produtos = getProdutos();
    produtos.push({ nome, categoria, preco, estoque });
    salvarProdutos(produtos);

    alert('Produto adicionado com sucesso!');
    listarProdutos();
    document.getElementById('form-produto').reset();
}

function editarProduto(index) {
    const produtos = getProdutos();
    const produto = produtos[index];

    document.getElementById('nome-produto').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('estoque').value = produto.estoque;

    // Remove o produto atual para ser substituído
    produtos.splice(index, 1);
    salvarProdutos(produtos);
    listarProdutos();
}

function excluirProduto(index) {
    if(confirm('Tem certeza que deseja excluir este produto?')) {
        const produtos = getProdutos();
        produtos.splice(index, 1);
        salvarProdutos(produtos);
        listarProdutos();
    }
}
