/**
 * 
 * @param {( s : string)  => void } onChange
 */
export function InputDistrict ({onChange}) {
    const districtList=[
        {"arrondissement" : "75001"},
        {"arrondissement" : "75002"},
        {"arrondissement" : "75003"},
        {"arrondissement" : "75004"},
        {"arrondissement" : "75005"},
        {"arrondissement" : "75006"},
        {"arrondissement" : "75007"},
        {"arrondissement" : "75008"},
        {"arrondissement" : "75009"},
        {"arrondissement" : "75010"},
        {"arrondissement" : "75011"},
        {"arrondissement" : "75012"},
        {"arrondissement" : "75013"},
        {"arrondissement" : "75014"},
        {"arrondissement" : "75015"},
        {"arrondissement" : "75016"},
        {"arrondissement" : "75017"},
        {"arrondissement" : "75018"},
        {"arrondissement" : "75019"},
        {"arrondissement" : "75020"}
    ]

    const listOption=[]
    districtList.map(option =>{
        listOption.push(<option key={option.arrondissement} value={option.arrondissement} >{option.arrondissement}</option>)
    })

    return (
      <div className="mb-3 pe-4 ">
        <select className="form-select" aria-label="Default select example" 
        onChange={(e)=> {onChange(e.target.value)}}>
            <option value="" defaultValue={""}>Arrondissement</option>
            {listOption}
        </select>
      </div>
    )
  }