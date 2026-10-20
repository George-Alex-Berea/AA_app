// ==========================================
// App State
// ==========================================
let currentFilter = "all"; // "all" | "multiple_choice" | "open_ended"
let filteredQuestions = [...questions];
let currentQuestionIndex = 0;
let selectedOptionIndices = new Set();
let isAnswered = false;
const answeredQuestionIds = new Set();
let isDrawerOpen = false;
let drawerSearchQuery = "";
let drawerViewMode = "topics"; // "topics" | "all_list"
let allCollapsed = false;

// Category Icons Mapping
const CATEGORY_ICONS = {
  "Analiză Amortizată": "⚡",
  "Notații Asimptotice": "📐",
  "Relații de Recurență & Teorema Master": "🔁",
  "Specificare Algebrică & Inducție": "🌳",
  "Structuri de Date": "🗃️",
  "Analiza Complexității & Algoritmi": "⏱️"
};

// Track collapsed state per category
const collapsedCategories = new Set();

// DOM Element References
const categoryTag = document.getElementById("category-tag");
const topicTag = document.getElementById("topic-tag");
const sourceTag = document.getElementById("source-tag");
const typeBadge = document.getElementById("type-badge");
const questionText = document.getElementById("question-text");
const codeBlock = document.getElementById("code-block");
const codeContent = document.getElementById("code-content");
const optionsContainer = document.getElementById("options-container");
const openEndedContainer = document.getElementById("open-ended-container");
const studentAnswerInput = document.getElementById("student-answer-input");

const btnCheck = document.getElementById("btn-check");
const btnReveal = document.getElementById("btn-reveal");
const btnNext = document.getElementById("btn-next");

const btnPrevQ = document.getElementById("btn-prev-q");
const btnNextQ = document.getElementById("btn-next-q");
const btnQuickMenu = document.getElementById("btn-quick-menu");
const quickCurrentLabel = document.getElementById("quick-current-label");

const explanationBox = document.getElementById("explanation-box");
const resultTitle = document.getElementById("result-title");
const explanationText = document.getElementById("explanation-text");
const comparisonView = document.getElementById("comparison-view");
const studentAnswerDisplay = document.getElementById("student-answer-display");
const officialAnswerDisplay = document.getElementById("official-answer-display");
const selfEvalBox = document.getElementById("self-eval-box");

const countAll = document.getElementById("count-all");
const countMc = document.getElementById("count-mc");
const countOe = document.getElementById("count-oe");
const filterBtns = document.querySelectorAll(".filter-btn");

// Drawer DOM Elements
const btnOpenMenu = document.getElementById("btn-open-menu");
const btnCloseDrawer = document.getElementById("btn-close-drawer");
const topicDrawer = document.getElementById("topic-drawer");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const drawerSearchInput = document.getElementById("drawer-search-input");
const btnClearSearch = document.getElementById("btn-clear-search");
const drawerContent = document.getElementById("drawer-content");
const drawerStatsText = document.getElementById("drawer-stats-text");
const btnToggleAccordions = document.getElementById("btn-toggle-accordions");
const menuTotalBadge = document.getElementById("menu-total-badge");
const tabModeTopics = document.getElementById("tab-mode-topics");
const tabModeAll = document.getElementById("tab-mode-all");

