export default function CategoryCardComponent({img}) {
    return (
         <div className="w-56 h-56 bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <img
                src={img}
                className="object-cover w-full h-full"
            />
        </div>
    );
}
