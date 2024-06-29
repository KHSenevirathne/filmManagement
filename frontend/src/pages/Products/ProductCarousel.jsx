import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              genre,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-half rounded-lg object-cover h-[30rem]"
                />

                <div className="mt-4 flex justify-between">
                  <div className="one">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"> Rs. {price} Per Product</p> <br /> <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-[#831843]" /> Genre:
                        <div className="font-semibold ml-1">{genre}</div>
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-[#831843]" /> Added:{" "}
                        <div className="font-semibold ml-1">{moment(createdAt).fromNow()}</div>
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-[#831843]" /> Reviews:
                        <div className="font-semibold ml-1">{numReviews}</div>
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-[#831843]" /> Ratings:{" "}
                        <div className="font-semibold ml-1">{Math.round(rating)} / 5</div>
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-[#831843]" /> Quantity:{" "}
                        <div className="font-semibold ml-1">{quantity}</div>
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-[#831843]" /> In Stock:{" "}
                        <div className="font-semibold ml-1">{countInStock}</div>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
