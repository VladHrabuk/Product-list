import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';

const MainPage = () => {
  const [products, setProducts] = useState([]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <Navbar setProducts={setProducts} />
      <div className="flex flex-wrap gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
