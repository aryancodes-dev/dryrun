let allQuestions = [], questions = [], index = 0, correct = 0, marksScored = 0, marksTotal = 0, selectedTopic = "All topics";

const $ = id => document.getElementById(id);
const norm = s => s.trim().split(/\s+/).join(" ");

async function load() {
  allQuestions = await (await fetch("questions.json")).json();
  const topics = ["All topics", ...new Set(allQuestions.map(q => q.topic))];
  topics.forEach(t => {
    const b = document.createElement("button");
    b.className = "chip" + (t === selectedTopic ? " selected" : "");
    b.textContent = t;
    b.onclick = () => {
      selectedTopic = t;
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
      b.classList.add("selected");
    };
    $("topics").appendChild(b);
  });
}

function start() {
  questions = (selectedTopic === "All topics" ? [...allQuestions] : allQuestions.filter(q => q.topic === selectedTopic));
  questions.sort(() => Math.random() - 0.5);
  index = 0; correct = 0; marksScored = 0;
  marksTotal = questions.reduce((s, q) => s + q.marks, 0);
  $("start-screen").hidden = true; $("result-screen").hidden = true; $("quiz-screen").hidden = false;
  show();
}

function show() {
  const q = questions[index];
  $("progress").textContent = `Question ${index + 1} of ${questions.length}`;
  $("score").textContent = `⭐ ${correct} correct · ${marksScored}/${marksTotal} marks`;
  $("bar-fill").style.width = `${(index / questions.length) * 100}%`;
  $("q-topic").textContent = q.topic; $("q-marks").textContent = `${q.marks} marks`;
  $("q-code").textContent = q.code;
  $("answer").value = "";
  // No auto-focus: on phones this pops the keyboard up before the user taps.
  // Keyboard appears only when the user taps the answer box, and then we
  // scroll it into view so the keyboard does not cover it.
  $("feedback").hidden = true; $("next-btn").hidden = true; $("check-btn").hidden = false;
  const card = $("quiz-card"); card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
}

function check() {
  const q = questions[index];
  const ok = norm($("answer").value) === norm(q.answer);
  if (ok) { correct++; marksScored += q.marks; }
  const fb = $("feedback");
  fb.hidden = false; fb.className = ok ? "correct" : "wrong";
  fb.innerHTML = ok
    ? `<strong>✅ Correct! Well done.</strong><span class="dryrun"><strong>Dry run:</strong> ${q.dry_run}</span>`
    : `<strong>❌ Not quite.</strong> Correct output: <code>${q.answer}</code><span class="dryrun"><strong>Dry run:</strong> ${q.dry_run}</span><br><small>${q.verified || ""}</small>`;
  $("score").textContent = `⭐ ${correct} correct · ${marksScored}/${marksTotal} marks`;
  $("bar-fill").style.width = `${((index + 1) / questions.length) * 100}%`;
  $("check-btn").hidden = true; $("next-btn").hidden = false;
  $("next-btn").textContent = index + 1 === questions.length ? "See My Result →" : "Next Question →";
}

function next() {
  if (index + 1 >= questions.length) {
    const pct = Math.round((correct / questions.length) * 100);
    $("quiz-screen").hidden = true; $("result-screen").hidden = false;
    $("ring").style.setProperty("--pct", pct + "%");
    $("ring-text").textContent = pct + "%";
    $("result-text").textContent = `${correct} out of ${questions.length} correct · Exam marks: ${marksScored}/${marksTotal}`;
    $("result-msg").textContent = pct >= 80 ? "Excellent — exam-hall ready! 🔥" : pct >= 50 ? "Good progress. Re-do the ones you missed and write the dry-run table every time. 💪" : "Don't worry — every mistake here saves marks in the real exam. Practice this set again. 📚";
  } else { index++; show(); }
}

function backToStart() { $("result-screen").hidden = true; $("quiz-screen").hidden = true; $("start-screen").hidden = false; }

$("start-btn").onclick = start;
$("restart-btn").onclick = start;
$("change-topic-btn").onclick = backToStart;
$("check-btn").onclick = check;
$("next-btn").onclick = next;
$("answer").addEventListener("keydown", e => { if (e.key === "Enter" && !$("check-btn").hidden) check(); });
load();
