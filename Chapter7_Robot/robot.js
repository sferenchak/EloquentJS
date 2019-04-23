// Array of roads between the 11 places in Meadowfield
const roads = [
	"Alice's House-Bob's House",
	"Alice's House-Cabin",
	"Alice's House-Post Office",
	"Bob's House-Town Hall",
	"Daria's House-Ernie's House",
	"Daria's House-Town Hall",
	"Ernie's House-Grete's House",
	"Grete's House-Farm",
	"Grete's House-Shop",
	'Marketplace-Farm',
	'Marketplace-Post Office',
	'Marketplace-Shop',
	'Marketplace-Town Hall',
	'Shop-Town Hall'
];

// convert array of strings graph to data structure that,
//for each place, tells us what can be reached from there.
function buildGraph(edges) {
	let graph = Object.create(null);
	function addEdge(from, to) {
		if (graph[from] == null) {
			graph[from] = [to];
		} else {
			graph[from].push(to);
		}
	}
	for (let [from, to] of edges.map(r => r.split('-'))) {
		addEdge(from, to);
		addEdge(to, from);
	}
	return graph;
}

const roadGraph = buildGraph(roads);

// condense the Village's state down to the minimal set of values
//that define it.
// The Robot's current location
// the collection of undelivered parcels;
// each of which has a current location and destination

class VillageState {
	constructor(place, parcels) {
		this.place = place;
		this.parcels = parcels;
	}

	move(destination) {
		if (!roadGraph[this.place].includes(destination)) {
			return this;
		} else {
			let parcels = this.parcels
				.map(p => {
					if (p.place != this.place) return p;
					return { place: destination, address: p.address };
				})
				.filter(p => p.place != p.address);
			return new VillageState(destination, parcels);
		}
	}
	// create state with some parcels
	static random(parcelCount = 5) {
		let parcels = [];
		for (let i = 0; i < parcelCount; i++) {
			let address = randomPick(Object.keys(roadGraph));
			let place;
			do {
				place = randomPick(Object.keys(roadGraph));
			} while (place == address);
			parcels.push({ place, address });
		}
		return new VillageState('Post Office', parcels);
	}
}

let first = new VillageState('Post Office', [
	{ place: 'Post Office', address: "Alice's House" }
]);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

// A delivery robot looks at the world and decides in which direction it
// wants to move. As such, we could say that a robot is a function that
// takes a VillageState object and returns the name of a nearby place.

// Because we want robots to be able to remember things, so that they can
// make and execute plans, we also pass them their memory and allow them to
// return a new memory. Thus, the thing a robot returns is an object
// containing both the direction it wants to move in and a memory value
// that will be given back to it the next time it is called.

function runRobot(state, robot, memory) {
	console.log(`Beginning the ${robot.name} route`);
	for (let turn = 0; ; turn++) {
		if (state.parcels.length == 0) {
			console.log(`Done in ${turn} turns`);
			break;
		}
		let action = robot(state, memory);
		state = state.move(action.direction);
		memory = action.memory;
		console.log(`Moved to ${action.direction}`);
	}
}

// Consider what a robot has to do to “solve” a given state. It must pick
// up all parcels by visiting every location that has a parcel and deliver
// them by visiting every location that a parcel is addressed to, but only
// after picking up the parcel.

// What is the dumbest strategy that could possibly work? The robot could
// just walk in a random direction every turn. That means, with great
// likelihood, it will eventually run into all parcels and then also at some
// point reach the place where they should be delivered.

function randomPick(array) {
	let choice = Math.floor(Math.random() * array.length);
	return array[choice];
}

function randomRobot(state) {
	return { direction: randomPick(roadGraph[state.place]) };
}

runRobot(VillageState.random(), randomRobot);

// a route that passes all places in the village
const mailRoute = [
	"Alice's House",
	'Cabin',
	"Alice's House",
	"Bob's House",
	'Town Hall',
	"Daria's House",
	"Ernie's House",
	"Grete's House",
	'Shop',
	"Grete's House",
	'Farm',
	'Marketplace',
	'Post Office'
];

// implement route-following robot
function routeRobot(state, memory) {
	if (memory.length == 0) {
		memory = mailRoute;
	}
	return { direction: memory[0], memory: memory.slice(1) };
}

runRobot(VillageState.random(), routeRobot, []);

// implement a function to determine shortest routes
function findRoute(graph, from, to) {
	let work = [{ at: from, route: [] }];
	for (let i = 0; i < work.length; i++) {
		let { at, route } = work[i];
		for (let place of graph[at]) {
			if (place == to) return route.concat(place);
			if (!work.some(w => w.at == place)) {
				work.push({ at: place, route: route.concat(place) });
			}
		}
	}
}

function goalOrientedRobot({ place, parcels }, route) {
	if (route.length == 0) {
		let parcel = parcels[0];
		if (parcel.place != place) {
			route = findRoute(roadGraph, place, parcel.place);
		} else {
			route = findRoute(roadGraph, place, parcel.address);
		}
	}
	return { direction: route[0], memory: route.slice(1) };
}

runRobot(VillageState.random(), goalOrientedRobot, []);
