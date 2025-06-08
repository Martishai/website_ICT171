const products = [
  { id: 1, name: 'Apple', price: 2.5, image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg' },
  { id: 2, name: 'Banana', price: 1.8, image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' },
  { id: 3, name: 'Orange', price: 2.2, image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg' },
  { id: 4, name: 'Strawberry', price: 3.0, image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg' },
  { id: 5, name: 'Grape', price: 2.7, image: 'images/raison.jpg' },
  { id: 6, name: 'Carrot', price: 1.5, image: 'images/carotte.jpg' },
  { id: 7, name: 'Tomato', price: 2.0, image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg' },
  { id: 8, name: 'Broccoli', price: 2.8, image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Broccoli_and_cross_section_edit.jpg' },
  { id: 9, name: 'Lettuce', price: 1.9, image: 'images/laitue.jpg' },
  { id: 10, name: 'Peppers', price: 2.3, image: 'images/poivron.jpg' }
];


let cart = [];

function renderProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price.toFixed(2)} AUD</p>
      <button onclick="addToCart(${product.id})">Add</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  const count = document.getElementById('cart-count');

  list.innerHTML = '';
  let sum = 0;

  const groupedItems = {};
  cart.forEach(item => {
    if (!groupedItems[item.id]) {
      groupedItems[item.id] = { ...item, quantity: 1 };
    } else {
      groupedItems[item.id].quantity++;
    }
  });

  Object.values(groupedItems).forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} AUD`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.onclick = () => removeOneFromCart(item.id);
    li.appendChild(removeBtn);

    list.appendChild(li);
    sum += item.price * item.quantity;
  });

  total.textContent = sum.toFixed(2);
  count.textContent = cart.length;
}

function removeOneFromCart(id) {
	const index = cart.findIndex(item => item.id === id);
	if (index !== -1) {
		cart.splice(index, 1);
		updateCart();
	}
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function toggleCart() {
  document.getElementById('cart').classList.toggle('hidden');
}

renderProducts();

