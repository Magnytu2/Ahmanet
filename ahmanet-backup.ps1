<#!
Ahmanet Backup/Restore Utility

Usage examples:
  # Create a backup snapshot (timestamped)
  .\ahmanet-backup.ps1 -Action backup -Name "avant-changement-sidebar"

  # Restore the latest backup
  .\ahmanet-backup.ps1 -Action restore -Latest

  # Restore a specific backup by folder/tag name
  .\ahmanet-backup.ps1 -Action restore -Tag "20250819-1033-avant-changement-sidebar"

  # Dry run (no file changes)
  .\ahmanet-backup.ps1 -Action restore -Latest -WhatIf
!#>
param(
  [Parameter(Mandatory=$true)][ValidateSet('backup','restore')] [string]$Action,
  [string]$Name,
  [string]$Tag,
  [switch]$Latest,
  [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSCommandPath
$BackupRoot = Join-Path $Root "backups\ahmanet"
$Targets = @(
  "administrator\templates\atum_ahmanet",
  "media\templates\administrator\atum_ahmanet"
)

function New-Stamp { Get-Date -Format "yyyyMMdd-HHmm" }

function Ensure-Dir([string]$Path) {
  if (-not (Test-Path $Path)) { New-Item -ItemType Directory -Path $Path | Out-Null }
}

function Copy-Tree([string]$From, [string]$To) {
  Ensure-Dir (Split-Path -Parent $To)
  if (Test-Path $To) { Remove-Item -Recurse -Force $To }
  Copy-Item -Path $From -Destination $To -Recurse -Force
}

function Backup-Ahmanet {
  Ensure-Dir $BackupRoot
  $stamp = New-Stamp
  if ([string]::IsNullOrWhiteSpace($Name)) { $Name = "snapshot" }
  $dest = Join-Path $BackupRoot "$stamp-$Name"
  Ensure-Dir $dest

  Write-Host "[ahmanet] Creating backup: $dest"
  foreach ($t in $Targets) {
    $src = Join-Path $Root $t
    if (Test-Path $src) {
      $rel = $t -replace "[\\/]","_"
      $to = Join-Path $dest $rel
      Write-Host "  + $t"
      if (-not $WhatIf) { Copy-Tree $src $to }
    } else {
      Write-Warning "  - Missing: $t (skipped)"
    }
  }
  Write-Host "[ahmanet] Backup done."
}

function Get-LatestBackupDir {
  if (-not (Test-Path $BackupRoot)) { return $null }
  $dirs = Get-ChildItem -Path $BackupRoot -Directory | Sort-Object Name -Descending
  if ($dirs.Count -eq 0) { return $null }
  return $dirs[0].FullName
}

function Restore-Ahmanet {
  if ($Latest) {
    $src = Get-LatestBackupDir
    if (-not $src) { throw "Aucune sauvegarde disponible dans '$BackupRoot'" }
  } elseif (-not [string]::IsNullOrWhiteSpace($Tag)) {
    $src = Join-Path $BackupRoot $Tag
    if (-not (Test-Path $src)) { throw "Sauvegarde introuvable: $src" }
  } else {
    throw "Spécifie -Latest ou -Tag <nom_du_dossier> pour restaurer"
  }

  Write-Host "[ahmanet] Restoring from: $src"

  # Auto-backup before restore
  Write-Host "[ahmanet] Creating auto-backup before restore..."
  if (-not $WhatIf) {
    $prevName = "auto-before-restore"
    $prevStamp = New-Stamp
    $prevDest = Join-Path $BackupRoot "$prevStamp-$prevName"
    Ensure-Dir $prevDest
    foreach ($t in $Targets) {
      $p = Join-Path $Root $t
      if (Test-Path $p) {
        $rel = $t -replace "[\\/]","_"
        $to = Join-Path $prevDest $rel
        Copy-Tree $p $to
      }
    }
  }

  # Perform restore
  foreach ($t in $Targets) {
    $rel = $t -replace "[\\/]","_"
    $from = Join-Path $src $rel
    $to = Join-Path $Root $t
    if (Test-Path $from) {
      Write-Host "  <= $t"
      if (-not $WhatIf) {
        if (Test-Path $to) { Remove-Item -Recurse -Force $to }
        Copy-Item -Path $from -Destination $to -Recurse -Force
      }
    } else {
      Write-Warning "  - Backup missing segment: $rel (skipped)"
    }
  }
  Write-Host "[ahmanet] Restore done."
}

switch ($Action) {
  'backup'  { Backup-Ahmanet }
  'restore' { Restore-Ahmanet }
}
