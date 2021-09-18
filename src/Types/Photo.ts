export type Photo = 
{
    _id: string;
    PublicId: string;
    Url: string;
    User: {
        Username: string;
        Email: string;
        Country: string;
        City: string;
    };
    Label: string;
    Uploaded: Date;
}