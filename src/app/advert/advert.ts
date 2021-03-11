export class Advert {
  id: number =0;
  userId: number = 0;
  name: string ='';
  tags?: string[] =[''];
  dateAdded: Date = new Date();
  price: number =0;
  description: string = '';
}
