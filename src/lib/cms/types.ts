export interface Page { _id: string; _type: "page"; title: string; slug: { current: string }; content: any[]; }
export interface Listing { _id: string; _type: "listing"; title: string; price: number; bedrooms: number; bathrooms: number; images: string[]; }
