export const format_currency = value => {

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)

}

export const format_date = date => new Date(date).toLocaleString('pt-BR')

export const sleep = async duration => await new Promise(resolve => setTimeout(resolve, duration))
