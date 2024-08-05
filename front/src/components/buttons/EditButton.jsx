import { Pencil } from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';
import { ProductForm } from '../modals/ProductForm';

export const EditButton = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };
  return (
    <>
      <Button icon={<Pencil size={16} />} isIconOnly onClick={toggleOpen} />
      <ProductForm isOpen={isOpen} product={product} toggleModal={toggleOpen} />
    </>
  );
};
