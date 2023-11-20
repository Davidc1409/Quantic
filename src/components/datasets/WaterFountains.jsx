export function WaterFountains ({ street, type_object, availability,noStreetPair, noStreetOdd, city, onClick}) {
    if(noStreetPair !="null"){
        return (
            <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="card-body">
                    <h5 className="nexaHeavy card-title fontColor">{type_object}</h5>
                    <p className="nexaLight">Adresse : {noStreetPair} {street}</p>
                    <p className="nexaLight">{city}</p>
                    <p className="nexaLight">Disponible : {availability}</p>
                </div>
            </div>
        )
    }
    if(noStreetOdd != "null"){
        return (
            <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="card-body">
                    <h5 className="nexaHeavy card-title fontColor">{type_object}</h5>
                    <p className="nexaLight">{noStreetOdd} {street}</p>
                    <p className="nexaLight">{city}</p>
                    <p className="nexaLight">{availability}</p>
                </div>
            </div>
        )
    }

}