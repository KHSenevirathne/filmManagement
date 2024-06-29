import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2 font-bold text-[#831843]">IMAGE</td>
              <td className="py-2 font-bold text-[#831843]">ID</td>
              <td className="py-2 font-bold text-[#831843]">DATE</td>
              <td className="py-2 font-bold text-[#831843]">TOTAL</td>
              <td className="py-2 font-bold text-[#831843]">PAID</td>
              <td className="py-2 font-bold text-[#831843]">DELIVERED</td>
              <td className="py-2 font-bold text-[#831843]"></td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />

                <td className="py-2 font-bold">{order._id}</td>
                <td className="py-2 font-bold">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2 font-bold">Rs. {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full font-bold text-white">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full font-bold text-white">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full font-bold text-white">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full font-bold text-white">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-pink-600 text-back py-2 px-3 rounded-xl font-bold text-white hover:bg-pink-800">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
