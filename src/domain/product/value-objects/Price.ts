export class Price {
    private constructor(private readonly amount: number) {
        if (amount < 0) {
            throw new Error('Price must be non-negative')
        }
    }

    static create(amount: number): Price {
        return new Price(amount)
    }

    get value(): number {
        return this.amount
    }
}
