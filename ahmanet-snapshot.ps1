param(
  [Parameter(Mandatory=$true)][string]$Name,
  [string]$Message
)

$ErrorActionPreference = 'Stop'

# Repo root (script location)
$Repo = Split-Path -Parent $PSCommandPath

function Exec([string]$cmd, [string]$workdir) {
  Write-Host "[ahmanet] $cmd"
  $pinfo = New-Object System.Diagnostics.ProcessStartInfo
  $pinfo.FileName = "powershell.exe"
  $pinfo.Arguments = "-NoProfile -ExecutionPolicy Bypass -Command `"$cmd`""
  $pinfo.WorkingDirectory = $workdir
  $pinfo.UseShellExecute = $false
  $pinfo.RedirectStandardOutput = $true
  $pinfo.RedirectStandardError = $true
  $process = New-Object System.Diagnostics.Process
  $process.StartInfo = $pinfo
  $process.Start() | Out-Null
  $stdout = $process.StandardOutput.ReadToEnd()
  $stderr = $process.StandardError.ReadToEnd()
  $process.WaitForExit()
  if ($process.ExitCode -ne 0) { throw "Command failed ($($process.ExitCode)): $cmd`n$stderr" }
  if ($stdout) { Write-Host $stdout }
}

# Locate git.exe even if not in PATH
function Find-GitPath {
  $candidates = @(
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files\\Git\\bin\\git.exe",
    "C:\\Program Files (x86)\\Git\\cmd\\git.exe",
    "C:\\Program Files (x86)\\Git\\bin\\git.exe"
  )
  foreach ($p in $candidates) { if (Test-Path $p) { return $p } }
  try {
    $found = & where.exe git 2>$null | Select-Object -First 1
    if ($found) { return $found }
  } catch { }
  throw "Git n'est pas disponible (PATH) et git.exe introuvable dans les emplacements connus."
}

$GitPath = Find-GitPath
function ExecProc([string]$file, [string]$procArgs, [string]$workdir) {
  Write-Host "[ahmanet] $file $procArgs"
  $pinfo = New-Object System.Diagnostics.ProcessStartInfo
  $pinfo.FileName = $file
  $pinfo.Arguments = $procArgs
  $pinfo.WorkingDirectory = $workdir
  $pinfo.UseShellExecute = $false
  $pinfo.RedirectStandardOutput = $true
  $pinfo.RedirectStandardError = $true
  $process = New-Object System.Diagnostics.Process
  $process.StartInfo = $pinfo
  $process.Start() | Out-Null
  $stdout = $process.StandardOutput.ReadToEnd()
  $stderr = $process.StandardError.ReadToEnd()
  $process.WaitForExit()
  if ($process.ExitCode -ne 0) { throw "Command failed ($($process.ExitCode)): $file $procArgs`n$stderr" }
  if ($stdout) { Write-Host $stdout }
}

function ExecGit([string]$gitArgs) {
  ExecProc $GitPath $gitArgs $Repo
}

# Check git
try { ExecGit "--version" } catch { throw $_ }

# Ensure repo exists
$inside = $false
try {
  ExecGit "-C `"$Repo`" rev-parse --is-inside-work-tree"
  $inside = $true
} catch {
  $inside = $false
}
if (-not $inside) {
  ExecGit "-C `"$Repo`" init"
}

# Timestamp tag
$stamp = Get-Date -Format "yyyyMMdd-HHmm"
$tag = "ahmanet-$stamp-$Name"

# Default message
if (-not $Message -or $Message.Trim() -eq "") {
  $Message = "ahmanet snapshot: $Name"
}

# Stage only Ahmanet template folders
$paths = @(
  "administrator/templates/atum_ahmanet",
  "media/templates/administrator/atum_ahmanet",
  ".gitignore",
  "ahmanet-snapshot.ps1"
)

foreach ($p in $paths) {
  if (Test-Path (Join-Path $Repo $p)) {
    ExecGit "-C `"$Repo`" add --all -- `"$p`""
  }
}

# Commit
$needCommit = $true
try { ExecGit "-C `"$Repo`" diff --cached --quiet"; $needCommit = $false } catch { $needCommit = $true }
if ($needCommit) {
  ExecGit "-C `"$Repo`" commit -m `"$Message`""
} else {
  Write-Host "[ahmanet] Rien à committer (index vide)"
}

# Create tag if not exists
$tagExists = $false
try {
  ExecGit "-C `"$Repo`" rev-parse -q --verify refs/tags/$tag"
  $tagExists = $true
} catch { $tagExists = $false }

if (-not $tagExists) {
  ExecGit "-C `"$Repo`" tag $tag"
  Write-Host "[ahmanet] Tag créé: $tag"
} else {
  Write-Host "[ahmanet] Tag existe déjà: $tag"
}

Write-Host "[ahmanet] Snapshot terminé. Pour revenir:"
Write-Host "  `"$GitPath`" -C `"$Repo`" reset --hard $tag"

