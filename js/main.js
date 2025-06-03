// Check if user is logged in
const loggedUser = localStorage.getItem('loggedInUser');
const userRole = localStorage.getItem('userRole');

if (!loggedUser) {
    window.location.href = 'login.html';
}

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
});

const sidebar = document.getElementById('sidebar');
const cardsContainer = document.getElementById('cardsContainer');
const addForceMajeureSection = document.getElementById('addForceMajeureSection');
const addForm = document.getElementById('addForm');

let currentCategory = null;

// Show add form only for owner
if (userRole === 'owner') {
    addForceMajeureSection.classList.remove('hidden');
} else {
    addForceMajeureSection.classList.add('hidden');
}

// Get unique big categories from forceData
function getBigCategories() {
    const categories = window.forceData.map(item => item.bigCategory);
    return [...new Set(categories)];
}

// Render sidebar categories
function renderSidebar() {
    sidebar.innerHTML = '<h3 class="sidebar-title1">Categories</h3>';
    const bigCategories = getBigCategories();
    const div1 = document.createElement('div');
    div1.textContent = 'List of force majeure';
    div1.className = 'majeure';
    sidebar.appendChild(div1);

    bigCategories.forEach(category => {
        const div = document.createElement('li');
        div.textContent = category;
        div.className = 'category-item';
        if (category === currentCategory) div.classList.add('active');
        div.addEventListener('click', () => {
            currentCategory = category;
            renderSidebar();
            renderCards();
        });
        sidebar.appendChild(div);
    });

    const div2 = document.createElement('div');
    div2.textContent = 'Procedure  contracts';
    div2.className = 'majeure';
    sidebar.appendChild(div2);

    const div3 = document.createElement('div');
    div3.textContent = 'Force majeure notice';
    div3.className = 'majeure';
    sidebar.appendChild(div3);

    const div4 = document.createElement('div');
    div4.textContent = 'Legal regulations';
    div4.className = 'majeure';
    sidebar.appendChild(div4);

    const div5 = document.createElement('div');
    div5.textContent = 'Authorities';
    div5.className = 'majeure';
    sidebar.appendChild(div5);

    const div6 = document.createElement('div');
    div6.textContent = 'Analytics and Statistics';
    div6.className = 'majeure';
    sidebar.appendChild(div6);

    const div7 = document.createElement('div');
    div7.textContent = 'Technical Support';
    div7.className = 'majeure';
    sidebar.appendChild(div7);

    const div8 = document.createElement('div');
    div8.textContent = 'Security Policies';
    div8.className = 'majeure';
    sidebar.appendChild(div8);


    // Add "All" category on top
    // const allDiv = document.createElement('div');
    // allDiv.textContent = '';
    // allDiv.className = 'category-item';
    // if (!currentCategory) allDiv.classList.add('active');
    // allDiv.addEventListener('click', () => {
    //     currentCategory = null;
    //     renderSidebar();
    //     renderCards();
    // });
    // sidebar.insertBefore(allDiv, sidebar.firstChild);
}

// Render cards according to currentCategory
function renderCards() {
    cardsContainer.innerHTML = '';

    let filteredData = window.forceData;
    if (currentCategory) {
        filteredData = filteredData.filter(item => item.bigCategory === currentCategory);
    }

    if (filteredData.length === 0) {
        cardsContainer.innerHTML = '<p>No force majeure found in this category.</p>';
        return;
    }

    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x160?text=No+Image';" />
      <div class="card-content">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-description">${item.description}</p>
        <div class="card-category">${item.category}</div>
      </div>
    `;

        cardsContainer.appendChild(card);
    });
}

// Add new force majeure event (only for owner)
addForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fmName').value.trim();
    const img = document.getElementById('fmImg').value.trim();
    const description = document.getElementById('fmDescription').value.trim();
    const category = document.getElementById('fmCategory').value.trim();
    const bigCategory = document.getElementById('fmBigCategory').value.trim();

    if (!name || !img || !description || !category || !bigCategory) return;

    const newFM = { name, img, description, category, bigCategory };
    window.forceData.push(newFM);

    // Reset form
    addForm.reset();

    // Refresh UI
    renderSidebar();
    renderCards();
});

// Initial render
renderSidebar();
renderCards();
