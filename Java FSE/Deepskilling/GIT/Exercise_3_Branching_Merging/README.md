# Exercise 3: Branching & Merging

## Objective
Understand Git branching models: creating a feature branch, switching branches, committing changes, comparing differences, merging, checking log graph, and deleting branches.

## Step-by-Step Walkthrough

1. **Initialize Repository:** Start by creating a git repository with an initial commit.
   ```bash
   git init GitBranchDemo
   echo "Core System" > main.txt
   git add main.txt
   git commit -m "Initial commit on master branch"
   ```
2. **Create branch:** Create a new branch `GitNewBranch`.
   ```bash
   git branch GitNewBranch
   ```
3. **List branches:** List available branches and observe current branch marking (`*`).
   ```bash
   git branch
   ```
4. **Switch branch:** Switch context to the new branch.
   ```bash
   git checkout GitNewBranch
   ```
5. **Add changes in branch:** Create and commit a new file.
   ```bash
   echo "New feature file" > feature.txt
   git add feature.txt
   git commit -m "Add new feature.txt in branch"
   ```
6. **Switch back to master:** Switch workspace back to master (trunk).
   ```bash
   git checkout master
   ```
7. **Compare differences:** Review modifications introduced in the branch.
   ```bash
   git diff master GitNewBranch
   ```
8. **Configure Visual Diff Tool:** Conceptually link P4Merge to handle diffs.
   ```bash
   git config --local diff.tool p4merge
   ```
9. **Merge Branch:** Bring changes from `GitNewBranch` into `master` (using fast-forward or standard merge).
   ```bash
   git merge GitNewBranch
   ```
10. **Analyze Logs:** Display the graph representation of logs.
    ```bash
    git log --oneline --graph --decorate
    ```
11. **Delete branch:** Safe delete the branch after merging.
    ```bash
    git branch -d GitNewBranch
    ```

---

## Hands-On Verification Proof

The following is the verbatim console output capture showing the successful completion of all steps:

```text
=== Exercise 3: Branching & Merging ===

Step 1: Initialize Git Repository 'GitBranchDemo'
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_3_Branching_Merging/GitBranchDemo/.git/

Step 2: Commit initial master file to establish trunk
[master (root-commit) 2f9811f] Initial commit on master branch
 1 file changed, 1 insertion(+)
 create mode 100644 main.txt

Step 3: Create a new branch 'GitNewBranch'
Branch 'GitNewBranch' created.

Step 4: List all local branches (Observe the '*' indicating current branch)
  GitNewBranch
* master

Step 5: Switch to the newly created branch 'GitNewBranch'
Switched to branch 'GitNewBranch'
Checked out branch list:
* GitNewBranch
  master

Step 6: Add files to the branch with contents

Step 7: Commit the changes in the branch
[GitNewBranch 349892b] Add new feature.txt in branch
 1 file changed, 1 insertion(+)
 create mode 100644 feature.txt

Step 8: Check status in branch
On branch GitNewBranch
nothing to commit, working tree clean

Step 9: Switch back to master
Switched to branch 'master'
Switched back to master branch list:
  GitNewBranch
* master

Step 10: List out all differences between master and branch
diff --git a/feature.txt b/feature.txt
new file mode 100644
index 0000000..f37340c
--- /dev/null
+++ b/feature.txt
@@ -0,0 +1 @@
+New feature file implemented on GitNewBranch.

Step 11: Configure visual merge tool settings for P4Merge (Conceptual)
Local diff tool configuration set to p4merge.

Step 12: Merge the branch 'GitNewBranch' to master (trunk)
Updating 2f9811f..349892b
Fast-forward
 feature.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 feature.txt

Step 13: Observe the commit graph log after merging
* 349892b (HEAD -> master, GitNewBranch) Add new feature.txt in branch
* 2f9811f Initial commit on master branch

Step 14: Delete the branch after merging and check status
Deleted branch GitNewBranch (was 349892b).
Deleted branch GitNewBranch successfully.
Branch list after deletion:
* master
Status after deletion:
On branch master
nothing to commit, working tree clean
```
