# DryRun — Paper Coding Exam Trainer (Web v2)

**Train for the exam hall, not the IDE.**

In MAKAUT (and most Indian universities), the C exam is written ON PAPER.
No compiler, no run button. The paper asks: predict the output, show a
dry-run table, find the error. DryRun trains exactly that skill.

## What it does (v2)
- 19 C predict-the-output questions, filterable by topic chips
- Beautiful mobile-first UI: topic chips, progress bar, score pill, result ring
- Type your predicted output, get instant right/wrong + the dry-run explanation
- Score in questions correct + MAKAUT exam marks
- Works on phone, no login, no server — just open `index.html`

## Why the answers are trustworthy
Every question in `questions.json` was compiled and run for real with gcc.
The `verified` field on each question records the real output. Answers are
proven, never guessed.

## Run it
Open `index.html` in any browser, or serve the folder:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Roadmap
- v2: Web quiz (this version) — topics, score, dry-run reveal, beautiful UI
- v3: Spot-the-Error mode, Fill-the-Dry-Run-Table mode, timed MAKAUT mock test
- v4: Login + progress history, 50+ questions, BCA Sem-1 PYQ sets year-wise

## Original CLI version
`../dryrun/dryrun.py` — the terminal trainer this web version grew from.

Made by Aryan Kumar Shah · BCA, MAKAUT · MIT License
