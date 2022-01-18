import { PersistentUnorderedMap, math, context, MapEntry } from "near-sdk-core"

export const loads = new PersistentUnorderedMap<u32, Load>("loads");

export enum LoadStatusEnum {
    Posted = 'POSTED',
    Taken = 'TAKEN',
}

@nearBindgen
export class Load {
	id: u32;
	load: string;
	broker: string;
    dropoffZip: string;
    pickupZip: string;
	price: string = '';
    status: string = LoadStatusEnum.Posted;
    miles: number;

	constructor(load: string) {
		this.id = math.hash32<string>(load);
		this.load = load;
        this.status = LoadStatusEnum.Posted;
		this.broker = context.sender;
	}

	static create(load: string): Load {
		const l = new Load(load);
		loads.set(l.id, l);
		return l;
	}

	static get(id: u32): Load {
		const l = loads.get(id)!;
		return l;
	}

	static entries(): MapEntry<u32, Load>[] {
		const l = loads.entries()!;
		return l;
	}

}
