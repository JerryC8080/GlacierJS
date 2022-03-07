import type { CacheHit } from '@glacierjs/plugin-assets-cache';

export enum IPCCallingType {
    FETCH_DATA,
}

export interface IPCCallingMessage {
    field: string;
    messages: { type: IPCCallingType }[]
}

export enum CollectedDataType {
    SW_REGISTER,
    SW_CONTROLLED,
    SW_INSTALLED,
    SW_FETCH,
    CACHE_HIT,
}

export interface CollectedData<Data = any> {
    type: CollectedDataType,
    data?: Data,
}

export interface ReportCacheHitMessage extends CollectedData<CacheHit> { }

export interface ReporterWindowOptions {
    send: (data: CollectedData) => void;
}