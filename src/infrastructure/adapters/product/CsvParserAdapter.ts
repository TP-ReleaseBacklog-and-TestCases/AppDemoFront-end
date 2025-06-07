import { BulkImportProductsDTO } from "@/application/product/dto/BulkImportProductsDTO"

export class CsvParserAdapter {
    static parse(csvText: string): BulkImportProductsDTO {
        const [headerLine, ...lines] = csvText.trim().split('\n')
        const headers = headerLine.split(',').map(h => h.trim())

        const products = lines.map(line => {
            const cols = line.split(',').map(c => c.trim())
            const obj: { [key: string]: string } = {}
            headers.forEach((h, i) => { obj[h] = cols[i] })
            return {
                id: obj.id || undefined,
                name: obj.name,
                description: obj.description,
                category: obj.category,
                price: Number(obj.price),
                stock: Number(obj.stock),
            }
        })

        return { products }
    }
}
