let currentPage = 1;
let currentQuery = '';
let searchResults = [];
let totalResults = 0;
let itemsPerPage = 10;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const favoritesList = document.getElementById('favorites');
const paginationDiv = document.getElementById('pagination');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return alert('Please enter a movie title.');
    currentQuery = query;
    currentPage = 1;
    fetchMovies();
});

itemsPerPageSelect.addEventListener('change', () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value, 10);
    currentPage = 1;
    fetchMovies();
});

document.getElementById('resultsSort').addEventListener('change', displaySearchResults);

function fetchMovies() {
    const apiUrl = `/backend/api.php?query=${encodeURIComponent(currentQuery)}&page=${currentPage}&itemsPerPage=${itemsPerPage}`;
    loadingDiv.classList.remove('d-none');

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            loadingDiv.classList.add('d-none');
            searchResults = data.results || [];
            totalResults = data.total_results || 0;
            const totalPages = Math.ceil(totalResults / itemsPerPage);

            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
                fetchMovies();
                return;
            }

            if (searchResults.length === 0) {
                resultsDiv.innerHTML = '<p class="text-center mt-3">No results found.</p>';
                paginationDiv.classList.add('d-none');
            } else {
                displaySearchResults();
                setupPagination(totalPages);
            }
        })
        .catch(() => {
            loadingDiv.classList.add('d-none');
            alert('Error fetching movies.');
        });
}

function displaySearchResults() {
    resultsDiv.innerHTML = '';
    const sortOption = document.getElementById('resultsSort').value;
    const sortedResults = [...searchResults].sort((a, b) => sortOption === 'title' ? 
        a.title.localeCompare(b.title) : 
        new Date(a.release_date || 0) - new Date(b.release_date || 0));

    sortedResults.forEach(movie => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);
        const movieElement = document.createElement('div');
        movieElement.classList.add('card', 'mb-3');
        movieElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placekitten.com/200/300'}"
                         class="img-fluid rounded-start" alt="${movie.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title} (${movie.release_date?.split('-')[0] || 'N/A'})</h5>
                        <button class="btn btn-primary btn-sm" onclick="fetchMovieDetails(${movie.id})">More Details</button>
                        <button class="btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} btn-sm" 
                                onclick="toggleFavorite(${JSON.stringify(movie).replace(/"/g, '&quot;')})">${isFavorite ? '★' : '☆'}</button>
                    </div>
                </div>
            </div>`;
        resultsDiv.appendChild(movieElement);
    });
}

function setupPagination(totalPages) {
    paginationDiv.innerHTML = '';
    if (totalPages <= 1) return paginationDiv.classList.add('d-none');
    
    paginationDiv.classList.remove('d-none');
    const createButton = (text, page) => {
        const button = document.createElement('button');
        button.className = `btn mx-1 rounded-pill ${page === currentPage ? 'btn-primary text-white' : 'btn-outline-primary'}`;
        button.textContent = text;
        button.disabled = page === currentPage;
        button.addEventListener('click', () => {
            currentPage = page;
            fetchMovies();
        });
        return button;
    };

    if (currentPage > 1) paginationDiv.appendChild(createButton('Previous', currentPage - 1));
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
        endPage = Math.min(totalPages, startPage + 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationDiv.appendChild(createButton(i, i));
    }

    if (currentPage < totalPages) paginationDiv.appendChild(createButton('Next', currentPage + 1));
}

function fetchMovieDetails(id) {
    fetch(`/backend/api.php?details=true&id=${id}`)
        .then(res => res.json())
        .then(data => {
            const modal = new bootstrap.Modal(document.getElementById('movieModal'));
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalOverview').textContent = data.overview;
            document.getElementById('modalRating').textContent = data.vote_average || 'N/A';
            document.getElementById('modalGenres').textContent = data.genres?.map(g => g.name).join(', ') || 'N/A';
            document.getElementById('modalRuntime').textContent = data.runtime ? `${data.runtime} mins` : 'N/A';
            modal.show();
        })
        .catch(() => alert('Error fetching movie details.'));
}

function toggleFavorite(movie) {
    const index = favorites.findIndex(fav => fav.id === movie.id);
    if (index === -1) {
        favorites.push(movie);
        toastr.success(`${movie.title} has been added to favorites!`);
    } else {
        favorites.splice(index, 1);
        toastr.info(`${movie.title} has been removed from favorites.`);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    displaySearchResults();
}


function renderFavorites() {
    favoritesList.innerHTML = favorites.map(movie => 
        `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${movie.title} (${movie.release_date?.split('-')[0] || 'N/A'})
            <button class="btn btn-danger btn-sm" onclick="toggleFavorite(${JSON.stringify(movie).replace(/"/g, '&quot;')})"
>×</button>
        </li>`
    ).join('');
}

renderFavorites();