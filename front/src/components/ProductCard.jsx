import { EditButton } from './buttons/EditButton';
import { DeleteButton } from './buttons/DeleteButton';
import { Pin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <div className="w-80 p-4 border rounded-2xl flex justify-between">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className="space-x-2 pt-4 flex">
          <Pin />
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-black text-white">
            Count: {product.count}
          </span>
          <Link to={`/product/${product._id}`}>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              More
            </span>
          </Link>
        </div>
        <img
          src={product.imageUrl}
          alt="Product image"
          className="w-200[px] h-200[px] object-cover"
        ></img>
      </div>
      <div className="ml-3 space-y-2">
        <EditButton product={product} />
        <DeleteButton product={product} />
      </div>
    </div>
  );
};
