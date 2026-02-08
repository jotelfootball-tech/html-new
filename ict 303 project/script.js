// Sample Data Storage (In a real application, this would be a database)
let items = [
    {
        id: 1,
        type: 'lost',
        itemName: 'iPhone 13 Pro Max',
        category: 'phones',
        description: 'Black iPhone 13 Pro Max with cracked screen protector. Has a blue case with my initials "OA" on the back.',
        date: '2025-01-20',
        time: '14:30',
        location: 'Lagos',
        specificLocation: 'Ikeja City Mall, ground floor near Shoprite',
        posterName: 'Ola Adeyemi',
        email: 'ola.adeyemi@email.com',
        phone: '+234 803 456 7890',
        alternatePhone: '+234 809 123 4567',
        status: 'approved',
        datePosted: '2025-01-21'
    },
    {
        id: 2,
        type: 'found',
        itemName: 'Black Leather Wallet',
        category: 'wallets',
        description: 'Black leather wallet containing some cash and ID cards. Found it on the ground.',
        date: '2025-01-22',
        time: '09:15',
        location: 'Abuja',
        specificLocation: 'Jabi Lake Mall parking lot',
        posterName: 'Chioma Okafor',
        email: 'chioma.o@email.com',
        phone: '+234 807 654 3210',
        alternatePhone: '',
        status: 'approved',
        datePosted: '2025-01-22'
    },
    {
        id: 3,
        type: 'lost',
        itemName: 'Golden Retriever Dog',
        category: 'pets',
        description: 'Male golden retriever, 3 years old. Responds to name "Charlie". Wearing blue collar with tag.',
        date: '2025-01-18',
        time: '18:00',
        location: 'Port Harcourt',
        specificLocation: 'GRA Phase 2, near the golf club',
        posterName: 'Emeka Nwosu',
        email: 'emeka.nwosu@email.com',
        phone: '+234 806 789 0123',
        alternatePhone: '+234 813 456 7890',
        status: 'approved',
        datePosted: '2025-01-19'
    },
    {
        id: 4,
        type: 'found',
        itemName: 'National ID Card',
        category: 'documents',
        description: 'Found a Nigerian National ID card. Keeping details private for verification purposes.',
        date: '2025-01-23',
        time: '12:00',
        location: 'Ibadan',
        specificLocation: 'University of Ibadan, Main Gate',
        posterName: 'Fatima Bello',
        email: 'fatima.b@email.com',
        phone: '+234 805 234 5678',
        alternatePhone: '',
        status: 'approved',
        datePosted: '2025-01-23'
    },
    {
        id: 5,
        type: 'lost',
        itemName: 'HP Laptop',
        category: 'electronics',
        description: 'HP Pavilion laptop, grey color with several stickers on the lid. Contains important work files.',
        date: '2025-01-21',
        time: '16:45',
        location: 'Lagos',
        specificLocation: 'Murtala Muhammed Airport Terminal 2',
        posterName: 'Tunde Bakare',
        email: 'tunde.bakare@email.com',
        phone: '+234 802 345 6789',
        alternatePhone: '',
        status: 'approved',
        datePosted: '2025-01-22'
    },
    {
        id: 6,
        type: 'found',
        itemName: 'Car Keys',
        category: 'keys',
        description: 'Toyota car keys with black leather keychain. Has a small charm attached.',
        date: '2025-01-24',
        time: '10:30',
        location: 'Abuja',
        specificLocation: 'Ceddi Plaza, near entrance',
        posterName: 'Ibrahim Musa',
        email: 'ibrahim.m@email.com',
        phone: '+234 808 765 4321',
        alternatePhone: '+234 812 345 6789',
        status: 'approved',
        datePosted: '2025-01-24'
    }
];

// Statistics
let stats = {
    totalLost: 0,
    totalFound: 0,
    totalReunited: 15
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    
    // Check which page we're on and load appropriate content
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === '' || currentPage === 'index.html') {
        loadRecentItems();
    }
    
    // Set up form submission if on post page
    const postForm = document.getElementById('postItemForm');
    if (postForm) {
        postForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Set max date to today for date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.max = new Date().toISOString().split('T')[0];
    });
});

// Update statistics
function updateStats() {
    stats.totalLost = items.filter(item => item.type === 'lost' && item.status === 'approved').length;
    stats.totalFound = items.filter(item => item.type === 'found' && item.status === 'approved').length;
    
    const totalLostEl = document.getElementById('totalLost');
    const totalFoundEl = document.getElementById('totalFound');
    const totalReunitedEl = document.getElementById('totalReunited');
    
    if (totalLostEl) totalLostEl.textContent = stats.totalLost;
    if (totalFoundEl) totalFoundEl.textContent = stats.totalFound;
    if (totalReunitedEl) totalReunitedEl.textContent = stats.totalReunited;
}

