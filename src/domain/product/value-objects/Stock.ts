export class Stock {
    private constructor(private readonly quantity: number) {
        if (quantity < 0) {
            throw new Error('Stock must be non-negative')
        }
    }

    static create(quantity: number): Stock {
        return new Stock(quantity)
    }

    get value(): number {
        return this.quantity
    }

    isOutOfStock(): boolean {
        return this.quantity === 0
    }
}
