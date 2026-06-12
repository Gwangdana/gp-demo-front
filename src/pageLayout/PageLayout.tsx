
export interface PageLayoutProps {
    show?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}

const PageLayout: React.FunctionComponent<PageLayoutProps> = (props) => {
    const { show=true, loading=false, children } = props;
    if (!show) {
        return null;
    }
    return (
        <div className="page-layout">
            {loading && (
                <div className="page-layout__loading">loading</div>
            )}
            <div className="page-layout__content">{children}</div>
        </div>
    );
}

export default PageLayout;