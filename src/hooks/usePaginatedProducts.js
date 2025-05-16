"use client"
import { useEffect, useState } from "react";

const usePaginatedProducts = (page, limit, search = '') => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
                );
                const json = await res.json();

                if (json.error) throw new Error(json.error);
                setData(json.data);
                setTotal(json.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [page, limit, search]); // ✅ tambahkan search di sini


    return { data, total, loading, error };
};

export default usePaginatedProducts;
