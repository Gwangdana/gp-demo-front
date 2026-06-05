import { useState, useMemo } from 'react';
import type { Product, SortType, StockFilterType } from '../types';

// 模拟产品数据（和实际项目接口返回结构对齐）
const productList: Product[] = [
    { id: 1, name: 'React入门教程', price: 59, stock: 20 },
    { id: 2, name: 'Vue实战手册', price: 79, stock: 5 },
    { id: 3, name: 'TypeScript指南', price: 49, stock: 0 },
    { id: 4, name: 'Node.js后端开发', price: 99, stock: 15 },
    { id: 5, name: '前端工程化实践', price: 69, stock: 8 },
];

export default function ProductList() {
    const [searchKey, setSearchKey] = useState<string>('');
    const [sortType, setSortType] = useState<SortType>('all');
    const [filterStock, setFilterStock] = useState<StockFilterType>('all');

    const handleSearch = (value: string) => {
        return setSearchKey(value);
    }

    const filteredProducts = useMemo(() => {
        let result = [...productList];
        if(searchKey) {
            result = result.filter(e => e.name.toLowerCase().includes(searchKey.toLowerCase()))
        }
        if(filterStock) {
            result = result.filter(e => e.stock > 0);
        }
        if(sortType === 'asc') {
            result.sort((a, b) => a.price - b.price);
        }else if(sortType === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [searchKey, sortType, filterStock]);

    return (
        <div className="product-container">
            <h1>产品查询系统（TSX版）</h1>
            <input
                type = "text"
                placeholder = "产品名称..."
                className="filter-input"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="filter-bar">
                <select
                    value={filterStock}
                    onChange={(e) => setFilterStock(e.target.value as StockFilterType)}
                >
                    <option value="all">全部</option>
                    <option value="hasStock">仅显示有库存</option>
                </select>
                <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value as SortType)}
                >
                    <option value="all">默认</option>
                    <option value="asc">价格升序</option>
                    <option value="desc">价格降序</option>
                </select>

            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                {filteredProducts.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="empty-tip">暂无匹配产品</td>
                    </tr>
                ): (
                    filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}