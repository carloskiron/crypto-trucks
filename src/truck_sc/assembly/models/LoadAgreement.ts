import { PersistentUnorderedMap, math, context, MapEntry } from "near-sdk-core"
import { Load } from "./Load";
import { Truck } from './Truck';

export const loadAgreements = new PersistentUnorderedMap<u32, LoadAgreement>("loadAgreements");

export enum LoadAgreementStatusEnum {
	Signed = 'SIGNED',
	Completed = 'COMPLETED',
	Cancelled = 'CANCELLED',
}

@nearBindgen
export class LoadAgreement {
	id: u32;
	loadId: u32;
	truckId: u32;
	status: string = LoadAgreementStatusEnum.Signed;

	constructor(loadId: u32, truckId: u32) {
		this.id = math.hash32<string>(Date.now().toString());
		this.loadId = loadId;
		this.truckId = truckId;
		this.status = LoadAgreementStatusEnum.Signed;
	}

	static create(loadId: u32, truckId: u32): LoadAgreement {
		const truck = Truck.get(truckId);

		assert(LoadAgreement.verifyIsValidSender(truck), 'Sender must be driver of the truck.');
			
		const l = new LoadAgreement(loadId, truckId);
		loadAgreements.set(l.id, l);
		
		return l;
	}

	static get(id: u32): LoadAgreement {
		const l = loadAgreements.get(id)!;
		return l;
	}

	static entries(): MapEntry<u32, LoadAgreement>[] {
		const l = loadAgreements.entries()!;
		return l;
	}

	private static verifyIsValidSender(truck: Truck): boolean {
		return truck.owner == context.sender || truck.driver == context.sender;
	}

	static complete(agreementId: u32): LoadAgreement {
		
		const agreement = LoadAgreement.get(agreementId);
		const truck = Truck.get(agreement.truckId);

		assert(LoadAgreement.verifyIsValidSender(truck), 'Sender must be driver of the truck.');
		agreement.status = LoadAgreementStatusEnum.Completed;
		loadAgreements.set(agreementId, agreement);

		return agreement;
	}

	static cancel(agreementId: u32): LoadAgreement {
		const agreement = LoadAgreement.get(agreementId);
		const truck = Truck.get(agreement.truckId);

		assert(LoadAgreement.verifyIsValidSender(truck), 'Sender must be driver of the truck.');
		
		agreement.status = LoadAgreementStatusEnum.Cancelled;
		loadAgreements.set(agreementId, agreement)
		
		return agreement;
	}
}
