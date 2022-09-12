export function frontendTableOfProducts(products) {
  console.log('| TITLE | RATING | CATEGORY | PRICE')
  products.forEach((product) => console.log(product.title, '|', product.rating.rate, '|', product.category, '|', product.price))
}
