export enum OrderEnum {
    ASC = "ASC",
    DESC = "DESC"
}

export enum OrderStatusEnum {
    FAILED = -2, // could not the payment or other verification required to complete the order.
    PENDING = -1, // has begun checkout process without making the necessary payments.
    ORDER_CONFIRMED = 0,
    AWAIT_PAYMENT = 1, // init payment process but is yet to pay for the product.
    AWAIT_FULFILLMENT = 2, // has made the required payments for the price of the products, and the products shall now be shipped
    AWAIT_SHIPMENT = 3, // the products bougth by the customer are now in queue ready to be shipped and are waiting to be collected by the shipment service provider.
    SHIPPED = 4, // the shipment provider has collected the products and the products are on their way to the customer.
    AWAIT_PICKUP = 5, // the product has been shipped
    COMPLETED = 6, // the product has been shipped and delivered.
    Declined = -3, // The seller declares that they cannot ship and fulfill the order.
    REFUNDED = -5, // the seller  refund the amount paid by products
    DISPUTED = -4 // has raised an issue with the order fuilfillment or the refund procedure.
}
