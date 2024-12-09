document.addEventListener("DOMContentLoaded", () => {
    const formRelatorios = document.getElementById("form-relatorios");
    const tabelaRelatorios = document.getElementById("tabela-relatorios").querySelector("tbody");
  
    let idCounter = 1; // Contador para IDs das linhas
  
    formRelatorios.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const tipoRelatorio = document.getElementById("tipo-relatorio").value;
      const periodo = document.getElementById("periodo").value;
  
      if (tipoRelatorio && periodo) {
        // Criar nova linha na tabela
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
          <td>${idCounter++}</td>
          <td>${tipoRelatorio}</td>
          <td>${periodo}</td>
        `;
  
        tabelaRelatorios.appendChild(novaLinha);
  
        // Resetar o formulário
        formRelatorios.reset();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  });
  