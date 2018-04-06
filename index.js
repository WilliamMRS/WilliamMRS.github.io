/*jslint devel: true */

function winInit() {

    //Canvas handles
    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");

    //Load Images
    vindmolleStolpe = document.getElementById("vindmolleStolpe");
    vindmolleBlad = document.getElementById("vindmolleBlad");
    bjoerkblad = document.getElementById("bjoerkblad");
    bjoerkblad2 = document.getElementById("bjoerkblad1");
    standard_bjoerk = document.getElementById("standard_bjoerk");
    info = document.getElementById('info');
    windSound = document.getElementById('windSound');
    orkanMusic = document.getElementById('orkanMusic');
    orkan = false;

    nyanCat = document.getElementById('nyanCat');

    nyanLeader = new NyanCat(-12, randomNumber(600));
    nyan1 = new NyanCat(-120, randomNumber(600));
    nyan2 = new NyanCat(-24, randomNumber(600));
    nyan3 = new NyanCat(-240, randomNumber(600));
    nyan4 = new NyanCat(-112, randomNumber(600));
    nyan5 = new NyanCat(-340, randomNumber(600));
    nyan6 = new NyanCat(-230, randomNumber(600));
    nyan7 = new NyanCat(-218, randomNumber(600));
    nyan8 = new NyanCat(-101, randomNumber(600));
    nyan9 = new NyanCat(-10, randomNumber(600));

    nyanspeed = 10;

    nyanLeaderSpeed = nyanspeed * randomNumber(3, 1);
    nyan1speed = nyanspeed * randomNumber(3, 1);
    nyan2Speed = nyanspeed * randomNumber(3, 1);
    nyan3Speed = nyanspeed * randomNumber(3, 1);
    nyan4Speed = nyanspeed * randomNumber(3, 1);
    nyan5Speed = nyanspeed * randomNumber(3, 1);
    nyan6Speed = nyanspeed * randomNumber(3, 1);
    nyan7Speed = nyanspeed * randomNumber(3, 1);
    nyan8Speed = nyanspeed * randomNumber(3, 1);
    nyan9Speed = nyanspeed * randomNumber(3, 1);

    bladeRotation = 0;
    windSpeed = 0;
    setInterval(refreshProgram, 1000/60);
}

window.onload = winInit;

    løvblåser = function(power, oscillation){

        blad = {
            x: 0,
            y: 0,
            draw: ctx.drawImage(bjoerkblad,this.x,this.y),
            draw2: ctx.drawImage(bjoerkblad1,this.x,this.y)
        }

        switch(power){
            case 1:
            
            break;
            case 2:

            break;
        }

    }

    playSound = function(){
        windSound.play();
    }

    soundInterval = 0;

   vindStille = function(){
    windSound.pause();
    info.innerHTML = "Stille 0–0.2 m/s";
    windSpeed = 0.1;
    orkan = false;
    clearInterval(soundInterval);
    orkanMusic.pause();
   }

   lettBris = function(){
    clearInterval(soundInterval);
    windSound.pause();
    info.innerHTML = "Lett Bris 3.4–5.4 m/s";
    løvblåser(1);
    windSpeed = 0.5;
    orkan = false;
    windSound.play();
    soundInterval = setInterval(playSound, 30000);
    orkanMusic.pause();
   }

   stivKuling = function(){
    clearInterval(soundInterval);
    windSound.pause();
    info.innerHTML = "Stiv Kuling 13.9–17.1 m/s";
    løvblåser(2);
    windSpeed = 1;
    orkan = false;
    windSound.play();
    soundInterval = setInterval(playSound, 30000);
    orkanMusic.pause();
   }

refreshProgram = function(){
    updateVariables();
    renderFrame();
}

updateVariables = function(){
    bladeRotation += windSpeed;
}

class NyanCat{
	constructor(x,y){
		// Bilen har modellnavn,farge og startposisjon posisjon.
		this.x = x;
		this.y = y;  
	}
	tegn(){ // Metode for å tegne
        ctx.drawImage(nyanCat, this.x, this.y);
	}
	flytt(x, y){ // Metode for å beregne forflytning (vektor)
		this.x = this.x + x;
		this.y = this.y + y;
	}
	get posisjon(){ // En get metode leverer en verdi fra klassen, her en array
		return [this.x,this.y];
	}
}

