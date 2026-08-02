const OFFER_FALLBACKS = {
  '10': { oldPrice: 85, discount: 20 },
  '11': { oldPrice: 85, discount: 35 },
  '12': { oldPrice: 100, discount: 25 },
}

export const getOfferPricing = (product) => {
  if (product?.category !== 'ofertas') {
    return {
      isOffer: false,
      oldPrice: null,
      discount: null,
    }
  }

  const fallback = OFFER_FALLBACKS[String(product.id)] || {}
  const oldPrice = Number(product.oldPrice ?? fallback.oldPrice)
  const currentPrice = Number(product.price)

  const calculatedDiscount = oldPrice > currentPrice
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : null

  const discount = Number(product.discount ?? fallback.discount ?? calculatedDiscount)

  return {
    isOffer: true,
    oldPrice: Number.isFinite(oldPrice) ? oldPrice : null,
    discount: Number.isFinite(discount) ? discount : calculatedDiscount,
  }
}
