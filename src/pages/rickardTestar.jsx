export const Rickardtestar = () => {
    
    function smallest(foo){
        
        return Math.min.apply(Math,foo)
    }

      
    const showresult = () => {
        
    var foo = [3 , 6, 2, 56, 32, 5, 89, 32];
   
    var largest=0

    for (var i=0; i<=largest;i++){
        if (foo>largest) {
            var largest=foo[i];
        }
    }   

    var min = smallest(foo)
    var max = largest
    console.log(min)

    console.log(max)
        
    }
    return(
        <div>
            <h1 onClick={() => showresult()}>click</h1>
        </div>
    )
}
