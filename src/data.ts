type FissureData = {
    node: string,
    missionType: string,
    enemy: string,
    tier: string,
    tierNum: number,
    eta: string,
}

type InvasionData = {
    node: string,
    attacker: Object,
    defender: Object, 
    desc: string,
    eta: string,
}

type DropData = {
    rotation: string,
    _id: string,
    itemName: string,
    rarity: string,
    chance: number,
}

export { FissureData, InvasionData, DropData};