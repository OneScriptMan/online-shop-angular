export interface IProducts {
  id: number;
  title: string;
  price: number;
  image?: string;
  configure: IProductDetails;

  count?: number;
}

export interface IProductDetails {
  processor: string;
  memory: string;
  SSD: string;
  display: string;
}
