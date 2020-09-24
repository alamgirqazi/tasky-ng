import { Pipe, PipeTransform } from "@angular/core";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

@Pipe({
  name: "duration",
  pure: false,
})
export class DurationPipe implements PipeTransform {
  transform(date: Date): string {
    if (date) {
      const res = formatDistanceToNow(new Date(date));
      return res + " ago";
    } else {
      return "";
    }
  }
}
