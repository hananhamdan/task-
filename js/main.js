
const gitcathegories = async () =>
    await axios.get('https://dummyjson.com/products/categories');

async function readcategories() {
    const loader=document.querySelector('.loader_categories');
   
    try{ 
    
    const { data } = await gitcathegories();

    const result = data.map((categore) =>
        `<li>
            <button type="button" data-category="${categore.name}">
                ${categore.name}
            </button>
        </li>`
    ).join(" ");

    document.querySelector('[data-categories]').innerHTML = result;
   

    }catch(error){
        document.querySelector('[data-categories]').innerHTML=`faild`;
    } finally{
            loader.classList.add('no_load')
        }
    

}

async function getproduct() {
    const response = await axios.get('https://dummyjson.com/products');
    return response;
}

const setproduct = async () => {
    const loader =document.querySelector('.loader_product')
    try{
    const { data } = await getproduct();

    const result = data.products.map((product) => {
        return `
            <div class="product-card" data-product-id="${product.id}">

                <img src="${product.thumbnail}" alt="${product.title}">

                <div class="product-info">

                    <h3>${product.title}</h3>

                    <p>${product.description}</p>

                    <div class="product-details">
                        <span class="price">$${product.price}</span>
                        <span class="rating">${product.rating}</span>
                    </div>

                    <p class="stock">In Stock: ${product.stock}</p>

                    <button type="button" data-action="view-details">
                        View Details
                    </button>

                </div>
            </div>
        `;
    }).join(' ');

    document.querySelector('[data-products]').innerHTML = result;

}
    catch(error){  document.querySelector('[data-products]').innerHTML=`
        <div><p>error</p></div>`}
         finally{
            loader.classList.add('no_load')
        }
       
}
const addToCard =document.querySelectorAll('[data-action="view-details"]') 

addToCard.forEach( () => {
    alert('helo')
    
});
readcategories();
setproduct();
const changtheem=document.querySelector('[data-theemptn]')

changtheem.onclick=function(){
    document.body.classList.toggle('dark')
}