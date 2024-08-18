

const apiRequest =async ( url='',optionObj=null) => {
    try{
        const response = await fetch(url,optionObj)
        if(!response.ok) throw Error(response.ok);
        const data = await response.json()
        return data
    }catch(err){
        return false  
    }
}

export default apiRequest