// ==========================================
// Initialize App
// ==========================================
function init() {
  updateCounts();
  applyFilter("all");
  buildDrawerContent();

  // Action Buttons
  btnCheck.addEventListener("click", handleCheckAnswer);
  btnReveal.addEventListener("click", handleRevealExplanation);
  btnNext.addEventListener("click", handleNextQuestion);

  // Quick Prev / Next question navigation
  btnPrevQ.addEventListener("click", handlePrevQuestion);
  btnNextQ.addEventListener("click", handleNextNavQuestion);
  btnQuickMenu.addEventListener("click", openDrawer);

  // Drawer events
  btnOpenMenu.addEventListener("click", openDrawer);
  btnCloseDrawer.addEventListener("click", closeDrawer);
  drawerBackdrop.addEventListener("click", closeDrawer);

  // Keyboard accessibility (Esc to close drawer)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isDrawerOpen) {
      closeDrawer();
    }
  });

  // Drawer Mode Tabs (Pe Topici vs Listă Continuă)
  tabModeTopics.addEventListener("click", () => {
    drawerViewMode = "topics";
    tabModeTopics.classList.add("active");
    tabModeAll.classList.remove("active");
    btnToggleAccordions.style.display = "inline-block";
    buildDrawerContent();
  });

  tabModeAll.addEventListener("click", () => {
    drawerViewMode = "all_list";
    tabModeAll.classList.add("active");
    tabModeTopics.classList.remove("active");
    btnToggleAccordions.style.display = "none";
    buildDrawerContent();
  });

  // Drawer Search
  drawerSearchInput.addEventListener("input", (e) => {
    drawerSearchQuery = e.target.value.trim().toLowerCase();
    btnClearSearch.style.display = drawerSearchQuery.length > 0 ? "block" : "none";
    buildDrawerContent();
  });

  btnClearSearch.addEventListener("click", () => {
    drawerSearchInput.value = "";
    drawerSearchQuery = "";
    btnClearSearch.style.display = "none";
    buildDrawerContent();
    drawerSearchInput.focus();
  });

  // Toggle all accordions
  btnToggleAccordions.addEventListener("click", toggleAllAccordions);

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      applyFilter(filter);
    });
  });

  // Category Tag click opens drawer
  categoryTag.addEventListener("click", openDrawer);

  // Open-ended input listener to enable Check button
  studentAnswerInput.addEventListener("input", () => {
    if (getCurrentQuestion() && getCurrentQuestion().type === "open_ended" && !isAnswered) {
      btnCheck.disabled = studentAnswerInput.value.trim().length === 0;
    }
  });

  // Self-evaluation buttons
  document.getElementById("btn-eval-correct").addEventListener("click", (e) => handleSelfEvaluation(e, "correct"));
  document.getElementById("btn-eval-partial").addEventListener("click", (e) => handleSelfEvaluation(e, "partial"));
  document.getElementById("btn-eval-wrong").addEventListener("click", (e) => handleSelfEvaluation(e, "wrong"));
}

function updateCounts() {
  const mcCount = questions.filter(q => q.type === "multiple_choice").length;
  const oeCount = questions.filter(q => q.type === "open_ended").length;
  countAll.textContent = questions.length;
  countMc.textContent = mcCount;
  countOe.textContent = oeCount;
  if (menuTotalBadge) menuTotalBadge.textContent = questions.length;
}

function applyFilter(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  if (filter === "all") {
    filteredQuestions = [...questions];
  } else {
    filteredQuestions = questions.filter(q => q.type === filter);
  }

  currentQuestionIndex = 0;
  if (filteredQuestions.length > 0) {
    loadQuestion(currentQuestionIndex);
  } else {
    showNoQuestions();
  }
  updateNavButtons();
}

function getCurrentQuestion() {
  return filteredQuestions[currentQuestionIndex];
}

// ==========================================
// Load and Render a Question
// ==========================================
function loadQuestion(index) {
  const q = filteredQuestions[index];
  isAnswered = false;
  selectedOptionIndices.clear();

  // Update top quick nav & meta
  quickCurrentLabel.textContent = `Q${q.id} • ${index + 1} din ${filteredQuestions.length}`;
  categoryTag.textContent = (CATEGORY_ICONS[q.category] ? CATEGORY_ICONS[q.category] + " " : "") + (q.category || "General");
  topicTag.textContent = q.topic || "Analiza Algoritmilor";
  sourceTag.textContent = q.source || "Examen AA";
  
  if (q.type === "open_ended") {
    typeBadge.textContent = "Răspuns Liber";
    typeBadge.className = "type-badge open";
  } else {
    typeBadge.textContent = "Grilă";
    typeBadge.className = "type-badge";
  }

  questionText.innerHTML = q.question;

  // Code Block
  if (q.code) {
    codeContent.textContent = q.code;
    codeBlock.style.display = "block";
  } else {
    codeBlock.style.display = "none";
  }

  // Question Type handling
  if (q.type === "multiple_choice") {
    openEndedContainer.style.display = "none";
    optionsContainer.style.display = "flex";
    optionsContainer.innerHTML = "";

    btnCheck.textContent = "Verifică Răspunsul";
    btnReveal.textContent = "Arată Răspunsul Corect";

    q.options.forEach((optText, i) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = optText;
      btn.addEventListener("click", () => handleToggleOption(i, q));
      optionsContainer.appendChild(btn);
    });

    btnCheck.disabled = true;
  } else if (q.type === "open_ended") {
    optionsContainer.style.display = "none";
    openEndedContainer.style.display = "block";
    studentAnswerInput.value = "";
    studentAnswerInput.disabled = false;

    btnCheck.textContent = "Compară cu Soluția din PDF";
    btnReveal.textContent = "Arată Soluția din PDF";
    btnCheck.disabled = true;
  }

  // Reset Actions & Explanation Box
  btnCheck.style.display = "inline-block";
  btnReveal.style.display = "inline-block";
  btnNext.style.display = "none";
  explanationBox.style.display = "none";
  comparisonView.style.display = "none";
  selfEvalBox.style.display = "none";

  resetSelfEvalButtons();
  updateNavButtons();
  highlightActiveDrawerItem();
  renderMath();
}

