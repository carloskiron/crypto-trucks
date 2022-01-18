import { PersistentUnorderedMap, math, context, MapEntry } from "near-sdk-core"

export const trucks = new PersistentUnorderedMap<u32, Truck>("trucks");

@nearBindgen
export class Truck {
	id: u32;
	truck: string;
	owner: string;
	driver: string = '';

	constructor(truck: string) {
		this.id = math.hash32<string>(truck);
		this.truck = truck;
		this.owner = context.sender;
	}

	static create(truck: string): Truck {
		const t = new Truck(truck);
		trucks.set(t.id, t);
		return t;
	}

	static get(id: u32): Truck {
		const t = trucks.get(id)!;
		return t;
	}

	static entries(): MapEntry<u32, Truck>[] {
		const t = trucks.entries()!;
		return t;
	}

	static setDriver(truckId: u32): Truck {
		const t = Truck.get(truckId);
		t.driver = context.sender;
		trucks.set(truckId, t);
		return t
	}

}


