interface IErrorObject 
{
    message: string;
    field?: string;
};

export type ErrorResponse = 
{
    error: IErrorObject[];
}