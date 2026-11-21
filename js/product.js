const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const gitdetails = async () => {
    const reseved = await axios.get('https://dummyjson.com/products/1');

    return reseved;
}

const setdetails = async () => {

    const { data } = await gitdetails();

    document.querySelector('.product-details').innerHTML = `
        <div class="product-images">

            <div class="main-image">
                <img src="${data.images[0]}" alt="${data.title}">
            </div>

            <div class="thumbnail">
                <img src="${data.thumbnail}" alt="Product thumbnail">
            </div>

        </div>

        <div class="product-info">

            <span class="category">${data.category}</span>

            <h1>${data.title}</h1>

            <p class="brand">Brand: <strong>${data.brand}</strong></p>

            <div class="rating">
                ${data.rating} / 5
            </div>

            <div class="price">
                <span>$${data.price}</span>
                <del>$${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}</del>
                <span class="discount">${data.discountPercentage}% OFF</span>
            </div>

            <p class="description">
                ${data.description}
            </p>

            <div class="availability">
                <span class="status">In Stock</span>
                <span>${data.stock} items available</span>
            </div>

            <p class="sku">SKU: ${data.sku}</p>

            <p class="minimum-order">
                Minimum Order Quantity: ${data.minimumOrderQuantity}
            </p>

            <button class="add-to-cart" type="button">
                Add to Cart
            </button>

        </div>
    `;
    document.querySelector('.additional-info').innerHTML=`
     <h2>Product Specifications</h2>

            <div class="specifications">
                <div><strong>Weight:</strong>${data.weight}g</div>
                <div><strong>Width:</strong> ${data.dimensions.Width} cm</div>
                <div><strong>Height:</strong> ${data.dimensions.Height} cm</div>
                <div><strong>Depth:</strong> ${data.dimensions.Depth} cm</div>
                <div><strong>Warranty:</strong> ${data.Warranty} week warranty</div>
                <div><strong>Shipping:</strong> ${data.Shipping} business days</div>
                <div><strong>Return Policy:</strong> ${data.returnPolicy}</div>
                <div><strong>Barcode:</strong> ${data.Barcode}</div>
            </div>

            <h2>Tags</h2>
data.tags.map((tag) => 
    <div class="tags">
        <span>${tag}</span>
    </div>
)`.join(' ')    
   


        document.querySelector('.review').innerHTML = data.reviews.map((review) =>
    `
    <div class="review-item">
        <div class="review-header">
            <strong>${review.reviewerName}</strong>
            <span>⭐ ${review.rating}/5</span>
        </div>

        <p>${review.comment}</p>
        <small>${review.date}</small>
    </div>
    `
).join('');
    
}
/*
*/

setdetails()