import axiosInstance from "src/services/axios";

export async function portfolioAction(options) {
   let request = axiosInstance.post("/portfolio/", options);
   try {
      const result = await request;
      await axiosInstance
         .post("/members/", {
            action: "ranking",
         })
         .then(function (response) {
            // setMarketData(response.data);
            window.localStorage.setItem(
               "membersInfo",
               JSON.stringify(response.data)
            );
         })
      return result.data;
   } catch (error) {
      return error.response.data;
   }
}
