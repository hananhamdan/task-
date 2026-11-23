const PRODUCT_ID = 1;

const stars = (n) => '⭐'.repeat(Math.round(n));

async function setdetails() {
    try {
        const { data } = await axios.get(`https://dummyjson.com/products/${PRODUCT_ID}`);

        const images = data.images?.length ? data.images : [data.thumbnail];
        const oldPrice = (data.price / (1 - data.discountPercentage / 100)).toFixed(2);

        // Product Details
        document.querySelector('.product-details').innerHTML = `
            <div class="product-images">
                <div class="main-image">
                    <img src="${images[0]}" alt="${data.title}">
                </div>
                <div class="thumbnail">
                    ${images.map((img) => `<img src="${img}" alt="${data.title}">`).join('')}
                </div>
            </div>

            <div class="product-info">
                <span class="category">${data.category}</span>
                <h1>${data.title}</h1>
                <p class="brand">Brand: <strong>${data.brand ?? 'N/A'}</strong></p>
                <div class="rating">${data.rating} / 5</div>

                <div class="price">
                    <span>$${data.price}</span>
                    <del>$${oldPrice}</del>
                    <span class="discount">${data.discountPercentage}% OFF</span>
                </div>

                <p class="description">${data.description}</p>

                <div class="availability">
                    <span class="status">${data.availabilityStatus}</span>
                    <span>${data.stock} items available</span>
                </div>

                <p class="sku">SKU: ${data.sku}</p>
                <p class="minimum-order">Minimum Order Quantity: ${data.minimumOrderQuantity}</p>

                <button class="add-to-cart" type="button">Add to Cart</button>
            </div>
        `;

        // Thumbnail click
        const mainImg = document.querySelector('.main-image img');
        document.querySelectorAll('.thumbnail img').forEach((thumb) => {
            thumb.addEventListener('click', () => {
                mainImg.src = thumb.src;
            });
        });

        // Additional Information
        document.querySelector('.additional-info').innerHTML = `
            <h2>Product Specifications</h2>
            <div class="specifications">
                <div><strong>Weight:</strong> ${data.weight} g</div>
                <div><strong>Width:</strong> ${data.dimensions?.width ?? 'N/A'} cm</div>
                <div><strong>Height:</strong> ${data.dimensions?.height ?? 'N/A'} cm</div>
                <div><strong>Depth:</strong> ${data.dimensions?.depth ?? 'N/A'} cm</div>
                <div><strong>Warranty:</strong> ${data.warrantyInformation}</div>
                <div><strong>Shipping:</strong> ${data.shippingInformation}</div>
                <div><strong>Return Policy:</strong> ${data.returnPolicy}</div>
                <div><strong>Barcode:</strong> ${data.meta?.barcode ?? 'N/A'}</div>
            </div>

            <h2>Tags</h2>
            <div class="tags">
                ${(data.tags ?? []).map((tag) => `<span>${tag}</span>`).join('')}
            </div>
        `;

        // Reviews
        document.querySelector('.reviews').innerHTML = `
            <h2>Customer Reviews</h2>
            ${(data.reviews ?? []).map((review) => `
                <div class="review">
                    <div class="review-header">
                        <strong>${review.reviewerName}</strong>
                        <span>${stars(review.rating)} ${review.rating}/5</span>
                    </div>
                    <p>${review.comment}</p>
                </div>
            `).join('')}
        `;

    } catch (error) {
        console.log(error);
        document.querySelector('.product-details').innerHTML =
            '<p>Failed to load product.</p>';
    }
}

setdetails();