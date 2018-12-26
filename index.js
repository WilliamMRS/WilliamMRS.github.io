/*jslint devel: true */

function winInit() {
    initialProgress = 56;
    counter = 0;
    progressText = document.getElementById("progressText");

    progressText.style.width = "0%";
    progressText.innerHTML = "0%";
    let progressCounter = 0;

    function loadAnimation() {
        if(initialProgress!==progressCounter){
            animationTimer = initialProgress/progressCounter;
        }else{
            animationTimer = 500;
        }
        setTimeout(loadAnimation, animationTimer);
        if (progressCounter < initialProgress) {
            progressCounter += 0.1;
            progressCounter = progressCounter.toFixed(2);
            progressCounter = parseFloat(progressCounter);
            progressText.style.width = progressCounter + "%";
            progressText.innerHTML = progressCounter + "%";
        }else{
            if(counter <= 4){
                switch(counter) {
                    case 0:
                    progressText.innerHTML = progressCounter + "%";
                      counter +=1;
                      break;
                    case 1:
                    progressText.innerHTML = progressCounter + "%.";
                      counter +=1;
                      break;
                    case 2:
                    progressText.innerHTML = progressCounter + "%..";
                      counter += 1;
                      break
                      case 3:
                      progressText.innerHTML = progressCounter + "%...";
                        counter = 0;
                        break
                  }
            }
        }
        if(progressCounter > initialProgress){
            progressText.style.width = initialProgress + "%";
            progressText.innerHTML = initialProgress + "%";
        }
    }

    loadAnimation();
}
window.onload = winInit;