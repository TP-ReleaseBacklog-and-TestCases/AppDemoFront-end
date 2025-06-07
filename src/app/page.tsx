'use client'

import React, { useState } from 'react'
import { ProductList } from '@/ui/product/components/ProductList'
import { ProductForm } from '@/ui/product/components/ProductForm'
// import ImportCSVPage from './seller/catalog/import/page' // 🤝 ruta al componente de importación

type View = 'list' | 'new' | 'import'

export default function Home() {
  const [view, setView] = useState<View>('list')

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setView('list')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${view === 'list' ? 'bg-blue-900' : 'bg-blue-800 hover:bg-blue-700'}`}
          >
            Ver Catálogo
          </button>
          <button
            onClick={() => setView('new')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${view === 'new' ? 'bg-green-900' : 'bg-green-700 hover:bg-green-600'}`}
          >
            Agregar Producto
          </button>
          <button
            onClick={() => setView('import')}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${view === 'import' ? 'bg-indigo-900' : 'bg-indigo-700 hover:bg-indigo-600'}`}
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
