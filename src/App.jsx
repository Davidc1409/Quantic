import {Input } from "./components/forms/Input.jsx";
import {FilterCheckbox} from "./components/forms/CheckBox.jsx";
import { useState, useEffect } from "react";
import { InputSelectDataset } from "./components/forms/InputSelectDataset.jsx";
import { GreenSpaces } from "./components/datasets/GreenSpaces.jsx";
import { WaterFountains } from "./components/datasets/WaterFountains.jsx";
import {EquipementActivities} from "./components/datasets/EquipementActivities.jsx";
import {InputDistrict} from "./components/forms/InputDistrict.jsx";

// composant d'affichage des cartes de localisation et de tableau.
function LocationCards ({freshLocations,dataset,cityDistrictList}) {
  
  let listLocations = [];
  
  switch (dataset) {

    case "ilots-de-fraicheur-espaces-verts-frais" :

      freshLocations.map((location)=> {
        listLocations.push(
          <GreenSpaces key={location.geo_point_2d.lon+location.geo_point_2d.lat} zipCode={location.arrondissement} name={location.nom} address={location.adresse} type={location.type} open_24h={location.ouvert_24h} targetCollapse={location.identifiant}  treeHeight={location.proportion_vegetation_haute}  cityDistrictList={cityDistrictList}/>
        )
  
      })
      break;

      case "promener" :

      freshLocations.map((location)=> {
        listLocations.push(
          <GreenSpaces key={location.geo_point_2d.lon+location.geo_point_2d.lat} zipCode={location.arrondissement} name={location.nom} address={location.adresse} type={location.type} open_24h={location.ouvert_24h} targetCollapse={location.identifiant}  treeHeight={location.proportion_vegetation_haute}  cityDistrictList={cityDistrictList}/>
        )
  
      })
      break;

      case "jardins" :

      freshLocations.map((location)=> {
        listLocations.push(
          <GreenSpaces key={location.geo_point_2d.lon+location.geo_point_2d.lat} zipCode={location.arrondissement} name={location.nom} address={location.adresse} type={location.type} open_24h={location.ouvert_24h} targetCollapse={location.identifiant}  treeHeight={location.proportion_vegetation_haute}  cityDistrictList={cityDistrictList}/>
        )
  
      })
      break;

      case "piscine" :

      freshLocations.map((location)=> {
        listLocations.push(
          <EquipementActivities key={location.geo_point_2d.lon+location.geo_point_2d.lat} name={location.nom} address={location.adresse} type={location.type} zipCode={location.arrondissement} paidService={location.payant} targetCollapse={location.identifiant}  cityDistrictList={cityDistrictList} />
        )
  
      })
      break;

      case "shadow" : 
        freshLocations.map((location)=> {
          if(location.type=="Musée" || location.type =="Bibliothèque" || location.type== "Ombrière pérenne"){
            listLocations.push(
              <EquipementActivities key={location.geo_point_2d.lon+location.geo_point_2d.lat} name={location.nom} address={location.adresse} type={location.type} zipCode={location.arrondissement} paidService={location.payant} targetCollapse={location.identifiant}  cityDistrictList={cityDistrictList} />
            )
          
          }
          if(location.nsq_espace_vert){
            listLocations.push(
              <GreenSpaces key={location.geo_point_2d.lon+location.geo_point_2d.lat} zipCode={location.arrondissement} name={location.nom} address={location.adresse} type={location.type} open_24h={location.ouvert_24h} targetCollapse={location.identifiant}  treeHeight={location.proportion_vegetation_haute} cityDistrictList={cityDistrictList}/>
            )
          }
          
        })
        break;

      case "fontaines-a-boire" :
        freshLocations.map((location)=>{
          listLocations.push(<WaterFountains key={location.geo_point_2d.lon+location.geo_point_2d.lat} street={location.voie} type_object={location.type_objet} availability={location.dispo} noStreetPair={location.no_voirie_pair} noStreetOdd={location.no_voirie_impair} city={location.commune}  />)
        })
        break;
        

      case "ilots-de-fraicheur-equipements-activites" : 

        freshLocations.map((location)=> {
          listLocations.push(
            <EquipementActivities key={location.geo_point_2d.lon+location.geo_point_2d.lat} name={location.nom} address={location.adresse} type={location.type} zipCode={location.arrondissement} paidService={location.payant} targetCollapse={location.identifiant}  cityDistrictList={cityDistrictList} />
          )
          
        })
        break;

     

      default : break;

    }
    return (
     <div>
        <div>
          {listLocations}
        </div>
     </div>
    )
  
}

