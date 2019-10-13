/**
 * @author Alessandro Alberga
 * @description utils for the app.
 */
export class Utils {
    public static getActionName(day) {
    if (!day) { return null; }
    if (day.status === 1) {
        return 'success';
    } else if (day.status === 2) {
        return 'fail';
    } else {
        return null;
    }
  }
}
