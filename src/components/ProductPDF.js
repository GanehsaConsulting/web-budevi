"use client";
import React from "react";
import { Document, Page, View, Image, Text, StyleSheet } from "@react-pdf/renderer";

// Fungsi untuk menentukan lebar card & image berdasarkan toggle (4, 5, 6 kolom)
const getCardWidth = (toggle) => {
    switch (toggle) {
        case 2:
            return "19%"; // 5 Kolom
        case 3:
            return "15.5%"; // 6 Kolom
        default:
            return "23%"; // Default 4 Kolom
    }
};

const fixImageUrl = (url) => {
    if (!url || typeof url !== "string") {
        return "https://via.placeholder.com/150"; // Atau gambar default
    }
    return url.replace(/\.webp$/, ".jpg");
};



const ProductPDF = ({ products, toggle }) => {
    console.log('=======products pdf=============================');
    console.log(products);
    console.log('===================================='); 
    const cardWidth = getCardWidth(toggle);

    const styles = StyleSheet.create({
        page: { padding: 20, backgroundColor: "#ffffff", position: "relative" },
        header: {
            flexDirection: "col",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            marginBottom: 10
        },
        logo: { width: 50, height: 50, borderRadius: 5, objectFit: "contain" },
        companyName: { fontSize: 14, fontWeight: "bold" },
        companyInfo: { fontSize: 8, fontWeight: "medium", marginBottom: 5, marginTop: 2 },
        dateInfo: { fontSize: 6, textAlign: "right", marginBottom: 5 },
        footer: {
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 8,
            color: "#666",
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            paddingTop: 4,
        },
        grid: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: 5
        },
        card: {
            flexBasis: cardWidth,
            marginBottom: 12,
            backgroundColor: "#ffffff",
        },
        image: {
            width: "100%",
            aspectRatio: 1,
            borderRadius: 6,
            objectFit: "cover",
        },
        title: { fontSize: 8, fontWeight: "bold", marginTop: 4, marginBottom: 4, textAlign: "left" },
        price: { fontSize: 6, fontWeight: "medium", color: "#fea800" },
        variant: { fontSize: 6, color: "#444" },
        variantWrapper: {
            padding: 3,
            backgroundColor: "#fafafa",
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            marginVertical: 2,
        },
        largeImageContainer: {
            alignItems: "center",
            marginBottom: 8,
        },
        largeImage: {
            width: "40%",
            aspectRatio: 1,
            borderRadius: 6,
            objectFit: "cover",
        },
    });

    const currentDate = new Date().toLocaleDateString("id-ID");

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.companyName}>Sinar Lotus</Text>
                    <Text style={styles.companyInfo}>Product Showcase</Text>
                    <Text style={styles.dateInfo}>Dicetak: {currentDate}</Text>
                </View>

                {/* Grid Produk */}
                <View style={styles.grid}>
                    {products
                        .filter((el) => el.variants?.length <= 10)
                        .map((el, idx) => (
                            <View key={el.productName + idx} style={styles.card}>
                                <Image style={styles.image} src={fixImageUrl(el.thumbnailURL)} />
                                <Text style={styles.title}>{el.productName}</Text>

                                {el.variants?.length === 0 ? (
                                    <Text style={styles.variant}>Tidak ada varian tersedia</Text>
                                ) : (
                                    el.variants.map((variant, vIdx) => (
                                        <View key={variant.name + vIdx} style={styles.variantWrapper}>
                                            <Text style={styles.variant}>{variant.name}</Text>
                                            <Text style={styles.price}>
                                                {variant.price.toLocaleString("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                })}
                                            </Text>
                                        </View>
                                    ))
                                )}
                            </View>
                        ))}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Sinar Lotus - Jl. Contoh No. 123, Jakarta | Telp: (021) 12345678 | www.sinarlotus.com
                </Text>
            </Page>

            {/* Produk dengan banyak varian */}
            {products
                .filter((el) => el.variants?.length > 10)
                .map((el, idx) => (
                    <Page key={"large-" + el.productName + idx} size="A4" style={styles.page} wrap={false}>
                        <View style={styles.header}>
                            <Text style={styles.companyName}>Sinar Lotus</Text>
                            <Text style={styles.companyInfo}>Product Showcase</Text>
                            <Text style={styles.dateInfo}>Dicetak: {currentDate}</Text>
                        </View>

                        <View style={styles.largeImageContainer}>
                            <Image style={styles.image} src={fixImageUrl(el.thumbnailURL)} />
                            <Text style={styles.title}>{el.productName}</Text>
                        </View>

                        {el.variants.map((variant, vIdx) => (
                            <View key={variant.name + vIdx} style={styles.variantWrapper}>
                                <Text style={styles.variant}>{variant.name}</Text>
                                <Text style={styles.price}>
                                    {variant.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </Text>
                            </View>
                        ))}

                        <Text style={styles.footer}>
                            Sinar Lotus - Jl. Contoh No. 123, Jakarta | Telp: (021) 12345678 | www.sinarlotus.com
                        </Text>
                    </Page>
                ))}
        </Document>
    );
};

export default ProductPDF;