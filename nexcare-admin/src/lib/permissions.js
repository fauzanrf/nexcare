// Role-based permissions for the 6 RBAC roles
export const PERMISSIONS = {
    super_admin: [
        'crud_client', 'crud_starlink', 'crud_rfo', 'approve_rfo',
        'crud_team_visit', 'assign_team_visit', 'manage_users',
        'view_all', 'view_client', 'view_rfo', 'view_team_visit',
    ],
    noc2: [
        'crud_client', 'crud_starlink', 'crud_rfo', 'approve_rfo',
        'crud_team_visit', 'assign_team_visit', 'manage_users',
        'view_all', 'view_client', 'view_rfo', 'view_team_visit',
    ],
    noc1: [
        'crud_client', 'crud_starlink', 'crud_rfo',
        'view_all', 'view_client', 'view_rfo', 'view_team_visit',
    ],
    technical_support: [
        'crud_client', 'crud_starlink', 'crud_rfo',
        'view_all', 'view_client', 'view_rfo', 'view_team_visit',
    ],
    magang: [
        'view_client', 'view_rfo',
        'view_team_visit', 'view_all',
    ],
    provisioning: [
        'crud_client', 'view_rfo',
        'submit_team_visit', 'view_team_visit', 'view_all', 'view_client',
    ],
};

export const ROLE_LABELS = {
    super_admin: 'Super Admin',
    noc2: 'NOC 2',
    noc1: 'NOC 1',
    technical_support: 'Technical Support',
    magang: 'Magang',
    provisioning: 'Provisioning',
};

export function hasPermission(role, permission) {
    if (!role) return false;
    const perms = PERMISSIONS[role] || [];
    return perms.includes(permission);
}
