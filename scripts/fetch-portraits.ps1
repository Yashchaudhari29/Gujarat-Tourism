$ErrorActionPreference = 'Stop'
$portraitTitles = @('Narendra Modi','Mahatma Gandhi','Vallabhbhai Patel','Vikram Sarabhai','Verghese Kurien','Jamsetji Tata','Jhaverchand Meghani','Narsinh Mehta','Dhirubhai Ambani','Bhikaiji Cama','Morarji Desai','Ela Bhatt','Karsanbhai Patel','Mallika Sarabhai','Asha Parekh','Paresh Rawal','Pankaj Udhas','Falguni Pathak','Dhumketu (writer)','Umashankar Joshi','Kanaiyalal Maneklal Munshi','Hansa Jivraj Mehta','Har Gobind Khorana','Prafulla Chandra Ray','Tribhuvandas Kishibhai Patel','Manilal Gandhi','Ravishankar Raval','Gulabdas Broker')
$portraitDirectory = Join-Path $PSScriptRoot '../public/assets/portraits'
New-Item -ItemType Directory -Path $portraitDirectory -Force | Out-Null
$portraitManifest = [ordered]@{}
$manifestFile = Join-Path $portraitDirectory 'manifest.json'
if (Test-Path $manifestFile) { $saved = Get-Content $manifestFile -Raw | ConvertFrom-Json; foreach($property in $saved.PSObject.Properties){$portraitManifest[$property.Name]=$property.Value} }
foreach ($portraitTitle in $portraitTitles) {
  if($portraitManifest.Contains($portraitTitle)) {continue}
  Start-Sleep -Seconds 5
  try {
    $summaryUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + [uri]::EscapeDataString($portraitTitle.Replace(' ','_'))
    $summary = Invoke-RestMethod -Uri $summaryUrl -TimeoutSec 25
    if (!$summary.thumbnail.source) { throw 'No article portrait' }
    $remote = $summary.thumbnail.source.Split('?')[0]
    $extension = [IO.Path]::GetExtension(([uri]$remote).AbsolutePath)
    $basename = $portraitTitle.ToLower() -replace '[^a-z0-9]+','-'
    $filename = $basename.Trim('-') + $extension
    $destination = Join-Path $portraitDirectory $filename
    Invoke-WebRequest -Uri $remote -OutFile $destination -TimeoutSec 30
    $portraitManifest[$portraitTitle] = @{src="/assets/portraits/$filename";source=$summary.content_urls.desktop.page;original=$summary.originalimage.source;description=$summary.description;caption=$summary.extract;title=$summary.title}
    Write-Output "OK: $portraitTitle -> $filename"
  } catch { Write-Output "FAILED: $portraitTitle : $_" }
}
$portraitManifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $portraitDirectory 'manifest.json') -Encoding utf8
