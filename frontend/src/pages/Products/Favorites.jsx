import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      {favorites.length === 0 ? (
          <div className="text-xl font-bold py-8 ml-[35rem]">
            Your favorite is empty <Link to="/shop" className="text-[#831843] hover:text-blue-500 underline">Go To Shop</Link>
          </div>
        ) : (
          <div>
      <h1 className="text-2xl font-bold ml-[3rem] mt-[3rem]">
        ❤ FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <div key={product._id} className="w-[23%] p-4">
            <Product product={product} />
          </div>
        ))}
      </div>
      </div>
      )}
    </div>
  );
};

export default Favorites;
