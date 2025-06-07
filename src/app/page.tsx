'use client'

import React, { useState } from 'react'
import { ProductList } from '@/ui/product/components/ProductList'
import { ProductForm } from '@/ui/product/components/ProductForm'
// import ImportCSVPage from './seller/catalog/import/page' // 🤝 ruta al componente de importación

type View = 'list' | 'new' | 'import'

export default function Home() {
  const [view, setView] = useState<View>('list')

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-semibold mb-6">Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setView('list')}
            className={`w-full text-left px-4 py-2 rounded ${view === 'list' ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'
              }`}
          >
            Ver Catálogo
          </button>
          <button
            onClick={() => setView('new')}
            className={`w-full text-left px-4 py-2 rounded ${view === 'new' ? 'bg-green-700 text-white' : 'bg-green-600 text-white'
              }`}
          >
            Agregar Producto
          </button>
          <button
            onClick={() => setView('import')}
            className={`w-full text-left px-4 py-2 rounded ${view === 'import' ? 'bg-indigo-700 text-white' : 'bg-indigo-600 text-white'
              }`}
          >
            Importar CSV
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        {view === 'list' && <ProductList />}
        {view === 'new' && <ProductForm />}
        {/* {view === 'import' && <ImportCSVPage />} */}
      </main>
    </div>
  )
}
