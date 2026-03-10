(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById("auditForm");
  const out = document.getElementById("auditOutput");
  const copyBtn = document.getElementById("copyBtn");
  const smsBtn = document.getElementById("smsBtn");
  const emailBtn = document.getElementById("emailBtn");

  if (!form || !out) return;

  function buildMessage() {
    const fd = new FormData(form);
    const features = [];
    form.querySelectorAll('input[name="features"]:checked').forEach(cb => features.push(cb.value));

    const msg =
`Hi Dean,

Project: ${fd.get("projectName") || ""}
Goal: ${fd.get("goal") || ""}
Size: ${fd.get("size") || ""}
Environment: ${fd.get("environment") || ""}
Features: ${features.length ? features.join(", ") : "None selected"}
Deadline: ${fd.get("deadline") || ""}
Budget: ${fd.get("budget") || ""}
My name: ${fd.get("name") || ""}
Best contact: ${fd.get("contact") || ""}

Please recommend the fastest approach and a price range.`;

    out.textContent = msg.trim();
    return msg.trim();
  }

  function updateDeepLinks(text) {
    const enc = encodeURIComponent(text);
    if (smsBtn) smsBtn.href = `sms:+17167776345?body=${enc}`;
    if (emailBtn) emailBtn.href =
      `mailto:Dean.Kunselman@gmail.com?subject=${encodeURIComponent("Project Inquiry")}&body=${enc}`;
  }

  form.addEventListener("input", () => {
    const text = buildMessage();
    updateDeepLinks(text);
  });

  const initial = buildMessage();
  updateDeepLinks(initial);

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = buildMessage();
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy Message"), 1200);
      } catch {
        const r = document.createRange();
        r.selectNodeContents(out);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        document.execCommand("copy");
      }
    });
  }
})();
