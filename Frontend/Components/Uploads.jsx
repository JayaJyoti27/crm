import React, { useState, useEffect } from "react";
import axios from "axios";

const Uploads = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [order, setOrder] = useState({
    customerEmail: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    amount: 0,
  });

  useEffect(() => {
    fetchUploadHistory();
    fetchCustomers();
    fetchOrders();
  }, []);

  const fetchUploadHistory = () => {
    axios
      .get("http://localhost:4000/uploads/uploadHistory")
      .then((res) => setUploadHistory(res.data))
      .catch((err) => console.error("Error fetching history:", err));
  };

  const fetchCustomers = () => {
    axios
      .get("http://localhost:4000/customers")
      .then((res) => setCustomersList(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => setOrdersList(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setOrder((prev) => {
      const items = [...prev.items];
      items[index] = {
        ...items[index],
        [name]: name === "name" ? value : Number(value),
      };
      const amount = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      return { ...prev, items, amount };
    });
  };

  const addItem = () => {
    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setOrder((prev) => {
      const items = prev.items.filter((_, i) => i !== index);
      const amount = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      return { ...prev, items, amount };
    });
  };

  const handleSubmit = async () => {
    const isCustomer = activeTab === "customer";
    const payload = isCustomer ? customer : order;
    const type = isCustomer ? "customers" : "orders";

    try {
      await axios.post(`http://localhost:4000/${type}`, payload);

      const historyPayload = {
        type,
        fileName: `${type}-manual-entry.json`,
        status: "completed",
        uploadedBy: "Admin",
        createdAt: new Date().toISOString(),
      };

      await axios.post(
        "http://localhost:4000/uploads/saveHistory",
        historyPayload
      );

      setUploadHistory((prev) => [historyPayload, ...prev]);

      if (isCustomer) {
        fetchCustomers();
        setCustomer({ name: "", email: "", phone: "", company: "" });
      } else {
        fetchOrders();
        setOrder({
          customerEmail: "",
          items: [{ name: "", quantity: 1, price: 0 }],
          amount: 0,
        });
      }

      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);

      const errorHistory = {
        type,
        fileName: `${type}-manual-entry.json`,
        status: "failed",
        uploadedBy: "Admin",
        errorMessage: error.message,
        createdAt: new Date().toISOString(),
      };

      await axios.post(
        "http://localhost:4000/uploads/saveHistory",
        errorHistory
      );

      setUploadHistory((prev) => [errorHistory, ...prev]);

      alert("Submission failed");
    }
  };

  return (
    <div className="p-6 flex-1 bg-gradient-to-br from-[#f0f8ff] to-[#dbeafe] min-h-screen">
      <h1 className="text-4xl font-bold text-green-800">Upload Data</h1>
      <p className="text-gray-600 mt-1 mb-6">
        Manually import your customer and order data to keep your CRM up to date
      </p>

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex-1 py-2 rounded-xl font-medium border ${
              activeTab === "customer"
                ? "bg-green-100 border-green-300 text-black"
                : "bg-transparent text-gray-500 border-transparent"
            }`}
          >
            👤 Customer Data
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-2 rounded-xl font-medium border ${
              activeTab === "order"
                ? "bg-green-100 border-green-300 text-black"
                : "bg-transparent text-gray-500 border-transparent"
            }`}
          >
            🛒 Order Data
          </button>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {activeTab === "customer" ? (
            <>
              <input
                type="text"
                name="name"
                value={customer.name}
                placeholder="Customer Name"
                onChange={(e) => handleChange(e, setCustomer)}
                className="w-full border px-4 py-2 rounded-xl"
                required
              />
              <input
                type="email"
                name="email"
                value={customer.email}
                placeholder="Email"
                onChange={(e) => handleChange(e, setCustomer)}
                className="w-full border px-4 py-2 rounded-xl"
                required
              />
              <input
                type="tel"
                name="phone"
                value={customer.phone}
                placeholder="Phone"
                onChange={(e) => handleChange(e, setCustomer)}
                className="w-full border px-4 py-2 rounded-xl"
              />
              <input
                type="text"
                name="company"
                value={customer.company}
                placeholder="Company"
                onChange={(e) => handleChange(e, setCustomer)}
                className="w-full border px-4 py-2 rounded-xl"
              />
            </>
          ) : (
            <>
              <input
                type="email"
                name="customerEmail"
                value={order.customerEmail}
                placeholder="Customer Email"
                onChange={(e) => handleChange(e, setOrder)}
                className="w-full border px-4 py-2 rounded-xl"
                required
              />

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center border p-4 rounded-xl bg-blue-50"
                  >
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      placeholder="Product Name"
                      onChange={(e) => handleItemChange(index, e)}
                      className="flex-1 border px-3 py-2 rounded-xl"
                      required
                    />
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleItemChange(index, e)}
                      className="w-20 border px-3 py-2 rounded-xl"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={item.price}
                      min={0}
                      step="0.01"
                      onChange={(e) => handleItemChange(index, e)}
                      className="w-28 border px-3 py-2 rounded-xl"
                      required
                    />
                    {order.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 font-bold px-2 py-1"
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItem}
                  className="text-blue-600 font-semibold"
                >
                  + Add Another Product
                </button>
              </div>

              <input
                type="number"
                name="amount"
                value={order.amount}
                placeholder="Total Amount"
                readOnly
                className="w-full border px-4 py-2 rounded-xl bg-gray-100 cursor-not-allowed"
              />
            </>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-xl font-medium hover:bg-green-700 transition"
          >
            ➕ Submit {activeTab === "customer" ? "Customer" : "Order"} Data
          </button>
        </form>
      </div>

      {/* Upload History */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Upload History</h2>
        {uploadHistory.length === 0 ? (
          <p className="text-gray-500">No uploads yet.</p>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th>Type</th>
                <th>File Name</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {uploadHistory.map((item, idx) => (
                <tr key={idx} className="bg-gray-50 rounded-xl">
                  <td className="py-2">{item.type}</td>
                  <td className="py-2">{item.fileName}</td>
                  <td className="py-2 font-medium">
                    {item.status === "completed" ? (
                      <span className="text-green-600">✔ Success</span>
                    ) : item.status === "failed" ? (
                      <span className="text-red-600">✖ Failed</span>
                    ) : (
                      <span className="text-yellow-500">⏳ {item.status}</span>
                    )}
                  </td>
                  <td className="py-2">{item.uploadedBy || "N/A"}</td>
                  <td className="py-2">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Customers List */}
      {activeTab === "customer" && (
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            Customer List
          </h2>
          {customersList.length === 0 ? (
            <p className="text-gray-500">No customers yet.</p>
          ) : (
            <table className="min-w-full text-left border border-gray-300">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="border px-4 py-2">Customer ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {customersList.map((customerItem) => (
                  <tr key={customerItem._id} className="hover:bg-green-50">
                    <td className="border px-4 py-2">{customerItem._id}</td>
                    <td className="border px-4 py-2">{customerItem.name}</td>
                    <td className="border px-4 py-2">{customerItem.email}</td>
                    <td className="border px-4 py-2">
                      {customerItem.phone || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {customerItem.company || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {customerItem.createdAt
                        ? new Date(customerItem.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Orders List */}
      {activeTab === "order" && (
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Orders List</h2>
          {ordersList.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <table className="min-w-full text-left border border-gray-300">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">Customer Email</th>
                  <th className="border px-4 py-2">Items</th>
                  <th className="border px-4 py-2">Amount</th>
                  <th className="border px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((orderItem) => (
                  <tr key={orderItem._id} className="hover:bg-blue-50">
                    <td className="border px-4 py-2">{orderItem._id}</td>
                    <td className="border px-4 py-2">
                      {orderItem.customerId?.email ||
                        orderItem.customerEmail ||
                        "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {orderItem.items
                        .map(
                          (item) =>
                            `${item.name} (x${
                              item.quantity
                            }) @ ₹${item.price.toFixed(2)}`
                        )
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2 text-green-600 font-bold">
                      ₹{orderItem.amount.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      {orderItem.date
                        ? new Date(orderItem.date).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploads;
