import { Truck} from './models/Truck';
import { Load } from './models/Load';
import { LoadAgreement } from './models/LoadAgreement';
import { MapEntry } from "near-sdk-as";

export function createTruck(truck: string): Truck {
    return Truck.create(truck);
}

export function setDriver(truckId: u32): Truck {
    return Truck.setDriver(truckId);
}

export function trucks(): MapEntry<u32, Truck>[] {
    return Truck.entries();
}

export function createLoad(load: string): Load {
    return Load.create(load);
}

export function loads(): MapEntry<u32, Load>[] {
    return Load.entries();
}

export function takeLoad(loadId: u32, truckId: u32): LoadAgreement {
    return LoadAgreement.create(loadId, truckId);
}

export function completeAgreement(agreementId: u32): LoadAgreement {
    return LoadAgreement.complete(agreementId);
}

// export function releasePayment(agreementId: u32): LoadAgreement {
//     return LoadAgreement.releasePayment(agreementId);
// }

export function agreements(): MapEntry<u32, LoadAgreement>[] {
    return LoadAgreement.entries();
}