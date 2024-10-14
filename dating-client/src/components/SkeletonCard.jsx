// src/components/SkeletonCard.js


const SkeletonCard = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
            <div className="h-48 bg-gray-300 rounded-t-lg mb-4" />
            <div className="h-6 bg-gray-300 rounded mb-2" />
            <div className="h-4 bg-gray-300 rounded" />
        </div>
    );
};

export default SkeletonCard;
