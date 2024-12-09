$htmlFiles = @(
    'agendamento.html', 
    'clientes.html', 
    'financeiro.html', 
    'funcionarios.html', 
    'produtos.html', 
    'registro.html', 
    'relatorio.html'
)

foreach ($file in $htmlFiles) {
    $content = Get-Content $file
    
    # Remover qualquer navbar existente
    $content = $content -replace '<nav class="navbar.*?</nav>', ''
    
    # Adicionar script de navbar antes do fechamento do body
    $newContent = $content -replace '(</body>)', '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`n  <script type="module" src="assets/js/navbar.js"></script>`n$1'
    
    Set-Content -Path $file -Value $newContent
}

Write-Host "Navbar adicionada a todos os arquivos HTML."
