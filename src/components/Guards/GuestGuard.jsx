import PropTypes from "prop-types";
import { Navigate } from "react-router";

function GuestGuard({ children }) {
   let account = true;
   if (!account) {
      return <Navigate to="/admin" />;
   }

   return children;
}
GuestGuard.propTypes = {
   children: PropTypes.any,
};

export default GuestGuard;
