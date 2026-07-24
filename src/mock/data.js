const productos = [
    {
        id:'01',
        name:'Random 1',
        description: 'lorem sarasa',
        stock:15,
        price:5000,
        category:'nuevos',
        img:'https://picsum.photos/200'
    },
    {
        id:'02',
        name:'Random 2',
        description: 'lorem sarasa',
        stock:35,
        price:25000,
        category:'ofertas',
        img:'https://i.postimg.cc/GpM0ZjVB/darth-vader.png'
    },

     {
        id:'03',
        name:'Random 3',
        description: 'lorem sarasa',
        stock:55,
        price:75000,
        category:'mas vendidos',
        img:'https://i.postimg.cc/vB1KCwWM/D-NQ-NP-2X-790947-MLU74201862127-012024-F.webp'
    },
    {
        id:'04',
        name:'Random 4',
        description: 'lorem sarasa',
        stock:5,
        price:51000,
        category:'nuevos',
        img:'https://picsum.photos/204'
    },
]

export const getProducts = ()=> {
    return new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(productos)
        },3000)
    })
}

export const getOneProduct = (id)=> {
    return new Promise((resolve)=> {
        let item = productos.find((prod)=> prod.id === id)
        setTimeout(()=>{
            resolve(item)
        },3000)
    })
}
