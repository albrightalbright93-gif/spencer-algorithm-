exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false })
    };
  }

  try {
    const { password } = JSON.parse(event.body || "{}");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Admin password is not configured"
        })
      };
    }

    if (password === adminPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        message: "Incorrect password"
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Invalid request"
      })
    };
  }
};
