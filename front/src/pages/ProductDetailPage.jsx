import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../api/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching data from server:', error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">{product.name}</h1>
      <div className="flex justify-center gap-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-200[px] h-96 object-cover mt-4"
        />
        <div className="flex flex-col mt-4 space-y-4">
          <p className="text-lg">Count: {product.count}</p>
          <p className="text-lg">
            Size: {product.size.width}x{product.size.height}
          </p>
          <p className="text-lg">Weight: {product.weight}</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Comments:</h2>
      </div>
    </div>
  );
};

export default ProductDetailPage;
