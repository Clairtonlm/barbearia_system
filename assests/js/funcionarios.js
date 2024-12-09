document.addEventListener("DOMContentLoaded", () => {
    const formFinanceiro = document.getElementById("form-financeiro");
    const tabelaFinanceiro = document.getElementById("tabela-financeiro").querySelector("tbody");
  
    let idCounter = 1; // Contador para IDs das linhas
  
    formFinanceiro.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const descricao = document.getElementById("descricao").value;
      const tipo = document.getElementById("tipo").value;
      const valor = parseFloat(document.getElementById("valor").value).toFixed(2);
  
      if (descricao && tipo && valor) {
        // Criar nova linha na tabela
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
          <td>${idCounter++}</td>
          <td>${descricao}</td>
          <td>${tipo}</td>
          <td>R$ ${valor}</td>
        `;
  
        tabelaFinanceiro.appendChild(novaLinha);
  
        // Resetar o formulário
        formFinanceiro.reset();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  });
  