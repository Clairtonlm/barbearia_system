$htmlFiles = @(
    'clientes.html', 
    'funcionarios.html', 
    'financeiro.html', 
    'relatorio.html'
)

foreach ($file in $htmlFiles) {
    $content = Get-Content $file -Encoding UTF8
    
    # Remover navbars existentes
    $content = $content -replace '<nav class="navbar.*?</nav>', ''
    
    # Remover container de navbar secundário
    $content = $content -replace '<div class="container-fluid bg-secondary text-white py-2">.*?</div>' -replace '(?s)', ''
    
    # Adicionar script de navbar
    $content = $content -replace '(</body>)', '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>`n  <script type="module" src="assets/js/navbar.js"></script>`n$1'
    
    Set-Content -Path $file -Value $content -Encoding UTF8
}

Write-Host "Páginas padronizadas com sucesso."
