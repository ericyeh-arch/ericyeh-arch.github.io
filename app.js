const pdfs = [
  {
    title: "第一堂 Vibe Coding應用概念 (學員)",
    pages: 52,
    file: "docs/第一堂 Vibe Coding應用概念 (學員).pdf",
    summary: "AI 協作開發觀念、任務溝通、提示詞與從想法到原型的工作方式。"
  },
  {
    title: "第二堂 行銷需求與系統拆解(學員)",
    pages: 39,
    file: "docs/第二堂 行銷需求與系統拆解(學員).pdf",
    summary: "把行銷需求拆成目標、角色、頁面、資料欄位與可執行的系統規格。"
  },
  {
    title: "第三堂 Firebase後端系統+github page布署 (學員)",
    pages: 33,
    file: "docs/第三堂 Firebase後端系統+github page布署 (學員).pdf",
    summary: "AI 工具流程、Prompt、Firebase 後端串接與 GitHub Pages 部署觀念。"
  },
  {
    title: "第三堂黃雲龍老師筆記",
    pages: 46,
    file: "docs/第三堂黃雲龍老師筆記.pdf",
    summary: "Gemini Canvas、Firebase、使用者註冊登入、GitHub Pages 與授權網域實作紀錄。"
  }
];

const lessons = [
  {
    title: "第一堂：Vibe Coding 應用概念",
    goal: "理解 AI 不是單次問答工具，而是能協助規劃、產生、修正與測試系統的開發夥伴。",
    points: ["釐清問題與成果形式", "把需求拆成小任務", "用 Prompt 迭代畫面、資料與流程", "建立可驗證的交付節奏"],
    deliverable: "交付物：一份可描述目標、使用者、功能與限制的應用構想。"
  },
  {
    title: "第二堂：行銷需求與系統拆解",
    goal: "從行銷情境出發，把客戶旅程與轉換目標拆成可以開發的系統規格。",
    points: ["定義主要受眾與使用情境", "拆解前台、後台與資料欄位", "設計註冊、互動與管理流程", "確認 MVP 先做哪些功能"],
    deliverable: "交付物：頁面清單、資料欄位、流程圖與開發優先順序。"
  },
  {
    title: "第三堂：Firebase 後端與 GitHub Pages 部署",
    goal: "把原型接上雲端後端，完成帳號功能並部署成可公開測試的網站。",
    points: ["建立 Firebase 專案與前端設定", "開發註冊、登入、忘記密碼與管理頁", "建立 GitHub repository 並啟用 Pages", "將 Pages 網域加入 Firebase Authentication 授權網域"],
    deliverable: "交付物：可公開瀏覽、可登入測試、可後續更新的 Web App。"
  }
];

const checks = [
  "已完成應用主題、目標對象與使用情境描述",
  "已整理頁面清單、欄位與管理需求",
  "已建立 Firebase 專案並取得前端 config",
  "已完成註冊、登入與忘記密碼流程",
  "已建立 GitHub repository 並上傳 index.html",
  "已啟用 GitHub Pages 並確認公開網址可開啟",
  "已把 GitHub Pages 網域加入 Firebase 授權網域",
  "已用測試帳號確認登入註冊流程正常"
];

const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.view;
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    views.forEach((view) => view.classList.toggle("is-active", view.id === target));
  });
});

const lessonDetailGrid = document.querySelector("#lessonDetailGrid");
lessonDetailGrid.innerHTML = lessons.map((lesson) => `
  <article class="detail-card">
    <h3>${lesson.title}</h3>
    <p>${lesson.goal}</p>
    <ul>${lesson.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    <p class="deliverable">${lesson.deliverable}</p>
  </article>
`).join("");

const checklist = document.querySelector("#checklist");
const savedChecks = JSON.parse(localStorage.getItem("vibeCodingChecks") || "[]");

function renderChecklist() {
  checklist.innerHTML = checks.map((text, index) => `
    <label class="check-item">
      <input type="checkbox" data-index="${index}" ${savedChecks.includes(index) ? "checked" : ""}>
      <span>${text}</span>
    </label>
  `).join("");
}

renderChecklist();

checklist.addEventListener("change", (event) => {
  const input = event.target;
  if (!input.matches("input[type='checkbox']")) return;
  const index = Number(input.dataset.index);
  const current = new Set(JSON.parse(localStorage.getItem("vibeCodingChecks") || "[]"));
  if (input.checked) {
    current.add(index);
  } else {
    current.delete(index);
  }
  localStorage.setItem("vibeCodingChecks", JSON.stringify([...current]));
});

document.querySelector("#resetProgress").addEventListener("click", () => {
  localStorage.removeItem("vibeCodingChecks");
  savedChecks.length = 0;
  renderChecklist();
});

const pdfSelect = document.querySelector("#pdfSelect");
const pdfFrame = document.querySelector("#pdfFrame");
const resourceList = document.querySelector("#resourceList");

pdfSelect.innerHTML = pdfs.map((pdf, index) => `<option value="${index}">${pdf.title}</option>`).join("");
resourceList.innerHTML = pdfs.map((pdf, index) => `
  <div class="resource-item">
    <strong>${pdf.title}</strong>
    <span>${pdf.pages} 頁｜${pdf.summary}</span>
    <a class="pdf-button" href="${pdf.file}" target="_blank" rel="noreferrer">開啟 PDF</a>
  </div>
`).join("");

function setPdf(index) {
  pdfFrame.src = pdfs[index].file;
}

pdfSelect.addEventListener("change", (event) => setPdf(event.target.value));
setPdf(0);
