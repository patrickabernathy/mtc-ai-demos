# Threat model: (your product's name)

Written by: _______________  Date: _______________

Reviewed by (Thursday): _______________

Copy this file into your own project as `THREAT-MODEL.md` and fill it in. Short answers are fine. A blank you can't fill in is a finding too: write down that you don't know.

## 1. What's worth protecting

What would hurt if a stranger could read it, change it, or delete it? (Passwords, emails, other people's orders, prices, the ability to add items...)

-
-
-

## 2. The doors

Every way into your app: each page or API route that takes something in or hands something out.

| Door (page or route) | Who should be able to use it | What stops everyone else today |
|---|---|---|
| | | |
| | | |
| | | |
| | | |

## 3. The worst things someone could do on purpose

Pick three. Think like the person in Wednesday's demos: logged in as themselves, typing whatever they like, changing numbers in the address bar.

| # | What they'd do | How (which door, what input) | What stops them today | Fix first? |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## 4. What the AI flagged

Paste your route code into the assistant (never your `.env.local`, never real people's data) and ask it for security problems. **Every finding is a guess until you reproduce it.** Try each one in the browser or Postman before you believe it.

| What it said | Reproduced? (yes / no / doesn't apply) | How I checked |
|---|---|---|
| | | |
| | | |
| | | |

## 5. The one I'd fix first, and why

(One or two sentences.)

## 6. Reviewer's notes (Thursday)

What did the reviewer try? What did they find that isn't above?
