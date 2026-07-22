# PowerShell script for Exercise 4: Conflict Resolution
# Captures command line execution trace to proof.log

$logPath = Join-Path $PSScriptRoot "proof.log"
Start-Transcript -Path $logPath -Force

Write-Output "=== Exercise 4: Conflict Resolution ==="
Write-Output "Current Time: $(Get-Date)"
Write-Output ""

# Clean up previous runs
if (Test-Path (Join-Path $PSScriptRoot "GitConflictDemo")) {
    Remove-Item -Recurse -Force (Join-Path $PSScriptRoot "GitConflictDemo")
}

Write-Output "Step 1: Initialize Git Repository 'GitConflictDemo'"
git init GitConflictDemo
cd GitConflictDemo
Write-Output ""

Write-Output "Step 2: Commit initial master file to establish trunk"
Set-Content -Path main.txt -Value "Base build system configuration."
git add main.txt
git commit -m "Initial commit on master branch"
Write-Output "Master status check:"
git status
Write-Output ""

Write-Output "Step 3: Create branch 'GitWork'"
git checkout -b GitWork
Write-Output ""

Write-Output "Step 4: Create and commit hello.xml in GitWork branch"
$xmlContentBranch = @"
<root>
    <message>Hello from GitWork branch</message>
</root>
"@
Set-Content -Path hello.xml -Value $xmlContentBranch
Write-Output "Branch file hello.xml created. Status:"
git status
git add hello.xml
git commit -m "Add hello.xml on GitWork branch"
Write-Output ""

Write-Output "Step 5: Switch back to master"
git checkout master
Write-Output ""

Write-Output "Step 6: Create hello.xml on master branch with conflicting contents"
$xmlContentMaster = @"
<root>
    <message>Hello from Master branch (Conflicting Content)</message>
</root>
"@
Set-Content -Path hello.xml -Value $xmlContentMaster
Write-Output "Master file hello.xml created. Status:"
git status
git add hello.xml
git commit -m "Add hello.xml on master branch"
Write-Output ""

Write-Output "Step 7: Observe commit log history of all branches"
git log --oneline --graph --decorate --all
Write-Output ""

Write-Output "Step 8: Check differences between master and branch before merge"
git diff master GitWork
Write-Output ""

Write-Output "Step 9: Merge 'GitWork' into master (expected conflict)"
# Try merging. Since it will conflict and fail, we let it output the conflict error.
git merge GitWork
Write-Output ""

Write-Output "Step 10: Observe conflict markup in hello.xml"
Get-Content hello.xml
Write-Output ""

Write-Output "Step 11: Check git status during conflict state"
git status
Write-Output ""

Write-Output "Step 12: Resolve the conflict programmatically (manual merge edit)"
# Create a resolved hello.xml file combining both messages
$xmlContentResolved = @"
<root>
    <message>Hello from Master branch (Conflicting Content)</message>
    <message>Hello from GitWork branch</message>
</root>
"@
Set-Content -Path hello.xml -Value $xmlContentResolved
Write-Output "Resolved file hello.xml content:"
Get-Content hello.xml
Write-Output ""

Write-Output "Step 13: Stage and commit the resolved conflict"
git add hello.xml
git commit -m "Resolve merge conflict in hello.xml by merging both modifications"
Write-Output ""

Write-Output "Step 14: Add backup files (*.orig) to .gitignore and commit"
Set-Content -Path .gitignore -Value "*.orig"
git add .gitignore
git commit -m "Add *.orig to .gitignore to prevent tracking merge backup files"
Write-Output "Git status check:"
git status
Write-Output ""

Write-Output "Step 15: Delete branch 'GitWork'"
git branch -d GitWork
Write-Output "Deleted branch successfully."
Write-Output ""

Write-Output "Step 16: Observe final commit log graph after merge conflict resolution"
git log --oneline --graph --decorate
Write-Output ""

Stop-Transcript
Write-Output "Verification proof saved to proof.log"
