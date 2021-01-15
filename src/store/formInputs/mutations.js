//  Mutate Roof Data
export const mutationAddRoofs = (state, payload) => {
  state.jsonData.roofs.push(payload);
}

export const mutationDeleteRoofs = (state, payload) => {
  state.jsonData.roofs.pop();
}

export const mutationRoofs = (state, payload) => {
  state.jsonData.roofs.push(payload);
}
// Mutate Location
export const mutationCountry = (state, payload) => {
  state.jsonData.location.country = payload.country
}

export const mutationZip = (state, payload) => {
  state.jsonData.location.zip = payload.zip
}

export const mutationCity = (state, payload) => {
  state.jsonData.location.city = payload.city
}

// Mutate User Data
export const mutationSalutation = (state, payload) => {
  state.jsonData.userData.salutation = payload.salutation
}
export const mutationFirstname = (state, payload) => {
  state.jsonData.userData.firstname = payload.firstname
}

export const mutationLastname = (state, payload) => {
  state.jsonData.userData.lastname = payload.lastname
}

export const mutationEmail = (state, payload) => {
  state.jsonData.userData.email = payload.email
}

export const mutationTel = (state, payload) => {
  state.jsonData.userData.tel = payload.tel
}
export const mutationAccept = (state) => {
  state.jsonData.userData.acceptPrivacyPolicy = !state.jsonData.userData.acceptPrivacyPolicy
}
// Mutate Page Essentials
export const mutationRoofCount = (state, payload) => {
  state.pageEssentials.roofCount = payload.roofCount
}
export const mutationOneRoof = (state, payload) => {
  state.pageEssentials.oneRoof = payload.oneRoof
}
export const mutationTwoRoofs = (state, payload) => {
  state.pageEssentials.twoRoofs = payload.twoRoofs
}
export const mutationThreeRoofs = (state, payload) => {
  state.pageEssentials.threeRoofs = payload.threeRoofs
}
