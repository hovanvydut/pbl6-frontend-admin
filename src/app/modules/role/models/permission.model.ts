export class PermissionBaseModel {
    id: number;
    key: string;
    description: string;

    public constructor(init?: Partial<PermissionBaseModel>) {
        Object.assign(this, init);
    }
}

export class PermissionRequestModel {
    key: string;
    description: string;
    roleId: number;

    public constructor(init?: Partial<PermissionRequestModel>) {
        Object.assign(this, init);
    }
}

export class PermissionGroupModel {
    key: string;
    children: PermissionBaseModel[];

    public constructor(init?: Partial<PermissionGroupModel>) {
        Object.assign(this, init);
    }
}