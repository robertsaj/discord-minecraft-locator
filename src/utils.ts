export class Utils {

  public static isString(input: any): boolean {
    return typeof input === 'string' || input instanceof String;
  };

  public static isNumber(input: any): boolean   {
    return !isNaN(+input);
  };

}
