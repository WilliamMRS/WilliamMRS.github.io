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

renderFrame = function(){
    if(orkan === true){
        updateVariables();
        drawbackground();
        drawRotatedImage(500, 0, standard_bjoerk, bladeRotation);
        drawHouse();
        drawRotatedImage(700, 500, vindmolleStolpe, bladeRotation);
        drawRotatedImage(701, 50, vindmolleBlad, bladeRotation);
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