function updateNavButtons() {
  btnPrevQ.disabled = currentQuestionIndex <= 0;
  btnNextQ.disabled = currentQuestionIndex >= filteredQuestions.length - 1;
}

// ==========================================
// Navigation Actions (Prev / Next)
// ==========================================
function handlePrevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

function handleNextNavQuestion() {
  if (currentQuestionIndex < filteredQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
}

function handleNextQuestion() {
  if (currentQuestionIndex < filteredQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    showQuizCompletion();
  }
}

// ==========================================
// Navigate to a Specific Question from Menu
// ==========================================
function navigateToQuestion(questionId) {
  const targetQ = questions.find(q => q.id === questionId);
  if (!targetQ) return;

  // If question is filtered out by current type filter, reset to "all"
  if (!filteredQuestions.some(q => q.id === questionId)) {
    applyFilter("all");
  }

  const targetIndex = filteredQuestions.findIndex(q => q.id === questionId);
  if (targetIndex !== -1) {
    currentQuestionIndex = targetIndex;
    loadQuestion(currentQuestionIndex);
  }

  closeDrawer();
}

// ==========================================
// Drawer Logic (Grouping by Topic & List View)
// ==========================================
function openDrawer() {
  isDrawerOpen = true;
  topicDrawer.classList.add("open");
  topicDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scroll

  highlightActiveDrawerItem();

  // Scroll active item into view smoothly
  setTimeout(() => {
    const activeItem = drawerContent.querySelector(".drawer-q-item.active");
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 150);
}

function closeDrawer() {
  isDrawerOpen = false;
  topicDrawer.classList.remove("open");
  topicDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.style.display = "none";
  document.body.style.overflow = "";
}

function toggleAllAccordions() {
  allCollapsed = !allCollapsed;
  const categories = getCategoriesList();

  if (allCollapsed) {
    categories.forEach(cat => collapsedCategories.add(cat));
    btnToggleAccordions.textContent = "Extinde toate";
  } else {
    collapsedCategories.clear();
    btnToggleAccordions.textContent = "Restrânge toate";
  }
  buildDrawerContent();
}

function getCategoriesList() {
  const order = [
    "Analiză Amortizată",
    "Notații Asimptotice",
    "Relații de Recurență & Teorema Master",
    "Specificare Algebrică & Inducție",
    "Structuri de Date",
    "Analiza Complexității & Algoritmi"
  ];
  const presentCats = Array.from(new Set(questions.map(q => q.category || "General")));
  return presentCats.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });
}

// Question matches search helper
function questionMatchesSearch(q, query) {
  if (!query) return true;
  const qText = (q.question || "").toLowerCase();
  const qTitle = (q.title || "").toLowerCase();
  const qTopic = (q.topic || "").toLowerCase();
  const qCategory = (q.category || "").toLowerCase();
  const qCode = (q.code || "").toLowerCase();
  const qId = `q${q.id}`;
  return qText.includes(query) ||
         qTitle.includes(query) ||
         qTopic.includes(query) ||
         qCategory.includes(query) ||
         qCode.includes(query) ||
         qId === query ||
         q.id.toString() === query;
}

