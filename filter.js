document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('.post-item');
    const dynamicFiltersContainer = document.querySelector('.dynamic-filters');
    const fixedTags = ['linux', 'zabbix', 'grafana']; // Tags fixas

    // 1. Coletar tags dinâmicas (excluindo fixas)
    const allDynamicTags = new Set();
    posts.forEach(post => {
        const tags = post.getAttribute('data-tags').split(' ');
        tags.forEach(tag => {
            if (!fixedTags.includes(tag) && tag.trim() !== '') {
                allDynamicTags.add(tag);
            }
        });
    });

    // 2. Criar botões para tags dinâmicas
    allDynamicTags.forEach(tag => {
        const filterBtn = document.createElement('button');
        filterBtn.className = 'filter';
        filterBtn.dataset.tag = tag;
        filterBtn.textContent = `#${tag}`;
        dynamicFiltersContainer.appendChild(filterBtn);
    });

    // 3. Adicionar eventos de clique aos filtros (fixos + dinâmicos)
    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('click', function() {
            filterPosts(this.dataset.tag);
            updateActiveFilter(this);
        });
    });

    // 4. Tornar tags dentro dos posts clicáveis
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagName = this.dataset.tag;
            filterPosts(tagName);
            
            // Atualiza o filtro ativo correspondente
            const correspondingFilter = document.querySelector(`.filter[data-tag="${tagName}"]`);
            if (correspondingFilter) {
                updateActiveFilter(correspondingFilter);
            }
        });
    });

    // Função para filtrar posts
    function filterPosts(selectedTag) {
        posts.forEach(post => {
            const postTags = post.getAttribute('data-tags').split(' ');
            const shouldShow = selectedTag === 'all' || postTags.includes(selectedTag);
            post.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Função para atualizar o filtro ativo
    function updateActiveFilter(activeElement) {
        document.querySelectorAll('.filter').forEach(btn => {
            btn.classList.remove('active');
        });
        activeElement.classList.add('active');
    }
});