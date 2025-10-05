import Container from "@/components/Container";
import { addToCart } from "@/features/cart";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

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
    <Container>
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
                <div key={i} className="card flex flex-col gap-3 animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-lg" />

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>

                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>

                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              ))
            : filteredProducts.map((p) => (
                <ProductCard
                  product={p}
                  handleAddToCart={() => dispatch(addToCart(p))}
                />
              ))}
        </div>
      </div>
    </Container>
  );
}
