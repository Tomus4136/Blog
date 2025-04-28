document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error('Post nie został znaleziony');
        }
        
        const post = await response.json();
        
        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = `
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title">${post.title}</h1>
                        <p class="card-text">${post.content}</p>
                    </div>
                    <div class="card-footer text-muted">
                        Opublikowano: ${new Date(post.created_at).toLocaleDateString()}
                    </div>
                </div>
                <div class="mt-3">
                    <a href="index.html" class="btn btn-primary">Powrót do listy postów</a>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Błąd podczas pobierania postu:', error);
        document.getElementById('post-container').innerHTML = `
            <div class="col-lg-8">
                <div class="alert alert-danger">${error.message}</div>
                <a href="index.html" class="btn btn-primary">Powrót do listy postów</a>
            </div>
        `;
    }
});