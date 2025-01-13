// dateHelper.js

// Function to get relative time
export function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds} detik yang lalu`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari yang lalu`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} bulan yang lalu`;
    const years = Math.floor(months / 12);
    return `${years} tahun yang lalu`;
}

// Function to format date
export function formatDate(date) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
}

// Combined function to get both relative time and formatted date
export function formatDateTime(date) {
    return (
        <>
            <div className="hidden md:block">
                {`${timeAgo(date)} | ${formatDate(date)}`}
            </div>
            <div className="block md:hidden">
                {`${timeAgo(date)}`}
            </div>
        </>
    )
}

