import { environment } from "src/environments/environment";

export class CoreConfig {
  public static getPath(): string {
    return environment.path;
  }
  public static getStaticPath(): string {
    return environment.static_path;
  }
}
