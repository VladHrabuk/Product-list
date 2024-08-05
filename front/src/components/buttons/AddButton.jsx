import { useState } from 'react';
import { Button } from './Button';
import { Plus } from 'lucide-react';
import { ProductForm } from '../modals/ProductForm';

export const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };
  return (
    <>
      <Button
        icon={<Plus size={16} />}
        text="Add product"
        onClick={toggleOpen}
        variant="primary"
      />
      <ProductForm isOpen={isOpen} toggleModal={toggleOpen} />
    </>
  );
};
