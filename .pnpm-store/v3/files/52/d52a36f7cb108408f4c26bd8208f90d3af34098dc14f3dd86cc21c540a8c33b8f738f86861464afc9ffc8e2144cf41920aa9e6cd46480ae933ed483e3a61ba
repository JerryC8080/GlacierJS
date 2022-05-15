import { LogBase, Logger } from '@pnpm/logger';
import { PeerDependencyIssuesByProjects } from '@pnpm/types';
export declare const peerDependencyIssuesLogger: Logger<PeerDependencyIssuesMessage>;
export interface PeerDependencyIssuesMessage {
    issuesByProjects: PeerDependencyIssuesByProjects;
}
export declare type PeerDependencyIssuesLog = {
    name: 'pnpm:peer-dependency-issues';
} & LogBase & PeerDependencyIssuesMessage;
