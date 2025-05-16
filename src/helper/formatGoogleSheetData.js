// export const formatGoogleSheetData = (rawData) => {
//   if (!Array.isArray(rawData) || rawData.length < 2) return [];

//   const headers = rawData[0];
//   const rows = rawData.slice(1);

//   const productsMap = {};       
//   const variantsToAssign = [];  

//   for (const row of rows) {
//     const rowData = Object.fromEntries(
//       headers.map((header, i) => [header, row[i] ?? ""])
//     );

//     const {
//       id,
//       productName,
//       category,
//       thumbnailURL,
//       variantName,
//       unit,
//       price,
//       varImg,
//       partOf,
//     } = rowData;

//     // Bersihkan price: ganti koma jadi titik, parse float
//     let cleanPrice = 0;
//     if (typeof price === "string" && price.trim() !== "") {
//       const normalizedPrice = price.replace(/[^\d.,]/g, "").replace(",", ".");
//       cleanPrice = parseFloat(normalizedPrice) || 0;
//     }

//     const variantData = {
//       name: variantName || "",
//       unit: unit || "",
//       price: cleanPrice,
//       varImg: varImg || "",
//     };

//     if (!partOf) {
//       // Produk utama / parent
//       if (!productsMap[id]) {
//         productsMap[id] = {
//           id,
//           productName,
//           category,
//           thumbnailURL,
//           variants: [],
//         };
//       }

//       // Jika produk parent juga punya variantName, anggap ini varian tunggal
//       if (variantName) {
//         productsMap[id].variants.push(variantData);
//       }
//     } else {
//       // Produk varian, simpan dulu untuk digabungkan ke parent
//       variantsToAssign.push({ partOf, variant: variantData });
//     }
//   }

//   // Gabungkan varian ke produk parent
//   for (const { partOf, variant } of variantsToAssign) {
//     if (productsMap[partOf]) {
//       productsMap[partOf].variants.push(variant);
//     }
//   }

//   // Hapus produk yang tidak punya variant (optional, tergantung kebutuhan)
//   // const products = Object.values(productsMap).filter(p => p.variants.length > 0);

//   return Object.values(productsMap);
// };

export function formatGoogleSheetData(rawData) {
  const grouped = {};

  rawData.forEach(row => {
    const id = row.id;
    if (!grouped[id]) {
      grouped[id] = {
        id: row.id,
        productName: row.productName,
        category: row.category,
        thumbnailURL: row.thumbnailURL,
        variants: [],
      };
    }

    grouped[id].variants.push({
      name: row.variantName,
      unit: row.unit,
      price: parseFloat(row.price),
      varImg: row.varImg || row.thumbnailURL,
    });
  });

  return Object.values(grouped);
}
