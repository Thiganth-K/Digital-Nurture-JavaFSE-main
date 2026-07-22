# PowerShell script for Exercise 2: Git Ignore
# Captures command line execution trace to proof.log

$logPath = Join-Path $PSScriptRoot "proof.log"
Start-Transcript -Path $logPath -Force

Write-Output "=== Exercise 2: Git Ignore ==="
Write-Output "Current Time: $(Get-Date)"
Write-Output ""

# Clean up previous runs
if (Test-Path (Join-Path $PSScriptRoot "GitIgnoreDemo")) {
    Remove-Item -Recurse -Force (Join-Path $PSScriptRoot "GitIgnoreDemo")
}

Write-Output "Step 1: Initialize Git Repository 'GitIgnoreDemo'"
git init GitIgnoreDemo
cd GitIgnoreDemo
Write-Output ""

Write-Output "Step 2: Create a dummy text file to commit first"
Set-Content -Path main.txt -Value "Main project entrypoint."
git add main.txt
git commit -m "Initial commit with main.txt"
git status
Write-Output ""

Write-Output "Step 3: Create a '.log' file and a 'log' folder with files"
# Create file with .log extension
Set-Content -Path app.log -Value "2026-07-22 18:00:00 [INFO] Starting application..."
# Create a folder 'log' and a file in it
New-Item -ItemType Directory -Path "log" -Force | Out-Null
Set-Content -Path "log/debug.txt" -Value "Debug diagnostics content."

Write-Output "Files in working directory before gitignore:"
Get-ChildItem -Recurse
Write-Output ""

Write-Output "Step 4: Check git status before updating .gitignore"
git status
Write-Output ""

Write-Output "Step 5: Create and configure .gitignore"
# Configure gitignore to ignore *.log and log/
$gitignoreContent = @(
    "*.log",
    "log/"
)
Set-Content -Path .gitignore -Value $gitignoreContent

Write-Output "Content of .gitignore:"
Get-Content .gitignore
Write-Output ""

Write-Output "Step 6: Check git status after creating .gitignore"
# This should show .gitignore as untracked, but app.log and the log/ folder should NOT appear
git status
Write-Output ""

Write-Output "Step 7: Add and commit .gitignore"
git add .gitignore
git commit -m "Add .gitignore to exclude log files and log folder"
Write-Output ""

Write-Output "Step 8: Final status check"
git status
Write-Output ""

Stop-Transcript
Write-Output "Verification proof saved to proof.log"
