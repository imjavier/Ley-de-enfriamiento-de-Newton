  const Tamb = document.getElementById("Tamb");
  const T0 = document.getElementById("T0");
  const TimeFinal = document.getElementById("TimeFinal");
  const TFinal = document.getElementById("TempFinal");
  const resul = document.querySelector(".resultado");

 const openModal = (mensaje) =>{
    resul.innerHTML = mensaje;
 }

  button.addEventListener("click",(ev) =>{  
    let resultado,mensaje ;
    
    try {
 
            res1=parseInt(TFinal.value);
            res2=parseInt(T0.value);
            res3=parseInt(TimeFinal.value);
            res4=parseInt(Tamb.value);
                 mensaje=" <br> datos validos"; 
                
                 
        if (isNaN(res1)   || isNaN(res2) || isNaN(res3) || isNaN(res4)  ) {
            console.log("error");
            throw "error";
        }else{
        
                resul.classList.toggle("red-resultado",false);
                resul.classList.add("green-resultado");
        }
        

    } catch (er) {
                 
    if (TFinal.type != "number" || T0.type != "number" || TimeFinal.type != "number" ||Tamb.type != "number"  ) {
        resul.classList.toggle("green-resultado",false);
        resul.classList.add("red-resultado");
         resultado="¿Sos gracioso?";
       mensaje=" intentaste hackear el sitio";
    }else{
        resultado="Indefinido :";
        mensaje="digite los valores";
    }
     
     
    } 
    openModal(mensaje) ;  
    
   
   
 }) ;



