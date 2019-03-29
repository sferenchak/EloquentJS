/**** THE SUM OF A RANGE ****/
/* Write a range function that takes two arguments, start and end, 
and returns an array containing all the numbers from start up to (and including) end.*/

/* As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. 
If no step is given, the elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2]. */

function range(num1, num2, step) {
	let arr = [];
	if (num1 < num2) {
		step = typeof step !== 'undefined' ? step : 1;
		for (let i = num1; i <= num2; i += step) {
			arr.push(i);
		}
	} else if (num1 > num2) {
		step = typeof step !== 'undefined' ? step : -1;
		for (let i = num1; i >= num2; i += step) {
			arr.push(i);
		}
	}
	return arr;
}

console.log(range(1, 10));
console.log(range(10, 1));
console.log(range(1, 10, 2), `[1,3,5,7,9]`);
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

/* Next, write a sum function that takes an array of numbers and returns the sum of these numbers. 
  Run the example program and see whether it does indeed return 55. */

function sum(array) {
	return array.reduce((acc, current) => {
		return acc + current;
	}, 0);
}

console.log(sum(range(1, 10)));
// → 55

/**** Reversing an array ****/
/* write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, 
takes an array as argument and produces a new array that has the same elements in the inverse order. 
The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. 
Neither may use the standard reverse method. */

function reverseArray(array) {
	let newArray = [];
	for (let item of array) {
		newArray.unshift(item);
	}
	return newArray;
}

console.log(reverseArray(['A', 'B', 'C']));

function reverseArrayInPlace(array) {
	for (let i = 0; i < array.length / 2; i++) {
		let temp = array[i];
		array[i] = array[array.length - 1 - i];
		array[array.length - 1 - i] = temp;
	}
}

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);

/**** A LIST ****/
/* Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. 
Also write a listToArray function that produces an array from a list. 
Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, 
and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) 
or undefined when there is no such element.

If you haven’t already, also write a recursive version of nth. */

function arrayToList(array) {
	let list;
	for (let i = array.length - 1; i >= 0; i--) {
		list = { value: array[i], rest: list || null };
	}
	return list;
}
console.log(arrayToList([10, 20])); // → {value: 10, rest: {value: 20, rest: null}}

function listToArray(list) {
	let arr = [];
	for (let node = list; node; node = node.rest) {
		arr.push(node.value);
	}
	return arr;
}
console.log(listToArray(arrayToList([10, 20, 30]))); // → [10, 20, 30]

function prepend(value, list) {
	return { value, rest: list };
}
console.log(prepend(10, prepend(20, null))); // → {value: 10, rest: {value: 20, rest: null}}

function nth(list, num) {
	if (!list) return undefined;
	else if (num == 0) return list.value;
	else return nth(list.rest, num - 1);
}
console.log(nth(arrayToList([10, 20, 30]), 1)); // → 20

/**** DEEP COMPARISON ****/
/* Write a function deepEqual that takes two values and returns true only if 
they are the same value or are objects with the same properties, where the values 
of the properties are equal when compared with a recursive call to deepEqual. */

function deepEqual(val1, val2) {
	if (val1 === val2) return true;
	if (
		val1 == null ||
		typeof val1 != 'object' ||
		val2 == null ||
		typeof val2 != 'object'
	)
		return false;
	let val1Keys = Object.keys(val1),
		val2Keys = Object.keys(val2);
	if (val1Keys.length != val2Keys.length) return false;
	for (let key of val1Keys) {
		if (!val2Keys.includes(key) || !deepEqual(val1[key], val2[key]))
			return false;
	}
	return true;
}

let obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
