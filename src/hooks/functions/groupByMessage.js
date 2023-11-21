export default function groupByMessage(collection, property) {
   let val,
      result = {};
   for (let i = 0; i < collection.length; i++) {
      val = collection[i][property];

      // if (result.hasOwnProperty(val)) result[val].push(collection[i]);
      if (Object.prototype.hasOwnProperty.call(result, val)) result[val].push(collection[i]);
      else {
         result = { ...result, [val]: [collection[i]] };
      }
   }
   return result;
}
