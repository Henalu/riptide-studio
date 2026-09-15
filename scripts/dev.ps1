param([int]$Port = 5500)
& node (Join-Path $PSScriptRoot 'serve.cjs') $Port
