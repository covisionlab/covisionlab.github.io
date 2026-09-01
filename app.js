const searchInput = document.querySelector("#paper-search");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const papers = [...document.querySelectorAll(".paper")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const clearFiltersButton = document.querySelector("#clear-filters");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".site-nav a")];

let activeFilter = "all";

function updateCatalog() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  papers.forEach((paper) => {
    const categories = paper.dataset.category.split(" ");
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !query || paper.dataset.search.includes(query);
    const isVisible = matchesFilter && matchesSearch;

    paper.hidden = !isVisible;
    visibleCount += Number(isVisible);
  });

  resultCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "paper" : "papers"}`;
  emptyState.hidden = visibleCount !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    updateCatalog();
  });
});

searchInput.addEventListener("input", updateCatalog);

clearFiltersButton.addEventListener("click", () => {
  activeFilter = "all";
  searchInput.value = "";
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === "all";
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateCatalog();
  searchInput.focus();
});

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".sr-only").textContent = "Open menu";
}

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#current-year").textContent = new Date().getFullYear();