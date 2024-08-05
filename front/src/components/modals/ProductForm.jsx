import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { Input } from '../Input.jsx';
import {
  maxLengthValidation,
  minLengthValidation,
  minMaxValueValidation,
  requiredValidation,
} from '../../utils/validations';
import ProductService from '../../api/productService.js';

export const ProductForm = ({ isOpen, toggleModal, product }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product ? product.name : '',
      count: product ? product.count : null,
      weight: product ? product.weight : null,
      imageUrl: product ? product.imageUrl : '',
      width: product ? product.size.width : null,
      height: product ? product.size.height : null,
    },
  });

  const handleAddProduct = async (data) => {
    const formattedData = {
      imageUrl: data.imageUrl,
      name: data.name,
      count: data.count,
      size: {
        width: data.width,
        height: data.height,
      },
      weight: data.weight,
    };

    try {
      if (product) {
        const response = await ProductService.editProduct(
          formattedData,
          product._id
        );
        console.log('Product updated successfully:', response);
      } else {
        const response = await ProductService.createProduct(formattedData);
        console.log('Product added successfully:', response);
      }
      reset();
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error('Error handling product:', error);
    }
  };

  const body = (
    <div className={'flex flex-col gap-2'}>
      <Input
        id="name"
        label="Name"
        placeholder="Product..."
        register={register}
        errors={errors}
        type="text"
        validationOptions={{
          ...requiredValidation,
          ...minLengthValidation(3),
          ...maxLengthValidation(99),
        }}
      />
      <Input
        id="imageUrl"
        label="Image URL"
        placeholder="Url..."
        register={register}
        errors={errors}
        type="text"
        validationOptions={{
          ...requiredValidation,
        }}
      />
      <div className="flex flex-row gap-2">
        <Input
          id="count"
          label="Count"
          register={register}
          errors={errors}
          type="number"
          validationOptions={{
            ...requiredValidation,
            ...minMaxValueValidation(1, 100),
          }}
        />
        <Input
          id="weight"
          label="Weight (g)"
          register={register}
          errors={errors}
          type="text"
          validationOptions={{
            ...requiredValidation,
          }}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          id="width"
          label="Width mm"
          register={register}
          errors={errors}
          type="number"
          validationOptions={{
            ...requiredValidation,
            ...minMaxValueValidation(1, 1000),
          }}
        />
        <Input
          id="height"
          label="Height (mm)"
          register={register}
          errors={errors}
          type="number"
          validationOptions={{
            ...requiredValidation,
            ...minMaxValueValidation(1, 1000),
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={!product ? 'Add new product' : 'Edit product'}
      body={body}
      actionLabel={!product ? 'Add' : 'Confirm'}
      onSubmit={handleSubmit(handleAddProduct)}
      toggleModal={toggleModal}
    />
  );
};