//Composant parent qui rassemble tous les composant concernant les champs et input de recherche 
function SearchBar ({showFreeService,onshowFreeServiceChange,showPaidService, OnShowPaidServiceChange,showAvailable,onAvailableChange,showOpen24,onOpen24Change, searchValue, onSearchValueChange, rangeValue, onRangeChange, inputSelectDatasetValue, onChangeDataset, districtValue,onChangeDistrict}){
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="d-flex">
        <InputSelectDataset 
          value={inputSelectDatasetValue}
          onChange={onChangeDataset}/>


      </div>
      <div className="d-flex">
        <InputDistrict 
        value={districtValue}
        onChange={onChangeDistrict}/>

        <Input 
        value={searchValue}
        onChange={onSearchValueChange}
        placeHolder="Rechercher par nom..."/>
      </div>
      <div className="d-flex gap-3 mb-3">
        <FilterCheckbox
        id="paidService"
        label="Payant"
        checked={showPaidService}
        onChange={OnShowPaidServiceChange}
        />
        <FilterCheckbox
        id="freeService"
        label="Gratuit"
        checked={showFreeService}
        onChange={onshowFreeServiceChange}
        />
        <FilterCheckbox
        id="available"
        label="Disponible"
        checked={showAvailable}
        onChange={onAvailableChange}
        />
        <FilterCheckbox
        id="open24h"
        label="Ouvert 24h/24"
        checked={showOpen24}
        onChange={onOpen24Change}
        />
      </div>
    </div>
  )
}

function App() {

  // je crée mes états et enregistre les changements
  const [showPaidService, setshowPaidService] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rangeValue, setRangeValue] = useState(0);
  const [dataset, setDataset] = useState("");
  const [freshLocations, setFreshLocations] = useState([]);
  const [districtValue, onChangeSetDistrict] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);
  const [showOpen24, setShowOpen24] = useState(false);
  const [showFreeService, setShowFreeService] = useState(false);

  const cityDistrictList = 
    {
      "75001" : "PARIS 1ER ARRONDISSEMENT" ,
      "75002" : "PARIS 2EME ARRONDISSEMENT" ,
      "75003" : "PARIS 3EME ARRONDISSEMENT" ,
      "75004" : "PARIS 4EME ARRONDISSEMENT" ,
      "75005" : "PARIS 5EME ARRONDISSEMENT" ,
      "75006" : "PARIS 6EME ARRONDISSEMENT" ,
      "75007" : "PARIS 7EME ARRONDISSEMENT" ,
      "75008" : "PARIS 8EME ARRONDISSEMENT" ,
      "75009" : "PARIS 9EME ARRONDISSEMENT" ,
      "75010" : "PARIS 10EME ARRONDISSEMENT" ,
      "75011" : "PARIS 11EME ARRONDISSEMENT" ,
      "75012" : "PARIS 12EME ARRONDISSEMENT" ,
      "75013" : "PARIS 13EME ARRONDISSEMENT" ,
      "75014" : "PARIS 14EME ARRONDISSEMENT" ,
      "75015" : "PARIS 15EME ARRONDISSEMENT" ,
      "75016" : "PARIS 16EME ARRONDISSEMENT" ,
      "75017" : "PARIS 17EME ARRONDISSEMENT" ,
      "75018" : "PARIS 18EME ARRONDISSEMENT" ,
      "75019" : "PARIS 19EME ARRONDISSEMENT" ,
      "75020" : "PARIS 20EME ARRONDISSEMENT" ,
        
    }


  //Je compose mon URL d'appel de l'API
  function paramApicall (dataset) {
    const apiRoot= "https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/";

    if(dataset == "ilots-de-fraicheur-espaces-verts-frais" || dataset== "ilots-de-fraicheur-equipements-activites"|| dataset=="fontaines-a-boire"){
      return apiRoot+dataset+"/records?LIMIT=100";
    }

  }
  
  //J'effectue mon appel API avec les fonctions fetch
  useEffect(() => {
    if(dataset == "ilots-de-fraicheur-espaces-verts-frais" || dataset== "ilots-de-fraicheur-equipements-activites"|| dataset=="fontaines-a-boire"){
      const params= paramApicall(dataset,districtValue);
      getData(params)
    }
    if(dataset == "shadow") {
      getDataShadow();
    }

    if(dataset== "promener"){

      fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?LIMIT=100")
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
         const filteredDataWalkPaths=data.results.filter((location)=>{
          if(!location.type.includes("Promenades")){
            return false;
          }
          return true;
         })
          setFreshLocations(filteredDataWalkPaths);
       })
       .catch((err) => {
          console.log(err.message);
       });
    }
    if(dataset== "jardins"){
      fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?LIMIT=100")
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
         const filteredDataGardens=data.results.filter((location)=>{
          if(!location.type.includes("Jardins") && !location.type.includes("Bois") ){
            return false;
          }
          return true;
         })
          setFreshLocations(filteredDataGardens);
       })
       .catch((err) => {
          console.log(err.message);
       });

    }
    if(dataset== "piscine"){
      fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=100")
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
         const filteredDataSwimmingpool=data.results.filter((location)=>{
          if(!location.type.includes("Piscine")){
            return false;
          }
          return true;
         })
          setFreshLocations(filteredDataSwimmingpool);
       })
       .catch((err) => {
          console.log(err.message);
       });
    }
  }, [dataset, districtValue]);


