document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/posts');
        const posts = await response.json();
        
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="text-center">Brak postów do wyświetlenia.</p>';
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'col-md-6 mb-4';
            postElement.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content.substring(0, 100)}...</p>
                        <a href="post.html?id=${post.id}" class="btn btn-primary">Czytaj więcej</a>
                    </div>
                    <div class="card-footer text-muted">
                        ${new Date(post.created_at).toLocaleDateString()}
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
        document.getElementById('posts-container').innerHTML = `
            <div class="alert alert-danger">Wystąpił błąd podczas ładowania postów. Spróbuj ponownie później.</div>
        `;
    }
});