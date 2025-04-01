export class UserModel {
  id = 0;
  isActive = true;
  public role: number;
  constructor(
    public user_name: string,
    public user_id: string,
    public pass_word: string,
    public is_admin: boolean,
    public br_code: string
  ) {}
}
