import React, {useEffect, useState} from 'react';
import {LocationRow} from "../locations/LocationRow.jsx";
export function GreenSpaces ({name, address, type, open_24h, zipCode, targetCollapse,treeHeight,cityDistrictList}) {
    
    const [collapseValue, setCollapseValue] = useState("false");
    const [tableLocations, setTableLocations] = useState([]);
    let districtCityValue= cityDistrictList[zipCode];
    let tableListLocations=[];
    useEffect(()=>{
        if(collapseValue == "true"){
          const fetchUrl ="https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/fontaines-a-boire/records?limit=100";
          fetch(fetchUrl)
           .then((response) => {
              if (!response.ok) {
                throw Error(response.statusText);
              }
              return response.json();
            })
           .then((data) => {
              setTableLocations(data.results);
           })
           .catch((err) => {
              console.log(err.message);
           });
        }
      }, [collapseValue]);

    if((collapseValue == "true" && districtCityValue) && (zipCode in cityDistrictList)){
        tableLocations.filter((location)=>{
            if(!location.commune.includes(districtCityValue)){
                return false;
            }
            return true;
        }).map((equipmentsActivities)=>{
            tableListLocations.push(
                <LocationRow key={equipmentsActivities.geo_point_2d.lon+equipmentsActivities.geo_point_2d.lat} name={equipmentsActivities.type_objet} noStreetPair={equipmentsActivities.no_voirie_pair} noStreetOdd={equipmentsActivities.no_voirie_impair} address={equipmentsActivities.voie+" "+equipmentsActivities.commune} available={equipmentsActivities.dispo} />
            )
            
            })
    }
   
    if(Object.keys(tableListLocations).length == 0){
        tableListLocations.push(<tr key={"Aucune fontaine à proximité"}><td colSpan="3">Aucune fontaine à proximité</td></tr>);
    }

    return (
        <>
            <div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                <div className="card-body">
                    <h5 className="nexaHeavy card-title fontColor">{name}</h5>
                    <p className="nexaLight">Adresse : {address}</p>
                    <p className="nexaLight">Code postal : {zipCode}</p>
                    <p className="nexaLight">Type : {type}</p>
                    <p className="nexaLight">Ouvert 24h/24 : {open_24h}</p>
                    <p className="nexaLight">Pourcentage d'arbre dans l'espace : {treeHeight}%</p>
                </div>
                <p className="d-inline-flex gap-1">
                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#"+targetCollapse} aria-expanded="false" aria-controls="collapseExample" onClick={(e)=>{
                        {setCollapseValue(e.target.ariaExpanded)}
                    }}>
                        A boire dans les alentours
                    </button>
                 </p>
                <div className="collapse" id={targetCollapse}>
                    <div className="card card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Adresse</th>
                                    <th>Disponible</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableListLocations}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}