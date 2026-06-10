let allPlaces = [];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    checkAuthentication();

    const filter = document.getElementById('price-filter');

    if (filter) {
        filter.addEventListener('change', filterPlaces);
    }
});

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(
            'http://127.0.0.1:5000/api/v1/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        if (response.ok) {
            const data = await response.json();

            document.cookie =
                `token=${data.access_token}; path=/`;

            window.location.href = 'index.html';
        } else {
            const errorMessage =
                document.getElementById('error-message');

            if (errorMessage) {
                errorMessage.textContent =
                    'Invalid email or password';
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

function checkAuthentication() {
    const token = getCookie('token');

    const loginLink =
        document.getElementById('login-link');

    if (loginLink) {
        if (token) {
            loginLink.style.display = 'none';
        } else {
            loginLink.style.display = 'block';
        }
    }

    fetchPlaces(token);
}

async function fetchPlaces(token) {
    try {
        const headers = {};

        if (token) {
            headers['Authorization'] =
                `Bearer ${token}`;
        }

        const response = await fetch(
            'http://127.0.0.1:5000/api/v1/places',
            {
                method: 'GET',
                headers
            }
        );

        if (!response.ok) {
            return;
        }

        const places = await response.json();

        allPlaces = places;

        displayPlaces(places);
    } catch (error) {
        console.error(error);
    }
}

function displayPlaces(places) {
    const placesList =
        document.getElementById('places-list');

    if (!placesList) {
        return;
    }

    placesList.innerHTML = '';

    places.forEach(place => {
        const card = document.createElement('div');

        card.className = 'place-card';

        card.innerHTML = `
            <h2>${place.title || place.name}</h2>
            <p>${place.description || ''}</p>
            <p>Price: $${place.price}</p>
            <a href="place.html?id=${place.id}"
               class="details-button">
               View Details
            </a>
        `;

        placesList.appendChild(card);
    });
}

function filterPlaces(event) {
    const value = event.target.value;

    if (value === 'all') {
        displayPlaces(allPlaces);
        return;
    }

    const filteredPlaces = allPlaces.filter(place =>
        Number(place.price) <= Number(value)
    );

    displayPlaces(filteredPlaces);
}
function getPlaceIdFromURL() {
    const params = new URLSearchParams(
        window.location.search
    );

    return params.get('id');
}

async function fetchPlaceDetails(token, placeId) {
    try {
        const headers = {};

        if (token) {
            headers['Authorization'] =
                `Bearer ${token}`;
        }

        const response = await fetch(
            `http://127.0.0.1:5000/api/v1/places/${placeId}`,
            {
                method: 'GET',
                headers
            }
        );

        if (!response.ok) {
            return;
        }

        const place = await response.json();

        displayPlaceDetails(place);

    } catch (error) {
        console.error(error);
    }
}

function displayPlaceDetails(place) {
    const section =
        document.getElementById('place-details');

    if (!section) {
        return;
    }

    section.innerHTML = '';

    const amenities =
        place.amenities
            ? place.amenities.join(', ')
            : '';

    let reviewsHTML = '';

    if (place.reviews) {
        place.reviews.forEach(review => {
            reviewsHTML += `
                <div class="review-card">
                    <p>${review.text || review.comment}</p>
                    <p>Rating:
                    ${review.rating}</p>
                </div>
            `;
        });
    }

    section.innerHTML = `
        <div class="place-details">

            <h1>${place.name}</h1>

            <div class="place-info">
                <p>${place.description || ''}</p>

                <p>
                    Price:
                    $${place.price}
                </p>

                <p>
                    Amenities:
                    ${amenities}
                </p>
            </div>

            <h2>Reviews</h2>

            ${reviewsHTML}

        </div>
    `;
}

function initializePlacePage() {
    const detailsSection =
        document.getElementById('place-details');

    if (!detailsSection) {
        return;
    }

    const token = getCookie('token');

    const addReviewSection =
        document.getElementById('add-review');

    if (token) {
        addReviewSection.style.display = 'block';
    } else {
        addReviewSection.style.display = 'none';
    }

    const placeId = getPlaceIdFromURL();

    if (placeId) {
        fetchPlaceDetails(token, placeId);
    }
}

document.addEventListener(
    'DOMContentLoaded',
    initializePlacePage
);
function checkReviewAuthentication() {
    const token = getCookie('token');

    if (!token) {
        window.location.href = 'index.html';
        return null;
    }

    return token;
}

async function submitReview(
    token,
    placeId,
    reviewText
) {
    try {
        const response = await fetch(
            'http://127.0.0.1:5000/api/v1/reviews',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':
                        `Bearer ${token}`
                },
                body: JSON.stringify({
                    place_id: placeId,
                    text: reviewText
                })
            }
        );

        if (response.ok) {
            alert('Review submitted successfully!');

            document
                .getElementById('review-form')
                .reset();
        } else {
            alert('Failed to submit review');
        }

    } catch (error) {
        console.error(error);
        alert('Failed to submit review');
    }
}

function initializeReviewPage() {
    const reviewForm =
        document.getElementById('review-form');

    if (!reviewForm) {
        return;
    }

    const token =
        checkReviewAuthentication();

    const placeId =
        getPlaceIdFromURL();

    reviewForm.addEventListener(
        'submit',
        async (event) => {
            event.preventDefault();

            const reviewText =
                document.getElementById(
                    'review-text'
                ).value;

            await submitReview(
                token,
                placeId,
                reviewText
            );
        }
    );
}

document.addEventListener(
    'DOMContentLoaded',
    initializeReviewPage
);