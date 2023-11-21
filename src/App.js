// import { BrowserRouter } from "react-router-dom";
// https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
import React from "react"
import MainLayout from "./Pages/";
import MainRoutes from "./routes/routes";
import AuthContextProvider from "./contexts/auth";
import ChatContextProvider from "./contexts/ChatContextProvider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Maintenance } from "./components/Maintenance";
import "src/views/Screens/index.scss";
import "./App.scss";
import SettingContextProvider from "./contexts/SettingContextProvider";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
   const location = useLocation();
   const [width, setWidth] = useState(window.innerWidth);
   const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
   };
   useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
         window.removeEventListener("resize", handleWindowSizeChange);
      };
   }, []);

   let currentUrl = location.pathname.replace(/\//g, "");
   // console.log('currentlocation', currentUrl)

   useEffect(() => {
      let height = 0;

      const documentHeight = () => {
         const doc = document.documentElement;
         const platforms = ["Android", "Linux", "arm"];
         const isAndroid = new RegExp(platforms.join("|")).test(
            window.navigator.userAgent
         );

         if (!isAndroid)
            document.addEventListener("touchmove", function (event) {
               event.preventDefault();
            });

         if (window.innerHeight < 667 && isAndroid) height = 250;
         else height = 0;

         doc.style.setProperty(
            "--doc-height",
            `${doc.clientHeight + height}px`
         );
      };

      window.addEventListener("resize", documentHeight);
      let htmlTag = document.getElementsByTagName("html");
      let root = document.getElementById("root");
      if (
         currentUrl === "HeadToHeadScreen" ||
         currentUrl === "HeadToHeadScreenTest" ||
         currentUrl === "PreviousGames"
      ) {
         if (width <= 768) {
            documentHeight();
            // myFunction();
            htmlTag[0].style.position = "fixed";
            htmlTag[0].style.overflow = "hidden";
            htmlTag[0].style.width = "100vw";
            // root.style.overflowX = "hidden"
         }
      } else {
         const doc = document.documentElement;
         doc.style.removeProperty("--doc-height");
         htmlTag[0].style.position = "static";
         htmlTag[0].style.overflow = "auto";
         // root.style.overflowX = "scroll"
      }
   }, [currentUrl]);

   return (
      <SettingContextProvider>
         <AuthContextProvider>
            <ChatContextProvider>
               <Maintenance>
                  <MainLayout>
                     <MainRoutes />
                  </MainLayout>
               </Maintenance>
            </ChatContextProvider>
         </AuthContextProvider>
      </SettingContextProvider>
   );
}
