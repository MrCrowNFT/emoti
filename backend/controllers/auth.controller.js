//todo maybe add email to db
export const signup = async (req, res) => {
  try {
    const { username, profile_pic, password } = req.body;

    if (!username | !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    };
    
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

export const refreshAccessToken = async (req, res) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
