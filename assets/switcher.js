/* Floating Variation Switcher for dickbutt.meme */
(function () {
  var html = document.documentElement;
  if (html.getAttribute("data-hide-switcher") === "true") return;

  var params = new URLSearchParams(window.location.search);
  if (params.get("solo") === "1") return;

  var activeVar = html.getAttribute("data-variation") || "1";
  var root = html.getAttribute("data-root") || "./";
  var isTrapDisguised = activeVar === "3" && (params.has("trap") || params.has("c"));

  var items = [
    { id: "1", label: "Fine Art Museum", path: root + "v1/" },
    { id: "2", label: "Dickbutt.ai SaaS", path: root + "v2/" },
    { id: "3", label: "Trap & DVD Bounce", path: root + "v3/" }
  ];

  var nav = document.createElement("nav");
  nav.className = "db-switcher" + (isTrapDisguised ? " is-hidden" : "");
  nav.setAttribute("aria-label", "Site variation switcher");

  var title = document.createElement("span");
  title.className = "db-switcher-label";
  title.textContent = "Variations";
  nav.appendChild(title);

  items.forEach(function (item) {
    var a = document.createElement("a");
    a.href = item.path;
    a.className = "db-switcher-link" + (item.id === activeVar ? " is-active" : "");
    a.innerHTML = '<span class="db-switcher-kbd">' + item.id + "</span><span>" + item.label + "</span>";
    nav.appendChild(a);
  });

  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "db-switcher-close";
  closeBtn.title = "Hide switcher (press ? to reopen)";
  closeBtn.setAttribute("aria-label", "Hide variation switcher");
  closeBtn.textContent = "✕";
  closeBtn.addEventListener("click", function () {
    nav.classList.add("is-hidden");
  });
  nav.appendChild(closeBtn);

  function mount() {
    document.body.appendChild(nav);
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }

  window.revealDickbuttSwitcher = function () {
    nav.classList.remove("is-hidden");
  };

  window.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select" || (e.target && e.target.isContentEditable)) {
      return;
    }
    if (isTrapDisguised && nav.classList.contains("is-hidden")) return;

    if (e.key === "1" || e.key === "2" || e.key === "3") {
      var target = items[parseInt(e.key, 10) - 1];
      if (target && target.id !== activeVar) {
        window.location.href = target.path;
      }
    } else if (e.key === "?") {
      nav.classList.toggle("is-hidden");
    }
  });
})();
