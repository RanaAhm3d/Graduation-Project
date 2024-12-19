import Cookies from "js-cookie";

// export const loadAuthData = () => {
//   const token = Cookies.get("token") || ""; // Get token from cookies
//   console.log(token)
//   const user = localStorage.getItem("user") || ""; // Get user data from local storage
//   const admin = localStorage.getItem("admin") || ""; // Get admin data from local storage
//   return {
//     token,
//     user: user && JSON.parse(user),
//     admin: admin && JSON.parse(admin),
//   };
// };

export const loadAuthData = () => {
  const token = Cookies.get("token") || ""; // Get token from cookies

  const user = localStorage.getItem("user"); // Get user data from local storage
  const admin = localStorage.getItem("admin"); // Get admin data from local storage

  // Return null if either user or admin is invalid
  if (!user || !admin) {
    return {
      token,
      user: null,
      admin: null,
    };
  }

  try {
    return {
      token,
      user: JSON.parse(user), // Parse user JSON if valid
      admin: JSON.parse(admin), // Parse admin JSON if valid
    };
  } catch (error) {
    // console.error("Error parsing user or admin JSON:", error);
    return {
      token,
      user: null,
      admin: null,
    };
  }
};
