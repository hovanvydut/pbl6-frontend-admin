export enum UserGroupName {
    AuthInfo = 'Thông tin xác thực',
    AccessInfo = 'Thông tin truy cập',
}

export enum UserFieldNameEnum {
    Email = 'email',
    IsVerified = 'isVerified',
    IsActived = 'isActived',
    RoleId = 'roleId',
    Role = 'role',
}

export enum UserAuthEnum {
    Email = 1,
    IsVerified = 2,
}


export enum UserAccessEnum {
    IsActived = 3,
    RoleId = 4,
}