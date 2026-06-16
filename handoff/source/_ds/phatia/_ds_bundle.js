/* @ds-bundle: {"format":3,"namespace":"PhatiaAdsMotionDesignSystem_a10d58","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"GlassCard","sourcePath":"components/core/GlassCard.jsx"},{"name":"LogoLockup","sourcePath":"components/core/LogoLockup.jsx"},{"name":"SentimentMeter","sourcePath":"components/data/SentimentMeter.jsx"},{"name":"SovBar","sourcePath":"components/data/SovBar.jsx"},{"name":"StatCallout","sourcePath":"components/data/StatCallout.jsx"},{"name":"Caption","sourcePath":"components/video/Caption.jsx"},{"name":"CoreInsight","sourcePath":"components/video/CoreInsight.jsx"},{"name":"LowerThird","sourcePath":"components/video/LowerThird.jsx"}],"sourceHashes":{"assets/vortex.js":"e5700f4c3230","components/core/Badge.jsx":"e4e10aba9e75","components/core/Button.jsx":"5d40f8792f3f","components/core/Eyebrow.jsx":"c5ca291e5847","components/core/GlassCard.jsx":"83fc1f658f42","components/core/LogoLockup.jsx":"062bcf672984","components/data/SentimentMeter.jsx":"74368799ecf4","components/data/SovBar.jsx":"d657de00ff59","components/data/StatCallout.jsx":"a0d84e9e5895","components/video/Caption.jsx":"d6392c88a9e8","components/video/CoreInsight.jsx":"919eea04450b","components/video/LowerThird.jsx":"eee59a904c82"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PhatiaAdsMotionDesignSystem_a10d58 = window.PhatiaAdsMotionDesignSystem_a10d58 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/vortex.js
try { (() => {
/* ============================================================
 * Phatia · <phatia-vortex> — the signature motion mark
 * Canvas 2D port of the web app's vortex-canvas.tsx. The category's signals
 * spiral inward and burn up as they reach an incandescent core (a direct nod
 * to the logo). Use as the convergence transition, the sting bed, and the
 * core motif on any dark ad surface.
 *
 *   <phatia-vortex></phatia-vortex>           // fills its box, transparent bg
 *   <phatia-vortex density="170" core="0.26"> // tune particle count / core radius
 *   <phatia-vortex bg="#0A0810">              // opaque persistence trail bg
 *
 * Attributes:
 *   density  particle count (default 130; 0 → static frame)
 *   core     core radius as fraction of width (default 0.255)
 *   bg       trail color; omit for transparent-over-page (uses 'rgba(10,8,16,X)')
 *   streak   "0" to hide the horizontal accretion line (default on)
 *   paused   present → draw a single static frame (for storyboards/print)
 * Honors prefers-reduced-motion (static frame). Pauses offscreen.
 * ========================================================== */
