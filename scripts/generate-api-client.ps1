[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$contract = Join-Path $root "contracts/campiqo-v1.json"
$temporary = Join-Path $root "artifacts/openapi-client"
$destination = Join-Path $root "src/generated/api"
$generator =
    "openapitools/openapi-generator-cli@sha256:" +
    "2ab0a9680222de65dc9d3baf861aa02b99e1b80c211d8221ebf3ae8f8a102524"

foreach ($target in @($temporary, $destination))
{
    $resolved = [System.IO.Path]::GetFullPath($target)
    $prefix = $root.TrimEnd('\', '/') +
        [System.IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith(
        $prefix,
        [System.StringComparison]::OrdinalIgnoreCase))
    {
        throw "Generated hedef repository dışında olamaz: $resolved"
    }

    if (Test-Path -LiteralPath $resolved)
    {
        Remove-Item -LiteralPath $resolved -Recurse -Force
    }
}

New-Item -ItemType Directory -Path $temporary -Force | Out-Null

& docker run --rm `
    --volume "${root}:/local" `
    $generator `
    generate `
    -i /local/contracts/campiqo-v1.json `
    -g typescript-fetch `
    -o /local/artifacts/openapi-client `
    --additional-properties "npmName=@campiqo/api-client,npmVersion=1.0.0,supportsES6=true,typescriptThreePlus=true,useSingleRequestParameter=true,enumUnknownDefaultCase=true,dateLibrary=string,disallowAdditionalPropertiesIfNotPresent=false,withInterfaces=true" `
    --global-property "apiDocs=false,modelDocs=false,apiTests=false,modelTests=false"

if ($LASTEXITCODE -ne 0)
{
    throw "OpenAPI TypeScript istemcisi üretilemedi."
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null
Copy-Item `
    -Path (Join-Path $temporary "src/*") `
    -Destination $destination `
    -Recurse `
    -Force

Write-Host "Generated API client: $destination"
