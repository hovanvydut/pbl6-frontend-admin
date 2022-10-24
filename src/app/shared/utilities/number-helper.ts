declare global {
    interface Number {
        toFormat: () => string;
        toFormatIntegerNumber: () => string;
        round: (decimal: number) => number;

        isIntegerNumber: () => boolean;
    }
}

Number.prototype.toFormatIntegerNumber = function(): string {
    // format number 1234567 to 1,234,567
    return `${this}`.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Number.prototype.toFormat = function(format: string = '#,###'): any {
    if (this < 1000) {
        return this;
    }
    //
    switch (format) {
        case '#,###':
            return this.toFormatIntegerNumber();
        case '#,###.#':
            const numberArr: string[] = this.toString().split('.');
            const floatPart: string = numberArr.length === 2 ? numberArr[1] : null;
            return floatPart
                ? parseFloat(numberArr[0]).toFormatIntegerNumber() + '.' + floatPart
                : parseFloat(numberArr[0]).toFormatIntegerNumber() + '.' + '00';
    }
};

Number.prototype.round = function(decimal: number): number {
    return Math.round(this * Math.pow(10, decimal)) / Math.pow(10, decimal);
};

Number.prototype.isIntegerNumber = function(): boolean {
    return typeof this === 'number' && !isNaN(this) && Number.isInteger(this);
};

export {};
