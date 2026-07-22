# PowerShell script for Exercise 5: Remote Operations
# Captures command line execution trace to proof.log

$logPath = Join-Path $PSScriptRoot "proof.log"
Start-Transcript -Path $logPath -Force

Write-Output "=== Exercise 5: Remote Operations ==="
Write-Output "Current Time: $(Get-Date)"
Write-Output ""

$exerciseRoot = $PSScriptRoot

# Clean up previous runs
foreach ($folder in "RemoteDemo.git", "LocalDemo", "CollaboratorDemo") {
    $fullPath = Join-Path $exerciseRoot $folder
    if (Test-Path $fullPath) {
        Remove-Item -Recurse -Force $fullPath
    }
}

Write-Output "Step 1: Set up a simulated Remote Repository (Bare Git Repository)"
New-Item -ItemType Directory -Path (Join-Path $exerciseRoot "RemoteDemo.git") -Force | Out-Null
cd (Join-Path $exerciseRoot "RemoteDemo.git")
git init --bare
Write-Output "Simulated remote repository (RemoteDemo.git) initialized."
Write-Output ""

Write-Output "Step 2: Initialize local Git repository 'LocalDemo'"
New-Item -ItemType Directory -Path (Join-Path $exerciseRoot "LocalDemo") -Force | Out-Null
cd (Join-Path $exerciseRoot "LocalDemo")
git init
Write-Output ""

Write-Output "Step 3: Link 'LocalDemo' to simulated remote repository"
git remote add origin "../RemoteDemo.git"
Write-Output "Remote 'origin' added pointing to ../RemoteDemo.git"
Write-Output ""

Write-Output "Step 4: Verify if master is in a clean state (No commits yet)"
git status
Write-Output ""

Write-Output "Step 5: Add a file and create initial commit locally"
Set-Content -Path welcome.txt -Value "Welcome to the central repository!"
git add welcome.txt
git commit -m "Initial local commit: welcome.txt"
Write-Output "Master status after commit:"
git status
Write-Output ""

Write-Output "Step 6: List out all available branches (before pushing)"
git branch -a
Write-Output ""

Write-Output "Step 7: Push the changes to the remote repository"
git push -u origin master
Write-Output ""

Write-Output "Step 8: Simulate a collaborator making changes on the remote"
# Clone the repository to another folder 'CollaboratorDemo' to act as a second developer
cd $exerciseRoot
git clone ./RemoteDemo.git CollaboratorDemo
cd CollaboratorDemo

# Make a change and push
Set-Content -Path collaborator_notes.txt -Value "Added project notes from collaborator."
git add collaborator_notes.txt
git commit -m "Add collaborator_notes.txt"
git push origin master
Write-Output "Collaborator pushed updates to the remote repository."
Write-Output ""

Write-Output "Step 9: Return to 'LocalDemo' and verify status is clean"
cd (Join-Path $exerciseRoot "LocalDemo")
git status
Write-Output ""

Write-Output "Step 10: Pull the remote repository to the master branch"
git pull origin master
Write-Output ""

Write-Output "Step 11: Verify that changes are pulled and reflected locally"
Write-Output "Local file list:"
Get-ChildItem
Write-Output "Content of collaborator_notes.txt:"
Get-Content collaborator_notes.txt
Write-Output ""

Write-Output "Step 12: List all branches including remote tracking branches"
git branch -a
Write-Output ""

Stop-Transcript
Write-Output "Verification proof saved to proof.log"
