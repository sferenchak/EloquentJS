// Minimum - Write a function min that takes two arguments and returns their minimum.
function min(numX, numY) {
    return (numX < numY) ? numX : numY;
};

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

//Recursion - Here’s another way to define whether a positive whole number is even or odd:
// * Zero is even.
// * One is odd.
// For any other number N, its evenness is the same as N - 2.
// Define a recursive function isEven corresponding to this description.
// The function should accept a single parameter(a positive, whole number) and return a Boolean.
// Test it on 50 and 75. See how it behaves on - 1. Why ? Can you think of a way to fix this ?

function isEven(num) {
    num = Math.abs(num);
    if (num === 0) {
        return true;
    } else if (num === 1) {
        return false;
    } else {
        return isEven(num - 2)
    }
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

// Bean counting - 
/* Write a function countBs that takes a string as its only argument and 
returns a number that indicates how many uppercase “B” characters there are in the string. */
function countBs(string) {
    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === "B") {
            counter += 1;
        }
    }
    return counter;
}
console.log(countBs("BBC"));
// → 2

/* Next, write a function called countChar that behaves like countBs, 
except it takes a second argument that indicates the character that is to be counted 
(rather than counting only uppercase “B” characters). 
Rewrite countBs to make use of this new function. */

function countChar(string, char) {
    let counter = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === char) {
            counter += 1;
        }
    }
    return counter;
}
function countBsTwo(string) {
    return countChar(string, "B");
};

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
console.log(countBsTwo("BBC"));
// → 2