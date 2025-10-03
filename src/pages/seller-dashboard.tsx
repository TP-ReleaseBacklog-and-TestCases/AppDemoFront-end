import React from "react";
import { Card, CardBody, CardHeader, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Product } from "../components/product-card";
import { ProductForm } from "../components/product-form";
import { useAuth } from "../context/auth-context";
import { useLanguage } from "../context/language-context";

// Mock products data
const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Premium Laptop Pro",
    description: "High-performance laptop with the latest processor and stunning display.",
    price: 1899,
    rating: 4.8,
    category: "Electronics",
    image: "laptop",
    stock: 15
  },
  {
    id: "prod2",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Experience crystal-clear sound with these premium wireless headphones.",
    price: 299,
    rating: 4.7,
    category: "Electronics",
    image: "headphones",
    stock: 32
  },
  {
    id: "prod3",
    name: "Modern Design Chair",
    description: "Ergonomic chair with stylish design perfect for your home office.",
    price: 159,
    rating: 4.5,
    category: "Furniture",
    image: "furniture",
    stock: 8
  },
  {
    id: "prod4",
    name: "Professional DSLR Camera",
    description: "Capture stunning photos with this high-resolution professional camera.",
    price: 899,
    rating: 4.9,
    category: "Electronics",
    image: "camera",
    stock: 5
  },
  {
    id: "prod5",
    name: "Bestselling Novel",
    description: "The latest bestselling fiction novel that everyone is talking about.",
    price: 24.99,
    rating: 4.6,
    category: "Books",
    image: "book",
    stock: 45
  }
];

export const SellerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState<Product | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  const handleAddProduct = async (productData: {
    userId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  }) => {
    try {
      console.log("=== POST DATA ===");
      console.log("URL:", "https://backendecommerce-production-fd6f.up.railway.app/products");
      console.log("Method:", "POST");
      console.log("Headers:", { "Content-Type": "application/json" });
      console.log("Body (JSON):", JSON.stringify(productData, null, 2));
      console.log("Body (Object):", productData);
      console.log("================");

      const response = await fetch("https://backendecommerce-production-fd6f.up.railway.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error Response Body:", errorText);
        throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
      }

      const newProduct = await response.json();
      console.log("Success Response:", newProduct);
      
      // Agregar el nuevo producto a la lista
      const mappedProduct: Product = {
        id: String(newProduct.id),
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        rating: newProduct.rating ?? 0,
        category: newProduct.category,
        image: newProduct.imageUrl,
        stock: newProduct.stock,
      };

      setProducts(prev => [...prev, mappedProduct]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = async (productData: {
    userId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
  }) => {
    if (!currentProduct) return;

    try {
      const response = await fetch(`https://backendecommerce-production-fd6f.up.railway.app/products/${currentProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      
      const updatedProducts = products.map((p) =>
        p.id === currentProduct.id
          ? {
              ...p,
              name: updatedProduct.name,
              description: updatedProduct.description,
              price: updatedProduct.price,
              category: updatedProduct.category,
              image: updatedProduct.imageUrl,
              stock: updatedProduct.stock,
            }
          : p
      );

      setProducts(updatedProducts);
      setIsEditModalOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;

    const updatedProducts = products.filter((p) => p.id !== currentProduct.id);
    setProducts(updatedProducts);
    setIsDeleteModalOpen(false);
    setCurrentProduct(null);
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Fetch products for this seller
  React.useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    fetch(`https://backendecommerce-production-fd6f.up.railway.app/products/seller/${user.id}`)
      .then(res => res.json())
      .then(data => {
        // Map backend data to Product[]
        const mapped = data.map((item: any) => ({
          id: String(item.id),
          name: item.name,
          description: item.description ?? "",
          price: item.price,
          rating: item.rating ?? 0,
          category: item.category ?? "",
          image: item.imageUrl,
          stock: item.stock ?? 0,
        }));
        setProducts(mapped);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (!user || user.userType !== "SELLER") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t("accessDenied")}</h2>
        <p className="text-default-500 mb-6">{t("mustBeSeller")}</p>
        <Button
          color="primary"
          href="/login"
          as="a"
        >
          {t("loginAsSeller")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t("sellerDashboardTitle")}</h1>
          <p className="text-default-500">{t("sellerDashboardDesc")}</p>
        </div>

        <Button
          color="primary"
          onPress={() => setIsAddModalOpen(true)}
          startContent={<Icon icon="lucide:plus" />}
        >
          {t("addNewProduct")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500">{t("totalProducts")}</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary-100">
                <Icon icon="lucide:package" className="text-primary text-xl" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500">{t("totalSales")}</p>
                <p className="text-3xl font-bold">S/ 12,450</p>
              </div>
              <div className="p-3 rounded-full bg-success-100">
                <Icon icon="lucide:dollar-sign" className="text-success text-xl" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-default-500">{t("orders")}</p>
                <p className="text-3xl font-bold">48</p>
              </div>
              <div className="p-3 rounded-full bg-warning-100">
                <Icon icon="lucide:shopping-cart" className="text-warning text-xl" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t("yourProducts")}</h2>
        </CardHeader>
        <CardBody>
          <Table
            aria-label="Products table"
            removeWrapper
            isStriped
            bottomContent={
              totalPages > 1 ? (
                <div className="flex justify-center">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    color="primary"
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>{t("product")}</TableColumn>
              <TableColumn>{t("category")}</TableColumn>
              <TableColumn>{t("price")}</TableColumn>
              <TableColumn>{t("stock")}</TableColumn>
              <TableColumn>{t("rating")}</TableColumn>
              <TableColumn>{t("status")}</TableColumn>
              <TableColumn>{t("actions")}</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner />}
              emptyContent={t("noProductsTitle")}
            >
              {getCurrentPageItems().map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-default-500 text-xs line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>S/ {product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {product.stock} units
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Icon icon="lucide:star" className="text-warning mr-1" width={14} />
                      <span>{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={product.stock > 0 ? "success" : "danger"}
                      variant="flat"
                      size="sm"
                    >
                      {product.stock > 0 ? t("published") : t("outOfStock")}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content={t("editProduct")}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => openEditModal(product)}
                        >
                          <Icon icon="lucide:edit" className="text-default-500" />
                        </Button>
                      </Tooltip>
                      <Tooltip content={t("deleteProduct")} color="danger">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => openDeleteModal(product)}
                        >
                          <Icon icon="lucide:trash" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t("addNewProduct")}</ModalHeader>
              <ModalBody>
                <ProductForm
                  onSubmit={handleAddProduct}
                  onCancel={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t("editProduct")}</ModalHeader>
              <ModalBody>
                {currentProduct && (
                  <ProductForm
                    product={currentProduct}
                    onSubmit={handleEditProduct}
                    onCancel={onClose}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t("confirmDeletion")}</ModalHeader>
              <ModalBody>
                <p>{t("confirmDeleteMessage")}<strong>{currentProduct?.name}</strong>?</p>
                <p className="text-default-500 text-sm mt-2">{t("actionIrreversible")}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  {t("cancel")}
                </Button>
                <Button color="danger" onPress={handleDeleteProduct}>
                  {t("delete")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};