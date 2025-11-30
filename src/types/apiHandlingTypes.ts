export interface EdamamHit {
  recipe: {
    label: string;
    ingredients: string[];
    images?: {
      REGULAR: {
        url: string;
      };
    };
  };
}

export interface EdamamHitForSearch extends EdamamHit {
  recipe: EdamamHit["recipe"] & {
    cuisineType: string[];
    dietLabels: string[];
    mealType: string[];
    calories: number;
    totalWeight: number;
  };
}

export interface DataOflittleMenuType {
  label: string;
  ingredients: string[];
  price: string;
  starrArr: number[];
  mealId: string;
  image?: string;
}

export type DataOfSearchingMenuType = Pick<
  EdamamHitForSearch["recipe"],
  "cuisineType" | "dietLabels" | "mealType" | "calories" | "totalWeight"
> &
  DataOflittleMenuType;

export interface WishList {
  id: string;
  img: string;
  name: string;
  price: string;
  count: number;
  calories: number;
}

export interface ReservationType {
  address: string;
  date: string;
  count: string;
  tableType: string;
}
export interface UserInfoType {
  email: string;
  id: string;
  password: string;
  phoneNumber: string;
  totalCheckPrice: string;
  userName: string;
  wishList: WishList[];
  reservation?: ReservationType;
}
