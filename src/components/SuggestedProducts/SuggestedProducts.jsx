import { Link } from "react-router-dom";

function SuggestedProducts({ products, currentId }) {
  const relatedProducts = products.filter(
    (item) => item.id !== Number(currentId)
  );

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Suggested Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-green-600 font-bold">
                    ${item.price}
                  </p>

                  <p className="text-yellow-500">
                    ⭐ {item.rating}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SuggestedProducts;