

class Game {
    constructor() {
        this.state = {
            Players: [],
            currentPlayer: {},
            currentTotal: 0,
            
        }
    }

 
    currenter =()=>
    {
        
        const currents = document.querySelectorAll(".player")
        for(let i = 0 ; i < currents.length  ; i++)
        {
            currents[i].classList.remove("activeUser");
        }

        const id = this.state.currentPlayer.index ; 
        let current = document.getElementById(`player-${id}`);
        current.classList.add("activeUser");
    }

    AddPlayer = (name) => {
        this.state.Players.push({
            name,
            index: this.state.Players.length,
            total: 0
        });
    }
    changePlayer = () => {
        if (this.state.currentPlayer.index == this.state.Players.length - 1) {
            this.state.currentPlayer = this.state.Players[0];
        } else {

            this.state.currentPlayer = this.state.Players[this.state.currentPlayer.index + 1];
        }
        this.currenter();
    }

    RollDice=()=>
    {
        const Dice =Math.trunc(Math.random() * 6) + 1;
        const IMG = document.getElementById("rollImage");
        IMG.setAttribute("src" , `./img/dice-${Dice}.png`);
        const current = document.getElementById("currentTotal");
        if(Dice === 1)
        {
            
            this.state.currentTotal = 0 ; 
            this.changePlayer();
        }
        else
        {
            
            this.state.currentTotal += Dice ; 
        }
        current.innerHTML = this.state.currentTotal;
    }
    hold = ()=>
    {
        this.state.currentPlayer.total += this.state.currentTotal;
        if(this.state.currentPlayer.total>=100)
        {
            const winner = document.getElementById(`player-${this.state.currentPlayer.index}`);
            winner.classList.add("winner");
        }
        else
        {
            const id = this.state.currentPlayer.index ; 
            let current = document.querySelector(`#player-${id}  p`);
            current.innerHTML=this.state.currentPlayer.total;
            this.changePlayer();
            this.state.currentTotal = 0 ; 
            const currentTot = document.getElementById("currentTotal");
            currentTot.innerHTML = this.state.currentTotal;
        }

    }
}

const starter = document.getElementById("prebutton");

const usertemp = (id, name, total) => {

    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", `player-${id}`);
    newDiv.setAttribute("class", "player");
    const newName = document.createElement("h3");
    newName.setAttribute("class", "playerName");
    newName.innerHTML = name;
    const newP = document.createElement("p");
    newP.setAttribute("class", "total");
    newP.innerHTML = total;
    newDiv.appendChild(newName);
    newDiv.appendChild(newP);
    return newDiv;

    // `
    //     <div class="player"id =${`player${id}`}>
    //         <h3 class="playerName">${name} </h3>
    //         <p class="total" >${total}</p>
    //     </div>
    //     `


}


const dialog = document.getElementById("dialog");
const playGround = document.getElementById("playGround")




const createGame = (e)=>
{
    const myGame = new Game();
    const count = document.getElementById("preInput").value;
    if (count >= 2 && count <= 6) {
        dialog.classList.add("hidePre");
        playGround.classList.remove("hidePre");
        
        const playersArea = document.getElementById("playersArea");
        for (let i = 0; i < count; i++) {
            myGame.AddPlayer(prompt(`player ${i} name :`));
        }
        
        for (let i = 0; i < myGame.state.Players.length; i++) {
            const newUser = usertemp(myGame.state.Players[i].index, myGame.state.Players[i].name, 0);
            playersArea.appendChild(newUser);
        }
        myGame.state.currentPlayer = myGame.state.Players[0];
        myGame.changePlayer();
        const Dicer = document.getElementById("RollDice");
        Dicer.addEventListener("click",()=>myGame.RollDice());
        const holder = document.getElementById("holder");
        holder.addEventListener("click" ,()=> myGame.hold());
    } else {
        alert("count should be more than 1 and fewer than 7");
    }
}
starter.onclick = createGame;



