// Utility functions for formatting dates and prices in asset rates components

/**
 * Formats a date into a human-readable string
 */
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date)
}

/**
 * Formats a price as USD currency
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price)
}
