param([string]$BrandPath = (Join-Path $PSScriptRoot '../../packages/brand'))
$ErrorActionPreference = 'Stop'
$source = (Resolve-Path -LiteralPath $BrandPath).Path
$destination = Join-Path (Split-Path -Parent $PSScriptRoot) 'public/brand'
if (-not (Test-Path -LiteralPath (Join-Path $source 'tokens.css'))) { throw 'Brand tokens missing.' }
New-Item -ItemType Directory -Path (Join-Path $destination 'fonts') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $source 'tokens.css') -Destination (Join-Path $destination 'tokens.css')
Get-ChildItem -LiteralPath (Join-Path $source 'fonts') -File | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $destination 'fonts' $_.Name)
}
Write-Output 'Portable brand snapshot refreshed. Review the diff and verify before publishing.'
