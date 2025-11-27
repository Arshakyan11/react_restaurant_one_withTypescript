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