// fonction de requête API simple
  function getData(requestUrl) {
    fetch(requestUrl)
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
          setFreshLocations(data.results);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }
  
  // fonction de requête API multiple et avec filtres
  function getDataShadow(){
    let greenSpacesList= [];
    let finalList;
    let equipmentActivitiesList= [];
    fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?LIMIT=100")
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
        greenSpacesList=data.results.filter(location => {
            if(location.proportion_vegetation_haute <55){
              return false;
            }
            return true;
          })
       })
       .catch((err) => {
          console.log(err.message);
       });

       fetch("https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=100")
       .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
       .then((data) => {
          equipmentActivitiesList=data.results.filter(location =>{
            if(location.type =="Musée" || location.type =="Ombrière pérenne" || location.type=="Bibliothèque"){
              return true;
            }
            return false;
          });
          finalList= [...greenSpacesList,...equipmentActivitiesList];
          setFreshLocations(finalList);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }
  
  //Je filtre ici ma liste de localisations en fonction des filtres mises en place
  const visibleLocations = freshLocations.filter(location =>{
      let districtCityValue=cityDistrictList[districtValue];

      if(showFreeService && location.payant && !location.payant.includes("Non")){
        return false;
      }

      if(showAvailable && location.dispo && !location.dispo.includes("OUI")){
        return false;
      }
      
      if(showOpen24 && location.ouvert_24h && !location.ouvert_24h.includes("Oui") ){
        return false;
      }
      if(showPaidService && location.payant && !location.payant.includes("Oui")){
        return false;
      }
      if((searchValue && dataset!="fontaines-a-boire" && !location.nom.toLowerCase().includes(searchValue))){
        return false;
      }
      if(searchValue && dataset=="fontaines-a-boire" && !(location.no_voirie_impair+location.no_voirie_pair+" "+location.voie).toLowerCase().includes(searchValue) ){
        return false;
      }
      if( (dataset=="fontaines-a-boire" && districtValue!="" && !location.commune.includes(districtCityValue))){
        return false;
      }
      if((location.arrondissement && !location.arrondissement.includes(districtValue))) {
        return false;
      }
      return true;
  });
  return (
    <div>
      <h1 className="nexaHeavy my-4 text-center">Trouver la fraîcheur !</h1>
      <div className="container">
        <SearchBar
        showFreeService={showFreeService}
        onshowFreeServiceChange={setShowFreeService}
        showAvailable={showAvailable}
        onAvailableChange={setShowAvailable}
        showOpen24={showOpen24}
        onOpen24Change={setShowOpen24}
        showPaidService={showPaidService} 
        OnShowPaidServiceChange={setshowPaidService} 
        searchValue={searchValue} 
        onSearchValueChange={setSearchValue}
        inputSelectDatasetValue = {dataset}
        onChangeDataset={setDataset}
        districtValue={districtValue}
        onChangeDistrict={onChangeSetDistrict}
        />

        <LocationCards
        dataset={dataset} 
        freshLocations={visibleLocations}
        cityDistrictList={cityDistrictList}
        />
      </div>
    </div>
  )
}

export default App
