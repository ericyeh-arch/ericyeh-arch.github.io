const steps = [
  {
    label: "STEP 1",
    title: "要求 AI 產生靜態網站",
    body:
      "提示詞要指定「靜態網站」、「繁體中文」、「可直接在瀏覽器開啟」，避免產出需要後端或資料庫的方案。",
    checks: ["產物：明確提示詞", "驗收：AI 回覆的技術方案只有前端檔案"],
  },
  {
    label: "STEP 2",
    title: "確認輸出檔案可以本機開啟",
    body:
      "把 AI 產出的 index.html 放進瀏覽器，確認文字、圖片、版面與互動正常，再準備上傳。",
    checks: ["產物：HTML、CSS、JavaScript 與素材", "驗收：本機預覽沒有破版"],
  },
  {
    label: "STEP 3",
    title: "建立公開 GitHub Repository",
    body:
      "登入 GitHub 後建立 repo。個人首頁可用 username.github.io；一般專案也可以使用自己的 repo 名稱。",
    checks: ["產物：Public repository", "驗收：檔案已上傳並 commit"],
  },
  {
    label: "STEP 4",
    title: "啟用 GitHub Pages 並等待部署",
    body:
      "進入 Settings > Pages，Source 選 Deploy from a branch，分支選 main。Actions 完成後，到 Pages 頁面開啟公開 URL。",
    checks: ["產物：GitHub Pages URL", "驗收：公開網址可正常瀏覽"],
  },
];

const timelineButtons = document.querySelectorAll(".timeline-step");
const detail = document.querySelector(".step-detail");

function renderStep(index) {
  const step = steps[index];
  detail.innerHTML = `
    <p class="step-label">${step.label}</p>
    <h3>${step.title}</h3>
    <p>${step.body}</p>
    <ul>
      ${step.checks.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;

  timelineButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });
}

timelineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderStep(Number(button.dataset.step));
  });
});

const topicInput = document.getElementById("topicInput");
const styleInput = document.getElementById("styleInput");
const pagesInput = document.getElementById("pagesInput");
const responsiveInput = document.getElementById("responsiveInput");
const promptText = document.getElementById("promptText");
const copyPrompt = document.getElementById("copyPrompt");

function buildPrompt() {
  const responsive = responsiveInput.checked
    ? "請確保手機與桌機都能正常閱讀，文字不要重疊。"
    : "請先以桌機瀏覽為主。";

  promptText.textContent = `請幫我製作一個精美的靜態網站，主題是「${topicInput.value.trim()}」。

需求：
1. 全部內容使用繁體中文。
2. 視覺風格：${styleInput.value}。
3. 頁面內容包含：${pagesInput.value.trim()}。
4. 只能使用 HTML、CSS、JavaScript 與前端素材，不要後端、不要資料庫、不要登入系統。
5. 首頁檔名請使用 index.html，並列出需要上傳到 GitHub 的所有檔案。
6. ${responsive}

完成後請說明如何把檔案上傳到 GitHub Pages。`;
}

[topicInput, styleInput, pagesInput, responsiveInput].forEach((control) => {
  control.addEventListener("input", buildPrompt);
  control.addEventListener("change", buildPrompt);
});

copyPrompt.addEventListener("click", async () => {
  await navigator.clipboard.writeText(promptText.textContent);
  copyPrompt.textContent = "已複製";
  setTimeout(() => {
    copyPrompt.textContent = "複製";
  }, 1400);
});

const checklistInputs = document.querySelectorAll(".checklist input");
const progressText = document.getElementById("progressText");
const meter = document.querySelector(".meter");
const circumference = 301.59;

function updateProgress() {
  const total = checklistInputs.length;
  const done = [...checklistInputs].filter((input) => input.checked).length;
  const percent = Math.round((done / total) * 100);
  progressText.textContent = `${percent}%`;
  meter.style.strokeDashoffset = String(circumference - (circumference * percent) / 100);
}

checklistInputs.forEach((input) => {
  input.addEventListener("change", updateProgress);
});

buildPrompt();
updateProgress();
