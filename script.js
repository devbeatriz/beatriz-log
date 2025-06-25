// Caso precise adicionar outras funcionalidades (ex: dark mode toggle)
document.addEventListener('DOMContentLoaded', function() {
    // Exemplo: Salvar filtro selecionado no localStorage
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedFilter) {
        const filterBtn = document.querySelector(`.filter[data-tag="${savedFilter}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }

    // Atualizar localStorage ao filtrar
    document.querySelectorAll('.filter, .tag').forEach(element => {
        element.addEventListener('click', function() {
            if (this.dataset.tag) {
                localStorage.setItem('selectedFilter', this.dataset.tag);
            }
        });
    });
});