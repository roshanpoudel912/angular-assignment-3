import { Person } from "./person";

export interface PersonType {
  personTypeId: number;
  name: string;
  description: string;
  status: number;
  persons:Person[];
}
