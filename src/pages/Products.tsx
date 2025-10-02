import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

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

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container">
      <h2 className="page-title">Our Collection</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

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

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <Link to={`/products/${p.id}`}>
              <img src={p.thumbnail} alt={p.title} className="product-img" />
              <h3 className="product-name">{p.title}</h3>
            </Link>
            <p className="price">${p.price}</p>
            <button
              className="btn-primary"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
