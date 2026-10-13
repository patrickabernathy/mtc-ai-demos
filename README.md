# The Corner Store

Class code for the MTC AI-Enabled Full-Stack Developer program. Every demo and lab from every week lives in this one repo, in folders named `week1/` through `week11/`.

**New here, or lost your copy?** Work through this page top to bottom. Every step says exactly what to click or type, for Windows and for Mac.

- [Before you start (one time)](#before-you-start-one-time)
- [Step 1 — Make your Projects folder (one time)](#step-1--make-your-projects-folder-one-time)
- [Step 2 — Clone the repo (one time)](#step-2--clone-the-repo-one-time)
- [Step 3 — Every class: save your work, get the new code, make a branch](#step-3--every-class-save-your-work-get-the-new-code-make-a-branch)
- [Step 4 — Open and run the demo or lab](#step-4--open-and-run-the-demo-or-lab)
- [Something went wrong](#something-went-wrong)
- [The project board](#the-project-board)

---

> [!IMPORTANT]
> ## Your class code lives in ONE place. Remember it.
>
> **Windows: `C:\Projects\mtc-ai-demos`**
>
> **Mac: `~/Projects/mtc-ai-demos`** (that is `/Users/your-name/Projects/mtc-ai-demos`)
>
> **Write this down.** Not on the Desktop, not in Downloads, not in OneDrive or iCloud. Downloads gets cleaned out, and OneDrive and iCloud try to sync the thousands of files in `node_modules` and break things. You clone this repo **once**, into this folder, and come back to the same folder every class.

---

## Before you start (one time)

1. **Accept the GitHub invite.** This repo is private. You should have an email (or a notification on github.com) inviting you to `patrickabernathy/mtc-ai-demos`. Click **Accept**. Until you do, GitHub will say the repo doesn't exist.
2. **Install Git.**
   - **Windows:** download it from <https://git-scm.com/download/win> and run the installer. Click **Next** on every screen — the defaults are fine.
   - **Mac:** open the **Terminal** app (press `Cmd + Space`, type `Terminal`, press Enter), type `git --version`, and press Enter. If a box pops up offering to install the "command line developer tools", click **Install** and wait for it to finish.
3. **Install VS Code** from <https://code.visualstudio.com>.
4. **Install Node.js** — the **LTS** version — from <https://nodejs.org>.
5. **Close and reopen VS Code** after installing Git and Node, so it can find them.
6. **Tell Git who you are.** Open VS Code, click the menu **Terminal → New Terminal**, and type these two lines, with your own name and email, pressing Enter after each:

   ```
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

   Skip this and your first commit fails with *"Please tell me who you are."* You only ever do it once per computer.

## Step 1 — Make your Projects folder (one time)

### Windows

1. Open **File Explorer** (the folder icon on the taskbar, or press `Windows key + E`).
2. In the left side panel, click **This PC**, then double-click **Local Disk (C:)**.
3. Right-click an empty spot → **New → Folder**. Name it `Projects` and press Enter.
4. You now have `C:\Projects`.

Or, in a VS Code terminal (**Terminal → New Terminal**):

```
mkdir C:\Projects
```

### Mac

1. Open **Finder**.
2. In the menu bar, click **Go → Home** (or press `Shift + Cmd + H`). This is the folder with your name on it.
3. Click **File → New Folder**. Name it `Projects` and press Enter.
4. You now have `~/Projects`. (`~` is just short for "my home folder".)
5. **Drag the `Projects` folder into the Finder sidebar under Favorites** so you can always find it in one click.

Or, in a VS Code terminal (**Terminal → New Terminal**):

```
mkdir ~/Projects
```

If either command says the folder already exists, that's fine — it means you already have one.

## Step 2 — Clone the repo (one time)

Cloning downloads your own copy of the repo. **You only do this once.** If you're ever about to clone it a second time, stop and go to [Step 3](#step-3--every-class-save-your-work-get-the-new-code-make-a-branch) instead — that's how you get new code.

Pick **one** of these two ways.

### Option A — using VS Code (easiest)

1. Open VS Code. If a folder is already open, click **File → Close Folder** first.
2. Open the Command Palette: `Ctrl + Shift + P` on Windows, `Cmd + Shift + P` on Mac.
3. Type `Git: Clone` and press Enter.
4. Paste this address and press Enter:

   ```
   https://github.com/patrickabernathy/mtc-ai-demos.git
   ```

5. If VS Code asks you to sign in to GitHub, click **Allow**, sign in in the browser window that opens, then come back to VS Code.
6. A folder picker opens. **Look at where it is before you click anything — it often starts in Downloads or Documents.**
   - **Windows:** go to **This PC → Local Disk (C:) → Projects**.
   - **Mac:** go to your home folder → **Projects** (or click **Projects** in the sidebar if you added it there).
7. Click **Select as Repository Destination**.
8. When VS Code asks *"Would you like to open the cloned repository?"*, click **Open**.

### Option B — using the command line

1. Open VS Code and click **Terminal → New Terminal**. (Use VS Code's terminal — it handles the GitHub sign-in for you.)
2. Type these lines, pressing Enter after each:

   **Windows:**

   ```
   cd C:\Projects
   git clone https://github.com/patrickabernathy/mtc-ai-demos.git
   ```

   **Mac:**

   ```
   cd ~/Projects
   git clone https://github.com/patrickabernathy/mtc-ai-demos.git
   ```

3. If a GitHub sign-in pops up, sign in.
4. Open the folder: **File → Open Folder**, go to **Projects**, click **mtc-ai-demos** once, then click **Select Folder** (Windows) or **Open** (Mac).

### Check that it worked

The Explorer panel on the left of VS Code should say **MTC-AI-DEMOS** at the top, with folders `week1`, `week2`, … underneath. If it does, you're done with this step forever.

## Step 3 — Every class: save your work, get the new code, make a branch

New demos and labs are added to the `main` branch every week. **Do all of this at the start of every class, before you type anything.**

The one rule that keeps Git from hurting you: **never do your own work on `main`.** `main` is the instructor's copy. Your work goes on your own branch. Then getting new code is always just *switch to `main`, pull*.

Name your branches `yourname/week-and-lab`, lowercase, no spaces — for example `jsmith/week11-lab1`.

Your branches stay on your computer. **You don't need to push or publish anything**, and if VS Code shows a **Publish Branch** button, you can ignore it.

> **Just cloned it for the first time?** You're on `main` with no changes. Skip straight to [3e — Make your branch for today](#3e--make-your-branch-for-today).

### 3a — Check which branch you're on

- **VS Code:** look at the **bottom-left corner** of the window. The name next to the little branch icon is your current branch.
- **Command line** (in **Terminal → New Terminal**, inside `mtc-ai-demos`):

  ```
  git branch --show-current
  ```

### 3b — If it says `main` and you have changes, move them onto a branch first

If you've been working on `main` by mistake, this carries your unsaved changes over to a new branch so nothing is lost. If you're already on your own branch, skip this.

- **VS Code:** click the branch name in the **bottom-left corner** → choose **+ Create new branch...** → type a name like `jsmith/week10-work` → press Enter.
- **Command line:**

  ```
  git switch -c jsmith/week10-work
  ```

### 3c — Commit your work

This saves everything you've changed onto your branch.

- **VS Code:**
  1. Click the **Source Control** icon in the left bar (it looks like a branch with three dots), or press `Ctrl + Shift + G` — that's `Ctrl` on Mac too.
  2. Type a short message in the **Message** box, like `My week 10 work`.
  3. Click **Commit**.
  4. If it asks *"There are no staged changes to commit. Would you like to stage all your changes and commit them directly?"*, click **Yes**.
  5. If the list of changes is now empty, your work is saved.
- **Command line:**

  ```
  git add -A
  git commit -m "My week 10 work"
  ```

If Source Control shows no changes (or `git commit` says *"nothing to commit"*), there was nothing to save — move on.

### 3d — Switch back to `main` and pull the new code

- **VS Code:**
  1. Click the branch name in the **bottom-left corner** and choose **main** from the list at the top.
  2. In the **Source Control** panel, click the **`...`** (three dots, top of the panel) → **Pull**.
- **Command line:**

  ```
  git switch main
  git pull
  ```

The new week's folder should now show up in the Explorer panel.

### 3e — Make your branch for today

- **VS Code:** click the branch name in the **bottom-left corner** → **+ Create new branch...** → type a name like `jsmith/week11-lab1` → press Enter. The bottom-left corner now shows your new branch.
- **Command line:**

  ```
  git switch -c jsmith/week11-lab1
  ```

Your old work is still safe on your old branch. To look at it again, switch to that branch the same way you switched to `main`.

## Step 4 — Open and run the demo or lab

**Always open the whole `mtc-ai-demos` folder in VS Code, not just one week's folder.** That way Source Control always works and you always know where you are.

1. Open VS Code. Use **File → Open Recent → mtc-ai-demos**. If it's not in the list, use **File → Open Folder** and go to `C:\Projects\mtc-ai-demos` (Windows) or `~/Projects/mtc-ai-demos` (Mac).
2. Find the folder for today. The **highest week number is the newest**, and your instructor will tell you which demo or lab — for example `week11/lab1`.
3. Read that folder's `README.md`: right-click it in the Explorer panel → **Open Preview**. It tells you what the exercise is.
4. Click **Terminal → New Terminal** and type these lines, pressing Enter after each (use your folder in place of `week11/lab1`):

   ```
   cd week11/lab1
   npm install
   npm run dev
   ```

5. Open <http://localhost:3000> in your browser.
6. To stop it, click in the terminal and press `Ctrl + C` (that's `Ctrl` on Mac too, not `Cmd`).

**Every demo and lab is its own app**, so you have to `cd` into its folder before `npm install` or `npm run dev`. If npm says *"Could not read package.json"*, you're in the wrong folder. Only one app can run at a time — stop the old one with `Ctrl + C` before starting the next. Weeks 1–3 have no npm at all: just open the `.html` file in your browser.

## Something went wrong

**"I can't find my copy."** In VS Code, try **File → Open Recent**. Otherwise look in `C:\Projects\mtc-ai-demos` (Windows) or `~/Projects/mtc-ai-demos` (Mac). If you cloned it somewhere else, like Downloads or the Desktop, don't clone it again — close VS Code, stop any `npm run dev`, then drag the whole `mtc-ai-demos` folder into your `Projects` folder. Git doesn't mind being moved.

**"I have two (or three) copies."** Pick the one in your `Projects` folder and use only that one. If your work is in another copy, open that copy and do [3b and 3c](#3b--if-it-says-main-and-you-have-changes-move-them-onto-a-branch-first) to save it before you decide what to delete.

**"Please tell me who you are."** You skipped step 6 of [Before you start](#before-you-start-one-time). Do it, then commit again.

**"Your local changes would be overwritten by checkout"** (or VS Code offers to *Stash & Checkout*). You tried to switch branches with unsaved work. Cancel, [commit your work](#3c--commit-your-work) first, then switch.

**`git pull` on `main` says "diverged", "merge conflict", or "need to specify how to reconcile".** You committed your own work onto `main`. This saves it to a branch and puts `main` back the way the instructor has it:

```
git switch -c jsmith/rescued-work
git switch main
git reset --hard origin/main
git pull
```

Your work is safe on `jsmith/rescued-work`. Then carry on with [3e](#3e--make-your-branch-for-today).

**VS Code bottom-left doesn't show a branch name.** You opened a week's folder instead of the whole repo. Use **File → Open Folder** and open `mtc-ai-demos` itself.

## The project board

**The work lives on the [project board](../../projects), not in this README.** Issues here are the backlog: what we've decided to build, what we're building now, and what we finished.

### How we use it

| Column | What it means |
|---|---|
| **Backlog** | Raw. Somebody wants it; we haven't shaped it or agreed to it yet |
| **To Do** | Shaped, agreed, not started |
| **In Progress** | Somebody is actively on it |
| **Needs Feature Validation** | Built — does it do the right thing? |
| **Needs Approval** | Waiting on a decision |
| **Needs Testing** | Works for the author; needs a second pair of eyes |
| **Ready** | Done and verified, waiting to go out |
| **Done** | Shipped |
| **Not Doing** | Deliberately not building this. Kept so we remember we decided |

Every item should say **who it's for** and **how you'd know it was finished**. If you can't write the second one, the item isn't ready to pick up yet.

### Who the store is for

Three people. Everything we build helps one of them, and usually costs one of the others.

- **Dana** — a regular. In and out in four minutes on the way to work.
- **Sam** — behind the register all shift. The only one who actually uses the software.
- **Ray** — owns the place. Does the ordering on Sunday nights.
