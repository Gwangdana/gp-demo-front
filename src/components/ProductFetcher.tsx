import type {Product} from "../types";
import {useEffect, useState} from "react";

export default function ProductFetcher() {
    const [list, setList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await new Promise(res => setTimeout(res, 1000));
            const data: Product[] = [
                {id:1, name:'A', price: 11, stock: 10},
                {id:2, name:'B', price: 12, stock: 0},
            ];
            setList(data);
            setLoading(false);
        }
        getData();
    }, []);
    if(loading) return <div>加载中...</div>
    return <div>
        <h2>商品列表</h2>
        {list.map((item: Product) => (
            <div key={item.id}>{item.name}{item.price}元</div>
        ))}
    </div>
}