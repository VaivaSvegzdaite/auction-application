export default function ProductCard({product, variant, auctionId}) {

    return (
        <div className="card pb-2 my-4">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={product.url} className="card-img" alt=""/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <a href={`/new-auction/${product.id}`} className="card-link">
                            {variant == "PRODUCT" ? "Create or Update Auction" : "View my auction"}
                        </a>
                    </div>
                </div>
            </div>
        </div>  
    )
}