import Timer from "./Timer";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function DealCard({ deal }) {
  const {
    id,
    title,
    location,
    price,
    discountPrice,
    purchased,
    capacity,
    features,
    imageUrl,
    expiry,
  } = deal;

  const percentSold = Math.round((purchased / capacity) * 100);

  const handleBook = async () => {
    try {
      const res = await axios.post(`${API}/api/book`, { id });
      alert("Booked! Updated purchased: " + res.data.deal.purchased);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg shadow-gray-500 border-2 w-full grid grid-cols-1 md:grid-cols-2 md:h-fit">
      <div
        className="relative h-64 md:h-full bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="p-4">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-blue-950 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{location} • 0 Reviews</p>
        </div>

        <div className="flex justify-between flex-wrap sm:grid sm:grid-cols-2">
          <div className="flex-1 space-y-4">
            <div className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5 text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-base text-neutral-800">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2.5 bg-blue-950 rounded-full transition-all duration-300"
                  style={{ width: `${percentSold}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Already purchased: {purchased}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-right ml-4">
              <div className="text-base font-semibold text-black line-through md:text-2xl">
                {price} LKR
              </div>
              <div className="text-red-700 font-bold text-xl md:text-4xl">
                {discountPrice} LKR
              </div>
            </div>

            {/* Timer */}
            <div className="mb-4 text-blue-950 ">
              <Timer expiry={expiry} />
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 border-2 border-blue-950 text-blue-950 p-1 rounded-lg font-bold hover:bg-blue-950 hover:text-white">
            View Details
          </button>
          <button
            onClick={handleBook}
            className="flex-1 bg-yellow-500 text-black p-1 rounded-lg font-bold hover:bg-blue-950 hover:text-white "
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
