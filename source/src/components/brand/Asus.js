function Asus({asusProduct}){
    return(
        <div>
        <h1>Asus</h1>
        {asusProduct.map(pro => (
            <div>
                {pro.name}
                <div><img src={pro.image[0]} width="10%" alt="image"/></div>
            </div>
        ))}
        </div>
    );
}
export default Asus;