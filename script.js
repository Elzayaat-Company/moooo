let allProducts = [];

// تحميل المنتجات من ملف JSON محلي (أو يمكنك استبداله بـ API لاحقاً)
async function loadProducts() {
  const response = await fetch('data/products.json');
  allProducts = await response.json();
  renderProducts(allProducts);
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <img src="${product.image || 'assets/placeholder.jpg'}" 
           class="product-img" 
           onclick="openLightbox('${product.image}')">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-category">${product.category} - ${product.subcategory}</p>
      <p class="product-desc">${product.description.substring(0, 100)}...</p>
      <button class="btn" onclick="viewDetails(${product.id})">عرض التفاصيل</button>
    `;
    
    grid.appendChild(card);
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('liveSearch').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  let filtered = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                          p.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || p.categoryKey === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function filterByCategory(catKey) {
  document.getElementById('categoryFilter').value = catKey;
  filterProducts();
}

function sortProducts() {
  const sortBy = document.getElementById('sortFilter').value;
  let sorted = [...allProducts];

  if (sortBy === 'popular') {
    sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sortBy === 'newest') {
    sorted.sort((a, b) => b.id - a.id); // افتراض أن ID الأكبر هو الأحدث
  }

  renderProducts(sorted);
}

function openLightbox(imgSrc) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = imgSrc;
  lightbox.style.display = 'block';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function viewDetails(productId) {
  alert(`عرض تفاصيل المنتج رقم: ${productId}\n(يمكنك هنا فتح صفحة منفصلة أو modal مفصل)`);
}

function toggleMenu() {
  document.getElementById('menuList').classList.toggle('active');
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadProducts);