import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl p-4 shadow flex flex-col md:flex-row gap-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 object-cover rounded"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {item.name}
            </h2>

            <p className="text-green-600 font-bold">
              ${item.price}
            </p>

            <div className="mt-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    Number(e.target.value)
                  )
                }
                className="border p-2 w-20"
              />
            </div>

            <p className="mt-2 font-semibold">
              Subtotal: $
              {(
                item.price * item.quantity
              ).toFixed(2)}
            </p>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold">
          Total: ${total.toFixed(2)}
        </h2>

        <p className="mt-2">
          Items:
          {cart.reduce(
            (sum, item) =>
              sum + item.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
}

export default Cart;