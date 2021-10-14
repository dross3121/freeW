let button = document.getElementById("newFormButton")
let submitButton = document.getElementById("submit")
let newForm = document.createElement("form");
newForm.setAttribute("id", "myForm");
document.body.appendChild(newForm);


function newFormFunc() {
    // creates the form and sets attriutes when new form button is trigger by user
    let newDiv = document.createElement("div")
    let hoursNeeded = document.createElement("input");
    let fullName = document.createElement("input");
    let potential = document.createElement("input");

    newDiv.setAttribute("id", "myDiv");
    fullName.setAttribute("type", "text");
    fullName.setAttribute("id", "fullName")
    fullName.setAttribute("placeholder", "Full name");
    potential.setAttribute("type", "text");
    potential.setAttribute("id", "potentialEarning")
    potential.setAttribute("placeholder", "Potential earning");
    hoursNeeded.setAttribute("type", "text");
    hoursNeeded.setAttribute("id", "hoursNeeded");
    hoursNeeded.setAttribute("placeholder", "Hours Needed");

    newDiv.appendChild(fullName)
    newDiv.appendChild(hoursNeeded)
    newDiv.appendChild(potential)
    newForm.appendChild(newDiv)
}

let fullNameArr = []
let earningsArr = []
let hoursNeededArr = []
let capcity;
let submitForm = (e) => {
    // creates a new form when e is trigger  
    e.preventDefault()
    let earnings = document.querySelectorAll("#potentialEarning")
    let hoursNeeded = document.querySelectorAll("#hoursNeeded")
    let fullName = document.querySelectorAll("#fullName")
    earnings.forEach(earn =>{ // creates a list for potential earnings of each client
        earningsInt = parseInt(earn.value) 
        earningsArr.push(earningsInt)
    })
    hoursNeeded.forEach(hours =>{ // creates a list of all of the clients lerning hours needed
        hoursInt = parseInt(hours.value) 
        hoursNeededArr.push(hoursInt)
    })
    fullName.forEach(client => { //creates list of all input clients names
        fullNameArr.push(client.value)
    })
    classSize = parseInt(document.getElementById("class").value)
    capcity = parseInt(document.getElementById("hours").value)
    
}


let sackAlgo = (people=fullNameArr, profits=earningsArr, hour=hoursNeededArr, capacity=capcity) => {
        const n = profits.length;
        if (capacity <= 0 || n == 0 || hour.length != n) return 0;
      
        const dp = Array(profits.length)
          .fill(0)
          .map(() => Array(capacity + 1).fill(0));
      
        // populate the capacity=0 columns; with '0' capacity we have '0' profit
        for (let i = 0; i < n; i++) dp[i][0] = 0;
      
        // if we have only one hour, we will take it if it is not more than the capacity
        for (let c = 0; c <= capacity; c++) {
          if (hour[0] <= c) dp[0][c] = profits[0];
        }
      
        // process all sub-arrays for all the capacities
        for (let i = 1; i < n; i++) {
          for (let c = 1; c <= capacity; c++) {
            let profit1 = 0,
              profit2 = 0;
            // include the item, if it is not more than the capacity
            if (hour[i] <= c) profit1 = profits[i] + dp[i - 1][c - hour[i]];
            // exclude the item
            profit2 = dp[i - 1][c];
            // take maximum
            dp[i][c] = Math.max(profit1, profit2);
          }
        }
      
        let selectedPeople = []
        let totalProfit = dp[hour.length - 1][capacity];
        let remainingCapacity = capacity;
        for (let i = hour.length - 1; i > 0; i--) {
          if (totalProfit != dp[i - 1][remainingCapacity]) {
            selectedPeople.push(`${people[i]}`);
            remainingCapacity -= hour[i];
            totalProfit -= profits[i];
          }
        }
        // creates a list of names for final people and displays to dom
        if (totalProfit != 0) selectedPeople.push(`${people[0]}`);
        console.log(selectedPeople)
        selectedPeople.forEach(element => {
            console.log(element)
            var para = document.createElement("p")
            var t = document.createTextNode(element);      
            para.appendChild(t);                                    
            document.getElementById("clientsInput").appendChild(para)

        })
        
        console.log("Selected people:", selectedPeople);
      
        // maximum profit will be at the bottom-right corner.
        document.getElementById("testInput").innerHTML =`total profit and selected people: ${dp[n - 1][capacity]}`
}
let resetButton = document.getElementById("reset") // reset button
    let reset = () => {
        location.reload()
    }

submitButton.addEventListener("click",submitForm)
submitButton.addEventListener("click", sackAlgo)
button.addEventListener("click", newFormFunc)

// test cases
// var people = ['Jane', 'Bob', 'Mark', 'Jill', 'Don'];
// var profits = [1000, 3000, 2700, 5000, 3600];
// var hours = [3, 5, 4, 8, 5];
// sackAlgo(people,profits,hours, 20)


