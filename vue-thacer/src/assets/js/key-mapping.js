// This variable allows to map, for each key present in the data, the corresponding
// keys that the user can use to search.
export const keyMapping = {
  ID: ['id'],
  Pi: ['pi'],
  Inv_Fouille: ['inventaire', 'inventory', 'invfouille', 'inv-fouille', 'inv_fouille'],
  Archimage: ['archimage'],
  Num_Analyse: ['num_analyse', 'num-analyse', 'numanalyse'],
  secteur_ID: ['secteur_id', 'secteur-id', 'secteurid'],
  annee: ['annee', 'année', 'year'],
  Materiel: ['materiel', 'material'],
  Famille: ['famille', 'family'],
  Catégorie: ['catégorie', 'categorie', 'category'],
  Type: ['type'],
  Identification: ['identification'],
  Description: ['description'],
  Biblio: ['biblio', 'bibliography', 'bibliographie'],
  Période: ['période', 'periode', 'period'],
  x: ['x'],
  y: ['y'],
  geometry: ['geometry', 'geometrie', 'géometrie']
}

// Since keyMapping is human friendly but not developer friendly, we inverse it here.
// this function return this kind of result :
// { inventaire: 'Inv_Fouille', inventory: 'Inv_Fouille', invfouille: 'Inv_Fouille',
//  'inv-fouille': 'Inv_Fouille', inv_fouille: 'Inv_Fouille', archimage: 'Archimage',
//   ... }
export const getInverseKeyMapping = () => {
  let inverseKeyMapping = {}
  for (const realDataKey in keyMapping) {
    const acceptedKeysArray = keyMapping[realDataKey]
    for (const acceptedKey of acceptedKeysArray) {
      inverseKeyMapping[acceptedKey] = realDataKey
    }
  }

  return inverseKeyMapping
}

// From a key that the user want to search in, we return the corresponding
// "real" key used in the data. If not found, it will return undefined.
export function mapToRealKeyName(searchItemKey) {
  // debugger
  return getInverseKeyMapping()[searchItemKey]
}