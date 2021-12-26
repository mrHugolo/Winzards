export const Rickardtestar = () => {
    const showresult = () => {
        var tal1 = +(prompt("Skriv in ett tal"))
        var tal2 = +(prompt("Skriv in ett tal till"))
        var summa = tal1 + tal2
        var text = "Sanningen är att "
        
        if(tal1 > tal2){
            document.write(text + tal1 + " är större än " + tal2 + " och om de adderas blir värdet " + summa)
        }
        else if(tal1 < tal2){
            document.write(text + tal1 + " är mindre än " + tal2 + " och om de adderas blir värdet " + summa)
        }
        else{
            document.write(text + tal1 + " är lika stort som " + tal2 + " och om de adderas blir värdet " + summa)
        }
    }
    return(
        <div>
            <h1 onClick={() => showresult()}>click</h1>
        </div>
    )
}
