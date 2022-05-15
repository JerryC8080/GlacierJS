import { ProjectManifest } from '@pnpm/types';
declare type WriteProjectManifest = (manifest: ProjectManifest, force?: boolean) => Promise<void>;
export declare function safeReadProjectManifestOnly(projectDir: string): Promise<ProjectManifest | null>;
export default function readProjectManifest(projectDir: string): Promise<{
    fileName: string;
    manifest: ProjectManifest;
    writeProjectManifest: WriteProjectManifest;
}>;
export declare function readProjectManifestOnly(projectDir: string): Promise<ProjectManifest>;
export declare function tryReadProjectManifest(projectDir: string): Promise<{
    fileName: string;
    manifest: ProjectManifest | null;
    writeProjectManifest: WriteProjectManifest;
}>;
export declare function readExactProjectManifest(manifestPath: string): Promise<{
    manifest: any;
    writeProjectManifest: WriteProjectManifest;
}>;
export {};
