# Exercise 5: Remote Operations

## Objective
Learn how to interact with remote repositories: pushing local commits to a remote server, checking tracking branches, pulling new updates, and verifying clean state.

## Step-by-Step Walkthrough

1. **Verify State:** Confirm that the local repository is clean.
   ```bash
   git status
   ```
2. **List Branches:** View local and remote-tracking branches.
   ```bash
   git branch -a
   ```
3. **Simulate a Remote Repo:** Create a bare Git repository (`RemoteDemo.git`) to act as the remote host `origin`.
   ```bash
   git init --bare RemoteDemo.git
   ```
4. **Add Remote:** In the local project directory, link the local repository to the remote path.
   ```bash
   git remote add origin ../RemoteDemo.git
   ```
5. **Push Changes:** Push the local `master` branch to the remote repository.
   ```bash
   git push -u origin master
   ```
6. **Simulate Remote Work:** Clone the remote to another folder (`CollaboratorDemo`), make updates, commit, and push back.
   ```bash
   git clone ./RemoteDemo.git CollaboratorDemo
   # Edit files in CollaboratorDemo
   git add .
   git commit -m "Update from collaborator"
   git push origin master
   ```
7. **Pull Updates:** Pull remote updates into the original local repository (`LocalDemo`).
   ```bash
   git pull origin master
   ```
8. **Verify Synchronization:** Check files and branch configurations.
   ```bash
   git status
   git branch -a
   ```

---

## Hands-On Verification Proof

The following is the verbatim console output capture showing the successful completion of all steps:

```text
=== Exercise 5: Remote Operations ===

Step 1: Set up a simulated Remote Repository (Bare Git Repository)
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_5_Remote_Operations/RemoteDemo.git/
Simulated remote repository (RemoteDemo.git) initialized.

Step 2: Initialize local Git repository 'LocalDemo'
Initialized empty Git repository in D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_5_Remote_Operations/LocalDemo/.git/

Step 3: Link 'LocalDemo' to simulated remote repository
Remote 'origin' added pointing to ../RemoteDemo.git

Step 4: Verify if master is in a clean state (No commits yet)
On branch master
No commits yet
nothing to commit (create/copy files and use "git add" to track)

Step 5: Add a file and create initial commit locally
[master (root-commit) d7cfd97] Initial local commit: welcome.txt
 1 file changed, 1 insertion(+)
 create mode 100644 welcome.txt
Master status after commit:
On branch master
nothing to commit, working tree clean

Step 6: List out all available branches (before pushing)
* master

Step 7: Push the changes to the remote repository
To ../RemoteDemo.git
 * [new branch]      master -> master
branch 'master' set up to track 'origin/master'.

Step 8: Simulate a collaborator making changes on the remote
Cloning into 'CollaboratorDemo'...
done.
[master 14b6710] Add collaborator_notes.txt
 1 file changed, 1 insertion(+)
 create mode 100644 collaborator_notes.txt
To D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java FSE/Deepskilling/GIT/Exercise_5_Remote_Operations/./RemoteDemo.git
   d7cfd97..14b6710  master -> master
Collaborator pushed updates to the remote repository.

Step 9: Return to 'LocalDemo' and verify status is clean
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean

Step 10: Pull the remote repository to the master branch
From ../RemoteDemo
 * branch            master     -> FETCH_HEAD
   d7cfd97..14b6710  master     -> origin/master
Updating d7cfd97..14b6710
Fast-forward
 collaborator_notes.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 collaborator_notes.txt

Step 11: Verify that changes are pulled and reflected locally
Local file list:
Mode                 LastWriteTime         Length Name                                                                 
----                 -------------         ------ ----                                                                 
-a----        22-07-2026     06:31             40 collaborator_notes.txt                                               
-a----        22-07-2026     06:31             36 welcome.txt                                                          
Content of collaborator_notes.txt:
Added project notes from collaborator.

Step 12: List all branches including remote tracking branches
* master
  remotes/origin/master
```
