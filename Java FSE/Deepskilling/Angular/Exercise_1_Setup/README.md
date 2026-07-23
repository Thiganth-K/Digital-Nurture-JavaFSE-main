# Exercise 1: Environment Setup, Project Structure & First Component

## Objective
Scaffold the Student Course Portal project, explain the purpose of Angular configuration files, configure build budgets, generate core layout/page components, and verify production build compilation.

---

## Step-by-Step Implementation

1. **Scaffold Project**:
   Created the project using Angular CLI:
   ```bash
   ng new student-course-portal --routing --style=css --defaults --skip-git --ssr=false
   ```

2. **Generated Components**:
   Generated core layout and page components using CLI:
   - Header Component (`src/app/components/header`)
   - Home Page Component (`src/app/pages/home`)
   - Course List Page Component (`src/app/pages/course-list`)
   - Student Profile Page Component (`src/app/pages/student-profile`)

3. **Modified Layout & Router**:
   - Replaced default boilerplate in `app.html` with:
     ```html
     <app-header></app-header>
     <main class="container">
       <router-outlet></router-outlet>
     </main>
     ```
   - Configured `app.routes.ts` with the default home route mapping to `Home`.

4. **Verify Budgets Configuration**:
   Examined budget limits in `angular.json`:
   - `initial` bundle warnings start at **500kB** and fail compilation at **1MB**.
   - `anyComponentStyle` warnings start at **4kB** and fail compilation at **8kB**.

---

## Project Notes & Explanations

See the generated [notes.txt](file:///D:/IMPORTANT_FILES/PROJECT_FILES/Digital-Nurture-JavaFSE-main/Java%20FSE/Deepskilling/Angular/Exercise_1_Setup/notes.txt) file for explanations of the 8 core files:
1. `angular.json`
2. `tsconfig.json`
3. `tsconfig.app.json`
4. `package.json`
5. `src/main.ts`
6. `src/app/app.config.ts`
7. `src/app/app.ts` (Root Component)
8. `src/index.html`

---

## Production Build Verification

Successfully ran `npm run build`. Below is the verbatim output trace:

```text
> student-course-portal@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-OXRYTQU2.js      | main          | 250.94 kB |                67.81 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-3CQJQN77.css   | styles        |  12.82 kB |                 1.77 kB

                      | Initial total | 298.35 kB |                80.91 kB

Application bundle generation complete. [6.176 seconds]
Output location: D:\IMPORTANT_FILES\PROJECT_FILES\Digital-Nurture-JavaFSE-main\Java FSE\Deepskilling\Angular\student-course-portal\dist\student-course-portal
```
