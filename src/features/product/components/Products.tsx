import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart";
import { FaStar } from "react-icons/fa";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
}

export default function Products() {
  const search = useSelector((state: RootState) => state.search.query);
  const category = useSelector((state: RootState) => state.filter.category);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);
    const url =
      category === "all"
        ? "https://dummyjson.com/products?limit=100"
        : `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [category]);

  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      p.price >= minPrice &&
      p.price <= maxPrice
  );

  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sort === "name-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-12 bg-white rounded-2xl p-4">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="price-filter">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <span> - </span>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div className="sort-filter">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 col-span-10">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse card flex flex-col">
                    <div className="w-full h-60 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              : filteredProducts.map((p) => (
                  <div key={p.id} className="card flex flex-col">
                    <Link to={`/products/${p.id}`}>
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-full h-60 object-contain rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {p.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-[#ff929b] font-bold">${p.price}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {p.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Stock: {p.stock}
                      </span>
                    </div>

                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => dispatch(addToCart(p))}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
