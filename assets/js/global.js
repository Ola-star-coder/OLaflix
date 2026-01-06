'use strict'

/**
 * add event on some elements
*/

const addEventOnElements = function (elements, eventType, callback){
    for (const elem of elements) elem.addEventListener(eventType, callback);
}

/**
 * Toggle search button for mobile phones
 */

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");


addEventOnElements(searchTogglers, 'click', function () {
  searchBox.classList.toggle('active');
});




// For storing movie id to local storage

const getMovieDetail = function(movieId){
  window.localStorage.setItem('movieId', String(movieId))
}

const getMovieList = function(urlParam, genreName){
  window.localStorage.setItem('urlParam', urlParam);
   window.localStorage.setItem('genreName', genreName);
}

const showBookmarks = function(){
  window.localStorage.setItem('urlParam', '__BOOKMARKS__');
  window.localStorage.setItem('genreName', 'Bookmarks');
  window.location.href = './movie-list.html';
}

window.showBookmarks = showBookmarks;

window.toggleBookmark = function(movieId, movieDataEncoded){
  const movie = JSON.parse(decodeURIComponent(movieDataEncoded));
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const idx = bookmarks.findIndex(m => Number(m.id) === Number(movieId));
  const willBeBookmarked = idx === -1;

  if (willBeBookmarked) {
    bookmarks.push(movie);
  } else {
    bookmarks.splice(idx, 1);
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  const btn = document.querySelector(`.bookmark-btn[data-bookmark-id="${movieId}"]`);
  if (btn) {
    btn.classList.toggle('bookmarked', willBeBookmarked);
    btn.setAttribute('title', willBeBookmarked ? 'Remove from Library' : 'Add to Library');
    const textEl = btn.querySelector('.bookmark-text');
    if (textEl) textEl.textContent = willBeBookmarked ? 'Bookmarked' : 'Bookmark';

    const svg = btn.querySelector('svg');
    if (svg) {
      svg.innerHTML = willBeBookmarked ? '<path fill="currentColor" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/>' : '<path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/>';
    }

    if (!willBeBookmarked && window.localStorage.getItem('urlParam') === '__BOOKMARKS__') {
      const card = btn.closest('.movie-card');
      if (card) card.remove();

      const grid = document.querySelector('.movie-list.genre-list .grid-list');
      if (grid && grid.children.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'empty-bookmarks';
        emptyMsg.textContent = 'No bookmarked movies yet nigga. Use the bookmard button to add movies to your library.';
        grid.parentElement.appendChild(emptyMsg);
      }
    }
  }
};

