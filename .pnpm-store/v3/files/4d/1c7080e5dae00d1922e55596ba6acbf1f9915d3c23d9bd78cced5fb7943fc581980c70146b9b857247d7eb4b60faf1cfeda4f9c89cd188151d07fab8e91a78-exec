import { LiteralUnion } from 'type-fest';
import { DeclarationReflection, ProjectReflection, Reflection } from 'typedoc';
import type { ABasePlugin } from './base-plugin';
/**
 * Don't worry about typings, it's just a string with special prefixes.
 */
export declare type NamedPath = LiteralUnion<NamedPath.Project | NamedPath.Module, string>;
export declare namespace NamedPath {
    type Project = `~~/${string}`;
    type Module = `~${string}/${string}`;
}
export declare class PathReflectionResolver {
    protected readonly plugin: ABasePlugin;
    constructor(plugin: ABasePlugin);
    /**
     * Resolve the path from the {@link reflection} sources. A single match is expected.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns the resolved path.
     */
    resolveFromReflection(reflection: Reflection, path: string, canLookupModule: boolean): string | undefined;
    /**
     * Resolve the path from the {@link reflection} sources. Filter only existing files.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns the resolved path.
     */
    resolveAllFromReflection(reflection: Reflection, path: string, canLookupModule: boolean): string[];
    /**
     * Get a list of workspaces from the given {@link project}.
     *
     * @param project - The project reflection.
     * @returns the workspaces.
     */
    getWorkspaces(project: ProjectReflection): [ProjectReflection, ...DeclarationReflection[]];
    /**
     * Resolve the given {@link path}, converting `~~` as the project path, & `~*` as modules path.
     *
     * @param project - The project reflection.
     * @param path - The page targetted.
     * @param extra - An object containing:
     * - the default container folder for named paths
     * - the current reflection for relative paths.
     * @returns the resolved file.
     */
    resolveNamedPath(project: ProjectReflection, path: NamedPath, { containerFolder, currentReflection }?: {
        containerFolder?: string;
        currentReflection?: Reflection;
    }): string | undefined;
    /**
     * Look up the reflection & its parents to find the 1st parent matching the given {@link filter}.
     *
     * @param reflection - The reflection to get the parent for.
     * @param filter - The check function. Returns `true` to select the reflection.
     * @returns the module matching the filter, or `undefined`.
     */
    getParentMatching<T extends Reflection>(reflection: Reflection, filter: (reflection: Reflection) => reflection is T): T | undefined;
    getParentMatching(reflection: Reflection, filter: (reflection: Reflection) => boolean): Reflection | undefined;
    /**
     * Find the 1st module reflection in the {@link reflection}'s parents. The reflection itself is checked.
     *
     * @param reflection - The reflection to get the module for.
     * @returns the module reflection, or the project if no module is found.
     */
    getReflectionModule(reflection: Reflection): DeclarationReflection | ProjectReflection;
    /**
     * Get a list of paths to check for the resolution.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns all paths to check.
     */
    private _getAllPossibleResolutionPaths;
}
//# sourceMappingURL=path-reflection-resolver.d.ts.map