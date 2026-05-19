import { getProducts } from './api.js';

const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');

let allMenus = [];

async function loadProducts() {

  try {

    // LOADING
    productContainer.innerHTML = `
      <div style="
        width:100%;
        text-align:center;
        padding:50px;
        color:#ffbe33;
        font-size:22px;
      ">
        <i class="fa fa-spinner fa-spin"></i>
        Loading delicious menu...
      </div>
    `;

    const products = await getProducts();

    // DATA CUSTOM
    const foodNames = [
      "Cheese Burger",
      "Pepperoni Pizza",
      "Spaghetti Special",
      "French Fries",
      "Chicken Burger",
      "Hot Pizza",
      "Italian Pasta",
      "Double Burger"
    ];

    const foodDescriptions = [
      "Burger lezat dengan daging premium dan keju mozzarella.",
      "Pizza hangat dengan topping pepperoni spesial.",
      "Pasta creamy dengan saus khas Italia.",
      "Kentang goreng crispy favorit pelanggan.",
      "Burger ayam renyah dengan saus spesial.",
      "Pizza panas dengan keju melimpah.",
      "Pasta Italia dengan rasa autentik.",
      "Burger double beef super juicy."
    ];

    const foodPrices = [
      "$12",
      "$15",
      "$10",
      "$8",
      "$11",
      "$16",
      "$13",
      "$18"
    ];

    const foodImages = [
      "images/f1.png",
      "images/f2.png",
      "images/f3.png",
      "images/f4.png",
      "images/f5.png",
      "images/f6.png",
      "images/f7.png",
      "images/f8.png"
    ];

    // LOOP PRODUK
    allMenus = products.slice(0, 8).map((product, index) => {

      return {
        title: foodNames[index],
        description: foodDescriptions[index],
        price: foodPrices[index],
        image: foodImages[index]
      };

    });

    renderProducts(allMenus);

  } catch (error) {

    productContainer.innerHTML = `
      <h2 style="
        color:red;
        text-align:center;
        width:100%;
        padding:50px;
      ">
        Gagal mengambil data API
      </h2>
    `;
  }
}

// RENDER
function renderProducts(products) {

  if(products.length === 0) {

    productContainer.innerHTML = `
      <h3 style="
        width:100%;
        text-align:center;
        padding:40px;
      ">
        Menu tidak ditemukan
      </h3>
    `;

    return;
  }

  productContainer.innerHTML = products.map(product => `

    <div class="col-sm-6 col-lg-4">

      <div class="box" style="
        margin-bottom:30px;
        border-radius:20px;
        overflow:hidden;
      ">

        <div class="img-box" style="
          background:#f1f2f3;
          height:250px;
          display:flex;
          justify-content:center;
          align-items:center;
        ">

          <img 
            src="${product.image}" 
            alt="${product.title}"
            style="
              width:170px;
              height:170px;
              object-fit:contain;
            "
          >

        </div>

        <div class="detail-box">

          <h5>${product.title}</h5>

          <p>${product.description}</p>

          <div class="options">

            <h6>${product.price}</h6>

            <a href="#">
              <i class="fa fa-shopping-cart"></i>
            </a>

          </div>

          <div style="
            margin-top:10px;
            color:gold;
            font-size:18px;
          ">
            ★★★★★
          </div>

        </div>

      </div>

    </div>

  `).join('');
}

// SEARCH
searchInput.addEventListener('keyup', (e) => {

  const keyword = e.target.value.toLowerCase();

  const filteredMenus = allMenus.filter(menu =>
    menu.title.toLowerCase().includes(keyword)
  );

  renderProducts(filteredMenus);

});

// LOAD
loadProducts();