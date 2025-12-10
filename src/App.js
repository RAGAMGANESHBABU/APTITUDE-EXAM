// src/AptitudeExam.js
import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

const QUESTIONS = [
  // Time & Work (10) — 3 easy, 3 medium, 3 hard, 1 easy
  { topic: "Time & Work", diff: "Easy", q: "A can do a job in 12 days. B can do it in 20 days. How many days will they take together?", opts: ["7.5","8","6.5","9"], a: "7.5" },
  { topic: "Time & Work", diff: "Easy", q: "If A's one day's work is 2/5 of B's one day's work, and together they finish in 10 days, how long would B alone take?", opts: ["25","20","22","18"], a: "25" },
  { topic: "Time & Work", diff: "Easy", q: "If 5 men finish a work in 18 days, how many men are required to finish the same work in 6 days?", opts: ["15","12","18","10"], a: "15" },

  { topic: "Time & Work", diff: "Medium", q: "A takes 8 days more than B to finish a work. If A does it alone in 24 days, find B's time.", opts: ["16","18","12","20"], a: "16" },
  { topic: "Time & Work", diff: "Medium", q: "Pipe A fills a tank in 10 hours, Pipe B in 15 hours. A leak empties it in 30 hours. If all three open, time to fill?", opts: ["6","7.5","9","8"], a: "7.5" },
  { topic: "Time & Work", diff: "Medium", q: "A can do a piece of work in x days. He works for 4 days and leaves. Remaining work done by B in 6 days. If B's efficiency is twice A's, find x.", opts: ["12","10","9","8"], a: "12" },

  { topic: "Time & Work", diff: "Hard", q: "Two workers A and B together can do a job in 9 days. If A alone takes 4 more days than B alone, find each time.", opts: ["A=13,B=9","A=10,B=6","A=12,B=8","A=11,B=7"], a: "A=13,B=9" },
  { topic: "Time & Work", diff: "Hard", q: "A can finish a job in 10 days, B in 12 days, C in 15 days. They work in rotation: A 1 day, B 1 day, C 1 day, repeating. How many full cycles to finish the work?", opts: ["3 cycles","2 cycles","4 cycles","5 cycles"], a: "3 cycles" },
  { topic: "Time & Work", diff: "Hard", q: "A can do a job in 30 days. He works every day except Sundays. How many calendar days will he take? (Assume month has 30 days)", opts: ["~37","~42","~40","~35"], a: "~37" },

  { topic: "Time & Work", diff: "Easy", q: "If 3 persons can do a job in 20 days, how many days for 6 persons (same efficiency)?", opts: ["10","15","12","8"], a: "10" },

  // Profit & Loss (10)
  { topic: "Profit & Loss", diff: "Easy", q: "Cost price of an item is ₹200. It is sold at 25% profit. Selling price is?", opts: ["₹250","₹240","₹260","₹225"], a: "₹250" },
  { topic: "Profit & Loss", diff: "Easy", q: "If CP = SP, profit% = ?", opts: ["0%","100%","50%","Cannot say"], a: "0%" },
  { topic: "Profit & Loss", diff: "Easy", q: "If an item is sold at 10% loss for ₹90, find CP.", opts: ["₹100","₹99","₹90","₹110"], a: "₹100" },

  { topic: "Profit & Loss", diff: "Medium", q: "A trader marks his goods 30% above CP and gives 10% discount on marked price. His profit% is?", opts: ["17%","20%","10%","15%"], a: "17%" },
  { topic: "Profit & Loss", diff: "Medium", q: "If profit on selling 3 items is equal to cost price of 1, profit% = ?", opts: ["33.33%","50%","25%","75%"], a: "33.33%" },
  { topic: "Profit & Loss", diff: "Medium", q: "A sells two articles for same price. On one he gains 20%, on the other he loses 20%. Overall result is?", opts: ["Loss","Profit","No change","Cannot say"], a: "Loss" },

  { topic: "Profit & Loss", diff: "Hard", q: "If an article is sold at 20% profit, and selling price is increased by 20%, the profit% becomes?", opts: ["44%","40%","48%","32%"], a: "44%" },
  { topic: "Profit & Loss", diff: "Hard", q: "CP of two articles are in ratio 3:5. They are sold at 20% profit and 10% profit respectively. Overall profit%?", opts: ["~14%","~10%","~12%","~16%"], a: "~14%" },
  { topic: "Profit & Loss", diff: "Hard", q: "A man bought an article and after two successive discounts of 10% each, he sold at cost price. What was the marked price increase% over CP?", opts: ["~23.46%","22%","25%","20%"], a: "~23.46%" },

  { topic: "Profit & Loss", diff: "Easy", q: "A shopkeeper gives 20% discount on MP of ₹500. Final price?", opts: ["₹400","₹420","₹450","₹380"], a: "₹400" },

  // Percentages (10)
  { topic: "Percentages", diff: "Easy", q: "What is 15% of 300?", opts: ["45","40","50","35"], a: "45" },
  { topic: "Percentages", diff: "Easy", q: "If price increases from 200 to 250, percent increase is?", opts: ["25%","20%","30%","22.5%"], a: "25%" },
  { topic: "Percentages", diff: "Easy", q: "What is 12.5% as a fraction?", opts: ["1/8","1/4","1/6","1/5"], a: "1/8" },

  { topic: "Percentages", diff: "Medium", q: "If A's marks are 60 and this is 75% of total, full marks are?", opts: ["80","90","70","85"], a: "80" },
  { topic: "Percentages", diff: "Medium", q: "A decreases price by 10% and then increases by 10%. Net change?", opts: ["Decrease","Increase","No change","Depends"], a: "Decrease" },
  { topic: "Percentages", diff: "Medium", q: "If x% of y = y% of x, which is true for positive x,y?", opts: ["Always true","Only when x=y","If one is 100","Never"], a: "Always true" },

  { topic: "Percentages", diff: "Hard", q: "A quantity increases by 20% then decreases by 25%. Net change?", opts: ["-10%","-5%","0%","+5%"], a: "-10%" },
  { topic: "Percentages", diff: "Hard", q: "If an amount is increased by p% and then by q%, combined increase is approx? (small p,q)", opts: ["p+q+pq/100","p+q","p*q","p+q - pq/100"], a: "p+q+pq/100" },
  { topic: "Percentages", diff: "Hard", q: "If 40% of a number is 480, find the number.", opts: ["1200","1500","1000","800"], a: "1200" },

  { topic: "Percentages", diff: "Easy", q: "What is 50% of 60?", opts: ["30","20","40","35"], a: "30" },
];

