import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// eslint-disable-next-line react/display-name

const Loadable = (Component) => (props) => {
   return (
      <Suspense fallback={""}>
         <Component {...props} />
      </Suspense>
   );
};

const MainLandingPage = Loadable(
   lazy(() => import("src/views/Screens/Dashboard/MainLandingPage"))
);

const MyMoneyPage = Loadable(
   lazy(() => import("src/views/Screens/Dashboard/MainLandingPage/MyMoneyPage"))
);

const LoadingScreen = Loadable(
   lazy(() => import("src/Pages/Public/LoadingScreen"))
);

const FirstSignupScreen = Loadable(
   lazy(() => import("src/Pages/Public/FirstSignupScreen"))
);

const SecondSignupScreen = Loadable(
   lazy(() => import("src/Pages/Public/SecondSignupScreen"))
);

const ThirdSignupScreen = Loadable(
   lazy(() => import("src/Pages/Private/ThirdSignupScreen"))
);

const HeadToHeadOneScreen = Loadable(
   lazy(() =>
      import("src/views/Screens/Dashboard/HeadToHead/HeadToHeadOneScreen")
   )
);

// const StandardGuest = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/Guest/StandardGuest")
//    )
// );

// const FinalGuest = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/HeadToHead/Guest/FinalGuest"))
// );

// const QuarterGuest = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/Guest/QuarterGuest")
//    )
// );

// const SemiFinalGuest = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/Guest/SemiFinalGuest")
//    )
// );

// const SemiFinalUser = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/User/SemiFinalUser")
//    )
// );

// const QuarterUser = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/HeadToHead/User/QuarterUser"))
// );

// const FinalUser = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/HeadToHead/User/FinalUser"))
// );

// const HeadToHeadTwoScreen = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/HeadToHeadTwoScreen")
//    )
// );

// const HeadToHeadRoiScreen = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadToHead/HeadToHeadRoiScreen")
//    )
// );

// const HeadtoHeadDashboard = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/HeadtoHeadDashboard"))
// );

// const HeadtoHeadDashboardNewGame = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/HeadtoHeadDashboardNewGame"))
// );

// const HeadtoHeadDashboardActiveGame = Loadable(
//    lazy(() =>
//       import("src/views/Screens/Dashboard/HeadtoHeadDashboardActiveGame")
//    )
// );

const Maintenance = Loadable(lazy(() => import("src/components/Maintenance")));

const AdditionalPassword = Loadable(
   lazy(() => import("src/Pages/Public/AdditionalPassword"))
);

const AuthGuard = Loadable(
   lazy(() => import("src/components/Guards/AuthGuard"))
);

const UserGuard = Loadable(
   lazy(() => import("src/components/Guards/UserGuard"))
);

const AdditionGuard = Loadable(
   lazy(() => import("src/components/Guards/AdditionGuard"))
);

const InfoMessagePage = Loadable(
   lazy(() => import("src/Pages/Public/InfoMessagePage"))
);

const TermsMessagePage = Loadable(
   lazy(() => import("src/Pages/Private/Terms"))
);

const PrivacyMessagePage = Loadable(
   lazy(() => import("src/Pages/Private/Privacy"))
);

const HeadToHeadThreeScreen = Loadable(
   lazy(() =>
      import("src/views/Screens/Dashboard/HeadToHead/HeadToHeadThreeScreen")
   )
);

// const MyMoneyPage = Loadable(
//    lazy(() => import("src/views/Screens/Dashboard/MyMoney/MyMoneyPage")
//    )
// );

const HeadToHeadOneScreenTest = Loadable(
   lazy(() =>
      import("src/views/Screens/Dashboard/HeadToHead/HeadToHeadOneScreenTest")
   )
);

const Daily_game = Loadable(
   lazy(() => import("src/views/Screens/Leaderboard/Daily_game.jsx"))
);

const PreviousGames = Loadable(
   lazy(() => import("src/views/Screens/Dashboard/HeadToHead/PreviousGame"))
);

const Leaderlisting = Loadable(
   lazy(() =>
      import("src/views/Screens/Dashboard/HeadToHead/HeadtoHeadListing")
   )
);

