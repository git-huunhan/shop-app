export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    description: "Powerful laptop with modern design",
    image:
      "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/317704/asus-vivobook-14-x1404va-i5-nk050w-170225-104151-335-600x600.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    description: "High-end smartphone with amazing camera",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-card-40-17pro-202509_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=WVVFRzUzVk1oblJhbW9PbGNSU25ja3doNjVzb1FWSTVwZWJJYThYTHlrNzQzbUlIR1RvazhDRHNOQlYvM3g2dFIwdkZSSnBZYjhOaHBpM2lkYTFBUEZHTmVoMWFVZloyU3lqdmZCOUFEeDF6K2N6UFd4K21VWHNnbWZBQ3hSanQ",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    description: "Noise-cancelling wireless headphones",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_17333.png",
  },
];
