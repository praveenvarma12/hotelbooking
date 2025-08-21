import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: "not authenticated" });
  } else {
    let user = await User.findById(userId);

    // If user not present in DB, try to fetch from Clerk and create it.
    if (!user) {
      try {
        // NOTE: This uses global fetch (Node 18+). If your Node version is older,
        // install node-fetch and replace this call accordingly.
        const resp = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            Accept: "application/json",
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || "",
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url || "",
            recentSearchedCities: [],
          };
          user = await User.create(userData);
          console.log(`Created user ${user._id} from Clerk data`);
        } else {
          console.log(`Failed to fetch user from Clerk: ${resp.status} ${resp.statusText}`);
        }
      } catch (err) {
        console.log('Error fetching user from Clerk:', err.message);
      }
    }

    req.user = user;
    next();
  }
};