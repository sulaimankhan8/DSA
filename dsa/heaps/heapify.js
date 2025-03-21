function heapify(arr){
    let n=arr.length;//6
 
    for(let i=Math.floor(n/2)-1;i>=0;i--){
        sinkDown(arr,i,n)
    }
}
const sinkDown=function(arr,i,n){
    let smallest=i;//
    let left=i*2 +1;//
    let right=i*2 +2;//

    if(left<n && arr[left]<arr[smallest]) smallest=left;
    if(right<n && arr[right]<arr[smallest]) smallest=right;

    if(smallest !==i){
        [arr[i],arr[smallest]]=  [arr[smallest],arr[i]]
       
        sinkDown(arr,smallest,n)
    }
}
 

let arr = [5, 3, 8, 4, 1, 2];

console.log(arr); 
heapify(arr);
console.log(arr); 

console.log("------------------------------------------------"); 

//-------------------------------------------------------------------------




/* for understanding 
function heapify(arr) {
    let n = arr.length;
    let iteration = 1;

    const sinkDown = function (arr, i, n) {
        let smallest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        console.log(`\n   Checking index i=${i} (value=${arr[i]}), left=${left} (value=${arr[left]}), right=${right} (value=${arr[right]})`);
        console.log(`   Current smallest = index ${smallest} (value=${arr[smallest]})`);

        if (left < n) {
            console.log(`   Compare arr[${left}] = ${arr[left]} with arr[${smallest}] = ${arr[smallest]}`);
            if (arr[left] < arr[smallest]) {
                console.log(`   --> Left child is smaller. smallest = ${left}`);
                smallest = left;
            }
        }

        if (right < n) {
            console.log(`   Compare arr[${right}] = ${arr[right]} with arr[${smallest}] = ${arr[smallest]}`);
            if (arr[right] < arr[smallest]) {
                console.log(`   --> Right child is smaller. smallest = ${right}`);
                smallest = right;
            }
        }

        if (smallest !== i) {
            console.log(`   Swapping arr[${i}] = ${arr[i]} with arr[${smallest}] = ${arr[smallest]}`);
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            console.log(`   Array after swap: ${arr.join(', ')}`);
            sinkDown(arr, smallest, n);
        } else {
            console.log("   No swaps needed in this step.");
        }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        console.log(`\n==== Iteration ${iteration++} : Starting from index ${i} ====`);
        console.log(`Array before sinking: ${arr.join(', ')}`);
        sinkDown(arr, i, n);
        console.log(`Array after sinkDown from index ${i}: ${arr.join(', ')}`);
        console.log("=======================================");
    }
    console.log(`\n✅ Final Min Heap: ${arr.join(', ')}`);
}

// Example:
let arr = [5, 3, 8, 4, 1, 2];
heapify(arr);
*/


const sinkDownmax = function (arr, i, n) {
    let largest = i;
    let left = i * 2 + 1;
    let right = i * 2 + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        sinkDownmax(arr, largest, n);
    }
};
function heapSort(arr){
    let n= arr.length;

    for(let i=Math.floor(n/2)-1;i>=0;i--){
        sinkDownmax(arr,i,n);
    }
console.log(arr)
    for(let i=n-1;i>=0;i--){
        [arr[0],arr[i]]= [arr[i],arr[0]];
        sinkDownmax(arr,0,i);
    }
    return arr;
}


const unsorted = [4, 10, 3, 5, 1];
console.log(unsorted); 
const sorted = heapSort(unsorted);
console.log(sorted); 



// ✅ HEAP SORT EXPLANATION (MAX HEAP BASED SORT):
// Step-by-step for arr = [4, 10, 3, 5, 1]

// 1️⃣ BUILD THE MAX HEAP:
// Start from i = floor(n/2) - 1 (first parent from the bottom):
// - i = 1 (value = 10), children = 5 and 1; 10 > both, no change.
// - i = 0 (value = 4), children = 10 and 3; largest is 10, swap:
//   arr = [10, 4, 3, 5, 1]
// - sink down index 1 (value = 4), children = 5, 1; largest is 5, swap:
//   arr = [10, 5, 3, 4, 1]
// ✅ Max Heap built: [10, 5, 3, 4, 1]

// 2️⃣ HEAP SORT EXTRACTION:
// Swap root with last element repeatedly and heapify:

// ➡ Iteration 1:
// Swap root(10) & arr[4]:
//   arr = [1, 5, 3, 4, 10]
// Heapify index 0:
// - largest child = 5; arr = [5, 1, 3, 4, 10]
// - sink down index 1, swap with 4; arr = [5, 4, 3, 1, 10]

// ➡ Iteration 2:
// Swap root(5) & arr[3]:
//   arr = [1, 4, 3, 5, 10]
// Sink down:
// - index 0: largest = 4, arr = [4, 1, 3, 5, 10]

// ➡ Iteration 3:
// Swap root(4) & arr[2]:
//   arr = [3, 1, 4, 5, 10]
// - index 0 has children 1,3; largest is 3, already in place.

// ➡ Iteration 4:
// Swap root(3) & arr[1]:
//   arr = [1, 3, 4, 5, 10]

// ✅ Final Sorted Array = [1, 3, 4, 5, 10]

