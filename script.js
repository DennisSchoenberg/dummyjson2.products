const productList = document.querySelector('#productsList');
const formItems = document.querySelector("#formItems");
const loader = document.querySelector("#loader");

formItems.addEventListener('submit', e => {
    e.preventDefault();
    const amount = e.target.amount.value;

    e.target.amount.value = "";

    while (productList.firstChild) {
        productList.removeChild(productList.firstChild);
    }
    loader.classList.remove("loader-hide");

    setTimeout(() => {
        getProducts(amount);
    }, 3000);
});

async function getProducts(amount_products) {
    try {
        const res = await fetch(`https://dummyjson.com/products?limit=${amount_products}`);
        const data = await res.json();
        loader.classList.add("loader-hide");

        data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('productCard');

            const cardTitle = document.createElement('h4');
            cardTitle.textContent = product.title;

            const separator = document.createElement('hr'); // Добавляем разделительную линию

            const cardImage = document.createElement('img');
            cardImage.src = product.images[0];
            cardImage.classList.add('cardImage');

            productCard.append(cardTitle);
            productCard.append(separator); // Вставляем линию после названия
            productCard.append(cardImage);

            product.images.forEach(el => {
                const newImage = document.createElement('img');
                newImage.src = el;
                productCard.append(newImage);
            });

            productList.append(productCard);
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        loader.classList.add("loader-hide");
    }
}
