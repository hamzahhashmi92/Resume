// Home page: filter the case-study cards by product. The choice is kept while you browse (this tab only).
const filters = document.querySelector(".filters");
if (filters) {
  const cards = [...document.querySelectorAll(".work-grid > li")];
  const notes = [...document.querySelectorAll(".filter-note")];
  const buttons = [...filters.querySelectorAll("button")];
  const status = document.getElementById("filter-status");
  const apply = (f, announce) => {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    cards.forEach((li) => {
      li.hidden = f !== "all" && li.dataset.part !== f;
    });
    notes.forEach((n) => {
      n.hidden = n.dataset.for !== f;
    });
    if (announce) {
      const product = buttons.find((b) => b.dataset.filter === f).textContent;
      status.textContent = f === "all" ? "Showing all work" : `Showing work from ${product}`;
    }
    try {
      sessionStorage.setItem("work-filter", f);
    } catch {
      // storage blocked: the filter just isn't remembered
    }
  };
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) apply(b.dataset.filter, true);
  });
  let saved = "all";
  try {
    saved = sessionStorage.getItem("work-filter") || "all";
  } catch {
    // storage blocked: start with all work
  }
  filters.hidden = false;
  apply(buttons.some((b) => b.dataset.filter === saved) ? saved : "all");
  // coming back from a case page whose card the saved filter hides: show all, then go to the card
  const target = location.hash.startsWith("#card-") && document.getElementById(location.hash.slice(1));
  if (target?.hidden) {
    apply("all");
    target.scrollIntoView();
  }
}

// Case pages: the left and right arrow keys open the previous and next case.
const prev = document.querySelector('.pager a[rel="prev"]');
const next = document.querySelector('.pager a[rel="next"]');
if (prev || next) {
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (document.querySelector("dialog[open]") || e.target.closest("input, textarea, select, pre")) return;
    const link = { ArrowLeft: prev, ArrowRight: next }[e.key];
    if (link) location.href = link.href;
  });
}

// Case pages: open screenshots in a viewer; clicking a large image there shows it at full size.
// On phones the link opens the image itself, where pinch-zoom works.
const viewer = document.querySelector("dialog.viewer");
if (viewer) {
  const img = viewer.querySelector("img");
  const caption = viewer.querySelector(".bar p");
  const fitZoom = () => {
    const larger = img.naturalWidth > img.clientWidth + 2 || img.naturalHeight > img.clientHeight + 2;
    img.classList.toggle("zoomable", larger);
  };
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.shot");
    if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (matchMedia("(max-width: 720px)").matches) return;
    e.preventDefault();
    img.classList.remove("full", "zoomable");
    img.onload = fitZoom;
    img.src = link.getAttribute("href");
    img.alt = link.querySelector("img").alt;
    caption.textContent = link.dataset.caption || "";
    viewer.setAttribute("aria-label", link.dataset.caption || "Screenshot");
    viewer.showModal();
    if (img.complete) fitZoom();
  });
  img.addEventListener("click", () => {
    if (img.classList.contains("zoomable") || img.classList.contains("full")) img.classList.toggle("full");
  });
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target.closest("button")) viewer.close();
  });
  viewer.addEventListener("close", () => img.removeAttribute("src"));
}
