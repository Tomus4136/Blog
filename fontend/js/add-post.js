document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const messageDiv = document.getElementById('message');
    
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas dodawania postu');
            }
            
            const data = await response.json();
            
            messageDiv.innerHTML = `
                <div class="alert alert-success">
                    Post został pomyślnie dodany!
                    <a href="post.html?id=${data.id}" class="alert-link">Zobacz post</a>
                </div>
            `;
            
            postForm.reset();
        } catch (error) {
            console.error('Błąd:', error);
            messageDiv.innerHTML = `
                <div class="alert alert-danger">
                    ${error.message}
                </div>
            `;
        }
    });
});