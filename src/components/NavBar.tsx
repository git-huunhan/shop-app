import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { logout } from "@/features/auth";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { FaGlobe, FaQuestionCircle, FaSearch, FaUser } from "react-icons/fa";
import { setSearch } from "@/features/search";
import { setCategory } from "@/features/filter";
import { FaCartShopping } from "react-icons/fa6";

export default function NavBar() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const search = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <nav className="sticky top-0 z-100 bg-white pt-4 pb-4 shadow-xs flex justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-md text-gray-700">
          <div className="space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#ff929b] font-bold" : "text-gray-700"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-[#ff929b] font-bold" : "text-gray-700"
              }
            >
              Products
            </NavLink>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 flex items-center justify-end gap-2 cursor-pointer">
                <FaQuestionCircle className="text-gray-600 group-hover:text-[#ff929b]" />
                <span className="text-gray-600 group-hover:text-[#ff929b]">
                  Help
                </span>
              </button>

              <button className="px-3 py-1 flex items-center justify-end gap-2 cursor-pointer">
                <FaGlobe className="text-gray-600 group-hover:text-[#ff929b]" />
                <span className="text-gray-600 group-hover:text-[#ff929b]">
                  English
                </span>
              </button>

              <div className="relative group">
                <button className="px-3 py-1 flex items-center justify-end gap-2 cursor-pointer">
                  <FaUser className="text-gray-600 group-hover:text-[#ff929b]" />
                  <span className="text-gray-600 group-hover:text-[#ff929b]">
                    {user ? user.email.split("@")[0] : "Login / Signup"}
                  </span>
                </button>

                {/* menu sẽ hiện khi hover vào button HOẶC menu */}
                <div className="absolute right-0 top-full w-40 bg-white shadow-lg rounded p-2 z-50 hidden group-hover:block">
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Profile
                  </NavLink>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Lumos Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="font-bold text-xl text-brand">Lumos</span>
          </div>

          <div className="flex flex-1 items-center justify-around gap-16 ml-16 mr-16">
            <div className="flex flex-1 gap-4">
              <select
                value={categories}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="px-3 py-2 text-sm focus:outline-gray-200 border border-gray-300 rounded-xl"
              >
                <option value="all">All Categories</option>
                {categories.map((c: any) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-grow">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  className="flex-1 border border-gray-300 rounded-r-none border-r-0 px-3 py-2 text-sm rounded-xl outline-none"
                />
                <button className="bg-[#ff929b] text-white flex justify-center items-center px-4 rounded-xl rounded-l-none w-24">
                  <FaSearch className="text-white group-hover:text-[#ff929b]" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-start">
              <NavLink to="/cart" className="relative inline-block">
                <FaCartShopping className="text-2xl" />
                <span
                  className="absolute -top-2 -right-2.5 bg-[#ff929b] text-white text-xs 
                 w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
