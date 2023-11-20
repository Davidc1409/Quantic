/**
 * 
 * @param {( s : string)  => void } onChange
 */
export function InputSelectDataset ({onChange}) {
    return (
      <div className="mb-3 pe-4 ">
        <select className="form-select" aria-label="Default select example" 
        onChange={(e)=> {onChange(e.target.value)}}>
            <option value="">Où voulez-vous aller ?</option>
            <option value="ilots-de-fraicheur-espaces-verts-frais">Espaces verts</option>
            <option value="fontaines-a-boire">Fontaines à boire</option>
            <option value="ilots-de-fraicheur-equipements-activites">Équipements et activités</option>
            <option value="shadow">Trouver de l'ombre</option>
            <option value="promener">Se promener</option>
            <option value="jardins">Jardins et Bois</option>
            <option value="piscine">Se baigner</option>
        </select>
      </div>
    )
  }