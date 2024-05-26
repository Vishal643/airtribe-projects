# Smart Parking Lot Backend System

## Objective:-
Design a low-level architecture for a backend system that manages vehicle entry and exit, parking space allocation, and fee calculation in a smart parking lot.

## Problem Statement:-
Design a backend system for a multi-floor parking lot with numerous parking spots. The system should:
- Automatically assign parking spots based on vehicle size and availability.
- Track entry and exit times of vehicles.
- Calculate parking fees upon exit.
- Update parking spot availability in real-time.

## Functional Requirements:-
- **Parking Spot Allocation**: Automatically assign an available parking spot to a vehicle based on its size (e.g., motorcycle, car, bus).
- **Check-In and Check-Out**: Record the entry and exit times of vehicles.
- **Parking Fee Calculation**: Calculate fees based on the duration of stay and vehicle type.
- **Real-Time Availability Update**: Update the availability of parking spots in real-time as vehicles enter and leave.

## Design Considerations:-
- **Data Model**: Design a database schema to manage parking spots, vehicles, and parking transactions.
- **Algorithm for Spot Allocation**: Develop an algorithm to efficiently assign parking spots to incoming vehicles.
- **Fee Calculation Logic**: Implement logic to calculate fees based on parking duration and vehicle type.
- **Concurrency Handling**: Ensure the system can handle multiple vehicles entering or exiting simultaneously.

## Data Model:-

### Database Schema
- **Tables**:
  - **ParkingSpot**:
    - `id` (Primary Key): Unique identifier for each parking spot.
    - `floor`: The floor number where the parking spot is located.
    - `spot_number`: The spot number within the floor.
    - `size`: The size of the parking spot (e.g., motorcycle, car, bus).
    - `is_occupied`: Boolean to indicate if the spot is currently occupied.
  - **Vehicle**:
    - `id` (Primary Key): Unique identifier for each vehicle.
    - `license_plate`: License plate number of the vehicle.
    - `size`: The size of the vehicle (e.g., motorcycle, car, bus).
  - **ParkingTransaction**:
    - `id` (Primary Key): Unique identifier for each transaction.
    - `vehicle_id` (Foreign Key): References `Vehicle(id)`.
    - `parking_spot_id` (Foreign Key): References `ParkingSpot(id)`.
    - `entry_time`: Timestamp when the vehicle entered.
    - `exit_time`: Timestamp when the vehicle exited.
    - `fee`: Calculated fee for the parking duration.

### ER Diagram
```
    Vehicle (1) ----- (N) ParkingTransaction (N) ----- (1) ParkingSpot
```



## Algorithm for Spot Allocation

### Function: `allocateParkingSpot(vehicleSize)`

```javascript code sample:-
function allocateParkingSpot(vehicleSize) {
    // Find the first available spot that matches the vehicle size
    const availableSpot = parkingSpots.find(spot => spot.size === vehicleSize && !spot.isOccupied);

    if (availableSpot) {
        // Mark the spot as occupied
        availableSpot.isOccupied = true;
        return availableSpot.id;
    } else {
        return null;  // No available spots
    }
}
```



## Fee Calculation Logic
## Function: calculateFee(vehicleSize, durationHours)

```javascript code sample:-
function calculateFee(vehicleSize, durationHours) {
    const rates = {
        motorcycle: 100,
        car: 200,
        bus: 300
    };
    return durationHours * rates[vehicleSize];
}
```



## Concurrency Handling
### Function: handleVehicleEntry(vehicleId, vehicleSize)

```javascript code sample:-
async function handleVehicleEntry(vehicleId, vehicleSize) {
    const allocatedSpotId = allocateParkingSpot(vehicleSize);
    if (allocatedSpotId !== null) {
        const entryTime = new Date().toISOString();
        const newTransaction = {
            id: parkingTransactions.length + 1,
            vehicleId: vehicleId,
            parkingSpotId: allocatedSpotId,
            entryTime: entryTime,
            exitTime: null,
            fee: null
        };
        parkingTransactions.push(newTransaction);
        return allocatedSpotId;
    } else {
        throw new Error("No available parking spots for the vehicle size.");
    }
}
```


### Function: handleVehicleExit(transactionId)

```javascript code sample:-
async function handleVehicleExit(transactionId) {
    const transaction = parkingTransactions.find(t => t.id === transactionId && t.exitTime === null);
    if (transaction) {
        const exitTime = new Date().toISOString();
        const entryTime = new Date(transaction.entryTime);
        const durationHours = (new Date(exitTime) - entryTime) / (1000 * 60 * 60);
        const fee = calculateFee(transaction.vehicleSize, durationHours);

        // Update transaction with exit time and fee
        transaction.exitTime = exitTime;
        transaction.fee = fee;

        // Free up the parking spot
        const parkingSpot = parkingSpots.find(spot => spot.id === transaction.parkingSpotId);
        if (parkingSpot) {
            parkingSpot.isOccupied = false;
        }

        return fee;
    } else {
        throw new Error("Transaction not found or already completed.");
    }
}
```


## Driver code
```javascript code sample:-
async function main() {
    try {
        // Simulate a vehicle entering the parking lot
        const vehicleId = 1;  
        const vehicleSize = 'car';
        const spotId = await handleVehicleEntry(vehicleId, vehicleSize);
        console.log(`Vehicle allocated to spot ID: ${spotId}`);

        // Simulate the vehicle exiting the parking lot
        const transactionId = 1;  
        const fee = await handleVehicleExit(transactionId);
        console.log(`Parking fee: $${fee}`);
    } catch (error) {
        console.error(error.message);
    }
}
main();
```
