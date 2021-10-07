//tiers for montly subscription
export enum SubscriptionTier
{
    DefaulyTier="Default tier",
    Low="Low tier",
    Medium="Medium tier",
    High="High tier",
};

//monthly fee of subscriptions in dollars
export enum SubscriptionMonthFee
{
    DefaultTierFee=0,
    LowTierFee=5,
    MediumTierFee=10,
    HighTierFee=15
};

//ammount of data (in gigabytes) a user can use
export enum SubscriptionStorageAmmount
{
    DefaultTierStorage=2,
    LowTierStorage= 7,
    MediumTierStorage=15,
    HighTierStorage=30 
} 

export type User = 
{
    Username: string;
    Email: string;
    Password: string;
    Country: string;
    City: string;
    UserTier: SubscriptionTier;
    StorageLeft: SubscriptionStorageAmmount
}