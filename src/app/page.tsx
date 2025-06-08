'use client'
import React from "react";
import { Navbar, NavbarBrand, Tabs, Tab, Card, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ProductList } from "@/ui/product/components/ProductList";
import { ProductForm } from "@/ui/product/components/ProductForm";
import { ImportCSV } from "@/ui/product/components/ImportCSV";

type View = "list" | "new" | "import";

export default function Home() {
  const [selected, setSelected] = React.useState<View>("list");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isBordered className="border-b border-divider">
        <NavbarBrand>
          <Icon icon="lucide:shopping-bag" width={24} height={24} className="text-primary" />
          <p className="font-semibold text-inherit ml-2">Catálogo de Productos</p>
        </NavbarBrand>
      </Navbar>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-divider bg-content1 hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Panel de Control</h2>
            <div className="space-y-2">
              <SidebarButton
                icon="lucide:grid"
                label="Ver Catálogo"
                isActive={selected === "list"}
                onClick={() => setSelected("list")}
              />
              <SidebarButton
                icon="lucide:plus-circle"
                label="Agregar Producto"
                isActive={selected === "new"}
                onClick={() => setSelected("new")}
                color="success"
              />
              <SidebarButton
                icon="lucide:upload"
                label="Importar CSV"
                isActive={selected === "import"}
                onClick={() => setSelected("import")}
                color="secondary"
              />
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4">
          <Card className="md:hidden mb-4">
            <Tabs
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={setSelected as any}
              className="w-full"
              variant="solid"
              color="primary"
            >
              <Tab
                key="list"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:grid" />
                    <span>Catálogo</span>
                  </div>
                }
              />
              <Tab
                key="new"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:plus-circle" />
                    <span>Agregar</span>
                  </div>
                }
              />
              <Tab
                key="import"
                title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:upload" />
                    <span>Importar</span>
                  </div>
                }
              />
            </Tabs>
          </Card>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              {selected === "list" && "Catálogo de Productos"}
              {selected === "new" && "Agregar Nuevo Producto"}
              {selected === "import" && "Importar Productos desde CSV"}
            </h1>
            <p className="text-default-500">
              {selected === "list" && "Gestiona tu inventario de productos"}
              {selected === "new" && "Crea un nuevo producto para tu catálogo"}
              {selected === "import" && "Importa múltiples productos desde un archivo CSV"}
            </p>
          </div>

          <Spacer y={2} />

          <div className="w-full">
            {selected === "list" && <ProductList />}
            {selected === "new" && <ProductForm />}
            {selected === "import" && <ImportCSV />}
          </div>
        </main>
      </div>
    </div>
  );
}

interface SidebarButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  color?: "primary" | "success" | "secondary";
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, isActive, onClick, color = "primary" }) => {
  const baseClasses = "flex items-center gap-2 w-full p-3 rounded-md transition-colors text-left";
  const colorClasses = {
    primary: isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5 text-foreground",
    success: isActive ? "bg-success/10 text-success" : "hover:bg-success/5 text-foreground",
    secondary: isActive ? "bg-secondary/10 text-secondary" : "hover:bg-secondary/5 text-foreground",
  };
  return (
    <button className={`${baseClasses} ${colorClasses[color]}`} onClick={onClick}>
      <Icon icon={icon} width={18} height={18} />
      <span>{label}</span>
    </button>
  );
};
