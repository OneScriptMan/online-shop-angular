export interface IProducts {
  id: number;
  title: string;
  price: number;
  image?: string;
  configure: IProductDetails;
}

export interface IProductDetails {
  processor: string;
  memory: string;
  SSD: string;
  display: string;
}
