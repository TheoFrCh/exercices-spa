// Ecrivez le type des clés d'un élément
export interface Element {
  name: string | any;
  children: Element[] | string[];
  attributes: Attribute;
};

interface Attribute {
  [key: string]: string;
}