export function LocationRow ({name, address, available, noStreetPair,noStreetOdd}) {
    return (
        <>
        <tr>
            <td>{name}</td>
            <td>{noStreetPair} {noStreetOdd} {address}</td>
            <td>{available}</td>
        </tr>
        </>
    )
}