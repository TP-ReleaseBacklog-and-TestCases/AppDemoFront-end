'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Tooltip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Input,
  Card,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import Link from "next/link";
import { messages } from "@/messages";

interface ProductDTO {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  active: "success",
  out_of_stock: "warning",
  discontinued: "danger",
};

const statusTextMap: Record<string, string> = {
  active: "Activo",
  out_of_stock: "Sin Stock",
  discontinued: "Discontinuado",
};

export const ProductList: React.FC = () => {
  const { data, isLoading, isError } = useProducts();
  const deleteMutation = useDeleteProduct();
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const rowsPerPage = 8;

  const products = data ?? [];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts, rowsPerPage]);

  const handleDelete = (id: string) => {
    if (confirm(messages.confirmations.deleteProduct)) {
      deleteMutation.mutate(id);
    }
  };

  const renderCell = React.useCallback((product: ProductDTO, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ name: product.name.charAt(0), size: "sm" }}
            name={product.name}
            description={product.id}
          />
        );
      case "category":
        return <p>{product.category}</p>;
      case "price":
        return <p>${product.price.toFixed(2)}</p>;
      case "stock":
        return <p>{product.stock}</p>;
      case "status":
        const status = product.stock === 0 ? "out_of_stock" : "active";
        return (
          <Chip color={statusColorMap[status]} size="sm" variant="flat">
            {statusTextMap[status]}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="lucide:more-vertical" width={16} height={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Product Actions">
                <DropdownItem as={Link} href={`/seller/catalog/${product.id}`} startContent={<Icon icon="lucide:edit" width={16} height={16} />}>Editar</DropdownItem>
                <DropdownItem startContent={<Icon icon="lucide:trash-2" width={16} height={16} />} className="text-danger" color="danger" onPress={() => handleDelete(product.id)}>
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, []);

  if (isLoading) return <p>{messages.loading.products}</p>;
  if (isError) return <p>{messages.error.loadProducts}</p>;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-3 items-center">
            <h3 className="text-lg font-medium">Productos</h3>
            <Chip color="primary" variant="flat" size="sm">{products.length}</Chip>
          </div>
          <div className="flex gap-3">
            <Input
              classNames={{ base: "w-full sm:max-w-[44%]", inputWrapper: "h-9" }}
              placeholder="Buscar productos..."
              size="sm"
              startContent={<Icon icon="lucide:search" width={16} height={16} />}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <Link href="/seller/catalog/new">
              <Button color="primary" size="sm" startContent={<Icon icon="lucide:plus" width={16} height={16} />}>Agregar Producto</Button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            aria-label="Tabla de productos"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(p) => setPage(p)}
                />
              </div>
            }
            classNames={{ wrapper: "min-h-[400px]" }}
          >
            <TableHeader>
              <TableColumn key="name">PRODUCTO</TableColumn>
              <TableColumn key="category">CATEGORÍA</TableColumn>
              <TableColumn key="price">PRECIO</TableColumn>
              <TableColumn key="stock">STOCK</TableColumn>
              <TableColumn key="status">ESTADO</TableColumn>
              <TableColumn key="actions" className="text-right">ACCIONES</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent="No se encontraron productos">
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
