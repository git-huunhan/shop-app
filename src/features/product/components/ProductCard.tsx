import Rating from "@/components/Rating";
import type { Product } from "@/types";
import { Link } from "react-router-dom";

interface ContainerProps {
  product: Product;
  handleAddToCart: () => void;
}

export default function ProductCard({
  product,
  handleAddToCart,
}: ContainerProps) {
  return (
    <div key={product.id} className="card-base">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-image"
        />
        <h3 className="card-title">{product.title}</h3>
      </Link>

      <div className="card-body-container">
        <p className="text-[#ff929b] text-xl font-bold">${product.price}</p>

        <div className="flex items-center justify-between">
          <Rating product={product} />

          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}
