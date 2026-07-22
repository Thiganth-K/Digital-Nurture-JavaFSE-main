# PowerShell script for Exercise 1: Git Basics
# Captures command line execution trace to proof.log

$logPath = Join-Path $PSScriptRoot "proof.log"
Start-Transcript -Path $logPath -Force

Write-Output "=== Exercise 1: Git Basics ==="
Write-Output "Current Time: $(Get-Date)"
Write-Output ""

# Clean up previous runs
if (Test-Path (Join-Path $PSScriptRoot "GitDemo")) {
    Remove-Item -Recurse -Force (Join-Path $PSScriptRoot "GitDemo")
}

Write-Output "Step 1: Check if Git is installed"
git --version
Write-Output ""

Write-Output "Step 2: Configure User Name & Email"
# Backup existing configs to restore later if needed
$oldName = git config --global user.name
$oldEmail = git config --global user.email

git config --global user.name "HandsOn Student"
git config --global user.email "student@handson.com"

Write-Output "Configured user.name: $(git config --global user.name)"
Write-Output "Configured user.email: $(git config --global user.email)"
Write-Output ""

Write-Output "Step 3: Verify configuration setting"
git config --global --list
Write-Output ""

Write-Output "Step 4: Configure Notepad++ as default editor (with notepad fallback)"
$nppPath = "C:\Program Files\Notepad++\notepad++.exe"
if (Test-Path $nppPath) {
    git config --global core.editor "'$nppPath' -multiInst -notabbar -nosession -noPlugin"
    Write-Output "Configured Notepad++: $nppPath"
} else {
    git config --global core.editor "notepad"
    Write-Output "Notepad++ not found. Fallback to Windows Notepad configured."
}
Write-Output "Default editor configured: $(git config --global core.editor)"
Write-Output ""

Write-Output "Step 5: Initialize Git Repository 'GitDemo'"
git init GitDemo
cd GitDemo
Write-Output ""

Write-Output "Step 6: Display hidden files in GitDemo repository"
Get-ChildItem -Force
Write-Output ""

Write-Output "Step 7: Create a file 'welcome.txt' with content"
Set-Content -Path welcome.txt -Value "Welcome to Git"
Write-Output ""

Write-Output "Step 8: Verify file creation and content"
Write-Output "File exists check:"
Get-ChildItem welcome.txt
Write-Output "File content:"
Get-Content welcome.txt
Write-Output ""

Write-Output "Step 9: Check git status before adding file"
git status
Write-Output ""

Write-Output "Step 10: Stage the file 'welcome.txt'"
git add welcome.txt
Write-Output "Staged successfully."
Write-Output ""

Write-Output "Step 11: Commit the file with a message"
# Run commit directly with message
git commit -m "Initial commit: welcome.txt added to local repository"
Write-Output ""

Write-Output "Step 12: Check git status after committing"
git status
Write-Output ""

# Restore backup configs
if ($oldName) { git config --global user.name "$oldName" }
if ($oldEmail) { git config --global user.email "$oldEmail" }

Stop-Transcript
Write-Output "Verification proof saved to proof.log"
