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
      Object.assign(this.style, { display: 'block', position: this.style.position || 'relative' });
      Object.assign(this.canvas.style, { width: '100%', height: '100%', display: 'block' });
      this.appendChild(this.canvas);
      this._init();
    }
    disconnectedCallback() { this._stop && this._stop(); this._io && this._io.disconnect(); window.removeEventListener('resize', this._onResize); document.removeEventListener('visibilitychange', this._onVis); }

    _init() {
      const canvas = this.canvas, ctx = canvas.getContext('2d');
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

      let W = 0, H = 0, cx = 0, cy = 0, coreR = 0, outR = 0;
      const size = () => {
        W = this.clientWidth || 300; H = this.clientHeight || 300;
        canvas.width = Math.max(1, W * dpr); canvas.height = Math.max(1, H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = W / 2; cy = H / 2; coreR = Math.min(W, H) * coreFrac; outR = Math.hypot(W, H) * 0.56;
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
        ctx.fillStyle = g; ctx.fillRect(0, cy - 0.8, W, 1.6);
      };

      let raf = 0, running = false;
      const frame = () => {
        ctx.fillStyle = trail; ctx.fillRect(0, 0, W, H);
        streak();
        for (const p of ps) {
          const px = cx + Math.cos(p.a) * p.r, py = cy + Math.sin(p.a) * p.r;
          p.r -= p.s * (0.25 + (1 - p.r / outR) * 0.9) * 0.55;
          p.a += 0.004 + (1 - p.r / outR) * 0.055;
          if (p.r <= coreR) { spawn(p); continue; }
          const nx = cx + Math.cos(p.a) * p.r, ny = cy + Math.sin(p.a) * p.r;
          const al = Math.min(0.95, 0.16 + (1 - p.r / outR) * 0.95);
          ctx.strokeStyle = p.br ? `rgba(255,125,155,${al})` : `rgba(242,58,94,${al * 0.82})`;
          ctx.lineWidth = p.w * weight;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nx, ny); ctx.stroke();
          if (p.br) { ctx.fillStyle = `rgba(255,160,185,${al})`; ctx.beginPath(); ctx.arc(nx, ny, p.w * 0.9, 0, 6.28); ctx.fill(); }
        }
        raf = requestAnimationFrame(frame);
      };
      const drawStatic = () => {
        if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); }
        else ctx.clearRect(0, 0, W, H);
        streak();
        for (let arm = 0; arm < 3; arm++) {
          for (let t = 0; t < 80; t++) {
            const r = coreR + (outR - coreR) * (t / 80), a = arm * 2.094 + t * 0.17;
            const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, al = 0.15 + (1 - r / outR) * 0.7;
            ctx.fillStyle = `rgba(242,58,94,${al})`;
            ctx.beginPath(); ctx.arc(x, y, 1.1, 0, 6.28); ctx.fill();
          }
        }
      };

      this._stop = () => { running = false; cancelAnimationFrame(raf); };
      const start = () => { if (running || forcedStatic) return; running = true; raf = requestAnimationFrame(frame); };

      size();
      for (let i = 0; i < N; i++) { const p = {}; spawn(p, true); ps.push(p); }
      if (forcedStatic) drawStatic(); else start();

      this._onResize = () => { size(); if (forcedStatic) drawStatic(); };
      window.addEventListener('resize', this._onResize);

      // Pause only when the document is hidden (reliable everywhere). The element
      // animates by default; opt into offscreen-pausing with `pause-offscreen`.
      this._onVis = () => { if (document.hidden) this._stop(); else start(); };
      document.addEventListener('visibilitychange', this._onVis);
      if (this.hasAttribute('pause-offscreen') && 'IntersectionObserver' in window) {
        this._io = new IntersectionObserver((es) => { for (const e of es) { if (e.isIntersecting) start(); else this._stop(); } }, { threshold: 0.01 });
        this._io.observe(this);
      }
    }
    _rgba(hex, a) {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    }
  }
  customElements.define('phatia-vortex', PhatiaVortex);
})();
