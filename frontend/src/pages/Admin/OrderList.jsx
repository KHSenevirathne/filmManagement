import React from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import { toast } from "react-toastify";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  const deleteHandler = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const result = await deleteOrder(orderId).unwrap();
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(`Order is deleted.`);
          const reloadPage = () => {
              window.location.reload();
            };
            setTimeout(reloadPage, 3000);
        }
      } catch (err) {
        console.error(error);
        toast.error("Order delection failed. Try again.");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : !orders || orders.length === 0 ? (
        <div className="text-xl font-bold py-8 ml-[35rem]">
          No Orders Yet <Link to="/" className="text-[#831843] hover:text-blue-500 underline">Go To Home</Link>
        </div>
      ) : (
        <table className="container mx-auto">
          <AdminMenu />

          <thead>
            <tr className="mb-[5rem]">
              <th className="text-left pl-1 font-bold text-[#831843]">ITEMS</th>
              <th className="text-left pl-1 font-bold text-[#831843]">ID</th>
              <th className="text-left pl-1 font-bold text-[#831843]">USER</th>
              <th className="text-left pl-1 font-bold text-[#831843]">DATE</th>
              <th className="text-left pl-1 font-bold text-[#831843]">TOTAL</th>
              <th className="text-left pl-1 font-bold text-[#831843]">PAID</th>
              <th className="text-left pl-1 font-bold text-[#831843]">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td className="font-bold">{order._id}</td>
                <td className="font-bold">{order.user ? order.user.username : "N/A"}</td>
                <td className="font-bold">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td className="font-bold">Rs. {order.totalPrice}</td>
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

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-[#831843] text-back py-2 px-3 rounded-xl font-bold text-white hover:bg-pink-800">More</button>
                  </Link>
                  <button
                    onClick={() => deleteHandler(order._id)}
                    className="bg-red-600 text-back py-2 px-3 rounded-xl font-bold text-white hover:bg-red-800 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
