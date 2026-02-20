import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabase";

// ─────────────────────────────────────────────────────────────────────────────
// PALETTE
// Light:  Gray X11 #C1BEB9 | Gold Fusion #75824D | Pale Silver #DBBABF
//         China Rose #B05276 | Burgundy #7D0531
// Dark:   Sapphire Abyss #001191 | Skylight Blue #6496E8 | Royal Iris #450CB0
//         Lilac Haze #E1C5FE | Electric Periwinkle #544CE8
// ─────────────────────────────────────────────────────────────────────────────

const T = {
  light: {
    // Page
    pageBgA: "#f5f0ee",
    pageBgB: "#ecddd8",
    pageBgC: "#e8dde8",
    radialA: "rgba(176,82,118,0.1)",
    radialB: "rgba(117,130,77,0.08)",
    // Structure
    headerBorder: "rgba(176,82,118,0.15)",
    colBg: "rgba(255,255,255,0.55)",
    colBorder: "rgba(176,82,118,0.18)",
    cardBg: "rgba(255,255,255,0.8)",
    cardBorder: "rgba(176,82,118,0.15)",
    cardHoverBorder: "#B05276",
    modalOverlay: "rgba(60,10,25,0.55)",
    modalBg: "#fdf6f9",
    modalBorder: "rgba(176,82,118,0.2)",
    inputBg: "rgba(255,255,255,0.9)",
    inputBorder: "rgba(117,130,77,0.35)",
    inputFocus: "#B05276",
    // Text
    textPrimary: "#1e0a14",
    textSecondary: "#75824D",
    textMuted: "#9a7485",
    textFaint: "#d4b8c2",
    // Accent
    accent: "#B05276",
    accentDark: "#7D0531",
    accentAlt: "#75824D",
    accentPale: "#DBBABF",
    // Pills / buttons
    pillActiveBg: "rgba(176,82,118,0.12)",
    pillActiveBorder: "#B05276",
    pillActiveText: "#7D0531",
    pillBg: "rgba(117,130,77,0.08)",
    pillBorder: "rgba(117,130,77,0.25)",
    pillText: "#75824D",
    btnBg: "linear-gradient(135deg,#B05276,#7D0531)",
    btnShadow: "rgba(125,5,49,0.35)",
    btnText: "#fff",
    // Misc
    countBg: "rgba(117,130,77,0.1)",
    countText: "#75824D",
    tagBg: "rgba(219,186,191,0.35)",
    tagBorder: "rgba(176,82,118,0.3)",
    tagText: "#7D0531",
    emptyText: "#d4b8c2",
    footerText: "#c8aab4",
    statNum: "#B05276",
    statLabel: "#75824D",
    shimmerA: "#1e0a14",
    shimmerB: "#B05276",
    shimmerC: "#75824D",
    dotBg: "linear-gradient(135deg,#B05276,#75824D)",
    dotGlow: "rgba(176,82,118,0.5)",
    scrollThumb: "rgba(176,82,118,0.3)",
    dashed: "rgba(176,82,118,0.2)",
    deleteBtn: "rgba(125,5,49,0.08)",
    deleteBorder: "rgba(125,5,49,0.25)",
    deleteText: "#7D0531",
    cancelBtn: "rgba(117,130,77,0.07)",
    cancelBorder: "rgba(117,130,77,0.2)",
    cancelText: "#75824D",
    toggleBg: "rgba(117,130,77,0.1)",
    toggleBorder: "rgba(117,130,77,0.28)",
    toggleText: "#75824D",
    toggleIcon: "🌿",
    toggleLabel: "Dark mode",
    uploadBg: "rgba(219,186,191,0.25)",
    uploadBorder: "rgba(176,82,118,0.25)",
    uploadText: "#B05276",
    photoRemoveBg: "rgba(125,5,49,0.8)",
    statusColors: {
      ideation: "#B05276",
      scripting: "#75824D",
      filming: "#DBBABF",
      editing: "#C1BEB9",
      scheduled: "#7D0531",
      posted: "#75824D",
    },
    selectBg: "#fdf6f9",
  },
  dark: {
    pageBgA: "#00062a",
    pageBgB: "#05003d",
    pageBgC: "#0e0028",
    radialA: "rgba(84,76,232,0.18)",
    radialB: "rgba(69,12,176,0.12)",
    headerBorder: "rgba(100,150,232,0.15)",
    colBg: "rgba(0,17,145,0.15)",
    colBorder: "rgba(100,150,232,0.15)",
    cardBg: "rgba(84,76,232,0.1)",
    cardBorder: "rgba(100,150,232,0.15)",
    cardHoverBorder: "#6496E8",
    modalOverlay: "rgba(0,3,20,0.9)",
    modalBg: "#05003d",
    modalBorder: "rgba(100,150,232,0.2)",
    inputBg: "rgba(0,17,145,0.2)",
    inputBorder: "rgba(100,150,232,0.2)",
    inputFocus: "#6496E8",
    textPrimary: "#f0ecff",
    textSecondary: "#6496E8",
    textMuted: "#7a7ab8",
    textFaint: "#2a2a6a",
    accent: "#6496E8",
    accentDark: "#450CB0",
    accentAlt: "#544CE8",
    accentPale: "#E1C5FE",
    pillActiveBg: "rgba(100,150,232,0.18)",
    pillActiveBorder: "#6496E8",
    pillActiveText: "#E1C5FE",
    pillBg: "rgba(84,76,232,0.15)",
    pillBorder: "rgba(84,76,232,0.3)",
    pillText: "#8899ee",
    btnBg: "linear-gradient(135deg,#450CB0,#544CE8)",
    btnShadow: "rgba(84,76,232,0.5)",
    btnText: "#fff",
    countBg: "rgba(100,150,232,0.1)",
    countText: "#6496E8",
    tagBg: "rgba(225,197,254,0.12)",
    tagBorder: "rgba(225,197,254,0.25)",
    tagText: "#E1C5FE",
    emptyText: "#2a2a6a",
    footerText: "#2a2a6a",
    statNum: "#6496E8",
    statLabel: "#544CE8",
    shimmerA: "#E1C5FE",
    shimmerB: "#6496E8",
    shimmerC: "#544CE8",
    dotBg: "linear-gradient(135deg,#544CE8,#6496E8)",
    dotGlow: "rgba(100,150,232,0.7)",
    scrollThumb: "rgba(100,150,232,0.35)",
    dashed: "rgba(100,150,232,0.2)",
    deleteBtn: "rgba(239,68,68,0.08)",
    deleteBorder: "rgba(239,68,68,0.2)",
    deleteText: "#f87171",
    cancelBtn: "rgba(100,150,232,0.08)",
    cancelBorder: "rgba(100,150,232,0.18)",
    cancelText: "#6496E8",
    toggleBg: "rgba(100,150,232,0.1)",
    toggleBorder: "rgba(100,150,232,0.25)",
    toggleText: "#6496E8",
    toggleIcon: "🌙",
    toggleLabel: "Light mode",
    uploadBg: "rgba(84,76,232,0.15)",
    uploadBorder: "rgba(100,150,232,0.25)",
    uploadText: "#6496E8",
    photoRemoveBg: "rgba(69,12,176,0.85)",
    statusColors: {
      ideation: "#6496E8",
      scripting: "#544CE8",
      filming: "#E1C5FE",
      editing: "#6496E8",
      scheduled: "#450CB0",
      posted: "#E1C5FE",
    },
    selectBg: "#05003d",
  },
};

