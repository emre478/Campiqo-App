[CmdletBinding()]
param(
    [string]$BackendRoot = (Join-Path $PSScriptRoot "../..\Campiqo")
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$mobileRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$source = [System.IO.Path]::GetFullPath(
    (Join-Path $BackendRoot "contracts/openapi/v1/campiqo-v1.json"))
$destination = Join-Path $mobileRoot "contracts/campiqo-v1.json"

if (-not (Test-Path -LiteralPath $source -PathType Leaf))
{
    throw "Backend OpenAPI baseline bulunamadı: $source"
}

New-Item -ItemType Directory -Path (Split-Path $destination) -Force |
    Out-Null
Copy-Item -LiteralPath $source -Destination $destination -Force

Write-Host "Backend contract mobil repository ile senkronize edildi."
& (Join-Path $PSScriptRoot "generate-api-client.ps1")