export default function AptitudeExam() {
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const timerRef = useRef(null);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            submitExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finished]);

  function pickOption(qi, opt) {
    const copy = answers.slice();
    copy[qi] = opt;
    setAnswers(copy);
  }

  function submitExam() {
    if (finished) return;
    clearInterval(timerRef.current);
    setFinished(true);

    let correct = 0;
    QUESTIONS.forEach((q, i) => {
      if (answers[i] === q.a) correct++;
    });
    const percent = (correct / QUESTIONS.length) * 100;
    const passed = percent >= 85; // pass mark
    const resultObj = { name, correct, total: QUESTIONS.length, percent, passed, timestamp: new Date().toISOString() };
    setResult(resultObj);

    // NOTE: database code removed — currently this just shows result locally.
    console.log("Exam completed (no backend):", resultObj);
  }

  function resetExam() {
    setIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setStarted(false);
    setTimeLeft(30 * 60);
    setFinished(false);
    setResult(null);
  }

  function startExam() {
    if (!name.trim()) {
      alert("Please enter your name so we can record results for your friends.");
      return;
    }
    setStarted(true);
  }

  const q = QUESTIONS[index];

  return (
    <div className="app-container">
      <div className="header">
        <h1>Aptitude Mock Test — Time & Work | Profit & Loss | Percentages</h1>
        <div className="sub">30 minutes • 30 questions • Pass mark: 85%</div>
      </div>

      {!started && !finished && (
        <div className="start-screen">
          <div>
            <label className="block">Your name (will be stored locally):</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Type your name"
            />
            <p className="small">30 minutes. 30 questions (10 per topic). Pass mark: 85%.</p>
          </div>

          <div style={{display:'flex', flexDirection:'column', alignItems:'stretch', gap:10}}>
            <div className="controls" style={{justifyContent:'flex-end'}}>
              <button onClick={startExam} className="btn btn-primary">Start Exam</button>
              <button onClick={resetExam} className="btn btn-ghost">Reset</button>
            </div>
            <div className="small" style={{textAlign:'right', color:'var(--muted)'}}>This version shows results locally only (no backend).</div>
          </div>
        </div>
      )}

      {started && !finished && (
        <>
          <div className="exam-top">
            <div className="meta">Question {index + 1} / {QUESTIONS.length} — <span className="small">{q.topic} ({q.diff})</span></div>
            <div className="timer">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
          </div>

          <div className="card">
            <div className="qmeta">Q{index+1} • {q.topic}</div>
            <div className="qtext">{q.q}</div>

            <div className="options">
              {q.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pickOption(index, opt)}
                  className={answers[index] === opt ? "option selected" : "option"}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="nav">
            <div>
              <button onClick={() => setIndex((i) => Math.max(0, i-1))} className="btn btn-ghost" style={{marginRight:8}}>Prev</button>
              <button onClick={() => setIndex((i) => Math.min(QUESTIONS.length-1, i+1))} className="btn btn-ghost">Next</button>
            </div>
            <div>
              <button onClick={submitExam} className="btn btn-primary">Submit Now</button>
            </div>
          </div>
        </>
      )}

      {finished && result && (
        <div className="result">
          <h2>Result for {result.name || "Anonymous"}</h2>
          <p>Score: {result.correct} / {result.total} ({result.percent.toFixed(2)}%)</p>
          <p>Status: <strong>{result.passed ? 'Passed' : 'Failed'}</strong></p>
          <button onClick={resetExam} className="btn btn-ghost" style={{marginTop:12}}>Take Again</button>
          <p className="small" style={{marginTop:12}}>This version does not save results to a backend. To store results, I can re-add a backend of your choice.</p>
        </div>
      )}

      <div className="share">
        <h3 className="font-semibold">Share this test</h3>
        <p className="small">To allow friends to take the test, deploy this app and share the URL. Results won’t be saved in this local-only build.</p>
      </div>
    </div>
  );
}
