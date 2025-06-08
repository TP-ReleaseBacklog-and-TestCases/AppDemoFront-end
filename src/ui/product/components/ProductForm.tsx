'use client'
import React from "react";
import {
  Card,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Chip,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAddProduct } from "../hooks/useAddProduct";
import { CreateProductDTO } from "@/application/product/dto/CreateProductDTO";
import { messages } from "@/messages";

export const ProductForm: React.FC = () => {
  const mutation = useAddProduct();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<CreateProductDTO>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const categories = [
    { value: "electronics", label: "Electrónica" },
    { value: "computers", label: "Computadoras" },
    { value: "audio", label: "Audio" },
    { value: "wearables", label: "Wearables" },
    { value: "accessories", label: "Accesorios" },
    { value: "office", label: "Oficina" },
    { value: "gaming", label: "Gaming" },
  ];

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Información del Producto</h3>

            <Input
              name="name"
              label="Nombre del Producto"
              placeholder="Ej: Cámara Digital HD"
              variant="bordered"
              isRequired
              value={form.name}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="price"
                type="number"
                label="Precio ($)"
                placeholder="0.00"
                variant="bordered"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                }
                isRequired
                value={String(form.price)}
                onChange={handleChange}
              />

              <Input
                name="stock"
                type="number"
                label="Stock"
                placeholder="0"
                variant="bordered"
                isRequired
                value={String(form.stock)}
                onChange={handleChange}
              />
            </div>

            <Select
              label="Categoría"
              variant="bordered"
              isRequired
              selectedKeys={form.category ? [form.category] : []}
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0] as string;
                setForm((prev) => ({ ...prev, category: val }));
              }}
            >
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>

            <Textarea
              name="description"
              label="Descripción"
              placeholder="Describe tu producto..."
              variant="bordered"
              minRows={4}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Multimedia e Información Adicional</h3>

            <div className="border-2 border-dashed rounded-lg p-4 text-center border-default-200">
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative w-full h-48 mx-auto">
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-full object-contain rounded-md"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="flat"
                      size="sm"
                      className="absolute top-2 right-2"
                      onPress={() => setImagePreview(null)}
                    >
                      <Icon icon="lucide:x" width={16} height={16} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <Icon icon="lucide:image-plus" width={48} height={48} className="text-default-400" />
                    </div>
                    <div>
                      <p className="text-default-500">Arrastra una imagen aquí o</p>
                      <label className="cursor-pointer text-primary hover:underline">
                        <span>selecciona un archivo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                    <p className="text-xs text-default-400">PNG, JPG o GIF (máx. 2MB)</p>
                  </>
                )}
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              <Input name="sku" label="SKU" placeholder="Ej: PRD-12345" variant="bordered" onChange={handleChange} />
              <Input name="barcode" label="Código de Barras" placeholder="Ej: 123456789012" variant="bordered" onChange={handleChange} />
              <Input name="weight" label="Peso (kg)" type="number" placeholder="0.00" variant="bordered" step="0.01" onChange={handleChange} />

              <div className="grid grid-cols-3 gap-2">
                <Input name="height" label="Alto (cm)" type="number" placeholder="0" variant="bordered" onChange={handleChange} />
                <Input name="width" label="Ancho (cm)" type="number" placeholder="0" variant="bordered" onChange={handleChange} />
                <Input name="length" label="Largo (cm)" type="number" placeholder="0" variant="bordered" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex justify-end gap-2">
          <Button variant="flat" color="danger" type="button">
            Cancelar
          </Button>
          <Button color="primary" type="submit" isLoading={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? messages.loading.saving : 'Guardar Producto'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
