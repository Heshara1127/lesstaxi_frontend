"use client";
import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import DealCard from "../components/DealCard";
import Pagination from "../components/Pagination";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HomeContent() {
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
    <>
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
    </>
  );
}