// Render individual question card element
function createQuestionItemElement(q, currentQ, showCategoryBadge = false) {
  const isActive = currentQ && currentQ.id === q.id;
  const isDone = answeredQuestionIds.has(q.id);

  const itemBtn = document.createElement("button");
  itemBtn.className = `drawer-q-item ${isActive ? "active" : ""} ${isDone ? "answered" : ""}`;
  itemBtn.dataset.questionId = q.id;

  const typeLabel = q.type === "open_ended" ? "Răspuns Liber" : "Grilă";
  const typeClass = q.type === "open_ended" ? "type-oe" : "type-mc";
  const categoryIcon = CATEGORY_ICONS[q.category] || "📁";

  itemBtn.innerHTML = `
    <div class="q-item-header">
      <div class="q-item-header-left">
        <span class="q-id-pill">#${q.id}</span>
        <span class="q-type-badge ${typeClass}">${typeLabel}</span>
        ${showCategoryBadge ? `<span class="q-cat-pill">${categoryIcon} ${escapeHtml(q.category)}</span>` : ''}
        <span class="q-source-pill">${escapeHtml(q.source.split('(')[0].trim())}</span>
      </div>
      <div class="q-item-header-right">
        ${isDone ? '<span class="q-status-pill done">✓ Rezolvată</span>' : '<span class="q-status-pill todo">Neîncercată</span>'}
        ${isActive ? '<span class="q-current-pill">Activă</span>' : ''}
      </div>
    </div>
    
    <div class="q-item-body">
      <h4 class="q-item-title">${escapeHtml(q.title || q.topic)}</h4>
      <div class="q-item-topic">
        <span class="topic-dot">•</span> ${escapeHtml(q.topic)}
      </div>
    </div>
  `;

  itemBtn.addEventListener("click", () => {
    navigateToQuestion(q.id);
  });

  return itemBtn;
}

function buildDrawerContent() {
  drawerContent.innerHTML = "";
  const currentQ = getCurrentQuestion();

  if (drawerViewMode === "all_list") {
    // Mode 2: Continuous list (all 30 questions ordered 1 to 30)
    const matchingQuestions = questions.filter(q => questionMatchesSearch(q, drawerSearchQuery));

    if (matchingQuestions.length === 0) {
      showDrawerEmptySearch();
      return;
    }

    drawerStatsText.textContent = drawerSearchQuery 
      ? `${matchingQuestions.length} întrebări găsite`
      : `${matchingQuestions.length} întrebări (1 - 30)`;

    const listContainer = document.createElement("div");
    listContainer.className = "drawer-full-list";

    matchingQuestions.forEach(q => {
      const itemBtn = createQuestionItemElement(q, currentQ, true);
      listContainer.appendChild(itemBtn);
    });

    drawerContent.appendChild(listContainer);
    return;
  }

  // Mode 1: Grouped by Topic (Accordion cards)
  const categories = getCategoriesList();
  let matchedQuestionsCount = 0;
  let totalCatsWithMatches = 0;

  categories.forEach(catName => {
    const catQuestions = questions.filter(q => (q.category || "General") === catName);
    const filteredCatQuestions = catQuestions.filter(q => questionMatchesSearch(q, drawerSearchQuery));

    if (filteredCatQuestions.length === 0) return;

    totalCatsWithMatches++;
    matchedQuestionsCount += filteredCatQuestions.length;

    const isCollapsed = collapsedCategories.has(catName) && !drawerSearchQuery;
    const doneCount = filteredCatQuestions.filter(q => answeredQuestionIds.has(q.id)).length;
    const totalCount = filteredCatQuestions.length;

    // Group Container
    const groupCard = document.createElement("div");
    groupCard.className = `drawer-topic-group ${isCollapsed ? "collapsed" : ""}`;

    // Group Header (Accordion trigger)
    const header = document.createElement("div");
    header.className = "drawer-topic-header";
    const icon = CATEGORY_ICONS[catName] || "📁";

    header.innerHTML = `
      <div class="topic-header-title">
        <span class="topic-icon-badge">${icon}</span>
        <div class="topic-text-group">
          <span class="topic-name">${catName}</span>
          <span class="topic-progress-text">${doneCount} din ${totalCount} rezolvate</span>
        </div>
      </div>
      <div class="topic-header-meta">
        <span class="topic-count-pill">${totalCount} ${totalCount === 1 ? 'întrebare' : 'întrebări'}</span>
        <span class="accordion-arrow ${isCollapsed ? 'collapsed' : ''}">▾</span>
      </div>
    `;

    header.addEventListener("click", () => {
      if (collapsedCategories.has(catName)) {
        collapsedCategories.delete(catName);
      } else {
        collapsedCategories.add(catName);
      }
      buildDrawerContent();
    });

    // Group Items List
    const itemsList = document.createElement("div");
    itemsList.className = "drawer-q-list";
    if (isCollapsed) {
      itemsList.style.display = "none";
    }

    filteredCatQuestions.forEach(q => {
      const itemBtn = createQuestionItemElement(q, currentQ, false);
      itemsList.appendChild(itemBtn);
    });

    groupCard.appendChild(header);
    groupCard.appendChild(itemsList);
    drawerContent.appendChild(groupCard);
  });

  if (matchedQuestionsCount === 0) {
    showDrawerEmptySearch();
  } else {
    drawerStatsText.textContent = drawerSearchQuery 
      ? `${matchedQuestionsCount} întrebări găsite`
      : `${questions.length} întrebări în ${categories.length} topici`;
  }
}