// Load recent items for homepage
function loadRecentItems() {
    const grid = document.getElementById('recentItemsGrid');
    if (!grid) return;
    
    const approvedItems = items.filter(item => item.status === 'approved');
    const recentItems = approvedItems.slice(-6).reverse();
    
    if (recentItems.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No items posted yet. Be the first to post!</p>';
        return;
    }
    
    grid.innerHTML = recentItems.map(item => createItemCard(item)).join('');
}

// Load lost items
function loadLostItems() {
    const grid = document.getElementById('lostItemsGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;
    
    const lostItems = items.filter(item => item.type === 'lost' && item.status === 'approved');
    
    if (lostItems.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = lostItems.map(item => createItemCard(item)).join('');
}

// Load found items
function loadFoundItems() {
    const grid = document.getElementById('foundItemsGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;
    
    const foundItems = items.filter(item => item.type === 'found' && item.status === 'approved');
    
    if (foundItems.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = foundItems.map(item => createItemCard(item)).join('');
}

// Create item card HTML
function createItemCard(item) {
    const badgeClass = item.type === 'lost' ? 'lost' : 'found';
    const badgeText = item.type === 'lost' ? 'Lost' : 'Found';
    
    return `
        <div class="item-card" onclick="viewItemDetails(${item.id})">
            <div class="item-card-header">
                <span class="item-badge ${badgeClass}">${badgeText}</span>
                <span class="item-category">${formatCategory(item.category)}</span>
            </div>
            <h3>${item.itemName}</h3>
            <p>${truncateText(item.description, 100)}</p>
            <div class="item-meta">
                <span>📍 ${item.location}</span>
                <span>📅 ${formatDate(item.date)}</span>
            </div>
        </div>
    `;
}

// Format category name
function formatCategory(category) {
    const categories = {
        'electronics': 'Electronics',
        'documents': 'Documents',
        'pets': 'Pets',
        'jewelry': 'Jewelry',
        'bags': 'Bags & Luggage',
        'keys': 'Keys',
        'phones': 'Mobile Phones',
        'wallets': 'Wallets',
        'others': 'Others'
    };
    return categories[category] || category;
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// View item details
function viewItemDetails(itemId) {
    window.location.href = `details.html?id=${itemId}`;
}

// Load item details page
function loadItemDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id'));
    
    const item = items.find(i => i.id === itemId);
    const detailsCard = document.getElementById('itemDetailsCard');
    const notFound = document.getElementById('itemNotFound');
    
    if (!item || item.status !== 'approved') {
        if (detailsCard) detailsCard.style.display = 'none';
        if (notFound) notFound.style.display = 'block';
        return;
    }
    
    if (notFound) notFound.style.display = 'none';
    if (detailsCard) {
        detailsCard.innerHTML = createItemDetailsHTML(item);
    }
    
    // Load similar items
    loadSimilarItems(item);
}

// Create item details HTML
function createItemDetailsHTML(item) {
    const badgeClass = item.type === 'lost' ? 'lost' : 'found';
    const badgeText = item.type === 'lost' ? 'Lost' : 'Found';
    
    return `
        <div class="item-details-header">
            <div class="item-details-title">
                <h2>${item.itemName}</h2>
                <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                    <span class="item-badge ${badgeClass}">${badgeText}</span>
                    <span class="item-category">${formatCategory(item.category)}</span>
                </div>
            </div>
        </div>
        
        <div class="item-details-info">
            <div class="info-section">
                <h3>Item Information</h3>
                <div class="info-item">
                    <strong>Item Name:</strong>
                    <span>${item.itemName}</span>
                </div>
                <div class="info-item">
                    <strong>Category:</strong>
                    <span>${formatCategory(item.category)}</span>
                </div>
                <div class="info-item">
                    <strong>Description:</strong>
                    <span>${item.description}</span>
                </div>
            </div>
            
            <div class="info-section">
                <h3>Location & Date</h3>
                <div class="info-item">
                    <strong>Date:</strong>
                    <span>${formatDate(item.date)}</span>
                </div>
                ${item.time ? `
                <div class="info-item">
                    <strong>Time:</strong>
                    <span>${item.time}</span>
                </div>
                ` : ''}
                <div class="info-item">
                    <strong>Location:</strong>
                    <span>${item.location}</span>
                </div>
                <div class="info-item">
                    <strong>Specific Location:</strong>
                    <span>${item.specificLocation}</span>
                </div>
            </div>
        </div>
        
        <div class="contact-section">
            <h3>Contact Information</h3>
            <p>If you have information about this item, please contact:</p>
            <div class="info-item">
                <strong>Name:</strong>
                <span>${item.posterName}</span>
            </div>
            <div class="contact-buttons">
                <button class="btn-primary" onclick="contactViaEmail('${item.email}')">
                    📧 Email: ${item.email}
                </button>
                <button class="btn-primary" onclick="contactViaPhone('${item.phone}')">
                    📱 Phone: ${item.phone}
                </button>
                ${item.alternatePhone ? `
                <button class="btn-secondary" onclick="contactViaPhone('${item.alternatePhone}')">
                    📱 Alternate: ${item.alternatePhone}
                </button>
                ` : ''}
            </div>
        </div>
    `;
}

// Load similar items
function loadSimilarItems(currentItem) {
    const grid = document.getElementById('similarItemsGrid');
    if (!grid) return;
    
    const similarItems = items
        .filter(item => 
            item.id !== currentItem.id && 
            item.status === 'approved' &&
            (item.category === currentItem.category || item.location === currentItem.location)
        )
        .slice(0, 3);
    
    if (similarItems.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No similar items found.</p>';
        return;
    }
    
    grid.innerHTML = similarItems.map(item => createItemCard(item)).join('');
}

// Contact via email
function contactViaEmail(email) {
    window.location.href = `mailto:${email}`;
}

// Contact via phone
function contactViaPhone(phone) {
    window.location.href = `tel:${phone}`;
}

// Go back function
function goBack() {
    window.history.back();
}

// Search items
function searchItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    if (!searchInput && !categoryFilter) {
        alert('Please enter a search term or select a category');
        return;
    }
    
    // Store search parameters
    sessionStorage.setItem('searchTerm', searchInput);
    sessionStorage.setItem('searchCategory', categoryFilter);
    
    // Redirect to lost items page with search
    window.location.href = 'lost-items.html';
}

// Filter items
function filterItems() {
    const currentPage = window.location.pathname.split('/').pop();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    let filteredItems = items.filter(item => item.status === 'approved');
    
    // Filter by page type
    if (currentPage === 'lost-items.html') {
        filteredItems = filteredItems.filter(item => item.type === 'lost');
    } else if (currentPage === 'found-items.html') {
        filteredItems = filteredItems.filter(item => item.type === 'found');
    }
    
    // Apply filters
    if (searchInput) {
        filteredItems = filteredItems.filter(item => 
            item.itemName.toLowerCase().includes(searchInput) ||
            item.description.toLowerCase().includes(searchInput) ||
            item.specificLocation.toLowerCase().includes(searchInput)
        );
    }
    
    if (categoryFilter) {
        filteredItems = filteredItems.filter(item => item.category === categoryFilter);
    }
    
    if (locationFilter) {
        filteredItems = filteredItems.filter(item => item.location === locationFilter);
    }
    
    // Display filtered items
    const gridId = currentPage === 'lost-items.html' ? 'lostItemsGrid' : 'foundItemsGrid';
    const grid = document.getElementById(gridId);
    const noResults = document.getElementById('noResults');
    
    if (filteredItems.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
    } else {
        if (noResults) noResults.style.display = 'none';
        grid.innerHTML = filteredItems.map(item => createItemCard(item)).join('');
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const newItem = {
        id: items.length + 1,
        type: formData.get('itemType'),
        itemName: formData.get('itemName'),
        category: formData.get('category'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        specificLocation: formData.get('specificLocation'),
        posterName: formData.get('posterName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        alternatePhone: formData.get('alternatePhone'),
        status: 'pending',
        datePosted: new Date().toISOString().split('T')[0]
    };
    
    // Add to items array
    items.push(newItem);
    
    // Generate reference ID
    const referenceId = `FA${newItem.id.toString().padStart(6, '0')}`;
    
    // Show success modal
    showSuccessModal(referenceId);
}

// Show success modal
function showSuccessModal(referenceId) {
    const modal = document.getElementById('successModal');
    const refIdElement = document.getElementById('referenceId');
    
    if (modal && refIdElement) {
        refIdElement.textContent = referenceId;
        modal.classList.add('active');
        modal.style.display = 'flex';
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
    
    // Reset form and redirect
    const form = document.getElementById('postItemForm');
    if (form) {
        form.reset();
    }
}

// Reset form
function resetForm() {
    const form = document.getElementById('postItemForm');
    if (form && confirm('Are you sure you want to clear all form data?')) {
        form.reset();
    }
}

// Close contact modal
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const successModal = document.getElementById('successModal');
    const contactModal = document.getElementById('contactModal');
    
    if (event.target === successModal) {
        closeModal();
    }
    
    if (event.target === contactModal) {
        closeContactModal();
    }
}

// Admin functions (for future implementation)
function approveItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.status = 'approved';
        updateStats();
        alert('Item approved successfully!');
    }
}

function rejectItem(itemId) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.status = 'rejected';
        alert('Item rejected.');
    }
}

function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        items = items.filter(i => i.id !== itemId);
        updateStats();
        alert('Item deleted successfully!');
        window.location.reload();
    }
}

// Export for debugging (remove in production)
window.debugItems = function() {
    console.log('Current items:', items);
    console.log('Statistics:', stats);
};