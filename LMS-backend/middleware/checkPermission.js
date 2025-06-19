export const checkStaffLevelPermissions = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Staff" && user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You don`t have authorization  to perform this action!"
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export const checkAdminLevelPermissions = (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Admin") {
      return res.json({
        success: false,
        message: "You don`t have authorization  to perform this action!"
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
