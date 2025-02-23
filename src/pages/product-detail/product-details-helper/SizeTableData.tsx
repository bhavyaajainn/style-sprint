
export const getSizeRows = (data: any) => {
    //@ts-ignore
    if(data?.info?.attrSizeDict){
        const sizeLabels= Object.keys(data?.info?.attrSizeDict)
    return(sizeLabels.map((size)=>{
        let sizeRows= data?.info?.attrSizeDict[size];
        const rows = sizeRows?.reduce((acc: any, obj: any) => {
            return { ...acc, ...obj };
        }, {});
        if(rows){
        rows["Size"]= size}
        return(rows)
    }))}
    else{
        return []
    }
   
}

export const getSizeHeaderContent=(data:any)=>{
    //@ts-ignore
    let headerContent = data?.info?.attrSizeDict && Object.keys(Object.values(data?.info?.attrSizeDict)[0]?.reduce((acc: any, obj: any) => {
        return { ...acc, ...obj };
    }, {}));
    headerContent?.unshift("Size");
    return(headerContent)
}

