document.addEventListener('DOMContentLoaded', () => {
    const availableContainer = document.getElementById('availableMoviesContainer');
    const favoriteContainer = document.getElementById('favoriteMoviesContainer');
    const loadingMsg = document.getElementById('loadingAvailableMovies');
    const errorMsg = document.getElementById('errorAvailableMovies');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    let favorites = [];

   const mockMovies = [
    { id: 1, title: 'Inception', poster: 'https://i.pinimg.com/736x/43/9a/1c/439a1c4583a953c26b63d08a1d832f53.jpg' },
    { id: 2, title: 'Interstellar', poster: 'https://i.pinimg.com/736x/0b/34/ce/0b34ce2145b475247577a5d438a199b0.jpg' },
    { id: 3, title: 'The Dark Knight', poster: 'https://i.pinimg.com/736x/cd/01/da/cd01da13e987da625780ce1daa59b7aa.jpg' },
    { id: 4, title: 'Avatar', poster: 'https://i.pinimg.com/736x/85/8e/b8/858eb8b11420441e14ee961ac226a7f1.jpg' },
    { id: 5, title: 'Titanic', poster: 'https://i.pinimg.com/736x/44/55/d9/4455d96357fb041d1cf3c8a5264ed593.jpg' },
    { id: 6, title: 'Avengers: Endgame', poster: 'https://i.pinimg.com/736x/95/26/68/9526684fe11e38cf6bb6fbd48e37de6a.jpg' },
    { id: 7, title: 'The Matrix', poster: 'https://i.pinimg.com/736x/ed/45/16/ed4516338fa5df348c13a2a7ce1e7998.jpg' },
    { id: 8, title: 'Spider-Man: No Way Home', poster: 'https://i.pinimg.com/736x/9d/b4/53/9db4539ab26481420543203f5978ffff.jpg' },
    { id: 9, title: 'Toy Story', poster: 'https://i.pinimg.com/736x/8e/bd/48/8ebd48f66f760c1066bb7f82204d8866.jpg' },
    { id: 10, title: 'Frozen', poster: 'https://i.pinimg.com/736x/a3/eb/f3/a3ebf3feaf61fcffa4d40092cc421759.jpg' }
];


    function getMovies() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockMovies), 1000);
        });
    }

    function getSynopsis(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Sinopsis de la película con ID ${id}`);
            }, 500);
        });
    }

    function getCast(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Reparto: Actor A, Actor B (película ${id})`);
            }, 700);
        });
    }


    function showMovies(movies) {
        availableContainer.innerHTML = '';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="fav-btn">⭐ Favorito</button>
            `;
            card.querySelector('.fav-btn').addEventListener('click', () => addToFavorites(movie));
            availableContainer.appendChild(card);
        });
    }

    function addToFavorites(movie) {
        if (!favorites.find(f => f.id === movie.id)) {
            favorites.push(movie);
            updateFavorites();
        }

        Promise.all([
            getSynopsis(movie.id),
            getCast(movie.id),
            getReviews(movie.id)
        ])
        .then(([synopsis, cast, reviews]) => {
            console.log(`🎬 ${movie.title}`);
            console.log("📖 Sinopsis:", synopsis);
            console.log("🎭 Reparto:", cast);
            console.log("📝 Críticas:");
            reviews.forEach(r => console.log("- " + r));
        })
        .catch(err => {
            console.error("Error al obtener detalles:", err);
        });
    }

    function removeFromFavorites(id) {
        favorites = favorites.filter(f => f.id !== id);
        updateFavorites();
    }

    function updateFavorites() {
        favoriteContainer.innerHTML = '';
        if (favorites.length === 0) {
            noFavoritesMessage.classList.remove('hidden');
            return;
        }

        noFavoritesMessage.classList.add('hidden');

        favorites.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="remove-btn">❌ Quitar</button>
            `;
            card.querySelector('.remove-btn').addEventListener('click', () => removeFromFavorites(movie.id));
            favoriteContainer.appendChild(card);
        });
    }

    getMovies()
        .then(movies => {
            loadingMsg.classList.add('hidden');
            showMovies(movies);
        })
        .catch(() => {
            loadingMsg.classList.add('hidden');
            errorMsg.textContent = 'No se pudieron cargar las películas.';
            errorMsg.classList.remove('hidden');
        });
});
