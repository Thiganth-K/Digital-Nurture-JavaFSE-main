# Exercise 1: Git Basics

## Objective
Familiarize yourself with Git environment setup, repository initialization, file tracking, status checks, and committing.

## Step-by-Step Walkthrough

1. **Verify Git Installation:** Check the installed Git version.
   ```bash
   git --version
   ```
2. **Configure User Identity:** Set the global username and email address.
   ```bash
   git config --global user.name "HandsOn Student"
   git config --global user.email "student@handson.com"
   ```
3. **Verify Configuration:** Check the current global configuration list.
   ```bash
   git config --global --list
   ```
4. **Configure Default Editor:** Set Notepad++ or standard Notepad as the default editor.
   ```bash
   git config --global core.editor "notepad"
   ```
5. **Initialize Repository:** Initialize a new Git repository named `GitDemo`.
   ```bash
   git init GitDemo
   cd GitDemo
   ```
6. **Verify Hidden Files:** Show all files, including hidden system folders like `.git`.
   ```bash
   ls -la
   ```
7. **Create welcome.txt:** Create a new text file and add content.
   ```bash
   echo "Welcome to Git" > welcome.txt
   ```
8. **Check Git Status (Untracked):** Check status to verify that `welcome.txt` is untracked.
   ```bash
   git status
   ```
9. **Track the File:** Stage `welcome.txt` to the index.
   ```bash
   git add welcome.txt
   ```
10. **Commit the Changes:** Commit the file with a descriptive message.
    ```bash
    git commit -m "Initial commit: welcome.txt added to local repository"
    ```
11. **Verify Clean Status:** Verify that the working directory is clean.
    ```bash
    git status
    ```

---

## Hands-On Verification Proof

The following is the verbatim console output capture showing the successful completion of all steps:

```text
=== Exercise 1: Git Basics ===

Step 1: Check if Git is installed
git version 2.55.0.windows.3

Step 2: Configure User Name & Email
Configured user.name: HandsOn Student
Configured user.email: student@handson.com

Step 3: Verify configuration setting
user.email=student@handson.com
user.name=HandsOn Student
filter.lfs.required=true
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process

Step 4: Configure Notepad++ as default editor (with notepad fallback)
Notepad++ not found. Fallback to Windows Notepad configured.
Default editor configured: notepad

Step 5: Initialize Git Repository 'GitDemo'
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_1_Git_Basics/GitDemo/.git/

Step 6: Display hidden files in GitDemo repository
Mode                 LastWriteTime         Length Name                                                                 
----                 -------------         ------ ----                                                                 
d--h--        22-07-2026     06:28                .git                                                                 

Step 7: Create a file 'welcome.txt' with content

Step 8: Verify file creation and content
File exists check:
-a----        22-07-2026     06:28             16 welcome.txt                                                          
File content:
Welcome to Git

Step 9: Check git status before adding file
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	welcome.txt

nothing added to commit but untracked files present (use "git add" to track)

Step 10: Stage the file 'welcome.txt'
Staged successfully.

Step 11: Commit the file with a message
[master (root-commit) 2f5da64] Initial commit: welcome.txt added to local repository
 1 file changed, 1 insertion(+)
 create mode 100644 welcome.txt

Step 12: Check git status after committing
On branch master
nothing to commit, working tree clean
```
