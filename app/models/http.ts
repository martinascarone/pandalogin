export enum HTTP_STATUS {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}

export enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS'
}

export interface CreationResponse{
    acknowledged: boolean;
    insertedId: string;
}

export interface DeletionResponse{
    acknowledged: boolean;
    deletedCount: number;
}