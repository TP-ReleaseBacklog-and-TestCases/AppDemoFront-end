import { Price } from "../value-objects/Price"
import { Stock } from "../value-objects/Stock"

export class Product {
    private published = false

    constructor(
        public readonly id: string,
        private name: string,
        private description: string,
        private category: string,
        private price: Price,
        private stock: Stock
    ) { }

    publish() {
        this.published = true
    }

    getName(): string { return this.name }
    getDescription(): string { return this.description }
    getCategory(): string { return this.category }
    getPrice(): Price { return this.price }
    getStock(): Stock { return this.stock }
    isPublished(): boolean { return this.published }

    updateName(name: string) { this.name = name }
    updateDescription(desc: string) { this.description = desc }
    updateCategory(cat: string) { this.category = cat }
    updatePrice(price: Price) { this.price = price }
    updateStock(stock: Stock) { this.stock = stock }
}
