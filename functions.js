function check_name(){
    let ch = document.getElementById("A").value;
    ch=ch.toUpperCase();
    i=0;
    verife=true;
    do
      {
        if (     (ch.charAt(i)>="A")&& (ch.charAt(i)<="Z")      )
           {i++;}
        else
           { verife=false;}
      }
    while (   (verife) && (i<ch.length)   );
    if(verife==false){
        alert("verife votre name")
    };
}

function check_mail(){
    let email = document.getElementById("B").value;
      if (email.length > 50) {
        alert("l'adresse email ne doit pas depasser 50 caractere");
        return false;
      }
      let ch1 = email.slice(0, email.indexOf("@"));
      let ch2 = email.slice(email.indexOf("@") + 1, email.lastIndexOf("."));
      let ch3 = email.slice(email.lastIndexOf(".") + 1, email.length );
    console.log([ch1,ch2,ch3])
      var letterNumber = /^[0-9a-zA-Z]+$/;
      if (
        ch1.match(letterNumber) == false ||
        ch2.match(letterNumber) == false ||
        ch1.length < 3 ||
        ch3.length < 2 ||
        ch3.length > 4
      ) {
        alert("verifier votre email");
        return false;
    }
}

function check_tel(){
    let tel = document.getElementById("N").value;
    if(tel.length!=8 || parseInt(tel[0])<=1){
    alert("verife votre tel")
    }
}

function check_date(){
  let Bdate = document.getElementById("D").value;
  if (Bdate == "") {
  alert("verifier vote date de naissance");
  return false;
  }
  let Bday = +new Date(Bdate);
  let age = Math.round((Date.now() - Bday) / 31557600000);
  localStorage.setItem("age",age)
}

function check_maladie(e){
  malade = 0
  e.preventDefault();
  var ele = document.getElementsByClassName("mal"); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
          malade=malade+1
        }
  }
  localStorage.setItem("malade",malade)
  window.open('formulaire2.html',"_self")
}
document.getElementById('malf').addEventListener('submit',check_maladie);
document.getElementById('form').addEventListener('submit',calcul_score_1);

function calcul_score_1(e){
    e.preventDefault();
    if(window.location.href.search("formulaire2.html")>-1){
        score=0
        const array1 = ['groupe1', 'groupe2', 'groupe3'];
        array1.forEach(update_score)
        localStorage.setItem("score",score)
        window.open('formulaire3.html',"_self")
    } else {
        score= parseInt(localStorage.getItem("score"))
        const array1 = ['groupe4', 'groupe5', 'groupe6'];
        array1.forEach(update_score)
        localStorage.setItem("score",score)
        window.open('formulaire4.html',"_self")
    }
}

function calcul_score_2(){
    score= parseInt(localStorage.getItem("score"))
    const array1 = ['groupe7', 'groupe8', 'groupe9'];
    array1.forEach(update_score)
    localStorage.setItem("score",score)
    affichage_resultat(score)
}

function update_score(value){
    var ele = document.getElementsByName(value); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            score=score + parseInt(ele[i].value);
        }
    }
}

function affichage_resultat(score){
  jomla = ""
  maladie=parseInt(localStorage.getItem("malade"))
  console.log(maladie)
  age=parseInt(localStorage.getItem("age"))

  if (score < 7 && age < 65) {
    jomla ="Vous devirez aller bien, mais faites attention à vous, et n’oubliez pas de respecter les gestes barrières."
  } 
  if (score < 7 && age > 65) {
    jomla ="Vous devirez aller bien, mais vous devriez rester confiné chez vous."
  }
  if (score >= 7 && score <= 18 && maladie == 0) {
    jomla ="Vous avez des majeurs symptômes du COVID-19. Vous devriez vous confiner au plus vite, et faire un test de dépistage"
  }
  if (score > 7 && score < 18 && maladie > 0) {
    jomla ="Précipitez-vous au centre COVID le plus proche pour être pris en charge."
  }
  if (score > 18) {
    jomla ="Précipitez-vous au centre COVID le plus proche pour être pris en charge."
  }
  document.getElementById('scorik').innerHTML= jomla
}
