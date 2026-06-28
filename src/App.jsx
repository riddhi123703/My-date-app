import confetti from "canvas-confetti";
import "./App.css";

import { useEffect, useState } from "react";
const [hovered, setHovered] = [null, () => {}];
const celebrate = () => {
  confetti({
    particleCount: 180,
    spread: 120,
    startVelocity: 40,
    origin: { y: 0.6 },
  });
};

const FOOD_OPTIONS = [
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "biryani", label: "Biryani", emoji: "🍛" },
  { id: "kababs", label: "Kababs", emoji: "🍢" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "ramen", label: "Ramen", emoji: "🍜" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
];

const TIME_OPTIONS = [
  { id: "evening", label: "Evening", time: "7:00 PM" },
  { id: "night", label: "Night", time: "8:30 PM" },
  { id: "late_night", label: "Late Night", time: "10:00 PM" },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function FloatingHearts() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            opacity: 0.28 + (i % 3) * 0.08,
            fontSize: i % 2 === 0 ? "16px" : "12px",
            color: "rgba(125, 44, 84, 0.75)",
            textShadow: "0 2px 8px rgba(255,255,255,0.35)",
            animation: `float ${3 + i * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

function Step1({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMobileState);
    } else {
      mediaQuery.addListener(updateMobileState);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMobileState);
      } else {
        mediaQuery.removeListener(updateMobileState);
      }
    };
  }, []);

  const moveNo = () => {
    const xRange = isMobile ? 36 : 300;
    const yRange = isMobile ? 18 : 200;
    const x = (Math.random() - 0.5) * xRange;
    const y = (Math.random() - 0.5) * yRange;
    setNoPos({ x, y });
    setNoClicks((c) => c + 1);
  };

  const noLabels = [
    "No",
    "Are you sure?",
    "Think again!",
    "Really??",
    "Last chance...",
    "Please? 🥺",
    "pretty please?",
    "one more chance",
    "don’t say no yet",
    "give it a thought",
    "take time, think again",
  ];
  const noLabel = noLabels[Math.min(noClicks, noLabels.length - 1)];

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "28px", marginBottom: "16px", opacity: 0.5 }}>
        ♥
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(26px, 5vw, 38px)",
          fontWeight: 600,
          color: "#2d1f2f",
          marginBottom: "8px",
          lineHeight: 1.3,
        }}
      >
        Will you go on a date with me?
      </h1>
      <p
        style={{
          letterSpacing: "0.18em",
          fontSize: "11px",
          color: "#a07880",
          fontWeight: 500,
          marginBottom: "48px",
          textTransform: "uppercase",
        }}
      >
        A Question Worth Asking
      </p>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          alignItems: "center",
          minHeight: "72px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
            celebrate();
            onYes();
          }}
          style={{
            ...btnStyle("#2d1f2f", "#fff"),
            transition: "0.3s",
          }}
        >
          Yes 💕
        </button>
        <button
          onClick={moveNo}
          style={{
            ...btnStyle("transparent", "#2d1f2f"),
            border: "1.5px solid #c0a0a8",
            position: "relative",
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            transition: "transform 0.2s cubic-bezier(.34,1.56,.64,1)",
            zIndex: 10,
            whiteSpace: "nowrap",
            minWidth: "fit-content",
            maxWidth: isMobile ? "100%" : "none",
          }}
        >
          {noLabel}
        </button>
      </div>
      {noClicks > 0 && !isMobile && (
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {noLabels.slice(1).map((label, index) => {
            const isActive =
              index === Math.min(noClicks - 1, noLabels.length - 2);
            return (
              <span
                key={label}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: isActive
                    ? "1.5px solid #2d1f2f"
                    : "1px solid #d9c0c8",
                  background: isActive
                    ? "rgba(45,31,47,0.08)"
                    : "rgba(255,255,255,0.8)",
                  color: "#2d1f2f",
                  fontSize: "12px",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    background: bg,
    color: color,
    border: "none",
    borderRadius: "30px",
    padding: "14px 36px",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",

    transition: "all .3s ease",

    boxShadow: "0 8px 18px rgba(0,0,0,.12)",
  };
}

function Step2({ onSelect }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selected, setSelected] = useState(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const isPast = (d) => {
    const cell = new Date(year, month, d);
    cell.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return cell < t;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "22px", marginBottom: "14px", opacity: 0.5 }}>
        🕐
      </div>
      <h1 style={headingStyle}>When are you free?</h1>
      <p style={subStyle}>Pick a Date</p>
      <div style={{ marginTop: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <button onClick={prevMonth} style={arrowBtn}>
            ‹
          </button>
          <span
            style={{
              fontWeight: 600,
              color: "#2d1f2f",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}
          >
            {monthNames[month].toUpperCase()} {year}
          </span>
          <button onClick={nextMonth} style={arrowBtn}>
            ›
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            marginBottom: "8px",
          }}
        >
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                fontSize: "11px",
                color: "#a07880",
                fontWeight: 600,
                textAlign: "center",
                padding: "4px 0",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
          }}
        >
          {cells.map((d, i) => {
            const past = d && isPast(d);
            const sel = selected === d && !past;
            return (
              <div
                key={i}
                onClick={() => d && !past && setSelected(d)}
                style={{
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontSize: "13px",
                  cursor: d && !past ? "pointer" : "default",
                  background: sel ? "#2d1f2f" : "transparent",
                  color: sel
                    ? "#fff"
                    : past
                      ? "#d0b8be"
                      : d
                        ? "#2d1f2f"
                        : "transparent",
                  fontWeight: sel ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
      {selected && (
        <button
          onClick={() => {
            celebrate();
            onSelect(`${monthNames[month]} ${selected}, ${year}`);
          }}
          style={{
            ...btnStyle("#2d1f2f", "#fff"),
            marginTop: "24px",
            width: "100%",
          }}
        >
          Confirm Date →
        </button>
      )}
    </div>
  );
}

function Step3({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "22px", marginBottom: "14px", opacity: 0.5 }}>
        ♥
      </div>
      <h1 style={headingStyle}>What time?</h1>
      <p style={subStyle}>Choose Your Hour</p>
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {TIME_OPTIONS.map((opt) => {
          const isHovered = hovered === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              onMouseEnter={() => setHovered(opt.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderRadius: "12px",
                cursor: "pointer",
                background:
                  selected === opt.id
                    ? "#2d1f2f"
                    : isHovered
                      ? "rgba(45,31,47,0.06)"
                      : "white",
                color: selected === opt.id ? "white" : "#2d1f2f",
                border:
                  selected === opt.id
                    ? "1.5px solid #2d1f2f"
                    : "1.5px solid #e8d5d8",
                transition: "all .35s ease",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? "0 12px 20px rgba(0,0,0,.15)" : "none",
              }}
            >
              <span style={{ fontWeight: 500, color: "inherit" }}>
                {opt.label}
              </span>
              <span style={{ color: "inherit", fontSize: "14px" }}>
                {opt.time}
              </span>
            </div>
          );
        })}
      </div>
      {selected && (
        <button
          onClick={() => {
            celebrate();
            onSelect(TIME_OPTIONS.find((o) => o.id === selected));
          }}
          style={{
            background: "linear-gradient(135deg, #5b8def 0%, #2f6fd6 100%)",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: "30px",
            padding: "14px 36px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all .3s ease",
            boxShadow: "0 10px 22px rgba(47,111,214,0.28)",
            marginTop: "24px",
            width: "100%",
          }}
        >
          Perfect →
        </button>
      )}
    </div>
  );
}

function Step4({ onSelect }) {
  const [chosen, setChosen] = useState([]);
  const [hoveredFood, setHoveredFood] = useState(null);

  const toggle = (id) => {
    setChosen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const label =
    chosen.length > 0
      ? chosen
          .map((id) => FOOD_OPTIONS.find((f) => f.id === id)?.label)
          .join(" + ") + " — bold choice!"
      : "select what you're craving";

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "22px", marginBottom: "14px", opacity: 0.5 }}>
        ✦
      </div>
      <h1 style={headingStyle}>What are we feeling?</h1>
      <p style={subStyle}>Pick One or More</p>
      <div
        className="food-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(92px, 1fr))",
          gap: "8px",
          marginTop: "14px",
        }}
      >
        {FOOD_OPTIONS.map((opt) => {
          const active = chosen.includes(opt.id);
          const isHovered = hoveredFood === opt.id;
          return (
            <div
              className="food-item"
              key={opt.id}
              onClick={() => toggle(opt.id)}
              onMouseEnter={() => setHoveredFood(opt.id)}
              onMouseLeave={() => setHoveredFood(null)}
              style={{
                padding: "12px 6px",
                borderRadius: "12px",
                border: active ? "1.5px solid #2d1f2f" : "1.5px solid #e8d5d8",
                background: active ? "rgba(45,31,47,0.06)" : "transparent",
                cursor: "pointer",
                transition: "all .35s ease",
                transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isHovered ? "0 12px 20px rgba(0,0,0,.12)" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "26px" }}>{opt.emoji}</span>
              <span
                className="food-label"
                style={{ fontSize: "11px", fontWeight: 500, color: "#2d1f2f" }}
              >
                {opt.label}
              </span>
            </div>
          );
        })}
      </div>
      <p
        className="food-help"
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#a07880",
          fontStyle: "italic",
        }}
      >
        {label}
      </p>
      {chosen.length > 0 && (
        <button
          className="food-button"
          onClick={() => {
            celebrate();
            onSelect(
              chosen.map((id) => FOOD_OPTIONS.find((f) => f.id === id)?.label),
            );
          }}
          style={{
            ...btnStyle("#2d1f2f", "#fff"),
            marginTop: "12px",
            width: "100%",
            padding: "12px 28px",
          }}
        >
          Let's go! 🎉
        </button>
      )}
    </div>
  );
}

function StepFinal({ date, time, food }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>💌</div>
      <h1 style={{ ...headingStyle, fontSize: "28px" }}>It's a Date!</h1>
      <p style={{ ...subStyle, marginBottom: "32px" }}>
        Here's what we planned
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          textAlign: "left",
        }}
      >
        {[
          { icon: "📅", label: "When", value: date },
          { icon: "🕐", label: "Time", value: time.time },
          { icon: "🍽️", label: "Craving", value: food.join(", ") },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1.5px solid #e8d5d8",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#a07880",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                {item.label}
              </div>
              <div style={{ fontWeight: 600, color: "#2d1f2f" }}>
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        style={{
          marginTop: "28px",
          fontSize: "13px",
          color: "#a07880",
          fontStyle: "italic",
        }}
      >
        Can't wait to see you ♥
      </p>
    </div>
  );
}

const headingStyle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(22px, 4vw, 32px)",
  fontWeight: 600,
  color: "#2d1f2f",
  marginBottom: "6px",
  lineHeight: 1.3,
};

const subStyle = {
  letterSpacing: "0.18em",
  fontSize: "11px",
  color: "#a07880",
  fontWeight: 500,
  textTransform: "uppercase",
};

const arrowBtn = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#2d1f2f",
  padding: "4px 10px",
};

const STEPS = ["proposal", "date", "time", "food", "final"];

export default function DateProposalApp() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ date: null, time: null, food: null });

  const progress = step / (STEPS.length - 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        @keyframes float {
          from { transform: translateY(0px) rotate(-5deg); }
          to { transform: translateY(-12px) rotate(5deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; }
        body { font-family: -apple-system, 'Segoe UI', sans-serif; }
        .app-shell {
          min-height: 100dvh;
          background: rgba(15, 11, 54, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          position: relative;
          overflow: hidden;
        }
        .proposal-card {
          background: #ffffff;
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: clamp(8px, 1.5vw, 12px);
          width: min(100%, 380px);
          max-width: 380px;
          box-shadow: 0 8px 40px rgba(100,40,60,0.12);
          border: 1px solid rgba(255,255,255,0.8);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        @media (max-width: 480px) {
          .app-shell {
            padding: 14px;
          }
          .proposal-card {
            width: clamp(240px, 72vw, 260px) !important;
            max-width: 260px !important;
            padding: 6px !important;
            border-radius: 20px;
          }
          .food-grid {
            gap: 4px !important;
            margin-top: 10px !important;
          }
          .food-item {
            padding: 8px 4px !important;
          }
          .food-label {
            font-size: 10px !important;
          }
          .food-help {
            margin-top: 6px !important;
            font-size: 10px !important;
          }
          .food-button {
            margin-top: 8px !important;
            padding: 10px 20px !important;
          }
        }
      `}</style>

      <div
        className="app-shell"
        style={{
          minHeight: "100dvh",
          background: "rgba(15, 11, 54, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingHearts />

        <div
          className="proposal-card"
          style={{
            background: "#ffffff",
            backdropFilter: "blur(12px)",
            borderRadius: "24px",
            padding: "clamp(8px, 1.5vw, 12px)",
            width: "min(100%, 380px)",
            maxWidth: "380px",
            boxShadow: "0 8px 40px rgba(100,40,60,0.12)",
            border: "1px solid rgba(255,255,255,0.8)",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Progress dots */}
            {step > 0 && step < STEPS.length - 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "16px",
                }}
              >
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: s <= step ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: s <= step ? "#2d1f2f" : "#e8d5d8",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
            )}

            {step === 0 && <Step1 onYes={() => setStep(1)} />}
            {step === 1 && (
              <Step2
                onSelect={(d) => {
                  setData((p) => ({ ...p, date: d }));
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <Step3
                onSelect={(t) => {
                  setData((p) => ({ ...p, time: t }));
                  setStep(3);
                }}
              />
            )}
            {step === 3 && (
              <Step4
                onSelect={(f) => {
                  setData((p) => ({ ...p, food: f }));
                  setStep(4);
                }}
              />
            )}
            {step === 4 && (
              <StepFinal date={data.date} time={data.time} food={data.food} />
            )}

            {step > 0 && step < 4 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a07880",
                  fontSize: "13px",
                  cursor: "pointer",
                  marginTop: "20px",
                  display: "block",
                  margin: "20px auto 0",
                }}
              >
                ← back
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
