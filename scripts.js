let button = document.getElementById("newFormButton")
let submitButton = document.getElementById("submit")
let newForm = document.createElement("form");
newForm.setAttribute("id", "myForm");
document.body.appendChild(newForm);


function newFormFunc() {
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
    // code to sort students goes here  
    e.preventDefault()
    let earnings = document.querySelectorAll("#potentialEarning")
    let hoursNeeded = document.querySelectorAll("#hoursNeeded")
    let fullName = document.querySelectorAll("#fullName")
    earnings.forEach(earn =>{
        earningsInt = parseInt(earn.value) 
        earningsArr.push(earningsInt)
    })
    hoursNeeded.forEach(hours =>{
        hoursInt = parseInt(hours.value) 
        hoursNeededArr.push(hoursInt)
    })
    fullName.forEach(client => {
        fullNameArr.push(client.value)
        console.log(fullNameArr)
    })
    classSize = parseInt(document.getElementById("class").value)
    capcity = parseInt(document.getElementById("hours").value)

}


let knapsack = (people=fullNameArr, profits=earningsArr, weights=hoursNeededArr, capacity=capcity) => {
        const n = profits.length;
        
        if (capacity <= 0 || n == 0 || weights.length != n) return 0;
      
        const dp = Array(profits.length)
          .fill(0)
          .map(() => Array(capacity + 1).fill(0));
      
        // populate the capacity=0 columns; with '0' capacity we have '0' profit
        for (let i = 0; i < n; i++) dp[i][0] = 0;
      
        // if we have only one weight, we will take it if it is not more than the capacity
        for (let c = 0; c <= capacity; c++) {
          if (weights[0] <= c) dp[0][c] = profits[0];
        }
      
        // process all sub-arrays for all the capacities
        for (let i = 1; i < n; i++) {
          for (let c = 1; c <= capacity; c++) {
            let profit1 = 0,
              profit2 = 0;
            // include the item, if it is not more than the capacity
            if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
            // exclude the item
            profit2 = dp[i - 1][c];
            // take maximum
            dp[i][c] = Math.max(profit1, profit2);
          }
        }
      
        let selectedPeople = []
        let selectedWeights = '';
        let totalProfit = dp[weights.length - 1][capacity];
        let remainingCapacity = capacity;
        for (let i = weights.length - 1; i > 0; i--) {
          if (totalProfit != dp[i - 1][remainingCapacity]) {
            selectedPeople.push(`${people[i]}`);
            selectedWeights = `${weights[i]} ${selectedWeights}`;
            remainingCapacity -= weights[i];
            totalProfit -= profits[i];
          }
        }
      
        if (totalProfit != 0) selectedWeights = `${weights[0]} ${selectedWeights}`;
        if (totalProfit != 0) selectedPeople = `${people[0]}`;
        console.log(selectedPeople)
        for (let element = 0; element < selectedPeople.length; element++) {
            console.log(selectedPeople[element])
            var para = document.createElement("p")
            var t = document.createTextNode(selectedPeople[element]);      
            para.appendChild(t);                                    
            document.getElementById("clientsInput").appendChild(para)

        }
        
        // console.log(`Selected weights: ${selectedWeights}`);
        console.log("Selected people:", selectedPeople);
      
        // maximum profit will be at the bottom-right corner.
        document.getElementById("testInput").innerHTML =`total profit and selected people: ${dp[n - 1][capacity]}`
}
let resetButton = document.getElementById("reset") // reset game button
    let reset = () => {
        location.reload()
    }

submitButton.addEventListener("click",submitForm)
submitButton.addEventListener("click", knapsack)
button.addEventListener("click", newFormFunc)
// var people = ['Jane', 'Bob', 'Mark', 'Jill', 'Don'];
// var profits = [1000, 3000, 2700, 5000, 3600];
// var weights = [3, 5, 4, 8, 5];
console.log(people)




