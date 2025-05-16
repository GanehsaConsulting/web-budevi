export const SkeletonCards = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
            {Array.from({ length: count }).map((_, idx) => (
                <div
                    key={idx}
                    className="w-auto p-0 flex flex-col gap-3 animate-pulse"
                >
                    <div className="w-full h-full !aspect-square bg-gray-200 rounded-xl mb-3" />
                    <div className="w-7/10 h-5 bg-gray-200 rounded" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
};
