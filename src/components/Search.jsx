"use client";
import { useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";

export const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue); // Hanya fetch saat tombol diklik atau form disubmit
  };

  const handleResetSearch = () => {
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="bg-mainColorD dark:bg-darkColor input input-sm md:input-md md:h-[40px] h-[40px] rounded-full w-full flex items-center gap-2">
        <IoIosSearch className="opacity-60" />
        <input
          type="text"
          className="grow"
          placeholder="Cari Nama Produk"
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleResetSearch}
            className="active:scale-90 duration-300"
          >
            <IoIosCloseCircle className="md:text-lg -mr-1 opacity-40" />
          </button>
        )}
        <button
          type="submit"
          className="btn btn-sm border-none bg-secondaryColor rounded-full -mr-3 dark:text-white"
        >
          Cari
        </button>
      </label>
    </form>
  );
};
