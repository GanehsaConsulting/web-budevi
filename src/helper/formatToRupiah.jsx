export const formatToRupiah = (amount) => {
    if (typeof amount !== 'number') {
        return 'Invalid Input';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};
