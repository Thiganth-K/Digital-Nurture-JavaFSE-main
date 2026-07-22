# Exercise 2: Git Ignore

## Objective
Learn how to use `.gitignore` to prevent tracking of specific files and folders (e.g. log files with `.log` extensions and log directories).

## Step-by-Step Walkthrough

1. **Initialize Repository:** Create a new Git repository.
   ```bash
   git init GitIgnoreDemo
   ```
2. **Create Untracked Logs:** Add a log file and a log directory.
   ```bash
   echo "System log details" > app.log
   mkdir log
   echo "Debugging data" > log/debug.txt
   ```
3. **Check Status (Before Ignore):** Running `git status` shows both `app.log` and the `log/` folder as untracked files.
   ```bash
   git status
   ```
4. **Create `.gitignore`:** Create a file named `.gitignore` in the repository root and add patterns to exclude log files and directories:
   ```text
   *.log
   log/
   ```
5. **Check Status (After Ignore):** Running `git status` now only lists `.gitignore` as an untracked file. The `app.log` and `log/` folder are ignored.
   ```bash
   git status
   ```
6. **Commit the `.gitignore`:** Stage and commit the gitignore configuration to apply it.
   ```bash
   git add .gitignore
   git commit -m "Add .gitignore to exclude log files and log folder"
   ```

---

## Hands-On Verification Proof

The following is the verbatim console output capture showing the successful completion of all steps:

```text
=== Exercise 2: Git Ignore ===

Step 1: Initialize Git Repository 'GitIgnoreDemo'
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_2_Git_Ignore/GitIgnoreDemo/.git/

Step 2: Create a dummy text file to commit first
[master (root-commit) 3481eed] Initial commit with main.txt
 1 file changed, 1 insertion(+)
 create mode 100644 main.txt
On branch master
nothing to commit, working tree clean

Step 3: Create a '.log' file and a 'log' folder with files
Files in working directory before gitignore:
Mode                 LastWriteTime         Length Name                                                                 
----                 -------------         ------ ----                                                                 
d-----        22-07-2026     06:29                log                                                                  
-a----        22-07-2026     06:29             52 app.log                                                              
-a----        22-07-2026     06:29             26 main.txt                                                             

Directory: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\GIT\Exercise_2_Git_Ignore\GitIgnoreDemo\log
Mode                 LastWriteTime         Length Name                                                                 
----                 -------------         ------ ----                                                                 
-a----        22-07-2026     06:29             28 debug.txt                                                            

Step 4: Check git status before updating .gitignore
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	app.log
	log/

nothing added to commit but untracked files present (use "git add" to track)

Step 5: Create and configure .gitignore
Content of .gitignore:
*.log
log/

Step 6: Check git status after creating .gitignore
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore

nothing added to commit but untracked files present (use "git add" to track)

Step 7: Add and commit .gitignore
[master ffda5fb] Add .gitignore to exclude log files and log folder
 1 file changed, 2 insertions(+)
 create mode 100644 .gitignore

Step 8: Final status check
On branch master
nothing to commit, working tree clean
```
