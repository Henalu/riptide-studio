$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot 'verify.cjs')
if ($LASTEXITCODE -ne 0) { throw 'Static release verification failed.' }
