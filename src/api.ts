import axios, { AxiosResponse } from "axios";
import { FissureData, InvasionData, DropData, PlatinumData } from "./data";

//const wfcdURL = "" 

const commStat = axios.create({
    baseURL: "https://api.warframestat.us/",
});

const commMarket = axios.create({
    baseURL: "https://api.warframe.market/v1/"
})

const responseBody = (response: AxiosResponse) => response.data;
const platinumBody = (response: AxiosResponse) => response.data.statistics_closed['90days'][0];

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

//CORS-banned, sadly
//https://api.warframe.market/v1/items/lith_i1_relic/statistics
//const platinumBody = (response: AxiosResponse) => response.data.statistics_closed['90days'][0];

const parseRewards = async (node: string) : Promise<DropData[]> => 
{
    const tokens = node.replace(/[())]/g, '').split(" ");
    const response = await commStat.get("drops/search/"+ tokens[0]);
    return responseBody(response);
}

const parseMarketStats = async (drop: string) : Promise<PlatinumData> =>
{
    if (drop == ""){
        return new Promise<PlatinumData>((resolve, reject) => console.log("request aborted"));
    }
    const name = drop.replace("(R)", "").replaceAll(" ", "_").toLocaleLowerCase();
    console.log(name);
    const response = await commMarket.get("items/" + name + "/statistics");
    return platinumBody(response);
}

// const commRelics = (planet:string, node: string) =>
// axios.create({
//     baseURL: wfcdURL + "/data/relics/" + planet + "/" + node + ".json",
// })

export const Comm  = {
    getFissures: (): Promise<FissureData[]> => commStat.get("pc/fissures").then(responseBody),
    getInvasions: (): Promise<InvasionData[]> => commStat.get("pc/endpoints").then(responseBody),
    getRewards: (node: string) : Promise<DropData[]> => parseRewards(node),
    getPlatinumData: (drop: string) : Promise<PlatinumData> => parseMarketStats(drop),
}