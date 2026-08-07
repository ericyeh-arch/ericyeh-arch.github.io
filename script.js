const views = {
  ideas: {
    title: "從「能不能思考」到「如何解決問題」",
    body:
      "AI 早期關注機器是否能像人一樣推理。後來研究重心逐步轉向資料、模型、機率與學習方法，今天則更重視可靠性、應用場景與人機協作。",
    points: ["適合先理解 AI 的大問題與演進脈絡", "能看出每一次技術浪潮背後的限制"],
  },
  tools: {
    title: "從少數研究工具到開源生態系",
    body:
      "Python 的價值不只在語法，而在套件與社群。資料處理、視覺化、機器學習、深度學習工具逐步成熟，讓實驗與產品開發都更快。",
    points: ["NumPy 與 Pandas 處理資料", "Jupyter、scikit-learn、PyTorch 讓學習和實作更順"],
  },
  people: {
    title: "從專家領域變成更多人能參與的能力",
    body:
      "AI 曾經主要屬於研究機構與大型企業。現在初學者可以透過 Python、雲端工具與現成模型，從小專案開始理解 AI 如何運作。",
    points: ["先做小作品，再補數學與理論", "保持批判思考，理解模型可能出錯"],
  },
};

const tabs = document.querySelectorAll(".tab");
const viewPanel = document.querySelector(".view-panel");

function renderView(viewName) {
  const view = views[viewName];
  viewPanel.innerHTML = `
    <h3>${view.title}</h3>
    <p>${view.body}</p>
    <ul>${view.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewName);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderView(tab.dataset.view));
});

const filters = document.querySelectorAll(".filter");
const timelineItems = document.querySelectorAll(".timeline-item");

function applyFilter(filterName) {
  timelineItems.forEach((item) => {
    const visible = filterName === "all" || item.dataset.type === filterName;
    item.classList.toggle("hidden", !visible);
  });

  filters.forEach((filter) => {
    filter.classList.toggle("active", filter.dataset.filter === filterName);
  });
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => applyFilter(filter.dataset.filter));
});
