/**
 * Agent Store shared shell.
 *
 * Injects a uniform top strip onto every agent page so the Agent Store
 * design identity (red theme + Source Serif title + back link) carries
 * across all agents without modifying their internal stylesheets.
 *
 * Usage: <script src="agent-shell.js" defer></script>
 *
 * Optional <meta name="agent-name" content="..."> in the page's <head>
 * sets the label shown on the right side of the strip.
 */
(function () {
  if (window.__AGENT_SHELL_LOADED__) return;
  window.__AGENT_SHELL_LOADED__ = true;

  function init() {
    if (document.getElementById('agent-store-shell')) return;

    // ---- Fonts (idempotent — no-op if already present) ----
    if (!document.querySelector('link[data-agent-shell-font]')) {
      const pre1 = document.createElement('link');
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      pre1.setAttribute('data-agent-shell-font', '');
      document.head.appendChild(pre1);

      const pre2 = document.createElement('link');
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = '';
      pre2.setAttribute('data-agent-shell-font', '');
      document.head.appendChild(pre2);

      const font = document.createElement('link');
      font.rel = 'stylesheet';
      font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@600;700&display=swap';
      font.setAttribute('data-agent-shell-font', '');
      document.head.appendChild(font);
    }

    // ---- Styles ----
    const css = `
      #agent-store-shell {
        position: fixed; top: 0; left: 0; right: 0; z-index: 2147483000;
        height: 42px;
        background: #fff;
        border-bottom: 1px solid #E6E6EB;
        box-shadow: 0 1px 2px rgba(20,20,30,.04);
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 18px;
        color: #1F1F23;
      }
      #agent-store-shell a, #agent-store-shell a:visited {
        color: #C8102E; text-decoration: none; font-weight: 600; font-size: 13px;
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 10px; border-radius: 6px;
        transition: background .15s;
      }
      #agent-store-shell a:hover { background: #FBE9EC; }
      #agent-store-shell .ass-brand {
        display: inline-flex; align-items: center; gap: 9px;
        font-family: 'Source Serif 4', Georgia, serif;
        font-weight: 700; font-size: 14px; color: #8B0E26;
      }
      #agent-store-shell .ass-dot {
        width: 6px; height: 6px; border-radius: 50%; background: #C8102E;
      }
      #agent-store-shell .ass-name {
        font-family: 'Inter', sans-serif;
        font-weight: 500; font-size: 12.5px; color: #6b6b73;
        margin-left: 6px;
      }
      #agent-store-shell svg { width: 14px; height: 14px; }
      body.agent-shell-spaced { padding-top: 42px !important; }
      @media (max-width: 560px) {
        #agent-store-shell .ass-name { display: none; }
      }
    `;
    const style = document.createElement('style');
    style.id = 'agent-store-shell-style';
    style.textContent = css;
    document.head.appendChild(style);

    // ---- Topbar markup ----
    const meta = document.querySelector('meta[name="agent-name"]');
    const agentName = meta ? meta.getAttribute('content') : (document.title || '');

    const bar = document.createElement('div');
    bar.id = 'agent-store-shell';
    bar.innerHTML = `
      <a href="index.html" aria-label="Back to Agent Store">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Agent Store
      </a>
      <div class="ass-brand">
        <span class="ass-dot"></span>
        <span>Agent Store</span>
        ${agentName ? `<span class="ass-name">· ${escapeHtml(agentName)}</span>` : ''}
      </div>
    `;
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('agent-shell-spaced');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
