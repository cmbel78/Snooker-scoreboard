// Read-only presentation of existing logs. Never modifies scoreboard state or storage.
(() => {
  function renderHeadToHead() {
    const panel = document.getElementById('headToHead');
    if (!panel) return;
    const names = [1, 2].map(p => (document.querySelector('.name[data-player="' + p + '"]')?.textContent || 'Player ' + p).trim());
    let logs = [];
    try { const parsed = JSON.parse(localStorage.getItem('snookerLogs') || '[]'); if (Array.isArray(parsed)) logs = parsed; } catch (_) {}
    const games = names[0] !== names[1] ? logs.filter(r => r && r.p1 && r.p2 &&
      ((r.p1.name === names[0] && r.p2.name === names[1]) || (r.p1.name === names[1] && r.p2.name === names[0])))
      .sort((a, b) => (Date.parse(b.endedAt || b.id) || 0) - (Date.parse(a.endedAt || a.id) || 0)).slice(0, 5) : [];
    const heading = document.createElement('summary'); heading.className = 'h2hHeader';
    const title = document.createElement('span'); title.className = 'h2hTitle'; title.textContent = 'Head to head · Last 5 frames'; heading.append(title);
    const wins = [0, 0]; let ties = 0;
    const cards = document.createElement('div'); cards.className = 'h2hGames';
    games.forEach(r => {
      const players = r.p1.name === names[0] ? [r.p1, r.p2] : [r.p2, r.p1];
      const scores = players.map(p => Number(p.score) || 0);
      const winner = scores[0] === scores[1] ? -1 : scores[0] > scores[1] ? 0 : 1;
      if (winner < 0) ties++; else wins[winner]++;
      const card = document.createElement('div'); card.className = 'h2hGame';
      const score = document.createElement('strong'); score.textContent = scores.join(' – ');
      const won = document.createElement('span'); won.className = 'h2hWinner'; won.textContent = winner < 0 ? 'Draw' : names[winner] + ' won';
      const date = document.createElement('span'); const when = new Date(r.endedAt || r.id);
      date.textContent = Number.isNaN(when.getTime()) ? 'Logged frame' : when.toLocaleDateString([], {day:'numeric',month:'short'});
      card.append(score, won, date); cards.append(card);
    });
    const summary = document.createElement('span'); summary.className = 'h2hSummary';
    summary.textContent = games.length ? names[0] + ' ' + wins[0] + ' – ' + wins[1] + ' ' + names[1] + (ties ? ' · ' + ties + ' drawn' : '') : names.join(' vs ');
    heading.append(summary); panel.replaceChildren(heading);
    if (games.length) panel.append(cards);
    else { const empty = document.createElement('p'); empty.className = 'h2hEmpty'; empty.textContent = names[0] === names[1] ? 'Use distinct player names to see their head-to-head record.' : 'No logged frames between these players yet. Saved results will appear here.'; panel.append(empty); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    renderHeadToHead();
    document.querySelectorAll('.name[data-player]').forEach(el => el.addEventListener('blur', renderHeadToHead));
    document.getElementById('confirmLog')?.addEventListener('click', renderHeadToHead);
    window.addEventListener('storage', renderHeadToHead);
    window.addEventListener('pageshow', renderHeadToHead);
  });
})();