renderFrame = function(){
    if(orkan === true){
        updateVariables();
        drawbackground();
        drawRotatedImage(500, 0, standard_bjoerk, bladeRotation);
        drawHouse();
        drawRotatedImage(700, 500, vindmolleStolpe, bladeRotation);
        drawRotatedImage(701, 50, vindmolleBlad, bladeRotation);

        nyanLeader.flytt(nyanLeaderSpeed, 0);
        nyanLeader.tegn();
        nyan1.flytt(nyan1speed, 0);
        nyan1.tegn();
        nyan2.flytt(nyan2Speed, 0);
        nyan2.tegn();
        nyan3.flytt(nyan3Speed, 0);
        nyan3.tegn();
        nyan4.flytt(nyan4Speed, 0);
        nyan4.tegn();
        nyan5.flytt(nyan5Speed, 0);
        nyan5.tegn();
        nyan6.flytt(nyan6Speed, 0);
        nyan6.tegn();
        nyan7.flytt(nyan7Speed, 0);
        nyan7.tegn();
        nyan8.flytt(nyan8Speed, 0);
        nyan8.tegn();
        nyan9.flytt(nyan9Speed, 0);
        nyan9.tegn();

        if (nyanLeader.x > 1000) {
            nyanLeader.x = -12; 

            nyanLeaderSpeed = nyanspeed * randomNumber(3, 1);
            nyan1speed = nyanspeed * randomNumber(3, 1);
            nyan2Speed = nyanspeed * randomNumber(3, 1);
            nyan3Speed = nyanspeed * randomNumber(3, 1);
            nyan4Speed = nyanspeed * randomNumber(3, 1);
            nyan5Speed = nyanspeed * randomNumber(3, 1);
            nyan6Speed = nyanspeed * randomNumber(3, 1);
            nyan7Speed = nyanspeed * randomNumber(3, 1);
            nyan8Speed = nyanspeed * randomNumber(3, 1);
            nyan9Speed = nyanspeed * randomNumber(3, 1);
        }
        if(nyan1.x > 1000) nyan1.x = -24;
        if(nyan2.x > 1000) nyan2.x = -240;
        if(nyan3.x > 1000) nyan3.x = -112;
        if(nyan4.x > 1000) nyan4.x = -340;
        if(nyan5.x > 1000) nyan5.x = -230;
        if(nyan6.x > 1000) nyan6.x = -218;
        if(nyan7.x > 1000) nyan7.x = -101;
        if(nyan8.x > 1000) nyan8.x = -10;
        if(nyan9.x > 1000) nyan9.x = -10;
    }else{
        drawbackground();
        ctx.drawImage(standard_bjoerk,500,0);
        drawHouse();
        ctx.drawImage(vindmolleStolpe,700,50);
        drawRotatedImage(701, 50, vindmolleBlad, bladeRotation);
    }
}

drawRotatedImage = function(x, y, obj, angle){
    ctx.translate(x + obj.width/2, y + obj.height/2);
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(obj, -obj.width/2, -obj.height/2);
    ctx.rotate(- angle * Math.PI/180);
    ctx.translate(-x - obj.width/2, - y - obj.height/2);
}

drawbackground = function(){ //draw Grass and sky
    drawFilledSquare({
        ctx: ctx,
        x: 0,
        y: 600,
        height: 1000,
        width: 1000,
        color: "skyblue"
    })
    drawFilledCircle({
    ctx: ctx,
    x: 250,
    y: 2000,
    size: 1600,
    color: "Green",
    });
}

drawHouse = function(){ //draw House
    drawFilledSquare({
        ctx: ctx,
        x: 100,
        y: 500,
        height: 250,
        width: 500,
        color: "rgb(153, 4, 21)",
    });
    drawFilledSquare({
        ctx: ctx,
        x: 150,
        y: 400,
        height: 80,
        width: 80,
        color: "#5496d8", 
    })
    drawFilledSquare({
        ctx: ctx,
        x: 350,
        y: 400,
        height: 80,
        width: 80,
        color: "#5496d8", 
    })
    drawFilledSquare({
        ctx: ctx,
        x: 480,
        y: 500,
        height: 160,
        width: 80,
        color: "rgb(102, 29, 29)",
    })
    drawFilledTriangle({
        ctx: ctx,
        x: 600,
        y: 250,
        height: -80,
        width: -250,
        color: "grey",
    });
    drawFilledTriangle({
        ctx: ctx,
        x: 100,
        y: 250,
        height: -80,
        width: 250,
        color: "grey",
    });
}

superOrkan = function(){
    console.log("lmaoo");
    info.innerHTML = 'lmaoo';
    windSpeed = 20;
    orkan = true;
    orkanMusic.play();
}