import { ProjectManifest } from '@pnpm/types';
export declare function readProjectManifest(projectDir: string, opts: {
    engineStrict?: boolean;
    nodeVersion?: string;
}): Promise<{
    fileName: string;
    manifest: ProjectManifest;
    writeProjectManifest: (manifest: ProjectManifest, force?: boolean) => Promise<void>;
}>;
export declare function readProjectManifestOnly(projectDir: string, opts: {
    engineStrict?: boolean;
    nodeVersion?: string;
}): Promise<ProjectManifest>;
export declare function tryReadProjectManifest(projectDir: string, opts: {
    engineStrict?: boolean;
    nodeVersion?: string;
}): Promise<{
    fileName: string;
    manifest: ProjectManifest | null;
    writeProjectManifest: (manifest: ProjectManifest, force?: boolean) => Promise<void>;
}>;
