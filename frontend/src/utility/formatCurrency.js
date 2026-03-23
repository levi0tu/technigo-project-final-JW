const formatCurrency = (value) =>
    new Intl.NumberFormat("sv-SE").format(Number(value) || 0)

export { formatCurrency }