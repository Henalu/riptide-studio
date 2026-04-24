param(
    [string]$Path = "index.html"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$targetPath = Join-Path $projectRoot $Path

if (-not (Test-Path $targetPath)) {
    Write-Host "[FAIL] Missing file: $targetPath" -ForegroundColor Red
    exit 1
}

$html = [System.IO.File]::ReadAllText($targetPath, [System.Text.Encoding]::UTF8)
$errors = New-Object System.Collections.Generic.List[string]

$requiredMarkers = @(
    'id="top"',
    'id="projects"',
    'id="contact"',
    '<main>',
    '</main>',
    'mailto:hello@riptide.studio'
)

foreach ($marker in $requiredMarkers) {
    if ($html.IndexOf($marker, [System.StringComparison]::Ordinal) -lt 0) {
        $errors.Add("Missing required marker: $marker")
    }
}

$bannedPatterns = @(
    'id="cur-dot"',
    'id="cur-ring"',
    'proj-arrow',
    'marquee-wrap',
    'marquee-track'
)

foreach ($pattern in $bannedPatterns) {
    if ($html.IndexOf($pattern, [System.StringComparison]::Ordinal) -ge 0) {
        $errors.Add("Legacy artifact still present: $pattern")
    }
}

$dataTKeys = [regex]::Matches($html, 'data-t="([^"]+)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Sort-Object -Unique

if (-not $dataTKeys) {
    $errors.Add("No data-t translation keys were found.")
}

function Get-LanguageKeys {
    param(
        [string]$Language
    )

    $pattern = "(?s){0}:\s*\{{(.*?)\n\s*\}}(?=\s*,\s*[A-Za-z0-9_]+\s*:|\s*\n\s*\}};)" -f [regex]::Escape($Language)
    $match = [regex]::Match($html, $pattern)
    if (-not $match.Success) {
        $errors.Add("Could not locate translation block for '$Language'.")
        return @()
    }

    return [regex]::Matches($match.Groups[1].Value, '(?m)^\s*([A-Za-z0-9_]+)\s*:') |
        ForEach-Object { $_.Groups[1].Value } |
        Sort-Object -Unique
}

$enKeys = Get-LanguageKeys -Language "en"
$esKeys = Get-LanguageKeys -Language "es"

foreach ($key in $dataTKeys) {
    if ($enKeys -notcontains $key) {
        $errors.Add("Missing EN translation key: $key")
    }

    if ($esKeys -notcontains $key) {
        $errors.Add("Missing ES translation key: $key")
    }
}

foreach ($key in $enKeys) {
    if ($esKeys -notcontains $key) {
        $errors.Add("Key present in EN but missing in ES: $key")
    }
}

foreach ($key in $esKeys) {
    if ($enKeys -notcontains $key) {
        $errors.Add("Key present in ES but missing in EN: $key")
    }
}

if ($errors.Count -gt 0) {
    Write-Host "[FAIL] Riptide verification found issues:" -ForegroundColor Red
    Write-Output "[FAIL] Riptide verification found issues:"
    foreach ($item in $errors) {
        Write-Host " - $item" -ForegroundColor Red
        Write-Output " - $item"
    }
    exit 1
}

Write-Host "[OK] Riptide verification passed." -ForegroundColor Green
Write-Output "[OK] Riptide verification passed."
Write-Host " - Checked file: $Path"
Write-Output " - Checked file: $Path"
Write-Host " - Translation keys: $($dataTKeys.Count)"
Write-Output " - Translation keys: $($dataTKeys.Count)"
Write-Host " - EN keys: $($enKeys.Count)"
Write-Output " - EN keys: $($enKeys.Count)"
Write-Host " - ES keys: $($esKeys.Count)"
Write-Output " - ES keys: $($esKeys.Count)"
