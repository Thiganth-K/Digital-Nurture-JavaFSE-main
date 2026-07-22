# Exercise 4: Conflict Resolution

## Objective
Learn how to identify and resolve merge conflicts that occur when two branches make conflicting modifications to the same file.

## Step-by-Step Walkthrough

1. **Verify master is in clean state:** Check `git status` on master.
2. **Create branch and add file:** Create branch `GitWork`, add `hello.xml`, and commit.
   ```bash
   git checkout -b GitWork
   # Create hello.xml with GitWork content
   git add hello.xml
   git commit -m "Add hello.xml on GitWork branch"
   ```
3. **Modify file on master:** Switch back to master, create `hello.xml` with different/conflicting content, and commit.
   ```bash
   git checkout master
   # Create hello.xml with master content
   git add hello.xml
   git commit -m "Add hello.xml on master branch"
   ```
4. **Inspect log graph:** Check the branch history graph.
   ```bash
   git log --oneline --graph --decorate --all
   ```
5. **Compare diff:** Inspect differences using `git diff`.
   ```bash
   git diff master GitWork
   ```
6. **Merge branch:** Run `git merge GitWork` to merge the branch. This triggers a merge conflict because both branches created `hello.xml` with conflicting contents.
   ```bash
   git merge GitWork
   ```
7. **Examine conflict markers:** Read `hello.xml` to see Git's conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
8. **Resolve conflict:** Edit `hello.xml` to combine or select the desired changes, removing conflict markers.
9. **Stage & Commit resolution:** Mark the conflict resolved by staging the file and committing.
   ```bash
   git add hello.xml
   git commit -m "Resolve merge conflict in hello.xml by merging both modifications"
   ```
10. **Ignore backup files:** Add backup patterns like `*.orig` to `.gitignore` and commit.
    ```bash
    echo "*.orig" > .gitignore
    git add .gitignore
    git commit -m "Add *.orig to .gitignore to prevent tracking merge backup files"
    ```
11. **Clean up branch:** Delete the `GitWork` branch since it is merged.
    ```bash
    git branch -d GitWork
    ```
12. **Observe final logs:** Verify the merge history graph.
    ```bash
    git log --oneline --graph --decorate
    ```

---

## Hands-On Verification Proof

The following is the verbatim console output capture showing the successful completion of all steps:

```text
=== Exercise 4: Conflict Resolution ===

Step 1: Initialize Git Repository 'GitConflictDemo'
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_4_Conflict_Resolution/GitConflictDemo/.git/

Step 2: Commit initial master file to establish trunk
[master (root-commit) 4c5500b] Initial commit on master branch
 1 file changed, 1 insertion(+)
 create mode 100644 main.txt
Master status check:
On branch master
nothing to commit, working tree clean

Step 3: Create branch 'GitWork'
Switched to a new branch 'GitWork'

Step 4: Create and commit hello.xml in GitWork branch
Branch file hello.xml created. Status:
On branch GitWork
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hello.xml

nothing added to commit but untracked files present (use "git add" to track)
[GitWork 565dcfc] Add hello.xml on GitWork branch
 1 file changed, 3 insertions(+)
 create mode 100644 hello.xml

Step 5: Switch back to master
Switched to branch 'master'

Step 6: Create hello.xml on master branch with conflicting contents
Master file hello.xml created. Status:
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	hello.xml

nothing added to commit but untracked files present (use "git add" to track)
[master 32f013e] Add hello.xml on master branch
 1 file changed, 3 insertions(+)
 create mode 100644 hello.xml

Step 7: Observe commit log history of all branches
* 565dcfc (GitWork) Add hello.xml on GitWork branch
| * 32f013e (HEAD -> master) Add hello.xml on master branch
|/  
* 4c5500b Initial commit on master branch

Step 8: Check differences between master and branch before merge
diff --git a/hello.xml b/hello.xml
index e1aa9d4..31fbf97 100644
--- a/hello.xml
+++ b/hello.xml
@@ -1,3 +1,3 @@
 <root>
-    <message>Hello from Master branch (Conflicting Content)</message>
+    <message>Hello from GitWork branch</message>
 </root>

Step 9: Merge 'GitWork' into master (expected conflict)
Auto-merging hello.xml
CONFLICT (add/add): Merge conflict in hello.xml
Automatic merge failed; fix conflicts and then commit the result.

Step 10: Observe conflict markup in hello.xml
<root>
<<<<<<< HEAD
    <message>Hello from Master branch (Conflicting Content)</message>
=======
    <message>Hello from GitWork branch</message>
>>>>>>> GitWork
</root>

Step 11: Check git status during conflict state
On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both added:      hello.xml

no changes added to commit (use "git add" and/or "git commit -a")

Step 12: Resolve the conflict programmatically (manual merge edit)
Resolved file hello.xml content:
<root>
    <message>Hello from Master branch (Conflicting Content)</message>
    <message>Hello from GitWork branch</message>
</root>

Step 13: Stage and commit the resolved conflict
[master fb26dc8] Resolve merge conflict in hello.xml by merging both modifications

Step 14: Add backup files (*.orig) to .gitignore and commit
[master 02b27d1] Add *.orig to .gitignore to prevent tracking merge backup files
 1 file changed, 1 insertion(+)
 create mode 100644 .gitignore
Git status check:
On branch master
nothing to commit, working tree clean

Step 15: Delete branch 'GitWork'
Deleted branch GitWork (was 565dcfc).
Deleted branch successfully.

Step 16: Observe final commit log graph after merge conflict resolution
* 02b27d1 (HEAD -> master) Add *.orig to .gitignore to prevent tracking merge backup files
*   fb26dc8 Resolve merge conflict in hello.xml by merging both modifications
|\  
| * 565dcfc Add hello.xml on GitWork branch
* | 32f013e Add hello.xml on master branch
|/  
* 4c5500b Initial commit on master branch
```
