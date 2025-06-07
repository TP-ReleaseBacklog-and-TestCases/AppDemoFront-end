export const messages = {
  success: {
    productCreated: 'Producto creado con éxito',
    productUpdated: 'Producto actualizado',
    productDeleted: 'Producto eliminado',
    inventoryUpdated: 'Inventario actualizado',
    productsImported: 'Importados {count} productos con éxito'
  },
  error: {
    loadProducts: 'Error al cargar productos',
    createProduct: 'Error al crear producto',
    updateProduct: 'Error al actualizar producto',
    deleteProduct: 'Error al eliminar producto',
    bulkImport: 'Error al importar productos'
  },
  loading: {
    products: 'Cargando productos…',
    product: 'Cargando…',
    saving: 'Guardando…',
    updating: 'Actualizando…',
    importing: 'Importando…'
  },
  confirmations: {
    deleteProduct: '¿Eliminar este producto?'
  }
} as const
