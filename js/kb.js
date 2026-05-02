import { KB_ARTICLES } from './data/kb-articles.js';

export function initKB() {
    const openKbBtn         = document.getElementById('open-knowledge-base-btn');
    const closeKbBtn        = document.getElementById('close-knowledge-base-btn');
    const kbView            = document.getElementById('knowledge-base-view');
    const kbArticleView     = document.getElementById('kb-article-view');
    const closeKbArticleBtn = document.getElementById('close-kb-article-btn');
    const kbArticleTitle    = document.getElementById('kb-article-title');
    const kbArticleHero     = document.getElementById('kb-article-hero');
    const kbArticleHeroEmoji = document.getElementById('kb-article-hero-emoji');
    const kbQuestionsList   = document.getElementById('kb-questions-list');
    const kbQuestionView    = document.getElementById('kb-question-view');
    const closeKbQuestionBtn = document.getElementById('close-kb-question-btn');
    const kbQuestionTitle   = document.getElementById('kb-question-title');
    const kbQuestionBody    = document.getElementById('kb-question-body');

    if (openKbBtn)         openKbBtn.addEventListener('click', () => kbView.classList.add('active'));
    if (closeKbBtn)        closeKbBtn.addEventListener('click', () => kbView.classList.remove('active'));
    if (closeKbArticleBtn) closeKbArticleBtn.addEventListener('click', () => kbArticleView.classList.remove('active'));
    if (closeKbQuestionBtn) closeKbQuestionBtn.addEventListener('click', () => kbQuestionView.classList.remove('active'));

    document.querySelectorAll('.kb-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const articleKey = btn.dataset.article;
            const article = KB_ARTICLES[articleKey];
            if (!article) return;

            kbArticleHero.style.background = article.hero.bg;
            kbArticleHeroEmoji.textContent  = article.hero.emoji;
            kbArticleTitle.textContent      = article.title;

            kbQuestionsList.innerHTML = article.questions.map((item, i) => `
                <button class="kb-item kb-q-item" data-article="${articleKey}" data-qi="${i}">
                    <span class="kb-title">${item.q}</span>
                    <svg class="kb-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            `).join('');

            kbQuestionsList.querySelectorAll('.kb-q-item').forEach(qBtn => {
                qBtn.addEventListener('click', () => {
                    const qi = parseInt(qBtn.dataset.qi);
                    const q  = article.questions[qi];
                    kbQuestionTitle.textContent = q.q;
                    kbQuestionBody.innerHTML    = `<div class="kb-answer">${q.a}</div>`;
                    kbQuestionView.classList.add('active');
                });
            });

            kbArticleView.classList.add('active');
        });
    });
}