(() => {
  if (customElements.get('phatia-vortex')) return;
  class PhatiaVortex extends HTMLElement {
    connectedCallback() {
      this.canvas = document.createElement('canvas');
      Object.assign(this.style, {
        display: 'block',
        position: this.style.position || 'relative'
      });
      Object.assign(this.canvas.style, {
        width: '100%',
        height: '100%',
        display: 'block'
      });
      this.appendChild(this.canvas);
      this._init();
    }
    disconnectedCallback() {
      this._stop && this._stop();
      this._io && this._io.disconnect();
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('visibilitychange', this._onVis);
    }
    _init() {
      const canvas = this.canvas,
        ctx = canvas.getContext('2d');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const forcedStatic = this.hasAttribute('paused') || reduced;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const density = parseInt(this.getAttribute('density') || '130', 10);
      const coreFrac = parseFloat(this.getAttribute('core') || '0.255');
      const weight = parseFloat(this.getAttribute('weight') || '1');
      const bg = this.getAttribute('bg');
      const showStreak = this.getAttribute('streak') !== '0';
      const fade = parseFloat(this.getAttribute('fade') || '0.16'); // lower = longer-lived spiral arms
      const trail = bg ? this._rgba(bg, fade) : `rgba(10,8,16,${fade})`;
      let W = 0,
        H = 0,
        cx = 0,
        cy = 0,
        coreR = 0,
        outR = 0;
      const size = () => {
        W = this.clientWidth || 300;
        H = this.clientHeight || 300;
        canvas.width = Math.max(1, W * dpr);
        canvas.height = Math.max(1, H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = W / 2;
        cy = H / 2;
        coreR = Math.min(W, H) * coreFrac;
        outR = Math.hypot(W, H) * 0.56;
      };
      const N = forcedStatic ? 0 : density;
      const ps = [];
      const spawn = (p, init = false) => {
        p.a = Math.random() * 6.283;
        p.r = init ? coreR + Math.random() * (outR - coreR) : outR * (0.9 + Math.random() * 0.12);
        p.s = 0.5 + Math.random() * 0.8;
        p.br = Math.random() < 0.18;
        p.w = Math.random() * 1.3 + 0.5;
      };
      const streak = () => {
        if (!showStreak) return;
        const g = ctx.createLinearGradient(0, cy, W, cy);
        g.addColorStop(0, 'rgba(242,58,94,0)');
        g.addColorStop(0.5, 'rgba(255,120,150,0.42)');
        g.addColorStop(1, 'rgba(242,58,94,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, cy - 0.8, W, 1.6);
      };
      let raf = 0,
        running = false;
      const frame = () => {
        ctx.fillStyle = trail;
        ctx.fillRect(0, 0, W, H);
        streak();
        for (const p of ps) {
          const px = cx + Math.cos(p.a) * p.r,
            py = cy + Math.sin(p.a) * p.r;
          p.r -= p.s * (0.25 + (1 - p.r / outR) * 0.9) * 0.55;
          p.a += 0.004 + (1 - p.r / outR) * 0.055;
          if (p.r <= coreR) {
            spawn(p);
            continue;
          }
          const nx = cx + Math.cos(p.a) * p.r,
            ny = cy + Math.sin(p.a) * p.r;
          const al = Math.min(0.95, 0.16 + (1 - p.r / outR) * 0.95);
          ctx.strokeStyle = p.br ? `rgba(255,125,155,${al})` : `rgba(242,58,94,${al * 0.82})`;
          ctx.lineWidth = p.w * weight;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(nx, ny);
          ctx.stroke();
          if (p.br) {
            ctx.fillStyle = `rgba(255,160,185,${al})`;
            ctx.beginPath();
            ctx.arc(nx, ny, p.w * 0.9, 0, 6.28);
            ctx.fill();
          }
        }
        raf = requestAnimationFrame(frame);
      };
      const drawStatic = () => {
        if (bg) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, W, H);
        } else ctx.clearRect(0, 0, W, H);
        streak();
        for (let arm = 0; arm < 3; arm++) {
          for (let t = 0; t < 80; t++) {
            const r = coreR + (outR - coreR) * (t / 80),
              a = arm * 2.094 + t * 0.17;
            const x = cx + Math.cos(a) * r,
              y = cy + Math.sin(a) * r,
              al = 0.15 + (1 - r / outR) * 0.7;
            ctx.fillStyle = `rgba(242,58,94,${al})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.1, 0, 6.28);
            ctx.fill();
          }
        }
      };
      this._stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      const start = () => {
        if (running || forcedStatic) return;
        running = true;
        raf = requestAnimationFrame(frame);
      };
      size();
      for (let i = 0; i < N; i++) {
        const p = {};
        spawn(p, true);
        ps.push(p);
      }
      if (forcedStatic) drawStatic();else start();
      this._onResize = () => {
        size();
        if (forcedStatic) drawStatic();
      };
      window.addEventListener('resize', this._onResize);

      // Pause only when the document is hidden (reliable everywhere). The element
      // animates by default; opt into offscreen-pausing with `pause-offscreen`.
      this._onVis = () => {
        if (document.hidden) this._stop();else start();
      };
      document.addEventListener('visibilitychange', this._onVis);
      if (this.hasAttribute('pause-offscreen') && 'IntersectionObserver' in window) {
        this._io = new IntersectionObserver(es => {
          for (const e of es) {
            if (e.isIntersecting) start();else this._stop();
          }
        }, {
          threshold: 0.01
        });
        this._io.observe(this);
      }
    }
    _rgba(hex, a) {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
      return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
    }
  }
  customElements.define('phatia-vortex', PhatiaVortex);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/vortex.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — pill chip for metadata, platform tags and stat pills. Tones map to
 * the palette: "default" hairline, "accent" sangría, "data" gold, "glass" frosted.
 */
function Badge({
  children,
  tone = "default",
  style,
  ...rest
}) {
  const tones = {
    default: {
      background: "color-mix(in srgb, var(--surface) 60%, transparent)",
      color: "var(--text-muted)",
      border: "1px solid var(--border)"
    },
    accent: {
      background: "var(--accent-soft)",
      color: "var(--accent-glow)",
      border: "1px solid var(--border-accent)"
    },
    data: {
      background: "var(--viz-soft)",
      color: "var(--viz-strong)",
      border: "1px solid color-mix(in srgb, var(--viz) 40%, transparent)"
    },
    solid: {
      background: "var(--accent)",
      color: "var(--accent-ink)",
      border: "1px solid var(--accent)"
    },
    glass: {
      background: "color-mix(in srgb, var(--surface) 55%, transparent)",
      color: "var(--text)",
      border: "1px solid var(--border-strong)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "6px 12px",
      borderRadius: "var(--r-pill)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5em",
      lineHeight: 1,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the brand CTA. Pill, mono, tracked uppercase. Sangría fill is the
 * primary call-to-action ("Comencemos"); ghost/outline for secondary.
 */
function Button({
  children,
  variant = "primary",
  // "primary" | "outline" | "ghost"
  size = "md",
  // "sm" | "md" | "lg"
  as = "button",
  style,
  ...rest
}) {
  const pad = {
    sm: "9px 16px",
    md: "12px 22px",
    lg: "16px 30px"
  }[size];
  const fz = {
    sm: "11px",
    md: "12px",
    lg: "14px"
  }[size];
  const base = {
    fontFamily: "var(--font-mono)",
    fontSize: fz,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: pad,
    borderRadius: "var(--r-pill)",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6em",
    whiteSpace: "nowrap",
    transition: "filter var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), border-color var(--dur-2)"
  };
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--accent-ink)",
      border: "1px solid var(--accent)",
      boxShadow: "var(--glow-accent)"
    },
    outline: {
      background: "transparent",
      color: "var(--text)",
      border: "1px solid var(--border-strong)"
    },
    ghost: {
      background: "color-mix(in srgb, var(--surface) 42%, transparent)",
      color: "var(--text)",
      border: "1px solid var(--border)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-1px)";
      if (variant === "primary") e.currentTarget.style.filter = "brightness(1.07)";else e.currentTarget.style.borderColor = "var(--text)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.filter = "none";
      if (variant !== "primary") e.currentTarget.style.borderColor = "";
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — mono kicker with the signature accent dot. Sits above headlines
 * on ads, plates and sections. Always UPPERCASE, tracked, muted.
 */
function Eyebrow({
  children,
  color,
  dot = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: color || "var(--text-muted)",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.7em",
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "0.5em",
      height: "0.5em",
      borderRadius: "50%",
      background: "var(--accent)",
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/GlassCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GlassCard — the frosted dark plate used for callouts, lower-thirds and
 * quote/data plates over imagery or the vortex. Frosted surface + hairline.
 */
function GlassCard({
  children,
  padding = "var(--sp-6)",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--glass-fill)",
      backdropFilter: "var(--glass-blur)",
      WebkitBackdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--sh-3), inset 0 1px 0 rgba(255,255,255,0.05)",
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/core/LogoLockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LogoLockup — the Phatia wordmark with the vortex mark. By default the mark is
 * a CSS "core" (incandescent dot) so the component is asset-free and portable;
 * pass markSrc to use the real logo image. Orientation: "horizontal" | "stacked".
 */
function LogoLockup({
  markSrc,
  orientation = "horizontal",
  size = 32,
  glow = true,
  wordmark = "Phatia",
  style,
  ...rest
}) {
  const mark = markSrc ? /*#__PURE__*/React.createElement("img", {
    src: markSrc,
    alt: wordmark,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      display: "block",
      boxShadow: glow ? "var(--glow-accent)" : "none"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: "radial-gradient(circle at 50% 38%, #1a0d15 0%, #0b0810 70%)",
      border: "1.5px solid var(--border-accent)",
      boxShadow: glow ? "var(--glow-core)" : "none",
      display: "block",
      flexShrink: 0
    }
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      flexDirection: orientation === "stacked" ? "column" : "row",
      alignItems: "center",
      gap: orientation === "stacked" ? size * 0.34 : size * 0.42,
      ...style
    }
  }, rest), mark, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: size * 0.62,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text)",
      lineHeight: 1
    }
  }, wordmark));
}
Object.assign(__ds_scope, { LogoLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LogoLockup.jsx", error: String((e && e.message) || e) }); }

// components/data/SentimentMeter.jsx
try { (() => {
/**
 * SentimentMeter — a single split bar showing positive / neutral / negative
 * share of conversation. Segments use the sentiment tokens. Values are percents
 * that should sum to 100.
 */
function SentimentMeter({
  positive = 0,
  neutral = 0,
  negative = 0,
  showLabels = true,
  style
}) {
  const seg = (w, color, key) => w > 0 ? /*#__PURE__*/React.createElement("div", {
    key: key,
    style: {
      width: `${w}%`,
      background: color,
      height: "100%"
    }
  }) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 10,
      borderRadius: "var(--r-pill)",
      overflow: "hidden",
      background: "var(--surface-3)"
    }
  }, seg(positive, "var(--positive)", "p"), seg(neutral, "var(--neutral)", "n"), seg(negative, "var(--negative)", "g")), showLabels && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8,
      fontFamily: "var(--font-mono)",
      fontSize: "0.66rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--positive)"
    }
  }, "+ ", positive, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--neutral)"
    }
  }, "= ", neutral, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--negative)"
    }
  }, "\u2212 ", negative, "%")));
}
Object.assign(__ds_scope, { SentimentMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SentimentMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/SovBar.jsx
try { (() => {
/**
 * SovBar — a single share-of-voice / share row. Gold data fill; the lead brand
 * renders full-opacity, the rest dimmed. The core building block of the
 * "comparativa" callout. Animate by toggling `filled`.
 */
function SovBar({
  label,
  value,
  width,
  lead = false,
  filled = true,
  color,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      color: lead ? "var(--text)" : "var(--text-muted)",
      width: 72,
      flexShrink: 0,
      letterSpacing: "0.02em"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 8,
      borderRadius: "var(--r-pill)",
      background: "color-mix(in srgb, var(--text) 10%, transparent)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: filled ? width : 0,
      background: color || "var(--viz)",
      opacity: lead ? 1 : 0.5,
      borderRadius: "var(--r-pill)",
      transition: "width var(--dur-5) var(--ease-converge)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      fontVariantNumeric: "tabular-nums",
      color: lead ? "var(--viz-strong)" : "var(--text-muted)",
      width: 40,
      textAlign: "right",
      flexShrink: 0
    }
  }, value));
}
Object.assign(__ds_scope, { SovBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SovBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCallout.jsx
try { (() => {
/**
 * StatCallout — a big mono number with a label, for animated data moments in
 * video and stat plates in static social. `accent` swaps the number to sangría;
 * otherwise it uses the gold data color.
 */
function StatCallout({
  value,
  label,
  sub,
  accent = false,
  size = 56,
  align = "left",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontVariantNumeric: "tabular-nums",
      fontWeight: 500,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: accent ? "var(--accent)" : "var(--viz)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.7rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginTop: 10
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.82rem",
      color: "var(--text-faint)",
      marginTop: 4
    }
  }, sub));
}
Object.assign(__ds_scope, { StatCallout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCallout.jsx", error: String((e && e.message) || e) }); }

// components/video/Caption.jsx
try { (() => {
/**
 * Caption — burned-in subtitle, built to be read SILENT and on a phone. High
 * contrast warm ink on a dark capsule, generous size, the active word lifted in
 * sangría. Keep to ≤ 2 lines / ~7 words. `highlight` is the emphasized token.
 */
function Caption({
  children,
  highlight,
  size = 30,
  align = "center",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      maxWidth: "min(86vw, 720px)",
      background: "rgba(10,8,16,0.72)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      borderRadius: "var(--r-md)",
      padding: "10px 18px",
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: size,
      lineHeight: 1.18,
      letterSpacing: "-0.01em",
      color: "var(--text)",
      textWrap: "balance"
    }
  }, children, highlight && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, " ", highlight)));
}
Object.assign(__ds_scope, { Caption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/video/Caption.jsx", error: String((e && e.message) || e) }); }

// components/video/CoreInsight.jsx
try { (() => {
/**
 * CoreInsight — the incandescent core: the brand's resolution motif. The place
 * where dispersed signals settle into one defensible reading. Use as the
 * payoff frame in video, the center of a carousel, or a hero on a static plate.
 * Children render inside the glowing core; `tag` + `headline` are the default
 * content. Wrap in a vortex for the full effect.
 */
function CoreInsight({
  tag,
  headline,
  children,
  size = 280,
  ignite = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      background: "radial-gradient(circle at 50% 36%, #1a0d15 0%, #0b0810 72%)",
      border: "1.5px solid var(--border-accent)",
      boxShadow: "var(--glow-core), inset 0 0 36px rgba(0,0,0,0.85)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: size * 0.13,
      animation: ignite ? "ph-ignite var(--dur-4) var(--ease-converge) both" : "none",
      ...style
    }
  }, tag && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: Math.max(9, size * 0.035),
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--viz)",
      marginBottom: size * 0.03
    }
  }, tag), headline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: size * 0.082,
      lineHeight: 1.18,
      color: "var(--text)",
      textWrap: "balance"
    }
  }, headline), children);
}
Object.assign(__ds_scope, { CoreInsight });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/video/CoreInsight.jsx", error: String((e && e.message) || e) }); }

// components/video/LowerThird.jsx
try { (() => {
/**
 * LowerThird — the animated name/role plate for video. Frosted plate with an
 * accent edge that wipes in. `title` is the primary line (serif), `subtitle`
 * the mono kicker. Position bottom-left in the safe zone.
 */
function LowerThird({
  title,
  subtitle,
  accentEdge = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "stretch",
      gap: 14,
      background: "var(--glass-fill)",
      backdropFilter: "var(--glass-blur)",
      WebkitBackdropFilter: "var(--glass-blur)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      boxShadow: "var(--sh-3)",
      padding: "14px 20px 14px 16px",
      ...style
    }
  }, accentEdge && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      borderRadius: "var(--r-pill)",
      background: "var(--accent)",
      boxShadow: "var(--glow-accent)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      justifyContent: "center"
    }
  }, subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.66rem",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, subtitle), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "1.35rem",
      lineHeight: 1.05,
      color: "var(--text)"
    }
  }, title)));
}
Object.assign(__ds_scope, { LowerThird });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/video/LowerThird.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.LogoLockup = __ds_scope.LogoLockup;

__ds_ns.SentimentMeter = __ds_scope.SentimentMeter;

__ds_ns.SovBar = __ds_scope.SovBar;

__ds_ns.StatCallout = __ds_scope.StatCallout;

__ds_ns.Caption = __ds_scope.Caption;

__ds_ns.CoreInsight = __ds_scope.CoreInsight;

__ds_ns.LowerThird = __ds_scope.LowerThird;

})();
