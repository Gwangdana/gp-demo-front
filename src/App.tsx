function ExpensiveComponent({ data, onClick }) {
    const processedData = expensiveProcessing(data);

    const handleClick = (item) => {
        onClick(item.id);
    };

    return (
        <div>
            {processedData.map(item => (
                <Item key={item.id} onClick={() => handleClick(item)} />
            ))}
        </div>
    );
}