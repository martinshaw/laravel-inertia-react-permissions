import {usePage} from "@inertiajs/react";
import { useCallback } from "react";

export default function usePermissions() {
    const permissions = usePage().props.user_permissions as {
        uses_wildcards: boolean,
        roles: string[],
        permissions: string[],
        debug: boolean,
    };

    const returnValueAfterLogging: (attempt: string, found: string, returnValue: boolean) => boolean = (attempt, found, returnValue) => {
        if (permissions.debug) console.log(`Permission check attempt: "${attempt}" => found: "${found}" => returning: ${returnValue}`);
        return returnValue;
    }

    const usesWildcards = permissions.uses_wildcards || false;

    const inUserPermissions: (value: string) => boolean = value => usesWildcards ? inUserPermissionsAsWildcard(value) : inUserPermissionsAsNonWildcard(value);

    const inUserPermissionsAsNonWildcard: (value: string) => boolean = (value) => permissions.permissions.includes(value.trim());

    const inUserPermissionsAsWildcard: (value: string) => boolean = (value) => permissions.permissions.some(function (permission) {
        if (permission === '*' || permission.trim() === value.trim()) return returnValueAfterLogging(value, permission, true);
        if (!permission.endsWith('.*') && value.startsWith(permission.trim() + '.')) return returnValueAfterLogging(value, permission, true);
        if (permission.endsWith('.*') && value.startsWith(permission.slice(0, -2))) return returnValueAfterLogging(value, permission, true);
        return false;
    });

    const can: (value: string) => boolean = useCallback((value) => {
        let _return: boolean = false;

        if (!Array.isArray(permissions.permissions)) return false;

        if (value.includes('|')) {
            value.split('|').forEach(function (item) {
                if (inUserPermissions(item)) return true;
            });
        } else if (value.includes('&')) {
            _return = true;
            value.split('&').forEach(function (item) {
                if (!inUserPermissions(item)) return false;
            });
        } else {
            _return = inUserPermissions(value);
        }

        return _return;
    }, [permissions.permissions]);

    const is: (value: string) => boolean = useCallback((value) => {
        let _return = false;

        if (!Array.isArray(permissions.roles)) return false;

        if (value.includes('|')) {
            value.split('|').forEach((item) => {
                if (permissions.roles.includes(item.trim())) _return = true;
            });
        } else if (value.includes('&')) {
            _return = true;
            value.split('&').forEach((item) => {
                if (!permissions.roles.includes(item.trim())) _return = false;
            });
        } else {
            _return = permissions.roles.includes(value.trim());
        }

        return _return;
    }, [permissions.roles]);

    return {
        roles: permissions.roles,
        permissions: permissions.permissions,
        can,
        is
    }
}
