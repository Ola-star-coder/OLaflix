'use strict'

import { imageBaseURL } from "./api.js"

/**
 * Movie card
 */

export function createMovieCard(movie){

  const {
    poster_path,
    title,
    vote_average,
    release_date,
    id
  } = movie;


  const card = document.createElement('div');
  card.classList.add('movie-card');

  const _bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const isBookmarked = _bookmarks.some(m => Number(m.id) === Number(id));

  card.innerHTML = `
   <figure class="poster-box card-banner">

    <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
    </figure>

   <h4 class="title">${title}</h4>

   <div class="meta-list">
    <div class="meta-item">
      <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="rating">

      <span class="span">${vote_average.toFixed(1)}</span>
    </div>

    <div class="card-badge">${release_date.split('-')[0]}</div>
   </div>

   <a href="./detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
   
 <!-- Bookmark button: clearer icon and label, reflects saved state -->
  <button class="${isBookmarked ? 'bookmark-btn bookmarked' : 'bookmark-btn'}"
        data-bookmark-id="${id}"
        onclick="toggleBookmark(${id}, '${encodeURIComponent(JSON.stringify({ id, poster_path, title, vote_average, release_date }))}')"
        title="${isBookmarked ? 'Remove from Library' : 'Add to Library'}">
  ${isBookmarked
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/></svg><span class="bookmark-text">Bookmarked</span>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/></svg><span class="bookmark-text">Bookmark</span>'}
  </button>
</div>
`;

  return card;
}