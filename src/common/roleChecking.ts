import Keycloak from 'keycloak-js'

export function checkUserRole(keycloak: Keycloak, role: string): boolean {
    const hasRole = keycloak.hasRealmRole(role);
    if (!hasRole) {
        return false;
    }
    return hasRole;
}
