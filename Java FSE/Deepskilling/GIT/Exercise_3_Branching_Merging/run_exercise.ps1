# PowerShell script for Exercise 3: Branching & Merging
# Captures command line execution trace to proof.log

$logPath = Join-Path $PSScriptRoot "proof.log"
Start-Transcript -Path $logPath -Force

Write-Output "=== Exercise 3: Branching & Merging ==="
Write-Output "Current Time: $(Get-Date)"
Write-Output ""

# Clean up previous runs
if (Test-Path (Join-Path $PSScriptRoot "GitBranchDemo")) {
    Remove-Item -Recurse -Force (Join-Path $PSScriptRoot "GitBranchDemo")
}

Write-Output "Step 1: Initialize Git Repository 'GitBranchDemo'"
git init GitBranchDemo
cd GitBranchDemo
Write-Output ""

Write-Output "Step 2: Commit initial master file to establish trunk"
Set-Content -Path main.txt -Value "Main branch core system."
git add main.txt
git commit -m "Initial commit on master branch"
Write-Output ""

Write-Output "Step 3: Create a new branch 'GitNewBranch'"
git branch GitNewBranch
Write-Output "Branch 'GitNewBranch' created."
Write-Output ""

Write-Output "Step 4: List all local branches (Observe the '*' indicating current branch)"
git branch
Write-Output ""

Write-Output "Step 5: Switch to the newly created branch 'GitNewBranch'"
git checkout GitNewBranch
Write-Output "Checked out branch list:"
git branch
Write-Output ""

Write-Output "Step 6: Add files to the branch with contents"
Set-Content -Path feature.txt -Value "New feature file implemented on GitNewBranch."
Write-Output ""

Write-Output "Step 7: Commit the changes in the branch"
git add feature.txt
git commit -m "Add new feature.txt in branch"
Write-Output ""

Write-Output "Step 8: Check status in branch"
git status
Write-Output ""

Write-Output "Step 9: Switch back to master"
git checkout master
Write-Output "Switched back to master branch list:"
git branch
Write-Output ""

Write-Output "Step 10: List out all differences between master and branch"
git diff master GitNewBranch
Write-Output ""

Write-Output "Step 11: Configure visual merge tool settings for P4Merge (Conceptual)"
git config --local diff.tool p4merge
git config --local difftool.p4merge.path "C:/Program Files/Perforce/p4merge.exe"
git config --local difftool.p4merge.cmd "'C:/Program Files/Perforce/p4merge.exe' `"`$LOCAL`" `"`$REMOTE`""
Write-Output "Local diff tool configuration set to p4merge."
Write-Output ""

Write-Output "Step 12: Merge the branch 'GitNewBranch' to master (trunk)"
git merge GitNewBranch
Write-Output ""

Write-Output "Step 13: Observe the commit graph log after merging"
git log --oneline --graph --decorate
Write-Output ""

Write-Output "Step 14: Delete the branch after merging and check status"
git branch -d GitNewBranch
Write-Output "Deleted branch GitNewBranch successfully."
Write-Output "Branch list after deletion:"
git branch
Write-Output "Status after deletion:"
git status
Write-Output ""

Stop-Transcript
Write-Output "Verification proof saved to proof.log"
