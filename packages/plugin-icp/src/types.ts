import type { Principal } from "@dfinity/principal";
import type { ActorSubclass } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
export interface ICPConfig {
    privateKey: string;
    network?: "mainnet" | "testnet";
}

export interface TransferParams {
    to: Principal | string;
    amount: bigint;
    memo?: bigint;
}

export interface ICPBalance {
    e8s: bigint;
}

export interface TransferResult {
    Ok?: bigint;
    Err?: string;
}

export interface ICPProvider {
    getBalance(principal: string): Promise<ICPBalance>;
    transfer(params: TransferParams): Promise<TransferResult>;
}

// 登录后获取的凭证, 就是能以登录的身份创建 actor, actor 可以调用罐子方法
export type ActorCreator = <T>(
    idlFactory: IDL.InterfaceFactory, // candid接口
    canister_id: string // 目标罐子
) => Promise<ActorSubclass<T>>;

export type CreateMemeTokenArg = {
    name?: string;
    symbol?: string;
    description: string;
    twitter?: string;
    website?: string;
    telegram?: string;
};
