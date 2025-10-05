import { addToCart } from "@/features/cart";
import type { Product } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container detail-page">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="detail-image"
      />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <button
          className="add-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
