"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DealCard from "../components/DealCard";
import Pagination from "../components/Pagination";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
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
    return () => {
      mounted = false;
    };
  }, []);

  const total = deals.length;
  const start = (page - 1) * perPage;
  const paged = deals.slice(start, start + perPage);

  return (
    <div className="container mx-auto bg-white flex flex-col items-center justify-center  p-4 sm:p-6 md:p-4 lg:p-8 xl:px-40">
      {loading && <div>Loading...</div>}

      <div className="grid gap-10 grid-cols-1 ">
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
