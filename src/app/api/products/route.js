export async function GET(request) {
    const sheetId = process.env.SHEET_ID;
    const range = process.env.RANGE;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!sheetId || !range || !apiKey) {
        return new Response(
            JSON.stringify({ error: "Missing environment variables" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = (searchParams.get("search") || "").toLowerCase();

    try {
        const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );
        const json = await res.json();

        if (json.error) {
            return new Response(
                JSON.stringify({ error: json.error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const rows = json.values || [];
        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ data: [], total: 0, page, limit }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // Format data produk
        const allProducts = formatGoogleSheetData(rows);

        // Filter berdasarkan search (di productName atau variantName)
        const filteredProducts = allProducts.filter(product => {
            const productNameMatch = product.productName.toLowerCase().includes(search);
            const variantMatch = product.variants.some(v =>
                v.name.toLowerCase().includes(search)
            );
            return productNameMatch || variantMatch;
        });

        // Pagination
        const startIndex = (page - 1) * limit;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

        return new Response(
            JSON.stringify({
                data: paginatedProducts,
                total: filteredProducts.length,
                page,
                limit,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

const DEFAULT_THUMBNAIL_URL =
    "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp";

function formatGoogleSheetData(rawData) {
    if (!Array.isArray(rawData) || rawData.length < 2) return [];

    const headers = rawData[0];
    const rows = rawData.slice(1);

    const productsMap = {};
    const variantsToAssign = [];

    const DEFAULT_THUMBNAIL_URL =
        "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp";

    for (const row of rows) {
        const rowData = Object.fromEntries(
            headers.map((header, i) => [header, row[i] ?? ""])
        );

        const {
            id,
            productName,
            category,
            thumbnailURL,
            variantName,
            unit,
            price,
            varImg,
            partOf,
            idByVariants,
        } = rowData;

        const cleanPrice = parseInt(String(price).replace(/[^0-9]/g, "")) || 0;

        const fixedThumbnailURL = thumbnailURL || DEFAULT_THUMBNAIL_URL;
        const fixedVarImg = varImg || DEFAULT_THUMBNAIL_URL;

        const variantData = {
            name: variantName,
            unit,
            price: cleanPrice,
            varImg: fixedVarImg,
            thumbnailURL: fixedThumbnailURL,
            idByVariants,
        };

        if (!partOf) {
            productsMap[id] = {
                id,
                productName,
                category,
                thumbnailURL: fixedThumbnailURL,
                idByVariants,
                variants: [],
            };

            if (variantName) {
                productsMap[id].variants.push(variantData);
            }
        } else {
            variantsToAssign.push({ partOf, variant: variantData });
        }
    }

    for (const { partOf, variant } of variantsToAssign) {
        if (productsMap[partOf]) {
            productsMap[partOf].variants.push(variant);
        }
    }

    return Object.values(productsMap);
}

