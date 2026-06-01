import {useState} from "react";

type Product = {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
};

type ProductCategoryRowProps = {
    category: string;
};

type ProductRowProps = {
    product: Product;
};

type ProductTableProps = {
    products: Product[];
    filterText: string;
    inStockOnly: boolean;
};

type FilterableProductTableProps = {
    products: Product[];
};

type SearchBarProps = {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (text: string) => void;
    onInStockOnlyChange: (checked: boolean) => void;
};


function ProductCategoryRow({ category }: ProductCategoryRowProps) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    );
}

function ProductRow({ product }: ProductRowProps) {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red' }}>
      {product.name}
    </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
    const filteredProducts = products.filter(product => {
        const matchesFilter = product.name.toLowerCase().includes(filterText.toLowerCase());
        const matchesStock = !inStockOnly || product.stocked;
        return matchesFilter && matchesStock;
    });

    const rows = [];
    let lastCategory: string | null = null;

    filteredProducts.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
            );
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name} />
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange} : SearchBarProps) {
    return (
        <form>
            <input
                type="text"
                value={filterText}
                placeholder="Search..."
                onChange={(e) => onFilterTextChange(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function FilterableProductTable({ products }: FilterableProductTableProps) {
    const [filterText, setFilterText] = useState<string>('');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
                 />
            <ProductTable products={products}
                          filterText={filterText}
                          inStockOnly={inStockOnly} />
        </div>
    );
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
    return <FilterableProductTable products={PRODUCTS} />;
}