const STATUSES = [
  "ideation",
  "scripting",
  "filming",
  "editing",
  "scheduled",
  "posted",
];
const STATUS_LABELS = {
  ideation: "💡 Ideation",
  scripting: "✍️ Scripting",
  filming: "🎬 Filming",
  editing: "✂️ Editing",
  scheduled: "📅 Scheduled",
  posted: "✅ Posted",
};
const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Reels",
  "Pinterest",
  "LinkedIn",
  "Twitter/X",
  "Podcast",
];
const MOODS = [
  "🌸 Romantic",
  "🌿 Earthy",
  "🍷 Moody",
  "💎 Luxury",
  "☁️ Dreamy",
  "🔥 Fierce",
  "🌊 Calm",
  "⚡ Electric",
  "🤎 Warm",
  "🖤 Editorial",
];

const freshCard = () => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  title: "",
  hook: "",
  idea: "",
  platform: "Instagram",
  postDate: "",
  status: "ideation",
  mood: "🌸 Romantic",
  moodColors: ["#DBBABF", "#75824D"],
  notes: "",
  tags: [],
  photos: [],
  createdAt: new Date().toISOString(),
});

// ─── UTILS ───────────────────────────────────────────────────────────────────
const fileToBase64 = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

// ─── GRAIN ───────────────────────────────────────────────────────────────────
const Grain = ({ dark }) => (
  <svg
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: dark ? 0.05 : 0.028,
      pointerEvents: "none",
      zIndex: 9999,
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="gx">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#gx)" />
  </svg>
);

