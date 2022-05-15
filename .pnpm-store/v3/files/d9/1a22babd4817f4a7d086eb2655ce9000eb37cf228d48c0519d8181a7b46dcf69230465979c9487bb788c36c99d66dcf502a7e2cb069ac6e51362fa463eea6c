import { DependenciesField, ProjectManifest } from '@pnpm/types';
export interface PackageSpecObject {
    alias: string;
    nodeExecPath?: string;
    peer?: boolean;
    pref?: string;
    saveType?: DependenciesField;
}
export declare function updateProjectManifestObject(prefix: string, packageManifest: ProjectManifest, packageSpecs: PackageSpecObject[]): Promise<ProjectManifest>;
export declare function guessDependencyType(alias: string, manifest: ProjectManifest): DependenciesField | undefined;