export default function MainRoutes() {
   return useRoutes([
      {
         path: "/",
         element: <LoadingScreen />,
      },

      {
         path: "MyMoneyPage",
         element: (
            <AuthGuard>
               <MyMoneyPage />
            </AuthGuard>
         ),
      },

      {
         path: "HeadToHeadScreenTest",
         element: (
            <AuthGuard>
               <HeadToHeadOneScreenTest />
            </AuthGuard>
         ),
      },
      {
         path: "HeadToHeadScreen",
         element: (
            <AuthGuard>
               <HeadToHeadOneScreen />
            </AuthGuard>
         ),
      },

      {
         path: "DailyGame",
         element: (
            <AuthGuard>
               <Daily_game />
            </AuthGuard>
         ),
      },
      // {
      //    path: "HeadtoHeadTwoScreen",
      //    element: (
      //       <AuthGuard>
      //          <HeadToHeadTwoScreen />
      //       </AuthGuard>
      //    ),
      // },
      {
         path: "HeadToHeadThreeScreen",
         element: (
            <AuthGuard>
               <HeadToHeadThreeScreen />
            </AuthGuard>
         ),
      },
      {
         path: "PreviousGames",
         element: (
            <AuthGuard>
               <PreviousGames />
            </AuthGuard>
         ),
      },
      // {
      //    path: "HeadToHeadRoiScreen",
      //    element: (
      //       <AuthGuard>
      //          <HeadToHeadRoiScreen />
      //       </AuthGuard>
      //    ),
      // },

      // For Testing 16102022
      {
         path: "Maintenance",
         element: (
            <AuthGuard>
               <Maintenance />
            </AuthGuard>
         ),
      },

      {
         path: "Info",
         element: (
            <AuthGuard>
               <InfoMessagePage />
            </AuthGuard>
         ),
      },

      {
         path: "Terms",
         element: (
            <AuthGuard>
               <TermsMessagePage />
            </AuthGuard>
         ),
      },

      {
         path: "Privacy",
         element: (
            <AuthGuard>
               <PrivacyMessagePage />
            </AuthGuard>
         ),
      },

      //not required start
      // {
      //    path: "StandardGuest",
      //    element: (
      //       <AuthGuard>
      //          <StandardGuest />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "FinalGuest",
      //    element: (
      //       <AuthGuard>
      //          <FinalGuest />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "QuarterGuest",
      //    element: (
      //       <AuthGuard>
      //          <QuarterGuest />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "SemiFinalGuest",
      //    element: (
      //       <AuthGuard>
      //          <SemiFinalGuest />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "SemiFinalUser",
      //    element: (
      //       <AuthGuard>
      //          <SemiFinalUser />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "QuarterUser",
      //    element: (
      //       <AuthGuard>
      //          <QuarterUser />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "FinalUser",
      //    element: (
      //       <AuthGuard>
      //          <FinalUser />
      //       </AuthGuard>
      //    ),
      // },
      //not required end

      {
         path: "HeadListing",
         element: (
            <AuthGuard>
               <Leaderlisting />
            </AuthGuard>
         ),
      },
      // For Testing 16102022 Ends

      // { path: "my-money", element: <MyMoneyScreen /> },
      {
         path: "MainLandingPage",
         element: (
            <AuthGuard>
               <MainLandingPage />
            </AuthGuard>
         ),
      },
      {
         path: "MyMoneyPage",
         element: (
            <AuthGuard>
               <MyMoneyPage />
            </AuthGuard>
         ),
      },

      // {
      //    path: "HeadtoHeadDashboard",
      //    element: (
      //       <AuthGuard>
      //          <HeadtoHeadDashboard />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "HeadtoHeadDashboardNewGame",
      //    element: (
      //       <AuthGuard>
      //          <HeadtoHeadDashboardNewGame />
      //       </AuthGuard>
      //    ),
      // },
      // {
      //    path: "HeadtoHeadDashboardActiveGame",
      //    element: (
      //       <AuthGuard>
      //          {" "}
      //          <HeadtoHeadDashboardActiveGame />{" "}
      //       </AuthGuard>
      //    ),
      // },

      {
         path: "/LandingPage",
         element: <LoadingScreen />,
      },
      {
         path: "/",
         children: [
            { path: "FirstSignupScreen", element: <FirstSignupScreen /> },
            {
               path: "TermsandConditions",
               element: <AuthGuard><SecondSignupScreen /></AuthGuard>,
            },
            { path: "SecondSignupScreen", element: <UserGuard><AdditionGuard><ThirdSignupScreen /></AdditionGuard> </UserGuard>},
            { path: "AdditionalPassword", element: <UserGuard><AdditionalPassword /> </UserGuard>},
            // { path: "404", element: <NotFound404 /> },
            { path: "*", element: <Navigate to="/LandingPage" /> },
         ],
      },
      { path: "*", element: <Navigate to="/LandingPage" replace /> },
   ]);
}
// export default MainRoutes;
