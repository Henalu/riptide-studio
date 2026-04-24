param(
    [int]$Port = 5500,
    [switch]$OpenBrowser
)

$projectRoot = Split-Path -Parent $PSScriptRoot

function Get-PythonCommand {
    if (Get-Command py -ErrorAction SilentlyContinue) {
        return @{ Command = "py"; Arguments = @("-3", "-m", "http.server", $Port) }
    }

    if (Get-Command python -ErrorAction SilentlyContinue) {
        return @{ Command = "python"; Arguments = @("-m", "http.server", $Port) }
    }

    throw "Python was not found. Install Python or run `start index.html` for a direct browser preview."
}

$python = Get-PythonCommand

Push-Location $projectRoot
try {
    Write-Host "Serving Riptide Studio from $projectRoot on http://localhost:$Port" -ForegroundColor Cyan

    if ($OpenBrowser) {
        Start-Process "http://localhost:$Port"
    }

    & $python.Command @($python.Arguments)
}
finally {
    Pop-Location
}
