import type { Product } from "@/types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ContainerProps {
  product: Product;
}

export default function Rating({ product }: ContainerProps) {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        if (product.rating >= starValue) {
          return <FaStar key={i} className="text-yellow-400" />;
        } else if (product.rating >= starValue - 0.5) {
          return <FaStarHalfAlt key={i} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={i} className="text-gray-300" />;
        }
      })}

      <span className="text-sm text-gray-600 ml-1">
        {product.rating.toFixed(1)}
      </span>
    </div>
  );
}
