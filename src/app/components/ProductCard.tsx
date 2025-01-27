import { FC } from 'react';
import { Product } from '../types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { StarIcon } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const truncateDescription = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg hover:scale-105 h-140"> 
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      <div className="p-6 h-62"> 
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 my-2"> 
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3 font-sans text-justify my-2 h-20">  
          {truncateDescription(product.description, 100)}
        </p>
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-2 text-gray-600 text-sm">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" 
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;