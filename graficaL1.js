
const button = document.getElementById("bto-enviar");
const TempInicial = document.getElementById("T0");
const TempAmbiental = document.getElementById("Tamb");
const TimeElegido = document.getElementById("TimeFinal");
const TempElegida = document.getElementById("TempFinal");
const divDatos = document.querySelector(".mostar-datos ");
const buttonConv = document.getElementById("bto-conv");
const tempSelect = document.getElementById("🌡️");
const timeSelect = document.getElementById("⌛");
const divCanva = document.querySelector(".😓 ");
const labK = document.createElement("DIV")
labK.classList.add("😬");

var grados;
var tiempo;
var datos2 = [];

function hallarC() {
  // console.log(TempAmbiental.value);
  let timeInicial = 0;
  numerador = TempInicial.value - TempAmbiental.value;

  denominador = Math.exp(timeInicial);
  return (numerador / denominador);
}

const printDatas = () => { //hacerle un fragmento luego
  divDatos.classList.add("mostarDatos");
  divDatos.innerHTML = `<p> la constante k para este ejercicio es: ${hallarK().toFixed(5)}</p></br>`;
  divDatos.innerHTML += `<p> la constante C para este ejercicio es: ${hallarC()}</p></br>`;
  divDatos.innerHTML += `<p> la ley que rige este ejercicio es: T = (${hallarC().toFixed(2)})*e^(${hallarK().toFixed(5)}*t) + ${TempAmbiental.value} </p></br>`;

}



function llenarData() {
  var datos = [];

  let t = 0;
  for (let i = 0; i < 1000; i++) {
    let Temp = ((hallarC() * Math.exp(hallarK() * t)) + Number(TempAmbiental.value));
    let pointXY = {
      x: t,
      y: Temp
    };
   // console.log(pointXY);
    datos.push(pointXY);
    t = t + 1;
  }
  datos2 = datos;
}

function hallarK() {
  let t = TimeElegido.value;
  let T = TempElegida.value;
  let Tamb = TempAmbiental.value;
  let c = hallarC();
  let deno1 = (T - Tamb) / c;

  // console.log(deno1);

  numerador = Math.log(deno1);//este es el logarito natural
  //  console.log(numerador);
  denominador = t;
  return (numerador / denominador);
}

const convertirTemp = () => {
  if(grados =="K°"  && tempSelect.value!="K°"){
    if(tempSelect.value =="C°" ){
      callback(T=>convKtoC(T));
    } 
    if(tempSelect.value =="F°" ){
      callback(T=>convKtoF(T)); 
    }
  }
  if(grados =="C°"  && tempSelect.value!="C°"){
    if(tempSelect.value =="K°" ){
      callback(T=>convCtoK(T)); 
    } 
    if(tempSelect.value =="F°" ){
      callback(T=>convCtoF(T)); 
    }
  }
  if(grados =="F°"  && tempSelect.value!="F°" ){
    if(tempSelect.value =="C°" ){
      callback(T=>convFtoC(T));
    } 
    if(tempSelect.value =="K°" ){
      callback(T=>convFtoK(T)); 
    }
  }

  console.log(tiempo);
  console.log(timeSelect.value);
}
const convertirTime = () => {
  if(tiempo =="sec"  && timeSelect.value!="sec"){
    if(timeSelect.value =="hour" ){
      callback2(T=>convStoH(T));
    } 
    if(timeSelect.value =="min" ){
      callback2(T=>convStoM(T)); 
    }
  }
  if(tiempo =="hour"  && timeSelect.value!="hour"){
    if(timeSelect.value =="min" ){
      callback2(T=>convHtoM(T)); 
    } 
    if(timeSelect.value =="sec" ){
      callback2(T=>convHtoS(T)); 
    }
  }
  if(tiempo =="min"  && timeSelect.value!="min" ){
    if(timeSelect.value =="sec" ){
      callback2(T=>convMtoS(T));
    } 
    if(timeSelect.value =="hour" ){
      callback2(T=>convMtoH(T)); 
    }
  }

  console.log(tiempo);
  console.log(timeSelect.value);
}
const callback2 = (funcion) => {
  TimeElegido.value=funcion(Number(TimeElegido.value));
 
};
const convCtoK = (TempCelsius) => (TempCelsius + 273.15);
const convCtoF = (TempCelsius) => (32 + (TempCelsius) * 1.8);
const convKtoC = (TempKelvi) => (TempKelvi - 273.15);
const convFtoC = (TempFahreheit) => ((TempFahreheit - 32) / 1.8);
const convKtoF = (TempKelvi) => (32 + (TempKelvi - 273.15) * 1.8);
const convFtoK = (TempFahreheit) => (((TempFahreheit - 32) / 1.8) + 273.15);


const convHtoS = (time) => (time*3600);
const convHtoM = (time) => (time*60);
const convMtoS = (time) => (time*60);
const convMtoH = (time) => (time/60);
const convStoM = (time) => (time/60);
const convStoH = (time) => (time/3600);

const callback = (funcion) => {
  TempElegida.value=funcion(Number(TempElegida.value));
  TempAmbiental.value=funcion(Number(TempAmbiental.value));
  TempInicial.value=funcion( Number(TempInicial.value));
  
};

buttonConv.addEventListener("click", (ev) => {
  convertirTime(); 
  divCanva.removeChild(labK);
  convertirTemp ();
 printDatas();
  graficar();
  grados = tempSelect.value;
  tiempo= timeSelect.value;
});







button.addEventListener("click", (ev) => {
  printDatas();
  graficar();
  grados = tempSelect.value;
  tiempo= timeSelect.value;
});



var ctx = document.getElementById('myChart');

var stackedLine = new Chart(ctx, null);

const graficar = () => {


  labK.innerHTML = `<p>  K = ${hallarK().toFixed(5)}</p>`

   



  divCanva.style.backgroundColor= "#fff";
  divCanva.appendChild(labK);
  Chart.overrides.line.spanGaps = true;
  console.log(llenarData());

  const data1 = {
    datasets: [{
      label: 'Scatter Dataset',
      data: datos2,
      backgroundColor: 'rgb(255, 99, 132)'
    }],
  };




  stackedLine.destroy();



  stackedLine = new Chart(ctx, {
    type: 'scatter',
    data: data1,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  });





}
