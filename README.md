# MTC AI Demos

All the class code for the MTC AI-Enabled Full-Stack Developer program is here. Every week has its own folder: `week1`, `week2`, and so on.

**New here? Lost your copy? Stuck with Git?** Start at the top and do one step at a time. Every step tells you exactly what to click or type, for Windows and for Mac.

- [Part 1: Set up your computer (one time)](#part-1-set-up-your-computer-one-time)
- [Part 2: Make your Projects folder (one time)](#part-2-make-your-projects-folder-one-time)
- [Part 3: Get the code (one time)](#part-3-get-the-code-one-time)
- [Part 4: Start of EVERY class](#part-4-start-of-every-class)
- [Part 5: Run the lab](#part-5-run-the-lab)
- [Part 6: Look at the answers](#part-6-look-at-the-answers)
- [Help! Something went wrong](#help-something-went-wrong)
- [If all else fails: start over](#if-all-else-fails-start-over)

---

> [!IMPORTANT]
> ## Your class code lives in ONE place. Remember it.
>
> **Windows: `C:\Projects\mtc-ai-demos`**
>
> **Mac: `~/Projects/mtc-ai-demos`**
>
> **Write this down on paper.** Do not put it on the Desktop, in Downloads, in OneDrive, or in iCloud. You get the code **one time**, into this folder. Then you come back to this same folder every class.

> [!WARNING]
> ## Three rules that keep your work safe
>
> 1. **One folder.** Always use the folder in the box above. Never download the code a second time (unless you are [starting over](#if-all-else-fails-start-over)).
> 2. **Never work on `main`.** Make your own branch first (Part 4).
> 3. **Commit before you switch.** Before you change to a different branch, ALWAYS commit your work first. If you skip this, your work can get mixed up or lost.

---

## Words you will see

- **Repo** — the whole project folder, `mtc-ai-demos`.
- **Clone** — download the repo to your computer. You do this one time.
- **Branch** — your own copy of the code to work on. You can switch between branches. The name of the branch you are on is in the **bottom-left corner** of VS Code.
- **`main`** — the teacher's branch. New labs show up here every week. Don't do your work here.
- **`answers`** — the teacher's branch with the finished answers.
- **Commit** — save your work into your branch. Like pressing Save, but for Git.
- **Pull** — get the newest code from the teacher.
- **Terminal** — the box where you type commands. In VS Code, open one with the menu **Terminal → New Terminal**.

---

## Part 1: Set up your computer (one time)

**1. Install Git.**

- **Windows:** go to <https://git-scm.com/download/win>. Download it. Open the file. Click **Next** on every screen, then **Install**, then **Finish**.
- **Mac:** press `Cmd + Space`. Type `Terminal`. Press Enter. In the window that opens, type `git --version` and press Enter. If a box pops up asking to install "command line developer tools", click **Install**. Wait until it says it's done.

**2. Install VS Code.** Go to <https://code.visualstudio.com>. Download it. Install it.

**3. Install Node.js.** Go to <https://nodejs.org>. Download the one that says **LTS**. Install it.

**4. Close VS Code and open it again.** Now it can find Git and Node.

**5. Set up Git.**

1. In VS Code, click the menu **Terminal → New Terminal**.
2. Type this line, but put **your** name between the quotes. Press Enter.

   ```
   git config --global user.name "Your Name"
   ```

3. Type this line, but put **your** email between the quotes. Press Enter.

   ```
   git config --global user.email "you@example.com"
   ```

4. Type this line exactly as it is. Press Enter. It makes Git stop and warn you, instead of mixing your work into the teacher's code.

   ```
   git config --global pull.ff only
   ```

Nothing will print. That's normal. You never have to do this again on this computer.

## Part 2: Make your Projects folder (one time)

### Windows

1. Press `Windows key + E`. File Explorer opens.
2. On the left side, click **This PC**.
3. Double-click **Local Disk (C:)**.
4. Right-click on an empty white spot.
5. Click **New**, then click **Folder**.
6. Type `Projects` and press Enter.

**You should see:** a folder called `Projects` inside `Local Disk (C:)`. Its full name is `C:\Projects`.

### Mac

1. Click the **Finder** icon (the blue smiling face) in the Dock.
2. At the top of the screen, click **Go**, then click **Home**. This is the folder with your name on it.
3. At the top of the screen, click **File**, then click **New Folder**.
4. Type `Projects` and press Enter.
5. Drag the new `Projects` folder into the Finder's left side bar, under **Favorites**. Now you can always find it with one click.

**You should see:** a folder called `Projects` in your home folder. Its full name is `~/Projects`. (`~` means "my home folder".)

## Part 3: Get the code (one time)

This downloads the code into your Projects folder. **Only do this ONE time, ever.** Next class, do Part 4 instead.

Pick **Way A** or **Way B**. You only need one.

### Way A: Use VS Code buttons

1. Open VS Code.
2. If a folder is already open, click **File → Close Folder**.
3. Press `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac). A box opens at the top.
4. Type `Git: Clone` and press Enter.
5. Copy this address, paste it in the box, and press Enter:

   ```
   https://github.com/patrickabernathy/mtc-ai-demos.git
   ```

6. A window opens asking where to put it. **STOP and look at it. It often starts in Downloads. That is the wrong place.**
   - **Windows:** click **This PC**, then **Local Disk (C:)**, then click **Projects** one time.
   - **Mac:** click **Projects** in the left side bar.
7. Click the button **Select as Repository Destination**.
8. Wait. A box asks *"Would you like to open the cloned repository?"* Click **Open**.

### Way B: Type commands

1. Open VS Code.
2. Click the menu **Terminal → New Terminal**.
3. Type these two lines. Press Enter after each one.

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

4. Click **File → Open Folder**.
5. Go to your **Projects** folder. Click **mtc-ai-demos** one time.
6. Click **Select Folder** (Windows) or **Open** (Mac).

### Did it work?

Look at the left side of VS Code. **You should see:** the word **MTC-AI-DEMOS** at the top, and folders called `week1`, `week2`, `week3`... under it.

Yes? You never have to do Part 3 again.

## Part 4: Start of EVERY class

Do this **every class, before you type any code.** It saves your old work, gets the new lab, and makes a new branch for today.

Every step shows two ways: **VS Code buttons** or **type a command**. Use whichever one you like.

> **Brand new, just did Part 3?** You have nothing to save yet. Skip to [Step 6](#step-6-make-a-new-branch-for-today).

> **Is a terminal busy running `npm run dev`?** Click in it and press `Ctrl + C` first (that's `Ctrl` on Mac too). Then you can type in it.

### Step 1: Open your folder

1. Open VS Code.
2. Click **File → Open Recent → mtc-ai-demos**.
3. Not in the list? Click **File → Open Folder** and open `C:\Projects\mtc-ai-demos` (Windows) or `~/Projects/mtc-ai-demos` (Mac).

### Step 2: Look at the bottom-left corner

There is a little branch icon and a name next to it. That name is the branch you are on.

- **It says `main`** → go to Step 3.
- **It says your own branch, like `jsmith/week10-lab1`** → skip to Step 4.

Or type this in the terminal, and it prints the branch name:

```
git branch --show-current
```

### Step 3: Only if you're on `main` — did you change anything?

Look at the **Source Control** icon on the far left of VS Code (it looks like three dots joined by lines). **Is there a number on it?**

- **No number** → you have nothing to save. Skip to Step 5.
- **A number** → you did work on `main` by mistake. That's OK. Make a branch to hold it:

  **VS Code buttons:**

  1. Click the branch name in the **bottom-left corner**.
  2. A list opens at the top. Click **+ Create new branch...**
  3. Type your name and last week, like `jsmith/week10-work`. No spaces. Press Enter.
  4. Now go to Step 4.

  **Or type:**

  ```
  git switch -c jsmith/week10-work
  ```

### Step 4: Commit (save) your work

**VS Code buttons:**

1. Click the **Source Control** icon on the far left (three dots joined by lines).
2. Click in the **Message** box at the top. Type a few words, like `my week 10 work`.
3. Click the blue **Commit** button.
4. If a box asks *"There are no staged changes... Would you like to stage all your changes and commit them directly?"*, click **Yes**.

**Or type** (two lines, press Enter after each):

```
git add -A
git commit -m "my week 10 work"
```

**You should see:** the number on the Source Control icon is gone. Your work is saved.

If a blue **Publish Branch** button shows up, **ignore it.** You don't need it. (If you click it by accident, you'll get a permission error. That's fine. Your work is still saved on your computer.)

### Step 5: Switch to `main` and pull the new code

**VS Code buttons:**

1. Click the branch name in the **bottom-left corner**.
2. Click **main** in the list.
3. Click the **Source Control** icon on the far left.
4. At the top of that panel, click the **`...`** (three dots).
5. Click **Pull**.

**Or type** (press Enter after each):

```
git switch main
git pull
```

**You should see:** the bottom-left says `main`, and the newest week's folder is now on the left side.

**Pull showed an error?** Don't keep going. Go to [Help! Something went wrong](#help-something-went-wrong) and find the error there.

### Step 6: Make a new branch for today

**VS Code buttons:**

1. Click the branch name in the **bottom-left corner**.
2. Click **+ Create new branch...**
3. Type your name and today's lab, like `jsmith/week11-lab1`. Use small letters. No spaces. Press Enter.

**Or type:**

```
git switch -c jsmith/week11-lab1
```

**You should see:** your new branch name in the bottom-left corner. **Now** you can start working.

Your old work is not gone. It's saved on your old branch. To see it again, do the "commit first" rule, then switch to that branch the same way you switched to `main`.

## Part 5: Run the lab

1. Find today's folder on the left side of VS Code. **The biggest week number is the newest.** Your teacher will tell you which one, like `week11` → `lab1`.
2. Inside it, right-click `README.md` and click **Open Preview**. Read it. It tells you what to do.
3. Click the menu **Terminal → New Terminal**.
4. Type these three lines. Press Enter after each one. Wait for each to finish. (Use your folder instead of `week11/lab1`.)

   ```
   cd week11/lab1
   npm install
   npm run dev
   ```

5. Open your web browser and go to <http://localhost:3000>.
6. To stop it: click in the terminal and press `Ctrl + C` (that's `Ctrl` on Mac too, not `Cmd`).

Good to know:

- **Each lab is its own app.** You must `cd` into its folder first. If you see *"Could not read package.json"*, you're in the wrong folder.
- **Only one app can run at a time.** Stop the old one with `Ctrl + C` before you start a new one.
- **Weeks 1, 2 and 3 don't use npm.** Just double-click the `.html` file to open it in your browser.

## Part 6: Look at the answers

The finished answers are on a branch called `answers`.

### Easiest way: look on the website (nothing can go wrong)

Go to <https://github.com/patrickabernathy/mtc-ai-demos/tree/answers>. Click into the week and lab folders to read the answer files. You don't switch anything on your computer, so your work is perfectly safe.

### Or switch to the `answers` branch on your computer

Do this if you want to **run** the answer app.

> [!CAUTION]
> ## COMMIT YOUR WORK FIRST!
>
> Before you switch to `answers`, do [Part 4, Step 4](#step-4-commit-save-your-work) to commit your work. Check that there is **no number** on the Source Control icon.
>
> **If you switch without committing, your work can get mixed into the answers or get lost.**

**VS Code buttons:**

1. Commit your work (see the box above). Make sure there's no number on the Source Control icon.
2. Click the branch name in the **bottom-left corner**.
3. Type `answers` in the box at the top.
4. Click **answers**. (The first time, it may say **origin/answers** — click that.)
5. Click the **Source Control** icon, then **`...`** (three dots), then **Pull**. Now you have the newest answers.

**Or type:**

```
git switch answers
git pull
```

**You should see:** `answers` in the bottom-left corner. Run it the same way as [Part 5](#part-5-run-the-lab).

**Just look. Don't change files on `answers`.**

### Go back to your own branch

1. Stop the app if it's running: click in the terminal and press `Ctrl + C`.
2. Click the branch name in the **bottom-left corner**.
3. Click **your** branch, like `jsmith/week11-lab1`.

**Or type** (with your branch name):

```
git switch jsmith/week11-lab1
```

**You should see:** your branch name in the bottom-left corner, and your work is back.

**Changed something on `answers` by accident?** Throw it away before you switch back: click the **Source Control** icon, put your mouse on the word **Changes**, click the curvy arrow (**Discard All Changes**), and click **Discard**. Or type `git restore .` (with the dot). Only do this on `answers` — never on your own branch!

## Help! Something went wrong

**"I can't find my code."**

1. In VS Code, click **File → Open Recent**. Is `mtc-ai-demos` there? Click it.
2. Not there? Look in `C:\Projects\mtc-ai-demos` (Windows) or `~/Projects/mtc-ai-demos` (Mac).
3. Is it in Downloads or on the Desktop instead? **Don't download it again.** Close VS Code. Stop any running app. Drag the whole `mtc-ai-demos` folder into your `Projects` folder. It still works after you move it.

**"I have two or three copies."** Use only the one in your `Projects` folder. If some of your work is in another copy, open that copy and do Part 4 Steps 3 and 4 to save it first. Ask your teacher before you delete anything.

**"Please tell me who you are."** You skipped Part 1, step 5. Do it now. Then commit again.

**"Your local changes would be overwritten by checkout."** Or VS Code asks about *Stash* or *Migrate changes*. This means you tried to switch branches without committing. Click **Cancel**. Commit your work (Part 4, Step 4). Then switch.

**Pull on `main` says "Not possible to fast-forward" or "diverged" or "merge conflict" or "need to specify how to reconcile".** This means you committed work on `main` by mistake. Type these four lines (use your name). They save your work onto a new branch, then put `main` back the way the teacher has it:

```
git switch -c jsmith/rescued-work
git switch main
git reset --hard origin/main
git pull
```

Your work is safe on `jsmith/rescued-work`. Now do [Part 4, Step 6](#step-6-make-a-new-branch-for-today).

**There's no branch name in the bottom-left corner.** You opened a week folder instead of the whole repo. Click **File → Open Folder** and open `mtc-ai-demos` itself.

**Still stuck?** Ask your teacher. Or, if nothing else works, start over (below).

### If all else fails: start over

You can always start over. You delete your copy of the code and get a fresh one.

> [!CAUTION]
> **This deletes ALL the work you've done, on every branch.** If you want to keep something, save a copy first (step 1).

1. **Save a copy of your work, if you want it.** Open your Projects folder. Go into `mtc-ai-demos` and find the folder you worked in, like `week11` → `lab1`. Copy that folder to your Desktop. (This only saves the branch you're on right now.)
2. **Stop the app** if it's running: click in the terminal and press `Ctrl + C`.
3. **Close VS Code all the way.**
   - **Windows:** click **File → Exit**.
   - **Mac:** click **Code → Quit Visual Studio Code** at the top of the screen (or press `Cmd + Q`).
4. **Delete the `mtc-ai-demos` folder.**
   - **Windows:** press `Windows key + E`. Go to **This PC → Local Disk (C:) → Projects**. Right-click **mtc-ai-demos** and click **Delete** (the trash can icon).
   - **Mac:** open Finder. Click **Projects** in the left side bar. Drag **mtc-ai-demos** to the Trash.
   - Windows says a file is "in use"? VS Code or a terminal is still open. Close it and try again.
5. **Leave the `Projects` folder alone.** Only `mtc-ai-demos` goes in the trash.
6. **Get a fresh copy:** do [Part 3: Get the code](#part-3-get-the-code-one-time) again.
7. **Make a branch:** do [Part 4, Step 6](#step-6-make-a-new-branch-for-today).
8. If you saved a copy in step 1, copy your files from the Desktop back into the same folder.