function showDrawerEmptySearch() {
  drawerContent.innerHTML = `
    <div class="drawer-empty-search">
      <div class="empty-icon">🔎</div>
      <p>Nu s-a găsit nicio întrebare pentru „<strong>${escapeHtml(drawerSearchQuery)}</strong>”.</p>
      <button class="btn btn-secondary btn-sm" id="btn-reset-drawer-search">Șterge filtrul de căutare</button>
    </div>
  `;
  const resetBtn = document.getElementById("btn-reset-drawer-search");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      drawerSearchInput.value = "";
      drawerSearchQuery = "";
      btnClearSearch.style.display = "none";
      buildDrawerContent();
      drawerSearchInput.focus();
    });
  }
  drawerStatsText.textContent = "0 rezultate";
}

function highlightActiveDrawerItem() {
  const currentQ = getCurrentQuestion();
  if (!currentQ) return;

  const allItems = drawerContent.querySelectorAll(".drawer-q-item");
  allItems.forEach(item => {
    const qId = parseInt(item.dataset.questionId, 10);
    const isActive = qId === currentQ.id;
    item.classList.toggle("active", isActive);

    const rightCol = item.querySelector(".q-item-header-right");
    const existingCurrentPill = item.querySelector(".q-current-pill");

    if (isActive && !existingCurrentPill && rightCol) {
      const pill = document.createElement("span");
      pill.className = "q-current-pill";
      pill.textContent = "Activă";
      rightCol.appendChild(pill);
    } else if (!isActive && existingCurrentPill) {
      existingCurrentPill.remove();
    }
  });
}

// ==========================================
// Handle Multiple Choice Option Selection
// ==========================================
function handleToggleOption(index, q) {
  if (isAnswered) return;

  const correctList = getCorrectIndices(q);
  const isMultiSelect = correctList.length > 1;

  if (isMultiSelect) {
    if (selectedOptionIndices.has(index)) {
      selectedOptionIndices.delete(index);
    } else {
      selectedOptionIndices.add(index);
    }
  } else {
    selectedOptionIndices.clear();
    selectedOptionIndices.add(index);
  }

  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.classList.toggle("selected", selectedOptionIndices.has(i));
  });

  btnCheck.disabled = selectedOptionIndices.size === 0;
}

function getCorrectIndices(q) {
  if (Array.isArray(q.correctIndices)) return q.correctIndices;
  if (typeof q.correctIndex === "number") return [q.correctIndex];
  return [];
}

// ==========================================
// Check Answer Logic
// ==========================================
function handleCheckAnswer() {
  const q = getCurrentQuestion();
  if (isAnswered) return;

  answeredQuestionIds.add(q.id);

  if (q.type === "multiple_choice") {
    isAnswered = true;
    const correctList = getCorrectIndices(q);
    const chosenList = Array.from(selectedOptionIndices);

    const isCorrect = correctList.length === chosenList.length &&
      correctList.every(idx => selectedOptionIndices.has(idx));

    highlightOptions(correctList, chosenList);

    if (correctList.length === 0) {
      resultTitle.textContent = "Notă soluție: Nicio variantă nu este corectă!";
      resultTitle.style.color = "#d97706";
    } else if (isCorrect) {
      resultTitle.textContent = "✓ Corect!";
      resultTitle.style.color = "#16a34a";
    } else {
      resultTitle.textContent = "✗ Răspuns greșit sau incomplet";
      resultTitle.style.color = "#dc2626";
    }

    comparisonView.style.display = "none";
    selfEvalBox.style.display = "none";
    explanationText.innerHTML = `<strong>Explicație &amp; Barem:</strong> ${q.explanation}`;
    explanationBox.style.display = "block";

    afterAnswerRevealed();
    renderMath();
  } else if (q.type === "open_ended") {
    isAnswered = true;
    studentAnswerInput.disabled = true;

    const userText = studentAnswerInput.value.trim();
    showOpenEndedComparison(userText, q);
  }

  buildDrawerContent();
}

