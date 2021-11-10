import axios, { AxiosResponse } from "axios";
import { FissureData, InvasionData, DropData } from "./data";

//const wfcdURL = "" 

const commStat = axios.create({
    baseURL: "https://api.warframestat.us/",
})

const responseBody = (response: AxiosResponse) => response.data;

//RIP due to CORS, using previous instead
// const commWfcd = axios.create({
//     baseURL: http://drops.warframestat.us/,
// })
// const parseDrops = (response: AxiosResponse) => {
//     const rewards = response.data.rewards;
//     return Array.prototype.concat(
//         rewards.A.map((x:any) => {x.rotation = "A"}),
//         rewards.C.map((x:any) => {x.rotation = "B"}),
//         rewards.C.map((x:any) => {x.rotation = "C"})
//     )
// }

const commRewards = async (node: string) : Promise<DropData[]> => 
{
    const tokens = node.replace(/[())]/g, '').split(" ");
    const response = await commStat.get("drops/search/"+ tokens[0]);
    return responseBody(response);
}

// const commRelics = (planet:string, node: string) =>
// axios.create({
//     baseURL: wfcdURL + "/data/relics/" + planet + "/" + node + ".json",
// })

export const Comm  = {
    getFissures: (): Promise<FissureData[]> => commStat.get("pc/fissures").then(responseBody),
    getInvasions: (): Promise<InvasionData[]> => commStat.get("pc/endpoints").then(responseBody),
    getRewards: (node: string) : Promise<DropData[]> => commRewards(node),
}