import Modal from './Modal';
import ProductService from '../../api/productService';

export const DeleteModal = ({ isOpen, toggleModal, product }) => {
  const handleDeleteProduct = () => {
    ProductService.deleteProduct(product._id)
      .then((response) => {
        console.log('Product deleted successfully:', response);
        toggleModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };
  return (
    <Modal
      isOpen={isOpen}
      title={`Are you sure want to delete ${product.name}`}
      actionLabel={'Confirm'}
      onSubmit={handleDeleteProduct}
      toggleModal={toggleModal}
    />
  );
};
