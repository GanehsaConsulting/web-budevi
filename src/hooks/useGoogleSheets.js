"use client"

import { useState, useEffect } from 'react';

const useGoogleSheets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = process.env.NEXT_PUBLIC_SHEET_ID;  // Ambil dari .env.local
      const range = process.env.NEXT_PUBLIC_RANGE;        // Ambil dari .env.local
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;     // Ambil dari .env.local

      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
        const res = await fetch(url);
        const json = await res.json();
        
        if (json.error) {
          throw new Error(json.error.message);
        }
        
        setData(json.values || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGoogleSheets;
