import { Plugin } from "@ai16z/eliza/src/types";
import { icpWalletProvider } from "./providers/wallet";

export const icpPlugin: Plugin = {
    name: "icp",
    description: "Internet Computer Protocol Plugin for Eliza",
    providers: [icpWalletProvider],
    actions: [], // Removed executeSwap since it's not defined
    evaluators: [],
};

export default icpPlugin;
