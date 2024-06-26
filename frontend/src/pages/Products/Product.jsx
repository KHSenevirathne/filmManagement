import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full p-3 relative">
      <div className="relative">
        <div>
        <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        </Link>
        </div>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold hover:text-blue-500">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              Rs.{product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
