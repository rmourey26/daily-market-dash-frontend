import { extras } from "src/data/constants";

let avatars = [];
for (var i = 1; i <= 69; i++) {
   avatars.push({
      id: i,
      src: extras.avatarUrl + "/256_" + i + ".png"
   });
}

const checkIcon = "assets/images/icons/correct-symbol.png";
const uploadIcon = "assets/images/icons/upload.svg";
export { avatars, checkIcon, uploadIcon };
