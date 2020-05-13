import { User } from '../../core/models/user.model';

export interface UserFromReqres {
  "first_name": string;
  "last_name": string;
  "id": number;
  "email": string;
  "avatar": string;
}

export interface UserExtended extends User {
  "firstName": string;
  "lastName": string;
  "id": number;
  "email": string;
}

export interface UsersListResponse {
  "page": number;
  "per_page": number;
  "total": number;
  "total_pages": number;
  "data": UserFromReqres[];
}