// ==========================================
// Reveal Answer Directly
// ==========================================
function handleRevealExplanation() {
  const q = getCurrentQuestion();
  if (isAnswered) return;
  isAnswered = true;
  answeredQuestionIds.add(q.id);

  if (q.type === "multiple_choice") {
    const correctList = getCorrectIndices(q);
    highlightOptions(correctList, []);

    resultTitle.textContent = "Răspuns Oficial (din PDF):";
    resultTitle.style.color = "#2563eb";
    comparisonView.style.display = "none";
    selfEvalBox.style.display = "none";
    explanationText.innerHTML = `<strong>Explicație &amp; Barem:</strong> ${q.explanation}`;
    explanationBox.style.display = "block";

    afterAnswerRevealed();
    renderMath();
  } else if (q.type === "open_ended") {
    studentAnswerInput.disabled = true;
    const userText = studentAnswerInput.value.trim() || "<i>(Nu ai completat un răspuns)</i>";
    showOpenEndedComparison(userText, q);
  }

  buildDrawerContent();
}

// ==========================================
// Open-Ended Comparison & Self-Evaluation
// ==========================================
function showOpenEndedComparison(userText, q) {
  resultTitle.textContent = "Comparație cu Răspunsul Oficial din PDF";
  resultTitle.style.color = "#1e40af";

  studentAnswerDisplay.innerHTML = escapeHtml(userText).replace(/\n/g, "<br>");
  officialAnswerDisplay.innerHTML = escapeHtml(q.sampleAnswer).replace(/\n/g, "<br>");

  comparisonView.style.display = "grid";
  selfEvalBox.style.display = "block";
  explanationText.innerHTML = `<strong>Explicație &amp; Raționament:</strong><br>${q.explanation}`;
  explanationBox.style.display = "block";

  afterAnswerRevealed();
  renderMath();
}

function handleSelfEvaluation(e, rating) {
  resetSelfEvalButtons();
  e.target.classList.add("active");

  if (rating === "correct") {
    resultTitle.textContent = "✓ Te-ai autoevaluat: Corect!";
    resultTitle.style.color = "#16a34a";
  } else if (rating === "partial") {
    resultTitle.textContent = "~ Te-ai autoevaluat: Parțial corect";
    resultTitle.style.color = "#ca8a04";
  } else {
    resultTitle.textContent = "✗ Te-ai autoevaluat: Răspuns greșit";
    resultTitle.style.color = "#dc2626";
  }
}

function resetSelfEvalButtons() {
  const evalBtns = selfEvalBox.querySelectorAll("button");
  evalBtns.forEach(btn => btn.classList.remove("active"));
}

// ==========================================
// Helpers
// ==========================================
function highlightOptions(correctIndices, chosenIndices) {
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    const isCorrect = correctIndices.includes(i);
    const isChosen = chosenIndices.includes(i);

    if (isCorrect) {
      btn.classList.add("correct");
    } else if (isChosen && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });
}

function afterAnswerRevealed() {
  btnCheck.style.display = "none";
  btnReveal.style.display = "none";
  btnNext.style.display = "inline-block";
}

function showQuizCompletion() {
  optionsContainer.innerHTML = "";
  optionsContainer.style.display = "block";
  openEndedContainer.style.display = "none";
  codeBlock.style.display = "none";
  explanationBox.style.display = "none";
  categoryTag.textContent = "Final";
  topicTag.textContent = "Felicitări!";
  sourceTag.textContent = "Set Parcurs";
  typeBadge.textContent = "Succes";
  typeBadge.className = "type-badge";
  quickCurrentLabel.textContent = `Ai finalizat toate întrebările!`;
  questionText.innerHTML = "🎉 Ai parcurs toate întrebările din acest set!<br><br>Poți deschide <strong>Meniul pe Topici</strong> pentru a exersa din nou oricare întrebare specifică.";
  btnNext.style.display = "none";

  const btnRestart = document.createElement("button");
  btnRestart.className = "btn btn-primary";
  btnRestart.textContent = "Reia antrenamentul de la început";
  btnRestart.addEventListener("click", () => {
    currentQuestionIndex = 0;
    btnRestart.remove();
    loadQuestion(currentQuestionIndex);
  });

  optionsContainer.appendChild(btnRestart);
}

function showNoQuestions() {
  quickCurrentLabel.textContent = "0 întrebări";
  questionText.textContent = "Nu există întrebări pentru filtrul selectat.";
  optionsContainer.innerHTML = "";
  openEndedContainer.style.display = "none";
  btnCheck.style.display = "none";
  btnReveal.style.display = "none";
  btnNext.style.display = "none";
  explanationBox.style.display = "none";
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// KaTeX Math Rendering Helper
// ==========================================
function renderMath() {
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById("quiz-card"), {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}

// Start app when DOM is ready
document.addEventListener("DOMContentLoaded", init);
