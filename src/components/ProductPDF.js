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

const ProductPDF = ({ products, toggle }) => {
    const cardWidth = getCardWidth(toggle);

    const styles = StyleSheet.create({
        page: { padding: 20, backgroundColor: "#ffffff", position: "relative" },
        header: {
            flexDirection: "col",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            marginBottom: 10
        },
        logo: { width: 50, height: 50, borderRadius: 5, objectFit: "contain" },
        companyName: { fontSize: 14, fontWeight: "bold" },
        companyInfo: { fontSize: 8, fontWeight: "medium", marginBottom: 5,marginTop: 2   },
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
            justifyContent: "space-between",
        },
        card: {
            flexBasis: cardWidth,
            marginBottom: 12,
            backgroundColor: "#ffffff",
        },
        image: {
            width: "100%",
            aspectRatio: 1, // Menjaga gambar tetap square
            borderRadius: 6,
            objectFit: "cover",
        },
        title: { fontSize: 8, fontWeight: "bold", marginTop: 4, marginBottom: 4, textAlign: "center" },
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
            width: "40%", // Menyesuaikan ukuran agar tidak memenuhi halaman
            aspectRatio: 1, // Tetap square
            borderRadius: 6,
            objectFit: "cover",
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {/* <Image style={styles.logo} src="https://via.placeholder.com/100x100?text=LOGO" /> */}
                    <Text style={styles.companyName}>
                        Sinar Lotus
                    </Text>
                    <Text style={styles.companyInfo}>
                        Product Showcase
                    </Text>
                </View>

                {/* Grid Produk */}
                <View style={styles.grid}>
                    {products
                        .filter((el) => el.variants.length <= 10)
                        .map((el, idx) => (
                            <View key={idx} style={styles.card}>
                                <Image style={styles.image} src={el.thumbnailURL} />
                                <Text style={styles.title}>{el.productName}</Text>

                                {el.variants.map((variant, vIdx) => (
                                    <View key={vIdx} style={styles.variantWrapper}>
                                        <Text style={styles.variant}>{variant.name}</Text>
                                        <Text style={styles.price}>
                                            {variant.price.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            })}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>Sinar Lotus - Jl. Contoh No. 123, Jakarta | Telp: (021) 12345678 | www.sinarlotus.com</Text>
            </Page>

            {/* Produk dengan variants banyak, pindahkan ke halaman baru */}
            {products
                .filter((el) => el.variants.length > 10)
                .map((el, idx) => (
                    <Page key={idx} size="A4" style={styles.page} wrap={false}>
                        {/* Header di setiap halaman */}
                        <View style={styles.header}>
                            {/* <Image style={styles.logo} src="https://via.placeholder.com/100x100?text=LOGO" /> */}
                            <Text style={styles.companyName}>
                                Sinar Lotus
                            </Text>
                            <Text style={styles.companyInfo}>
                                Product Showcase
                            </Text>
                        </View>

                        {/* Produk dengan banyak variant */}
                        <View style={styles.largeImageContainer}>
                            <Image style={styles.largeImage} src={el.thumbnailURL} />
                            <Text style={styles.title}>{el.productName}</Text>
                        </View>

                        {el.variants.map((variant, vIdx) => (
                            <View key={vIdx} style={styles.variantWrapper}>
                                <Text style={styles.variant}>{variant.name}</Text>
                                <Text style={styles.price}>
                                    {variant.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </Text>
                            </View>
                        ))}

                        {/* Footer */}
                        <Text style={styles.footer}>Sinar Lotus - Jl. Contoh No. 123, Jakarta | Telp: (021) 12345678 | www.sinarlotus.com</Text>
                    </Page>
                ))}
        </Document>
    );
};

export default ProductPDF;
