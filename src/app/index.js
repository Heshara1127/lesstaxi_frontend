import { useEffect, useState } from "react";
import axios from "axios";
import DealCard from "../components/DealCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`${API}/api/deals`)
      .then((res) => {
        if (mounted) setDeals(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  // search & filter (simple)
  const filtered = deals.filter((d) =>
    d.title.toLowerCase().includes(q.toLowerCase())
  );

  // pagination
  const total = filtered.length;
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Deals</h1>
      <SearchBar value={q} onChange={setQ} />
      {loading && <div>Loading...</div>}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-6">
        {paged.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        total={total}
        perPage={perPage}
      />
    </div>
  );
}
