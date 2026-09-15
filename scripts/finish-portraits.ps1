$ErrorActionPreference='Stop'
$portraitRoot=Join-Path $PSScriptRoot '../public/assets/portraits'
$portraitFile=Join-Path $portraitRoot 'manifest.json'
$portraitData=Get-Content $portraitFile -Raw|ConvertFrom-Json
$remainingPortraits=@(
 @('Karsanbhai Patel','https://nirmawebsite.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/03/President-Karsan-Patel.jpg','karsanbhai-patel.jpg','https://nirmauni.ac.in/about/leadership/president/'),
 @('Dhumketu (writer)','https://thumb.wikimedia.org/wikipedia/en/thumb/0/03/Dhumketu%28writer%29Pic.jpg/250px-Dhumketu%28writer%29Pic.jpg','dhumketu-writer.jpg','https://en.wikipedia.org/wiki/Dhumketu_(writer)'),
 @('Gulabdas Broker','https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Gulabdas_Harjivandas_Broker.png/250px-Gulabdas_Harjivandas_Broker.png','gulabdas-broker.png','https://en.wikipedia.org/wiki/Gulabdas_Broker')
)
foreach($portrait in $remainingPortraits){
 try {
  Invoke-WebRequest -Uri $portrait[1] -OutFile (Join-Path $portraitRoot $portrait[2]) -TimeoutSec 30
  $portraitData | Add-Member -MemberType NoteProperty -Name $portrait[0] -Value @{src=('/assets/portraits/'+$portrait[2]);source=$portrait[3];original=$portrait[1];title=$portrait[0]} -Force
  Write-Output ('OK: '+$portrait[0])
 }catch{Write-Output ('FAILED: '+$portrait[0]+' '+$_.Exception.Message)}
}
$portraitData|ConvertTo-Json -Depth 5|Set-Content -LiteralPath $portraitFile -Encoding utf8
