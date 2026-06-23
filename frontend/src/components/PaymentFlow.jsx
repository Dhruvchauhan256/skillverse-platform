import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentFlow({ orderId, onPaymentSuccess }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/payments/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    setProcessing(true);
    try {
      // Create Razorpay order
      const orderResponse = await axios.post("/api/payments/create-order", {
        orderId,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        order_id: orderResponse.data.id,
        handler: async (response) => {
          // Verify payment
          try {
            await axios.post("/api/payments/verify-payment", {
              orderId,
              razorpayOrderId: orderResponse.data.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            alert("Payment successful! Funds held in escrow.");
            onPaymentSuccess();
            fetchOrder();
          } catch (error) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Client Name",
          email: "client@example.com",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Failed to create payment order");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div>Loading order details...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Project Escrow & Payment</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Project Amount</p>
            <p className="text-2xl font-bold">₹{order.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Platform Fee (8%)</p>
            <p className="text-lg font-semibold text-gray-700">₹{order.platformFee.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount in Escrow</p>
            <p className="text-lg font-semibold text-blue-600">₹{order.amountHeld}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-lg font-semibold text-green-600">{order.paymentStatus.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Project Milestones</h3>
        <div className="space-y-3">
          {order.milestones && order.milestones.length > 0 ? (
            order.milestones.map((milestone) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{milestone.title}</p>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    <p className="text-sm font-semibold mt-2">₹{milestone.amount}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      milestone.status === "released"
                        ? "bg-green-100 text-green-800"
                        : milestone.status === "submitted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {milestone.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No milestones defined</p>
          )}
        </div>
      </div>

      {/* Payment Button */}
      {order.paymentStatus === "pending" && (
        <button
          onClick={initiatePayment}
          disabled={processing}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay with Razorpay"}
        </button>
      )}

      {order.paymentStatus === "released" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold">✓ Payment Received & Held in Escrow</p>
          <p className="text-sm text-green-700 mt-2">
            Funds will be released to the freelancer upon milestone completion and your approval.
          </p>
        </div>
      )}

      {/* How It Works */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-bold text-blue-900 mb-3">How Escrow Works:</h4>
        <ol className="text-sm text-blue-800 space-y-2">
          <li>1. You pay the amount - it's held securely by us (not by the freelancer)</li>
          <li>2. Freelancer completes milestones and submits deliverables</li>
          <li>3. You review and approve each milestone</li>
          <li>4. Upon approval, funds are released to the freelancer</li>
          <li>5. If there's a dispute, we help resolve it fairly</li>
        </ol>
      </div>
    </div>
  );
}