$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$archivePath = Join-Path $projectRoot 'Gujarat-Unveiled-Saved-Checkpoint-2026-09-15.zip'
if (Test-Path -LiteralPath $archivePath) { throw 'Checkpoint ZIP already exists; choose a new filename rather than overwriting it.' }
$includeDirectories = @('src','public','scripts','docs','handoff-requirements','dist')
$files = @(Get-ChildItem -LiteralPath $projectRoot -File -Force | Where-Object { $_.Extension -ne '.zip' -and $_.Name -notin @('.translation-content.mjs','.locale-audit.mjs') -and $_.Name -notlike '.env*' -and $_.Extension -ne '.log' })
foreach ($directory in $includeDirectories) {
 $path = Join-Path $projectRoot $directory
 if (Test-Path -LiteralPath $path) { $files += @(Get-ChildItem -LiteralPath $path -File -Recurse -Force | Where-Object { $_.FullName -notmatch '[\\/](node_modules|__pycache__|\.git)[\\/]' -and $_.Name -notlike '.env*' -and $_.Extension -notin @('.zip','.log','.pyc') }) }
}
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$stream = [IO.File]::Open($archivePath,[IO.FileMode]::CreateNew)
$zip = [IO.Compression.ZipArchive]::new($stream,[IO.Compression.ZipArchiveMode]::Create)
try {
 foreach ($file in $files) {
  $relative = $file.FullName.Substring($projectRoot.Length+1).Replace('\','/')
  [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,$file.FullName,'Gujarat-Unveiled/'+$relative,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
 }
} finally { $zip.Dispose(); $stream.Dispose() }
$verification = [IO.Compression.ZipFile]::OpenRead($archivePath)
try {
 if ($verification.Entries.Count -ne $files.Count) { throw 'Archive entry count mismatch.' }
 foreach ($required in @('CONTINUE-HERE.md','CHECKPOINT-2026-09-15.md','package.json','src/App.jsx','dist/index.html','scripts/checkpoint-verification.json')) {
  if ($null -eq $verification.GetEntry('Gujarat-Unveiled/'+$required)) { throw ('Missing archive entry: '+$required) }
 }
 foreach ($entry in $verification.Entries) {
  $relative=$entry.FullName.Substring('Gujarat-Unveiled/'.Length)
  $source=Join-Path $projectRoot $relative
  if ($entry.Length -ne (Get-Item -LiteralPath $source).Length) { throw ('Length mismatch: '+$relative) }
 }
 Write-Output ('Verified archive entries: '+$verification.Entries.Count)
} finally { $verification.Dispose() }
Get-Item -LiteralPath $archivePath | Select-Object FullName,Length
Get-FileHash -LiteralPath $archivePath -Algorithm SHA256
