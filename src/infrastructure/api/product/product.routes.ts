import { NextRequest, NextResponse } from 'next/server'

import { ZodProductValidator } from '@/infrastructure/adapters/product/ZodProductValidator'
import { ZodUpdateProductValidator } from '@/infrastructure/adapters/product/ZodUpdateProductValidator'
import { CsvParserAdapter } from '@/infrastructure/adapters/product/CsvParserAdapter'
import { ProductRepositoryPostgres } from '@/infrastructure/persistence/ProductRepositoryPostgres'
import { AddProductUseCase } from '@/application/product/usecases/AddProductUseCase'
import { EditProductUseCase } from '@/application/product/usecases/EditProductUseCase'
import { DeleteProductUseCase } from '@/application/product/usecases/DeleteProductUseCase'
import { BulkImportProductsUseCase } from '@/application/product/usecases/BulkImportProductsUseCase'

const repo = new ProductRepositoryPostgres()
const addUC = new AddProductUseCase(repo)
const editUC = new EditProductUseCase(repo)
const deleteUC = new DeleteProductUseCase(repo)
const bulkImportUC = new BulkImportProductsUseCase(repo)

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (id) {
        const p = await repo.findById(id)
        if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json(p)
    }
    const all = await repo.findAll()
    return NextResponse.json(all)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const dto = ZodProductValidator.parseCreate(body)
    const p = await addUC.execute(dto)
    return NextResponse.json(p, { status: 201 })
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const dto = ZodUpdateProductValidator.parseUpdate(body)
    const p = await editUC.execute(dto)
    return NextResponse.json(p)
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    await deleteUC.execute(id)
    return NextResponse.json(null, { status: 204 })
}

export async function POST_IMPORT(req: NextRequest) {
    const csvText = await req.text()
    const dto = CsvParserAdapter.parse(csvText)
    const products = await bulkImportUC.execute(dto)
    return NextResponse.json(products)
}
