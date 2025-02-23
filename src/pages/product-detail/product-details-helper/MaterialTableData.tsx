export const getMaterialRows = (data: any) => {
    return(data?.info?.materialDetails)
}

export const getMaterialHeaderContent= ["Attribute", "Details"];
export const materialRowValuesName = ["attr_name", "attr_value"]