// ─── TAG INPUT ────────────────────────────────────────────────────────────────
const TagInput = ({ tags, onChange, t }) => {
  const [v, setV] = useState("");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        alignItems: "center",
      }}
    >
      {tags.map((tg, i) => (
        <span
          key={i}
          onClick={() => onChange(tags.filter((_, j) => j !== i))}
          style={{
            background: t.tagBg,
            border: `1px solid ${t.tagBorder}`,
            color: t.tagText,
            borderRadius: "20px",
            padding: "2px 10px",
            fontSize: "11px",
            cursor: "pointer",
            fontFamily: "'DM Mono',monospace",
          }}
        >
          #{tg} ×
        </span>
      ))}
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === ",") && v.trim()) {
            e.preventDefault();
            onChange([...tags, v.trim().replace(/^#/, "")]);
            setV("");
          }
        }}
        placeholder="+ tag"
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: t.textPrimary,
          fontSize: "11px",
          fontFamily: "'DM Mono',monospace",
          width: "65px",
        }}
      />
    </div>
  );
};

// ─── PHOTO MOOD BOARD ─────────────────────────────────────────────────────────
const PhotoMoodBoard = ({ photos, onChange, t }) => {
  const fileRef = useRef();
  const dropRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFiles = async (files) => {
    const arr = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 6 - photos.length);
    const b64s = await Promise.all(arr.map(fileToBase64));
    onChange([...photos, ...b64s].slice(0, 6));
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [photos],
  );

  const removePhoto = (idx) => onChange(photos.filter((_, i) => i !== idx));

  return (
    <div>
      {/* Photo grid */}
      {photos.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          {photos.map((p, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                aspectRatio: "1",
                background: "#000",
              }}
            >
              <img
                src={p}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <button
                onClick={() => removePhoto(i)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: t.photoRemoveBg,
                  color: "#fff",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {photos.length < 6 && (
        <div
          ref={dropRef}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current.click()}
          style={{
            border: `2px dashed ${dragging ? t.accent : t.uploadBorder}`,
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? `${t.uploadBg}99` : t.uploadBg,
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: "22px", marginBottom: "6px" }}>📸</div>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontFamily: "'DM Mono',monospace",
              color: t.uploadText,
              lineHeight: 1.5,
            }}
          >
            Drop inspo photos here or click to upload
            <br />
            <span style={{ opacity: 0.6 }}>
              {photos.length}/6 photos · jpg, png, webp
            </span>
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}
    </div>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
const Modal = ({ card, onSave, onClose, onDelete, t, dark }) => {
  const [form, setForm] = useState({ ...card, photos: card.photos || [] });
  const s = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const inp = {
    width: "100%",
    background: t.inputBg,
    border: `1px solid ${t.inputBorder}`,
    borderRadius: "10px",
    padding: "10px 14px",
    color: t.textPrimary,
    fontSize: "13px",
    fontFamily: "'Lora',Georgia,serif",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  const lbl = {
    fontSize: "10px",
    letterSpacing: "0.12em",
    color: t.textSecondary,
    marginBottom: "6px",
    display: "block",
    fontFamily: "'DM Mono',monospace",
    textTransform: "uppercase",
  };

  // Auto-set gradient from first photo color (best-effort via canvas)
  const extractColors = async (photos) => {
    if (!photos[0]) return;
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photos[0];
      await new Promise((r) => {
        img.onload = r;
        img.onerror = r;
      });
      const canvas = document.createElement("canvas");
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 10, 10);
      const d = ctx.getImageData(0, 0, 10, 10).data;
      const r2 = d[0],
        g2 = d[1],
        b2 = d[2];
      const hex = `#${r2.toString(16).padStart(2, "0")}${g2.toString(16).padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;
      s("moodColors", [hex, form.moodColors[1]]);
    } catch (e) {}
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: t.modalOverlay,
        backdropFilter: "blur(18px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: t.modalBg,
          border: `1px solid ${t.modalBorder}`,
          borderRadius: "22px",
          padding: "32px",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 50px 100px rgba(0,0,0,0.3)",
          animation: "modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                color: t.textPrimary,
                margin: 0,
                fontSize: "22px",
                fontWeight: 400,
              }}
            >
              {form.title || (
                <span style={{ opacity: 0.35, fontStyle: "italic" }}>
                  New Content
                </span>
              )}
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "11px",
                color: t.textMuted,
                fontFamily: "'DM Mono',monospace",
              }}
            >
              {new Date(form.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: t.textMuted,
              fontSize: "22px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* ── MOOD BOARD (PHOTOS) ── */}
        <div style={{ marginBottom: "22px" }}>
          <span style={lbl}>🎨 Mood Board — Inspo Photos</span>
          <PhotoMoodBoard
            photos={form.photos}
            onChange={(v) => {
              s("photos", v);
              extractColors(v);
            }}
            t={t}
          />
          {/* Gradient preview */}
          <div style={{ marginTop: "12px" }}>
            <div
              style={{
                width: "100%",
                height: "52px",
                borderRadius: "10px",
                background: `linear-gradient(135deg,${form.moodColors[0]},${form.moodColors[1]})`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 25% 50%,rgba(255,255,255,0.22) 0%,transparent 65%)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span style={{ ...lbl, margin: 0, opacity: 0.8 }}>
                Palette colors:
              </span>
              {form.moodColors.map((c, i) => (
                <input
                  key={i}
                  type="color"
                  value={c}
                  onChange={(e) => {
                    const nc = [...form.moodColors];
                    nc[i] = e.target.value;
                    s("moodColors", nc);
                  }}
                  style={{
                    width: "32px",
                    height: "26px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "none",
                  }}
                />
              ))}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {MOODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => s("mood", m)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      cursor: "pointer",
                      fontFamily: "'DM Mono',monospace",
                      transition: "all 0.15s",
                      background: form.mood === m ? t.pillActiveBg : t.pillBg,
                      border: `1px solid ${form.mood === m ? t.pillActiveBorder : t.pillBorder}`,
                      color: form.mood === m ? t.pillActiveText : t.pillText,
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginBottom: "14px",
          }}
        >
          <div>
            <label style={lbl}>Title</label>
            <input
              value={form.title}
              onChange={(e) => s("title", e.target.value)}
              placeholder="Content title..."
              style={{ ...inp, resize: "none" }}
            />
          </div>
          <div>
            <label style={lbl}>Platform</label>
            <select
              value={form.platform}
              onChange={(e) => s("platform", e.target.value)}
              style={{ ...inp, cursor: "pointer" }}
            >
              {PLATFORMS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={lbl}>🎣 Hook — First 3 Seconds</label>
          <textarea
            value={form.hook}
            onChange={(e) => s("hook", e.target.value)}
            rows={2}
            placeholder="What stops the scroll? Lead with the punchline..."
            style={inp}
          />
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={lbl}>💡 General Idea</label>
          <textarea
            value={form.idea}
            onChange={(e) => s("idea", e.target.value)}
            rows={3}
            placeholder="Concept, angle, message, call to action..."
            style={inp}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            marginBottom: "14px",
          }}
        >
          <div>
            <label style={lbl}>📅 Post Date</label>
            <input
              type="date"
              value={form.postDate}
              onChange={(e) => s("postDate", e.target.value)}
              style={{ ...inp, colorScheme: dark ? "dark" : "light" }}
            />
          </div>
          <div>
            <label style={lbl}>Status</label>
            <select
              value={form.status}
              onChange={(e) => s("status", e.target.value)}
              style={{ ...inp, cursor: "pointer" }}
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {STATUS_LABELS[st]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={lbl}>📝 Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => s("notes", e.target.value)}
            rows={2}
            placeholder="References, links, reminders..."
            style={inp}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={lbl}>🏷️ Tags</label>
          <div
            style={{
              background: t.inputBg,
              border: `1px solid ${t.inputBorder}`,
              borderRadius: "10px",
              padding: "10px 14px",
            }}
          >
            <TagInput tags={form.tags} onChange={(v) => s("tags", v)} t={t} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <button
            onClick={() => onDelete(card.id)}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontFamily: "'DM Mono',monospace",
              fontSize: "12px",
              background: t.deleteBtn,
              border: `1px solid ${t.deleteBorder}`,
              color: t.deleteText,
            }}
          >
            Delete
          </button>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'DM Mono',monospace",
                fontSize: "12px",
                background: t.cancelBtn,
                border: `1px solid ${t.cancelBorder}`,
                color: t.cancelText,
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              style={{
                padding: "10px 26px",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "'DM Mono',monospace",
                fontSize: "12px",
                background: t.btnBg,
                border: "none",
                color: t.btnText,
                fontWeight: "600",
                boxShadow: `0 4px 20px ${t.btnShadow}`,
              }}
            >
              Save ✦
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── KANBAN CARD ──────────────────────────────────────────────────────────────
const KCard = ({ card, onClick, t }) => {
  const [hov, setHov] = useState(false);
  const days = card.postDate
    ? Math.ceil((new Date(card.postDate) - new Date()) / 86400000)
    : null;
  const late = days !== null && days < 0;
  const photos = card.photos || [];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: t.cardBg,
        border: `1px solid ${hov ? t.cardHoverBorder : t.cardBorder}`,
        borderRadius: "14px",
        padding: 0,
        cursor: "pointer",
        transition: "all 0.18s",
        marginBottom: "8px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 10px 28px rgba(0,0,0,0.14)" : "none",
      }}
    >
      {/* Color strip */}
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg,${card.moodColors[0]},${card.moodColors[1]})`,
          borderRadius: "14px 14px 0 0",
        }}
      />

      {/* Photo strip (if photos exist) */}
      {photos.length > 0 && (
        <div style={{ display: "flex", height: "72px", overflow: "hidden" }}>
          {photos.slice(0, 3).map((p, i) => (
            <img
              key={i}
              src={p}
              alt=""
              style={{
                flex: 1,
                objectFit: "cover",
                display: "block",
                minWidth: 0,
              }}
            />
          ))}
        </div>
      )}

      <div style={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "6px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontFamily: "'Playfair Display',serif",
                color: t.textPrimary,
                lineHeight: 1.3,
              }}
            >
              {card.title || (
                <span style={{ opacity: 0.3, fontStyle: "italic" }}>
                  Untitled
                </span>
              )}
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "10px",
                color: t.textSecondary,
                fontFamily: "'DM Mono',monospace",
              }}
            >
              {card.platform}
            </p>
          </div>
          {photos.length === 0 && (
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: `linear-gradient(135deg,${card.moodColors[0]},${card.moodColors[1]})`,
                flexShrink: 0,
                marginLeft: "8px",
              }}
            />
          )}
        </div>

        {card.hook && (
          <p
            style={{
              margin: "0 0 7px",
              fontSize: "11px",
              color: t.textMuted,
              fontFamily: "'Lora',serif",
              fontStyle: "italic",
              lineHeight: 1.4,
            }}
          >
            "{card.hook.substring(0, 60)}
            {card.hook.length > 60 ? "..." : ""}"
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {card.tags.slice(0, 2).map((tg, i) => (
              <span
                key={i}
                style={{
                  background: t.tagBg,
                  color: t.tagText,
                  borderRadius: "10px",
                  padding: "1px 8px",
                  fontSize: "10px",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                #{tg}
              </span>
            ))}
          </div>
          {days !== null && (
            <span
              style={{
                fontSize: "10px",
                fontFamily: "'DM Mono',monospace",
                color: late ? t.accent : days <= 3 ? "#c4956a" : t.textMuted,
              }}
            >
              {late
                ? `${Math.abs(days)}d late`
                : days === 0
                  ? "today!"
                  : `${days}d`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── STORAGE ABSTRACTION ─────────────────────────────────────────────────────
// Uses window.storage (artifact env) with fallback to localStorage
const store = {
  async get(key) {
    try {
      if (window.storage) {
        const r = await window.storage.get(key);
        return r?.value ?? null;
      }
    } catch (e) {}
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  async set(key, val) {
    try {
      if (window.storage) {
        await window.storage.set(key, val);
        return;
      }
    } catch (e) {}
    try {
      localStorage.setItem(key, val);
    } catch (e) {}
  },
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [cards, setCards] = useState([]);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");

  const t = T[dark ? "dark" : "light"];
  const sc = t.statusColors;

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("cards").select("*");
      if (!error) setCards(data);
      setLoaded(true);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    // Subscribe to changes on the "cards" table
    const channel = supabase
      .channel("cards_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cards" },
        (payload) => {
          const { eventType, new: newCard, old: oldCard } = payload;

          setCards((prev) => {
            switch (eventType) {
              case "INSERT":
                // Avoid duplicates
                if (prev.some((c) => c.id === newCard.id)) return prev;
                return [...prev, newCard];

              case "UPDATE":
                return prev.map((c) => (c.id === newCard.id ? newCard : c));

              case "DELETE":
                return prev.filter((c) => c.id !== oldCard.id);

              default:
                return prev;
            }
          });
        },
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      if (channel) channel.unsubscribe();
    };
  }, []);

  // ── SAVE CARD
  const saveCard = async (card) => {
    // Update local state immediately
    setCards((prev) => {
      const exists = prev.find((c) => c.id === card.id);
      return exists
        ? prev.map((c) => (c.id === card.id ? card : c))
        : [...prev, card];
    });

    try {
      if (card.id) {
        // Check if card already exists in Supabase
        const { data: existing } = await supabase
          .from("cards")
          .select("id")
          .eq("id", card.id)
          .limit(1)
          .single();

        if (existing) {
          // Update existing card
          const { error } = await supabase
            .from("cards")
            .update(card)
            .eq("id", card.id);
          if (error) console.error("Supabase update error:", error);
          return;
        }
      }

      // Insert new card
      const { data, error } = await supabase.from("cards").insert([card]);
      if (error) console.error("Supabase insert error:", error);
      else console.log("Card saved:", data);
    } catch (err) {
      console.error("Supabase save exception:", err);
    }
  };

  // ── DELETE CARD
  const delCard = async (id) => {
    // Update local state first
    setCards((prev) => prev.filter((c) => c.id !== id));

    try {
      const { error } = await supabase.from("cards").delete().eq("id", id);
      if (error) console.error("Supabase delete error:", error);
      else console.log("Card deleted:", id);
    } catch (err) {
      console.error("Supabase delete exception:", err);
    }
  };
  // ── FILTERS
  const searchFiltered = search
    ? cards.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.hook.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((tg) => tg.toLowerCase().includes(search.toLowerCase())),
      )
    : cards;

  const platFiltered =
    filter === "all"
      ? searchFiltered
      : searchFiltered.filter((c) => c.platform === filter);

  const bySt = STATUSES.reduce((a, s) => {
    a[s] = platFiltered.filter((c) => c.status === s);
    return a;
  }, {});

  if (!loaded)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#B05276",
            fontFamily: "'DM Mono',monospace",
            fontSize: "12px",
            letterSpacing: "0.12em",
          }}
        >
          loading BerryGood Studio...
        </div>
      </div>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;}
        body{margin:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${t.scrollThumb};border-radius:4px;}
        input::placeholder,textarea::placeholder{color:${t.textFaint};}
        select option{background:${t.selectBg};color:${t.textPrimary};}
        @keyframes modalIn{from{opacity:0;transform:scale(0.93) translateY(14px);}to{opacity:1;transform:scale(1) translateY(0);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
      `}</style>
      <Grain dark={dark} />

      {/* BG */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: dark
            ? "radial-gradient(ellipse at top left,#0a0050 0%,#00062a 45%,#03001a 100%)"
            : "radial-gradient(ellipse at top right,#f8edf2 0%,#f0e8e0 40%,#ece4dc 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "50%",
            height: "55%",
            background: `radial-gradient(ellipse,${t.radialA} 0%,transparent 65%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "45%",
            height: "45%",
            background: `radial-gradient(ellipse,${t.radialB} 0%,transparent 65%)`,
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {/* ── HEADER ── */}
        <header
          style={{
            padding: "24px 32px 0",
            borderBottom: `1px solid ${t.headerBorder}`,
          }}
        >
          <div style={{ maxWidth: "1700px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: t.dotBg,
                      boxShadow: `0 0 10px ${t.dotGlow}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "10px",
                      color: t.textSecondary,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    BerryGood Studio
                  </span>
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontSize: "clamp(24px,3vw,36px)",
                    fontWeight: 400,
                    lineHeight: 1,
                    background: `linear-gradient(135deg,${t.shimmerA} 0%,${t.shimmerB} 45%,${t.shimmerC} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                    animation: "shimmer 7s linear infinite",
                  }}
                >
                  BerryGood Studio
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Stats */}
                {[
                  { l: "Total", v: cards.length },
                  {
                    l: "Posted",
                    v: cards.filter((c) => c.status === "posted").length,
                  },
                  {
                    l: "Upcoming",
                    v: cards.filter(
                      (c) => c.postDate && new Date(c.postDate) >= new Date(),
                    ).length,
                  },
                ].map((s) => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "20px",
                        color: t.statNum,
                        lineHeight: 1,
                      }}
                    >
                      {s.v}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "10px",
                        color: t.statLabel,
                        marginTop: "2px",
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}

                {/* Search */}
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  style={{
                    background: t.inputBg,
                    border: `1px solid ${t.inputBorder}`,
                    borderRadius: "20px",
                    padding: "7px 14px",
                    color: t.textPrimary,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "11px",
                    outline: "none",
                    width: "140px",
                  }}
                />

                <button
                  onClick={() => setDark((d) => !d)}
                  style={{
                    padding: "7px 15px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    border: `1px solid ${t.toggleBorder}`,
                    background: t.toggleBg,
                    color: t.toggleText,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "11px",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.toggleIcon} {t.toggleLabel}
                </button>

                <button
                  onClick={() => setActive(freshCard())}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    background: t.btnBg,
                    border: "none",
                    color: t.btnText,
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    boxShadow: `0 4px 20px ${t.btnShadow}`,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  + New Content
                </button>
              </div>
            </div>

            {/* Platform filters */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                gridTemplateColumns: "repeat(6,minmax(205px,1fr))",
                paddingBottom: "16px",
              }}
            >
              {["all", ...PLATFORMS].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontFamily: "'DM Mono',monospace",
                    whiteSpace: "nowrap",
                    background: filter === f ? t.pillActiveBg : t.pillBg,
                    border: `1px solid ${filter === f ? t.pillActiveBorder : t.pillBorder}`,
                    color: filter === f ? t.pillActiveText : t.pillText,
                    transition: "all 0.15s",
                  }}
                >
                  {f === "all" ? "✦ All" : f}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── KANBAN ── */}
        <main
          style={{
            padding: "22px 32px 40px",
            maxWidth: "1700px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,minmax(205px,1fr))",
              gap: "12px",
            }}
          >
            {STATUSES.map((status, idx) => (
              <div
                key={status}
                style={{ animation: `fadeUp 0.4s ease ${idx * 0.06}s both` }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "11px",
                    padding: "0 2px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                    }}
                  >
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: sc[status],
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "10px",
                        color: t.textSecondary,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                      }}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                  </div>
                  <span
                    style={{
                      background: t.countBg,
                      borderRadius: "10px",
                      padding: "1px 8px",
                      fontSize: "10px",
                      fontFamily: "'DM Mono',monospace",
                      color: t.countText,
                    }}
                  >
                    {bySt[status].length}
                  </span>
                </div>

                <div
                  style={{
                    background: t.colBg,
                    border: `1px solid ${t.colBorder}`,
                    borderRadius: "16px",
                    padding: "10px",
                    minHeight: "260px",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {bySt[status].length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100px",
                        color: t.emptyText,
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "11px",
                        gap: "5px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "18px", opacity: 0.55 }}>◇</div>
                      <div>empty</div>
                    </div>
                  )}
                  {bySt[status].map((card) => (
                    <KCard
                      key={card.id}
                      card={card}
                      t={t}
                      onClick={() => setActive(card)}
                    />
                  ))}
                  <button
                    onClick={() => setActive(freshCard())}
                    style={{
                      width: "100%",
                      padding: "7px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: "transparent",
                      border: `1px dashed ${t.dashed}`,
                      color: t.textFaint,
                      fontSize: "11px",
                      fontFamily: "'DM Mono',monospace",
                      transition: "all 0.15s",
                      marginTop: "4px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = t.accent;
                      e.currentTarget.style.color = t.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = t.dashed;
                      e.currentTarget.style.color = t.textFaint;
                    }}
                  >
                    + add
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cards.length === 0 && !search && (
            <div
              style={{
                textAlign: "center",
                padding: "70px 20px",
                animation: "fadeUp 0.5s ease both",
              }}
            >
              <div style={{ fontSize: "42px", marginBottom: "10px" }}>✦</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  color: t.accent,
                  fontSize: "22px",
                  margin: "0 0 8px",
                  fontWeight: 400,
                }}
              >
                Your studio awaits 🍓
              </h3>
              <p
                style={{
                  fontFamily: "'Lora',serif",
                  color: t.textMuted,
                  fontSize: "14px",
                  margin: "0 0 22px",
                }}
              >
                Add inspo photos, write your hook, plan your drop
              </p>
              <button
                onClick={() => setActive(freshCard())}
                style={{
                  padding: "12px 28px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  background: t.btnBg,
                  border: "none",
                  color: t.btnText,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "13px",
                  boxShadow: `0 8px 30px ${t.btnShadow}`,
                }}
              >
                Create Your First Content ✦
              </button>
            </div>
          )}
        </main>

        <footer
          style={{
            padding: "16px 32px",
            borderTop: `1px solid ${t.headerBorder}`,
            maxWidth: "1700px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "10px",
              color: t.footerText,
              margin: 0,
              letterSpacing: "0.08em",
            }}
          >
            ✦ BerryGood Studio —{" "}
            {dark ? "sapphire × iris" : "china rose × gold fusion"} — ideas
            saved automatically
          </p>
        </footer>
      </div>

      {active && (
        <Modal
          card={active}
          t={t}
          dark={dark}
          onSave={saveCard}
          onClose={() => setActive(null)}
          onDelete={(id) => {
            delCard(id);
            setActive(null);
          }}
        />
      )}
    </>
  );
}
