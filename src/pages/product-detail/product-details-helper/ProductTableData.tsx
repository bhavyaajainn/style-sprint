
export const getProductRows = (data: any) => {
    const rows = data?.info?.productDetails?.map((product: any) => {
        return { "name": product.attr_name, "value": product.attr_value };
    });
    return rows;
}

export const getProductHeaderContent= ["Attribute", "Details"];
export const rowValuesName = ["name", "value"]