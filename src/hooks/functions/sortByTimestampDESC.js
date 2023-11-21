export default function sortByTimestampDESC(array) {
   return array.sort(function (x, y) {
      return new Date(y.message.timestamp) - new Date(x.message.timestamp);
   });
}
