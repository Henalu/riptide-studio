$ErrorActionPreference = "Continue"

$projectRoot = if ($env:CLAUDE_PROJECT_DIR) {
    $env:CLAUDE_PROJECT_DIR
} else {
    Split-Path -Parent $PSScriptRoot
}

$verifyScript = Join-Path $projectRoot "scripts\verify.ps1"

if (-not (Test-Path $verifyScript)) {
    exit 0
}

$output = powershell -NoProfile -ExecutionPolicy Bypass -File $verifyScript 2>&1
$exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    $message = ($output | Out-String).Trim()
    $payload = @{
        additionalContext = "Riptide post-edit verification found issues:`n$message"
    } | ConvertTo-Json -Compress

    Write-Output $payload
}

exit 0
