import axios, { AxiosResponse } from "axios";
import { FissureData, InvasionData, DropData } from "./data";

const statURL = "https://api.warframestat.us/pc/"
const wfcdURL = "http://drops.warframestat.us/"

const commStat = axios.create({
    baseURL: statURL,
})

const responseBody = (response: AxiosResponse) => response.data;
const parseDrops = (response: AxiosResponse) => {
    const rewards = response.data.rewards;
    return Array.prototype.concat(
        rewards.A.map((x:any) => {x.rotation = "A"}),
        rewards.C.map((x:any) => {x.rotation = "B"}),
        rewards.C.map((x:any) => {x.rotation = "C"})
    )
}
const commWfcd = axios.create({
    baseURL: wfcdURL,
})

const commRewards = async (node: string) : Promise<DropData[]> => 
{
    const tokens = node.replace(/[())]/g, '').split(" ");
    const response = await commWfcd.get("data/missionRewards/" + tokens[1] + "/" + tokens[0] + ".json");
    return parseDrops(response);
}

// const commRelics = (planet:string, node: string) =>
// axios.create({
//     baseURL: wfcdURL + "/data/relics/" + planet + "/" + node + ".json",
// })

export const Comm  = {
    getFissures: (): Promise<FissureData[]> => commStat.get("fissures").then(responseBody),
    getInvasions: (): Promise<InvasionData[]> => commStat.get("endpoints").then(responseBody),
    getRewards: (node: string) : Promise<DropData[]> => commRewards(node),
}