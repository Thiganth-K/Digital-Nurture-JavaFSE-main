# Git Hands-On Labs (Deepskilling)

This directory contains the implementations, automation scripts, step-by-step walkthroughs, and console execution logs for all five Git Hands-On Labs (HOLs).

## Folder Structure

The project has been organized into optimized, self-contained sub-directories for each exercise:

*   **[Exercise 1: Git Basics](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_1_Git_Basics)**: Git environment configuration, setting default editor (Notepad++), repository initialization, tracking files, checking status, and committing.
*   **[Exercise 2: Git Ignore](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_2_Git_Ignore)**: Excluding files (by extension like `.log`) and directories (like `log/`) from tracking using `.gitignore`.
*   **[Exercise 3: Branching & Merging](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_3_Branching_Merging)**: Creating, switching, listing, diffing, merging, and deleting branches.
*   **[Exercise 4: Conflict Resolution](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_4_Conflict_Resolution)**: Simulating, identifying, resolving, and committing a merge conflict, along with ignoring merge backup files (`*.orig`).
*   **[Exercise 5: Remote Operations](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_5_Remote_Operations)**: Simulating remote repository interactions (`git pull`, `git push`) locally via a bare Git repository acting as `origin`.

---

## Hands-On Exercise Status Matrix

| Exercise # | Hands-On Name / Description | Estimated Time | Implementation Folder | Status | Verification Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Exercise 1** | Git Setup & Basics | 30 minutes | [Exercise_1_Git_Basics](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_1_Git_Basics) | **Completed** | [proof.log](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_1_Git_Basics/proof.log) |
| **Exercise 2** | Git Ignore | 20 minutes | [Exercise_2_Git_Ignore](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_2_Git_Ignore) | **Completed** | [proof.log](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_2_Git_Ignore/proof.log) |
| **Exercise 3** | Branching & Merging | 30 minutes | [Exercise_3_Branching_Merging](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_3_Branching_Merging) | **Completed** | [proof.log](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_3_Branching_Merging/proof.log) |
| **Exercise 4** | Conflict Resolution | 30 minutes | [Exercise_4_Conflict_Resolution](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_4_Conflict_Resolution) | **Completed** | [proof.log](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_4_Conflict_Resolution/proof.log) |
| **Exercise 5** | Remote Operations | 10 minutes | [Exercise_5_Remote_Operations](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_5_Remote_Operations) | **Completed** | [proof.log](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/GIT/Exercise_5_Remote_Operations/proof.log) |

---

## How to Re-Run Verification
Each exercise folder contains a standalone PowerShell script `run_exercise.ps1`. Running these scripts will rebuild the sandboxed repository states and update the `proof.log` files with real terminal outputs.

To run all scripts sequentially and refresh all logs, execute the following PowerShell commands:
```powershell
Get-ChildItem -Filter run_exercise.ps1 -Recurse | ForEach-Object {
    Write-Host "Running $_ in $(Split-Path $_.FullName)"
    Push-Location (Split-Path $_.FullName)
    powershell.exe -File $_.Name
    Pop-Location
}
```
